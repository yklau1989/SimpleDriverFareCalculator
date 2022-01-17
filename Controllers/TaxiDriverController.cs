using FluentValidation;
using FluentValidation.Results;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TapTechnicalTest.ApiModels;
using TapTechnicalTest.Entities;
using TapTechnicalTest.Validators;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace TapTechnicalTest.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TaxiDriverController : ControllerBase
    {
        readonly MyContext context;

        public TaxiDriverController()
        {
            var options = new DbContextOptionsBuilder<MyContext>()
                .UseInMemoryDatabase(databaseName: "TapTechnicalTest")
                .Options;

            context = new MyContext(options);
        }

        // GET: api/<TaxiDriverController>
        [HttpGet]
        public IEnumerable<TaxiDriver> Get()
        {
            return context.TaxiDrivers.ToList();
        }

        // GET api/<TaxiDriverController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<TaxiDriverController>
        [HttpPost]
        public void Post([FromBody] TaxiDriverModel model)
        {
            TaxiDriver taxiDriver = new TaxiDriver(model.Name, model.Surname, model.Email, model.BaseFarePrice, model.BaseFareDistance);
            TaxiDriverValidator validator = new TaxiDriverValidator();
            ValidationResult result = validator.Validate(taxiDriver, options => options.ThrowOnFailures());

            if (result.IsValid)
            {
                context.Drivers.Add(taxiDriver);
                context.SaveChanges();
            }
        }

        // PUT api/<TaxiDriverController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] TaxiDriverModel model)
        {
            var driverObj = context.TaxiDrivers.SingleOrDefault(x => x.Id == id);
            if (driverObj == null)
                throw new InvalidOperationException("No driver found for '" + id + "'");

            if (driverObj.GetType() == typeof(TaxiDriver))
            {
                TaxiDriver driver = driverObj;
                driver.Name = model.Name;
                driver.Surname = model.Surname;
                driver.Email = model.Email;
                driver.BaseFarePrice = model.BaseFarePrice;
                driver.BaseFareDistance = model.BaseFareDistance;

                TaxiDriverValidator validator = new TaxiDriverValidator();
                ValidationResult result = validator.Validate(driver, options => options.ThrowOnFailures());

                if (result.IsValid)
                {
                    context.SaveChanges();
                }
            }
        }

        // DELETE api/<TaxiDriverController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            var driver = context.TaxiDrivers.SingleOrDefault(x => x.Id == id);
            if (driver == null)
                throw new InvalidOperationException("No driver found for '" + id + "'");

            context.Drivers.Remove(driver);
            context.SaveChanges();
        }
    }
}
