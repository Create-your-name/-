using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;

namespace SPCService.DbModel
{
    [Table("SPC_MEASUREMENT")]
    public class SPC_MEASUREMENT
    {
        [Key]
        [Required]
        [StringLength(45)]
        [Column("SYSID", Order = 0, TypeName = "VARCHAR2(45)")]
        public string SYSID { get; set; }
        [Required]
        [StringLength(45)]
        [Column("DATACOLLECTION", Order = 1, TypeName = "VARCHAR2(45)")]
        public string DATACOLLECTION { get; set; }
        [Required]
        [StringLength(40)]
        [Column("MEASUREMENTSPEC", Order = 2, TypeName = "VARCHAR2(40)")]
        public string MEASUREMENTSPEC { get; set; }
        [StringLength(40)]
        [Column("MEASUREMENTSTEP", Order = 3, TypeName = "VARCHAR2(40)")]
        public string MEASUREMENTSTEP { get; set; }
        [StringLength(40)]
        [Column("MEASUREMENTRESOURCE", Order = 4, TypeName = "VARCHAR2(40)")]
        public string MEASUREMENTRESOURCE { get; set; }
        [StringLength(40)]
        [Column("PROCESSSTEP", Order = 5, TypeName = "VARCHAR2(40)")]
        public string PROCESSSTEP { get; set; }
        [StringLength(40)]
        [Column("PROCESSRESOURCE", Order = 6, TypeName = "VARCHAR2(40)")]
        public string PROCESSRESOURCE { get; set; }
        [StringLength(40)]
        [Column("USERNAME", Order = 7, TypeName = "VARCHAR2(40)")]
        public string USERNAME { get; set; }
        [StringLength(45)]
        [Column("SPECLIMITS", Order = 8, TypeName = "VARCHAR2(45)")]
        public string SPECLIMITS { get; set; }
    }

}
