using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;

namespace SPCService.DbModel
{
    [Table("SPC_CHART")]
    public class SPC_CHART
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
        [StringLength(45)]
        [Column("CHARTTEMPLATE", Order = 3, TypeName = "VARCHAR2(45)")]
        public string CHARTTEMPLATE { get; set; }
        [Required]
        [StringLength(40)]
        [Column("MEASUREMENTSPEC", Order = 4, TypeName = "VARCHAR2(40)")]
        public string MEASUREMENTSPEC { get; set; }
        [StringLength(40)]
        [Column("EDCPLAN", Order = 5, TypeName = "VARCHAR2(40)")]
        public string EDCPLAN { get; set; }
        [StringLength(51)]
        [Column("PROCESSPLAN", Order = 6, TypeName = "VARCHAR2(51)")]
        public string PROCESSPLAN { get; set; }
        [StringLength(40)]
        [Column("PRODUCT", Order = 7, TypeName = "VARCHAR2(40)")]
        public string PRODUCT { get; set; }
        [StringLength(40)]
        [Column("STEP", Order = 8, TypeName = "VARCHAR2(40)")]
        public string STEP { get; set; }
        [StringLength(40)]
        [Column("LOT", Order = 9, TypeName = "VARCHAR2(40)")]
        public string LOT { get; set; }
        [StringLength(40)]
        [Column("EQUIPMENT", Order = 10, TypeName = "VARCHAR2(40)")]
        public string EQUIPMENT { get; set; }
        [StringLength(40)]
        [Column("PARTITION", Order = 11, TypeName = "VARCHAR2(40)")]
        public string PARTITION { get; set; }
        [Required]
        [StringLength(1)]
        [Column("PUBLISHTONAME", Order = 12, TypeName = "CHAR(1)")]
        public string PUBLISHTONAME { get; set; }
        [Required]
        [StringLength(1)]
        [Column("LOADONSTARTUP", Order = 13, TypeName = "CHAR(1)")]
        public string LOADONSTARTUP { get; set; }
        [Required]
        [StringLength(40)]
        [Column("WHENTODISPLAY", Order = 14, TypeName = "VARCHAR2(40)")]
        public string WHENTODISPLAY { get; set; }
        [Required]
        [Column("HISTORICALHOURS", Order = 15, TypeName = "INTEGER")]
        public int HISTORICALHOURS { get; set; }
        [Required]
        [Column("HISTORICALPOINTS", Order = 16, TypeName = "INTEGER")]
        public int HISTORICALPOINTS { get; set; }
        [Required]
        [Column("FWTIMESTAMP", Order = 17, TypeName = "INTEGER")]
        public int TIMESTAMP { get; set; }
    }

}
