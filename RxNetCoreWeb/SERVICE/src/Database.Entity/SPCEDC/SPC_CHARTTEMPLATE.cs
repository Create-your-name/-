using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;

namespace SPCService.DbModel
{
    [Table("SPC_CHARTTEMPLATE")]
    public class SPC_CHARTTEMPLATE
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
        [StringLength(255)]
        [Column("DESCRIPTION", Order = 2, TypeName = "VARCHAR2(255)")]
        public string DESCRIPTION { get; set; }
        [Required]
        [StringLength(40)]
        [Column("SPCTEMPLATE", Order = 3, TypeName = "VARCHAR2(40)")]
        public string SPCTEMPLATE { get; set; }
        [Required]
        [Column("FWTIMESTAMP", Order = 4, TypeName = "INTEGER")]
        public int TIMESTAMP { get; set; }
    }

}
