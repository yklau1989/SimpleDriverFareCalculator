using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace TapTechnicalTest.Entities
{
    public class CalculatedRecord
    {
        [Key]
        public int RecordId { get; private set; }

        public DateTime RecordTime { get; private set; } = DateTime.Now;

        public string InputString { get; init; }

        public List<CalculatedResult> CalculatedResults { get; init; }
    }
}
