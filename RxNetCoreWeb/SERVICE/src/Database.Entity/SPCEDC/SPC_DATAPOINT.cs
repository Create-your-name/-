using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;

namespace SPCService.DbModel
{
    [Table("SPC_DATAPOINT")]
    public class SPC_DATAPOINT
    {
        [Key]
        [Required]
        [StringLength(45)]
        [Column("SYSID", Order = 0, TypeName = "VARCHAR2(45)")]
        public string SYSID { get; set; }
        [Required]
        [StringLength(45)]
        [Column("MEASUREMENT", Order = 1, TypeName = "VARCHAR2(45)")]
        public string MEASUREMENT { get; set; }
        [StringLength(40)]
        [Column("UNITIDENTIFIER", Order = 2, TypeName = "VARCHAR2(40)")]
        public string UNITIDENTIFIER { get; set; }
        [StringLength(40)]
        [Column("SITEIDENTIFIER", Order = 3, TypeName = "VARCHAR2(40)")]
        public string SITEIDENTIFIER { get; set; }
        [StringLength(40)]
        [Column("SAMPLEIDENTIFIER", Order = 4, TypeName = "VARCHAR2(40)")]
        public string SAMPLEIDENTIFIER { get; set; }
        [Required]
        [Column("SEQUENCE", Order = 5, TypeName = "INTEGER")]
        public int SEQUENCE { get; set; }
        [StringLength(255)]
        [Column("VALUE", Order = 6, TypeName = "VARCHAR2(255)")]
        public string VALUE { get; set; }
        [Required]
        [StringLength(1)]
        [Column("ISEXCLUDED", Order = 7, TypeName = "CHAR(1)")]
        public string ISEXCLUDED { get; set; }
        [Required]
        [StringLength(1)]
        [Column("HASHISTORY", Order = 8, TypeName = "CHAR(1)")]
        public string HASHISTORY { get; set; }
        [Required]
        [StringLength(1)]
        [Column("ISDATABOUNDARY", Order = 9, TypeName = "CHAR(1)")]
        public string ISDATABOUNDARY { get; set; }
        [StringLength(15)]
        [Column("CREATEDATE", Order = 10, TypeName = "CHAR(15)")]
        public string CREATEDATE { get; set; }
    }

}
