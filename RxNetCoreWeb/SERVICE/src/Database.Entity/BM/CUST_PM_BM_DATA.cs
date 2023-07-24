using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;

namespace SPCService.DbModel
{
    [Table("CUST_PM_BM_DATA")]
    public class CUST_PM_BM_DATA
    {
        [Key]
        [Required]
        [Column("SYSID", Order = 1, TypeName = "VARCHAR2(32)")]
        public string SYSID { get; set; }
        [Column("PMID", Order = 2, TypeName = "VARCHAR2(32)")]
        public string PMID { get; set; }
        [StringLength(40)]
        [Column("PMNAME", Order = 3, TypeName = "VARCHAR2(40)")]
        public string? PMNAME { get; set; }
        [Column("PMFORMID", Order = 4, TypeName = "VARCHAR2(32)")]
        public string? PMFORMID { get; set; }
        [Column("BMFORMID", Order = 5, TypeName = "VARCHAR2(32)")]
        public string? BMFORMID { get; set; }
        [StringLength(100)]
        [Column("FORMNAME", Order = 6, TypeName = "VARCHAR2(100)")]
        public string? FORMNAME { get; set; }
        [StringLength(40)]
        [Column("EQPID", Order = 7, TypeName = "VARCHAR2(40)")]
        public string? EQPID { get; set; }
        [StringLength(40)]
        [Column("EQPTYPE", Order = 8, TypeName = "VARCHAR2(40)")]
        public string? EQPTYPE { get; set; }
        [StringLength(20)]
        [Column("CREATEUSER", Order = 9, TypeName = "VARCHAR2(20)")]
        public string? CREATEUSER { get; set; }
        [StringLength(20)]
        [Column("MODIFYTIME", Order = 10, TypeName = "VARCHAR2(20)")]
        public string? MODIFYTIME { get; set; }
        [StringLength(40)]
        [Column("BMTYPE", Order = 11, TypeName = "VARCHAR2(40)")]
        public string? BMTYPE { get; set; }
        [StringLength(40)]
        [Column("SELECTED_GROUPS", Order = 12, TypeName = "VARCHAR2(40)")]
        public string? SELECTED_GROUPS { get; set; }
    }

}
