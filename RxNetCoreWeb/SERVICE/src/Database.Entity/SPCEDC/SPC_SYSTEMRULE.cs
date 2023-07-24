using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;

namespace SPCService.DbModel
{
    [Table("SPC_SYSTEMRULE")]
    public class SPC_SYSTEMRULE
    {
         
        [Key]
        [Required]
        [StringLength(45)]
        [Column("SYSID", Order = 0, TypeName = "VARCHAR2(45)")]
        public string SYSID { get; set; }
        [Required]
        [StringLength(20)]
        [Column("NAME", Order = 1, TypeName = "VARCHAR2(20)")]
        public string NAME { get; set; }
        [StringLength(200)]
        [Column("DESCRIPTION", Order = 2, TypeName = "VARCHAR2(200)")]
        public string DESCRIPTION { get; set; }
        [StringLength(500)]
        [Column("DETAILDESC_EN", Order = 3, TypeName = "VARCHAR2(500)")]
        public string DETAILDESC_EN { get; set; } 
        [StringLength(500)]
        [Column("DETAILDESC_ZH", Order = 4, TypeName = "VARCHAR2(500)")]
        public string DETAILDESC_ZH { get; set; }
        [Required]
        [Column("SEQ", Order = 5, TypeName = "INTEGER")]
        public int SEQ { get; set; }
       
    }

}
