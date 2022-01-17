using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TapTechnicalTest.Entities
{
    public class TaxiDriver: Driver
    {
        public decimal BaseFarePrice { get; set; }

        public double BaseFareDistance { get; set; }

        public TaxiDriver(string name, string surname, string email, decimal baseFarePrice, double baseFareDistance) 
            : base(name, surname, email, VehicleType.Taxi)
        {
            BaseFarePrice = baseFarePrice;
            BaseFareDistance = baseFareDistance;
        }

        public override CalculatedResult Calculate(int[] data)
        {
            if (data.Length != 3)
                throw new Exception("Input array should be in lenght of 3");

            double distanceTravaled = data[0];
            double traveledUnit = data[1];
            decimal costPerDistanceTravaled = data[2];

            double remainingDistance = distanceTravaled - BaseFareDistance;

            int distanceTraveledUnits = remainingDistance > 0 ? (int)(remainingDistance / traveledUnit) +
                    (remainingDistance % traveledUnit > 0.0 ? 1 : 0) : 0;

            decimal price = BaseFarePrice + (distanceTraveledUnits * costPerDistanceTravaled);

            return new CalculatedResult {
                DriverId = Id,
                Name = Name,
                Surname = Surname,
                Email = Email,
                ResultOfThatTime = price
            };
        }
    }
}
