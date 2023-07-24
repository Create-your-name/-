using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;

namespace SPCService.DbModel
{
    [Table("SPC_ANNOTATION")]
    public class SPC_ANNOTATION
    {
        [Key]
        [Required]
        [StringLength(45)]
        [Column("SYSID", Order = 0, TypeName = "VARCHAR2(45)")]
        public string SYSID { get; set; }
        [Required]
        [StringLength(45)]
        [Column("HISTORYSYSID", Order = 1, TypeName = "VARCHAR2(45)")]
        public string HISTORYSYSID { get; set; }
        [Required]
        [StringLength(40)]
        [Column("ANNOTATIONCODE", Order = 2, TypeName = "VARCHAR2(40)")]
        public string ANNOTATIONCODE { get; set; }
        [StringLength(40)]
        [Column("REASONCODE", Order = 3, TypeName = "VARCHAR2(40)")]
        public string REASONCODE { get; set; }
        [StringLength(255)]
        [Column("BRIEFDESCRIPTION", Order = 4, TypeName = "VARCHAR2(255)")]
        public string BRIEFDESCRIPTION { get; set; }
        [StringLength(255)]
        [Column("DETAILDESCRIPTION", Order = 5, TypeName = "VARCHAR2(255)")]
        public string DETAILDESCRIPTION { get; set; }
        [StringLength(40)]
        [Column("USERNAME", Order = 6, TypeName = "VARCHAR2(40)")]
        public string USERNAME { get; set; }
        [Required]
        [StringLength(18)]
        [Column("DATETIME", Order = 7, TypeName = "CHAR(18)")]
        public string DATETIME { get; set; }
    }

}
