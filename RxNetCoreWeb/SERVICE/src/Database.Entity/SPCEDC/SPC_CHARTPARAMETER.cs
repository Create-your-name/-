using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;

namespace SPCService.DbModel
{
    [Table("SPC_CHARTPARAMETER")]
    public class SPC_CHARTPARAMETER
    {
        [Key]
        [Required]
        [StringLength(45)]
        [Column("SYSID", Order = 0, TypeName = "VARCHAR2(45)")]
        public string SYSID { get; set; }
        [Required]
        [StringLength(255)]
        [Column("PROPERTY", Order = 1, TypeName = "VARCHAR2(255)")]
        public string PROPERTY { get; set; }
        [StringLength(255)]
        [Column("VALUE", Order = 2, TypeName = "VARCHAR2(255)")]
        public string VALUE { get; set; }
    }

}
