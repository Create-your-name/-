using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;

namespace SPCService.DbModel
{
    [Table("SPC_MEASUREMENTSPEC")]
    public class SPC_MEASUREMENTSPEC
    {
        [Key]
        [Required]
        [StringLength(45)]
        [Column("SYSID", Order = 0, TypeName = "VARCHAR2(45)")]
        public string SYSID { get; set; }
        [Required]
        [StringLength(40)]
        [Column("NAME", Order = 1, TypeName = "VARCHAR2(40)")]
        public string NAME { get; set; }
        [StringLength(255)]
        [Column("DESCRIPTION", Order = 2, TypeName = "VARCHAR2(255)")]
        public string DESCRIPTION { get; set; }
        [Required]
        [StringLength(40)]
        [Column("MEASUREMENTTYPE", Order = 3, TypeName = "VARCHAR2(40)")]
        public string MEASUREMENTTYPE { get; set; }
        [Required]
        [StringLength(40)]
        [Column("DATATYPE", Order = 4, TypeName = "VARCHAR2(40)")]
        public string DATATYPE { get; set; }
        [StringLength(40)]
        [Column("UNIT", Order = 5, TypeName = "VARCHAR2(40)")]
        public string UNIT { get; set; }
        [Required]
        [StringLength(1)]
        [Column("ISDERIVED", Order = 6, TypeName = "CHAR(1)")]
        public string ISDERIVED { get; set; }
        [Required]
        [StringLength(1)]
        [Column("AUTOEXCLUDE", Order = 7, TypeName = "CHAR(1)")]
        public string AUTOEXCLUDE { get; set; }
        [Required]
        [StringLength(1)]
        [Column("ALLOWLIMITOVERRIDE", Order = 8, TypeName = "CHAR(1)")]
        public string ALLOWLIMITOVERRIDE { get; set; }
        [StringLength(255)]
        [Column("UPPERSCREENINGLIMIT", Order = 9, TypeName = "VARCHAR2(255)")]
        public string UPPERSCREENINGLIMIT { get; set; }
        [StringLength(255)]
        [Column("UPPERSPECLIMIT", Order = 10, TypeName = "VARCHAR2(255)")]
        public string UPPERSPECLIMIT { get; set; }
        [StringLength(255)]
        [Column("TARGET", Order = 11, TypeName = "VARCHAR2(255)")]
        public string TARGET { get; set; }
        [StringLength(255)]
        [Column("LOWERSPECLIMIT", Order = 12, TypeName = "VARCHAR2(255)")]
        public string LOWERSPECLIMIT { get; set; }
        [StringLength(255)]
        [Column("LOWERSCREENINGLIMIT", Order = 13, TypeName = "VARCHAR2(255)")]
        public string LOWERSCREENINGLIMIT { get; set; }
        [StringLength(45)]
        [Column("SAMPLINGPLAN", Order = 14, TypeName = "VARCHAR2(45)")]
        public string SAMPLINGPLAN { get; set; }
        [StringLength(45)]
        [Column("DERIVATION", Order = 15, TypeName = "VARCHAR2(45)")]
        public string DERIVATION { get; set; }
        [Required]
        [Column("FWTIMESTAMP", Order = 16, TypeName = "INTEGER")]
        public  int TIMESTAMP { get; set; }
    }

}
