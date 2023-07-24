using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;

namespace SPCService.DbModel
{
    [Table("CUST_BM_CHECKLIST_GROUP")]
    public class CUST_BM_CHECKLIST_GROUP
    {
        [Key]
        [Required]
        [Column("SYSID", Order = 1, TypeName = "VARCHAR2(32)")]
        public string SYSID { get; set; }
        [Required]
        [Column("BMFORMID", Order = 2, TypeName = "VARCHAR2(32)")]
        public string BMFORMID { get; set; }
        [Column("GROUPINDEX", Order = 3, TypeName = "INTEGER")]
        public int GROUPINDEX { get; set; }
        [StringLength(255)]
        [Column("GROUPNAME", Order = 4, TypeName = "VARCHAR2(255)")]
        public string? GROUPNAME { get; set; }
        [StringLength(500)]
        [Column("CHECKLIST", Order = 5, TypeName = "VARCHAR2(500)")]
        public string? CHECKLIST { get; set; }
        [StringLength(20)]
        [Column("CREATEUSER", Order = 6, TypeName = "VARCHAR2(20)")]
        public string? CREATEUSER { get; set; }
        [StringLength(20)]
        [Column("MODIFYTIME", Order = 7, TypeName = "VARCHAR2(20)")]
        public string? MODIFYTIME { get; set; }
    }

}
