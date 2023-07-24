using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;

namespace SPCService.DbModel
{
    [Table("CUST_EQP_PM_LIST")]
    public class EQP_PM_LIST
    {
        [Key]
        [Required]
        [Column("SYSID", Order = 1, TypeName = "VARCHAR2(32)")]
        public string SYSID { get; set; }
        [Required]
        [Column("PMID", Order = 2, TypeName = "VARCHAR2(32)")]
        public string PMID { get; set; }
        [Required]
        [Column("PMFORMID", Order = 3, TypeName = "VARCHAR2(32)")]
        public string PMFORMID { get; set; }
        [StringLength(20)]
        [Column("MOUDLE", Order = 4, TypeName = "VARCHAR2(20)")]
        public string? MOUDLE { get; set; }
        [StringLength(40)]
        [Column("EQPTYPE", Order = 5, TypeName = "VARCHAR2(40)")]
        public string? EQPTYPE { get; set; }
        [StringLength(40)]
        [Column("EQPID", Order = 6, TypeName = "VARCHAR2(40)")]
        public string? EQPID { get; set; }
        [StringLength(40)]
        [Column("PMNAME", Order = 7, TypeName = "VARCHAR2(40)")]
        public string? PMNAME { get; set; }
        [Column("QHOUR", Order = 8, TypeName = "INTEGER")]
        public int? QHOUR { get; set; }
        [StringLength(2)]
        [Column("TYPE", Order = 9, TypeName = "VARCHAR2(2)")]
        public string? TYPE { get; set; }
        [Column("SWEAK", Order = 10, TypeName = "INTEGER")]
        public int? SWEAK { get; set; }
        [Column("TWEAK", Order = 11, TypeName = "INTEGER")]
        public int? TWEAK { get; set; }
        [StringLength(1)]
        [Column("W1", Order = 12, TypeName = "VARCHAR2(1)")]
        public string? W1 { get; set; }
        [StringLength(1)]
        [Column("W2", Order = 13, TypeName = "VARCHAR2(1)")]
        public string? W2 { get; set; }
        [StringLength(1)]
        [Column("W3", Order = 14, TypeName = "VARCHAR2(1)")]
        public string? W3 { get; set; }
        [StringLength(1)]
        [Column("W4", Order = 15, TypeName = "VARCHAR2(1)")]
        public string? W4 { get; set; }
        [StringLength(1)]
        [Column("W5", Order = 16, TypeName = "VARCHAR2(1)")]
        public string? W5 { get; set; }
        [StringLength(1)]
        [Column("W6", Order = 17, TypeName = "VARCHAR2(1)")]
        public string? W6 { get; set; }
        [StringLength(1)]
        [Column("W7", Order = 18, TypeName = "VARCHAR2(1)")]
        public string? W7 { get; set; }
        [Column("M1", Order = 19, TypeName = "INTEGER")]
        public int? M1 { get; set; }
        [Column("M2", Order = 20, TypeName = "INTEGER")]
        public int? M2 { get; set; }
        [Column("M3", Order = 21, TypeName = "INTEGER")]
        public int? M3 { get; set; }
        [StringLength(20)]
        [Column("PMSTATUS", Order = 22, TypeName = "VARCHAR2(20)")]
        public string? PMSTATUS { get; set; }
        [StringLength(18)]
        [Column("LASTCOMPLETEDATE", Order = 23, TypeName = "VARCHAR2(18)")]
        public string? LASTCOMPLETEDATE { get; set; }
        [StringLength(18)]
        [Column("PLANDATE", Order = 24, TypeName = "VARCHAR2(18)")]
        public string? PLANDATE { get; set; }
        [StringLength(2)]
        [Column("FORCETRACKIN", Order = 25, TypeName = "VARCHAR2(2)")]
        public string? FORCETRACKIN { get; set; }
        [StringLength(2)]
        [Column("HASF", Order = 26, TypeName = "VARCHAR2(2)")]
        public string? HASF { get; set; }
        [StringLength(2)]
        [Column("CHOUR", Order = 27, TypeName = "VARCHAR2(2)")]
        public string? CHOUR { get; set; }
        [Column("CYCLE", Order = 28, TypeName = "INTEGER")]
        public int? CYCLE { get; set; }
        [StringLength(18)]
        [Column("CYCLESTARTDATE", Order = 29, TypeName = "VARCHAR2(18)")]
        public string? CYCLESTARTDATE { get; set; }
        [StringLength(255)]
        [Column("COMMENTS", Order = 30, TypeName = "VARCHAR2(255)")]
        public string? COMMENTS { get; set; }
    }

}
