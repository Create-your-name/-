using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;

namespace SPCService.DbModel
{
    [Table("SPC_CUSTOMRULE")]
    public class SPC_CUSTOMRULE
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
        [StringLength(40)]
        [Column("REASON", Order = 2, TypeName = "VARCHAR2(40)")]
        public string REASON { get; set; }
        [Required]
        [Column("TESTCOUNT", Order = 3, TypeName = "INTEGER")]
        public int TESTCOUNT { get; set; }
        [Required]
        [Column("OUTOF", Order = 4, TypeName = "INTEGER")]
        public  int OUTOF { get; set; }
        [Required]
        [StringLength(40)]
        [Column("COMPARISON", Order = 5, TypeName = "VARCHAR2(40)")]
        public string COMPARISON { get; set; }
        [StringLength(40)]
        [Column("WITHRESPECTTO", Order = 6, TypeName = "VARCHAR2(40)")]
        public string WITHRESPECTTO { get; set; }
        [StringLength(255)]
        [Column("VALUE", Order = 7, TypeName = "VARCHAR2(255)")]
        public string VALUE { get; set; }
        [StringLength(255)]
        [Column("STDDEVS", Order = 8, TypeName = "VARCHAR2(255)")]
        public string STDDEVS { get; set; }
        [StringLength(255)]
        [Column("DATASETNAME", Order = 9, TypeName = "VARCHAR2(255)")]
        public string DATASETNAME { get; set; }
        [StringLength(255)]
        [Column("INTERVALFROM", Order = 10, TypeName = "VARCHAR2(255)")]
        public string INTERVALFROM { get; set; }
        [StringLength(255)]
        [Column("INTERVALTO", Order = 11, TypeName = "VARCHAR2(255)")]
        public string INTERVALTO { get; set; }
    }

}
