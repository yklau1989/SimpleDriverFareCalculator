using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace TapTechnicalTest.Entities
{
    public class CalculatedResult
    {
        [Key]
        public int ResultId { get; private set; }

        public int DriverId { get; set; }

        public string Name { get; set; }

        public string Surname { get; set; }

        public string Email { get; set; }

        public decimal ResultOfThatTime { get; init; }
    }
}
