using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;

namespace SPCService.DbModel
{
    [Table("CUST_PM_LIST_LOG")]
    public class PM_LIST_LOG
    {
        [Key]
        [Required]
        [Column("SYSID", Order = 1, TypeName = "VARCHAR2(32)")]
        public string SYSID { get; set; }
        [Required]
        [Column("PMFORMID", Order = 2, TypeName = "VARCHAR2(32)")]
        public string PMFORMID { get; set; }
        [StringLength(20)]
        [Column("MOUDLE", Order = 3, TypeName = "VARCHAR2(20)")]
        public string? MOUDLE { get; set; }
        [StringLength(40)]
        [Column("EQPTYPE", Order = 4, TypeName = "VARCHAR2(40)")]
        public string? EQPTYPE { get; set; }
        [StringLength(40)]
        [Column("PMNAME", Order = 5, TypeName = "VARCHAR2(40)")]
        public string? PMNAME { get; set; }
        [Column("QHOUR", Order = 6, TypeName = "INTEGER")]
        public int? QHOUR { get; set; }
        [StringLength(2)]
        [Column("TYPE", Order = 7, TypeName = "VARCHAR2(2)")]
        public string? TYPE { get; set; }
        [Column("SWEAK", Order = 8, TypeName = "INTEGER")]
        public int? SWEAK { get; set; }
        [Column("TWEAK", Order = 9, TypeName = "INTEGER")]
        public int? TWEAK { get; set; }
        [StringLength(1)]
        [Column("W1", Order = 10, TypeName = "VARCHAR2(1)")]
        public string? W1 { get; set; }
        [StringLength(1)]
        [Column("W2", Order = 11, TypeName = "VARCHAR2(1)")]
        public string? W2 { get; set; }
        [StringLength(1)]
        [Column("W3", Order = 12, TypeName = "VARCHAR2(1)")]
        public string? W3 { get; set; }
        [StringLength(1)]
        [Column("W4", Order = 13, TypeName = "VARCHAR2(1)")]
        public string? W4 { get; set; }
        [StringLength(1)]
        [Column("W5", Order = 14, TypeName = "VARCHAR2(1)")]
        public string? W5 { get; set; }
        [StringLength(1)]
        [Column("W6", Order = 15, TypeName = "VARCHAR2(1)")]
        public string? W6 { get; set; }
        [StringLength(1)]
        [Column("W7", Order = 16, TypeName = "VARCHAR2(1)")]
        public string? W7 { get; set; }
        [Column("M1", Order = 17, TypeName = "INTEGER")]
        public int? M1 { get; set; }
        [Column("M2", Order = 18, TypeName = "INTEGER")]
        public int? M2 { get; set; }
        [Column("M3", Order = 19, TypeName = "INTEGER")]
        public int? M3 { get; set; }
        [StringLength(20)]
        [Column("PMSTATUS", Order = 20, TypeName = "VARCHAR2(20)")]
        public string? PMSTATUS { get; set; }
        [StringLength(18)]
        [Column("LASTCOMPLETEDATE", Order = 21, TypeName = "VARCHAR2(18)")]
        public string? LASTCOMPLETEDATE { get; set; }
        [StringLength(18)]
        [Column("PLANDATE", Order = 22, TypeName = "VARCHAR2(18)")]
        public string? PLANDATE { get; set; }
        [StringLength(2)]
        [Column("FORCETRACKIN", Order = 23, TypeName = "VARCHAR2(2)")]
        public string? FORCETRACKIN { get; set; }
        [StringLength(2)]
        [Column("HASF", Order = 24, TypeName = "VARCHAR2(2)")]
        public string? HASF { get; set; }
        [StringLength(2)]
        [Column("CHOUR", Order = 25, TypeName = "VARCHAR2(2)")]
        public string? CHOUR { get; set; }
        [Column("CYCLE", Order = 26, TypeName = "INTEGER")]
        public int? CYCLE { get; set; }
        [StringLength(18)]
        [Column("CYCLESTARTDATE", Order = 27, TypeName = "VARCHAR2(18)")]
        public string? CYCLESTARTDATE { get; set; }
        [StringLength(255)]
        [Column("COMMENTS", Order = 28, TypeName = "VARCHAR2(255)")]
        public string? COMMENTS { get; set; }
        [Column("LOGDATE", Order = 29, TypeName = "DATE")]
        public DateTime LOGDATE { get; set; }
        [StringLength(18)]
        [Column("OPTYPE", Order = 30, TypeName = "VARCHAR2(10)")]
        public string? OPTYPE { get; set; }
        [StringLength(255)]
        [Column("USERID", Order = 31, TypeName = "VARCHAR2(10)")]
        public string? USERID { get; set; }
    }

}
