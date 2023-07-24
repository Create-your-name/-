using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;

namespace SPCService.DbModel
{
    [Table("SPC_PLANVERSION")]
    public class SPC_PLANVERSION
    {
        [Key]
        [Required]
        [StringLength(45)]
        [Column("SYSID", Order = 0, TypeName = "VARCHAR2(45)")]
        public string SYSID { get; set; }
        [Required]
        [Column("ID", Order = 1, TypeName = "INTEGER")]
        public int ID { get; set; }
        [StringLength(255)]
        [Column("DESCRIPTION", Order = 2, TypeName = "VARCHAR2(255)")]
        public string DESCRIPTION { get; set; }
        [StringLength(40)]
        [Column("OWNER", Order = 3, TypeName = "VARCHAR2(40)")]
        public string OWNER { get; set; }
        [StringLength(10)]
        [Column("REVISION", Order = 4, TypeName = "VARCHAR2(10)")]
        public string REVISION { get; set; }
        [StringLength(40)]
        [Column("REVSTATE", Order = 5, TypeName = "VARCHAR2(40)")]
        public string REVSTATE { get; set; }
        [Required]
        [StringLength(40)]
        [Column("NAME", Order = 6, TypeName = "VARCHAR2(40)")]
        public string NAME { get; set; }
        [StringLength(18)]
        [Column("MODIFIEDDATETIME", Order = 7, TypeName = "CHAR(18)")]
        public string MODIFIEDDATETIME { get; set; }
    }

}
