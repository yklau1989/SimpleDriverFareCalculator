using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TapTechnicalTest.Entities;

namespace TapTechnicalTest
{
    public class MyContext : DbContext
    {
        public DbSet<Driver> Drivers { get; set; }
        public DbSet<TaxiDriver> TaxiDrivers { get; set; }

        public DbSet<CalculatedRecord> CalculatedRecords { get; set; }

        public MyContext(DbContextOptions<MyContext> options)
            : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Driver>()
                .HasDiscriminator<string>("Driver Type")
                .HasValue<TaxiDriver>("Taxi_Driver");

            modelBuilder.Entity<CalculatedRecord>().Metadata.FindNavigation(nameof(CalculatedRecord.CalculatedResults)).SetPropertyAccessMode(PropertyAccessMode.Field);
        }
    }
}
