using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;

namespace SPCService.DbModel
{
    [Table("SPC_DATAPOINTHISTORY")]
    public class SPC_DATAPOINTHISTORY
    {
        [Key]
        [Required]
        [StringLength(45)]
        [Column("SYSID", Order = 0, TypeName = "VARCHAR2(45)")]
        public string SYSID { get; set; }
        [Required]
        [StringLength(45)]
        [Column("DATASYSID", Order = 1, TypeName = "VARCHAR2(45)")]
        public string DATASYSID { get; set; }
        [StringLength(40)]
        [Column("CHART", Order = 2, TypeName = "VARCHAR2(40)")]
        public string CHART { get; set; }
        [StringLength(40)]
        [Column("GRAPH", Order = 3, TypeName = "VARCHAR2(40)")]
        public string GRAPH { get; set; }
        [StringLength(40)]
        [Column("DATASET", Order = 4, TypeName = "VARCHAR2(40)")]
        public string DATASET { get; set; }
        [StringLength(40)]
        [Column("INITIALVALUE", Order = 5, TypeName = "VARCHAR2(40)")]
        public string INITIALVALUE { get; set; }
        [Required]
        [StringLength(40)]
        [Column("DATATYPE", Order = 6, TypeName = "VARCHAR2(40)")]
        public string DATATYPE { get; set; }
        [Required]
        [StringLength(1)]
        [Column("ISEXCLUDED", Order = 7, TypeName = "CHAR(1)")]
        public string ISEXCLUDED { get; set; }
        [Required]
        [StringLength(1)]
        [Column("HASVIOLATIONS", Order = 8, TypeName = "CHAR(1)")]
        public string HASVIOLATIONS { get; set; }
        [Required]
        [StringLength(1)]
        [Column("HASCOMMENTS", Order = 9, TypeName = "CHAR(1)")]
        public string HASCOMMENTS { get; set; }
        [Required]
        [StringLength(1)]
        [Column("ISDATABOUNDARY", Order = 10, TypeName = "CHAR(1)")]
        public string ISDATABOUNDARY { get; set; }
        [Required]
        [StringLength(1)]
        [Column("INOCAP", Order = 10, TypeName = "CHAR(1)")]
        public string INOCAP { get; set; }
        [Required]
        [StringLength(40)]
        [Column("MEASUREMENTSPEC", Order = 6, TypeName = "VARCHAR2(40)")]
        public string MEASUREMENTSPEC { get; set; }

        [Required]
        [StringLength(18)]
        [Column("DATACREATETIME", Order = 6, TypeName = "VARCHAR2(18)")]
        public string DATACREATETIME { get; set; }
     
        [Required]
        [Column("FWTIMESTAMP", Order = 11, TypeName = "INTEGER")]
        public int TIMESTAMP { get; set; }
    }

}
