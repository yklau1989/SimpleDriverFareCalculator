using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace TapTechnicalTest.Entities
{
    public enum VehicleType
    {
        Taxi = 1
    }

    public abstract class Driver
    {
        [Key]
        public int Id { get; set; }

        public string Name { get; set; }

        public string Surname { get; set; }

        public string Email { get; set; }

        public VehicleType VehicleType { get; set; }

        public Driver(string name, string surname, string email, VehicleType vehicleType)
        {
            Name = name;
            Surname = surname;
            Email = email;
            VehicleType = vehicleType;
        }

        public abstract CalculatedResult Calculate(int[] data);
    }
}
