using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;

namespace SPCService.DbModel
{
    [Table("CUST_BM_CHECKLIST")]
    public class CUST_BM_CHECKLIST
    {
        [Key]
        [Required]
        [Column("SYSID", Order = 1, TypeName = "VARCHAR2(32)")]
        public string SYSID { get; set; }
        [Required]
        [Column("BMFORMID", Order = 2, TypeName = "VARCHAR2(32)")]
        public string BMFORMID { get; set; }
        [Column("CHKINDEX", Order = 3, TypeName = "INTEGER")]
        public int CHKINDEX { get; set; }
        [StringLength(255)]
        [Column("ITEMNAME", Order = 4, TypeName = "VARCHAR2(255)")]
        public string? ITEMNAME { get; set; }
        [StringLength(10)]
        [Column("ITEMTYPE", Order = 5, TypeName = "VARCHAR2(10)")]
        public string? ITEMTYPE { get; set; }
        [StringLength(255)]
        [Column("ITEMVALUE", Order = 6, TypeName = "VARCHAR2(255)")]
        public string? ITEMVALUE { get; set; }
        [StringLength(20)]
        [Column("CREATEUSER", Order = 7, TypeName = "VARCHAR2(20)")]
        public string? CREATEUSER { get; set; }
        [StringLength(20)]
        [Column("MODIFYTIME", Order = 8, TypeName = "VARCHAR2(20)")]
        public string? MODIFYTIME { get; set; }

        public DateTime STARTIME { get; set; }
        [StringLength(30)]
        [Column("STATUS", Order = 8, TypeName = "VARCHAR2(20)")]
        public string? STATUS { get; set; }
    }

}
