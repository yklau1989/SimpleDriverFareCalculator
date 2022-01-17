using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TapTechnicalTest.Entities;

namespace TapTechnicalTest.Validators
{
    public class TaxiDriverValidator : AbstractValidator<TaxiDriver>
    {
        public TaxiDriverValidator()
        {
            RuleFor(taxiDriver => taxiDriver.Name)
                .NotEmpty().WithMessage("Name should not be empty");

            RuleFor(taxiDriver => taxiDriver.Surname)
                .NotEmpty().WithMessage("Surname should not be empty");

            RuleFor(taxiDriver => taxiDriver.Email)
                .NotEmpty().WithMessage("Email should not be empty")
                .EmailAddress().WithMessage("Email should be in correct format");

            RuleFor(taxiDriver => taxiDriver.BaseFarePrice)
                .NotNull().WithMessage("BaseFarePrice should not be null")
                .GreaterThanOrEqualTo(0).WithMessage("BaseFarePrice should be greater than or equal to 0");

            RuleFor(taxiDriver => taxiDriver.BaseFareDistance)
                .NotEmpty().WithMessage("BaseFareDistance should not be null")
                .GreaterThanOrEqualTo(0).WithMessage("BaseFareDistance should be greater than or equal to 0");
        }
    }
}
