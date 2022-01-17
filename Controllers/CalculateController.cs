using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TapTechnicalTest.Entities;

namespace TapTechnicalTest.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CalculateController : Controller
    {
        readonly MyContext context;

        public CalculateController()
        {
            var options = new DbContextOptionsBuilder<MyContext>()
                .UseInMemoryDatabase(databaseName: "TapTechnicalTest")
                .Options;

            context = new MyContext(options);
        }

        [HttpGet]
        public IEnumerable<CalculatedRecord> Get()
        {
            return context.CalculatedRecords.Include(cr => cr.CalculatedResults).OrderByDescending(cr => cr.RecordId).ToList();
        }

        [HttpPost]
        public async Task<IActionResult> UploadFileAsync()
        {
            string input;
            int[] inValueArray; 
            

            using (var to = new MemoryStream())
            {
                var from = Request.Body;
                var buffer = new byte[8 * 1024];
                long totalBytes = 0;
                int bytesRead;
                while((bytesRead = await from.ReadAsync(buffer, 0, buffer.Length)) > 0)
                {
                    await to.WriteAsync(buffer, 0, bytesRead);
                    totalBytes += bytesRead;
                }
                // Console.WriteLine(to);
                input = Encoding.Default.GetString(to.ToArray());
                // Console.WriteLine(input);

                if (string.IsNullOrEmpty(input))
                    return BadRequest("No content detected");

                inValueArray = input.Split(',').Select(str => int.Parse(str)).ToArray();
            }

            if (inValueArray == null)
                return BadRequest("Something's wrong");
            if (inValueArray.Length != 3)
                return BadRequest("Wrong format");

            // Console.WriteLine( Request.Body.Length );

            List<CalculatedResult> results = context.TaxiDrivers
                .ToList()
                .Select(td =>
                {
                    return td.Calculate(inValueArray);
                })
                .ToList();

            CalculatedRecord calculatedRecord = new CalculatedRecord
            {
                InputString = input,
                CalculatedResults = results
            };

            context.CalculatedRecords.Add(calculatedRecord);
            await context.SaveChangesAsync();

            return Ok(calculatedRecord.RecordId);
        }
    }
}
