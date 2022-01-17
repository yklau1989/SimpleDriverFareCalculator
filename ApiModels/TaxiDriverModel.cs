using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TapTechnicalTest.ApiModels
{
    public class TaxiDriverModel
    {
        public string Name { get; set; }

        public string Surname { get; set; }

        public string Email { get; set; }

        public decimal BaseFarePrice { get; set; }

        public double BaseFareDistance { get; set; }
    }
}
