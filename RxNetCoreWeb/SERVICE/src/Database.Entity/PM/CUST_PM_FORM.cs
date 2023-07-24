using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;

namespace SPCService.DbModel
{
    [Table("CUST_PM_FORM")]
    public class CUST_PM_FORM
    {
        [Key]
        [Required]
        [Column("SYSID", Order = 1, TypeName = "VARCHAR2(32)")]
        public string SYSID { get; set; }
        [StringLength(100)]
        [Column("FORMNAME", Order = 2, TypeName = "VARCHAR2(100)")]
        public string? FORMNAME { get; set; }
        [StringLength(20)]
        [Column("CREATEUSER", Order = 3, TypeName = "VARCHAR2(20)")]
        public string? CREATEUSER { get; set; }
        [StringLength(20)]
        [Column("MODIFYTIME", Order = 4, TypeName = "VARCHAR2(20)")]
        public string? MODIFYTIME { get; set; }
        [StringLength(40)]
        [Column("EQPTYPE", Order = 5, TypeName = "VARCHAR2(40)")]
        public string? EQPTYPE { get; set; }
    }

}
