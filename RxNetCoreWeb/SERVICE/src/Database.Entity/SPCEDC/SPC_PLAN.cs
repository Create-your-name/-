using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;

namespace SPCService.DbModel
{
    [Table("SPC_PLAN")]
    public class SPC_PLAN
    {
        [Key]
        [Required]
        [StringLength(45)]
        [Column("SYSID", Order = 0, TypeName = "VARCHAR2(45)")]
        public string SYSID { get; set; }
        [Required]
        [Column("ACTIVEVERSION", Order = 1, TypeName = "INTEGER")]
        public int ACTIVEVERSION { get; set; }
        [Required]
        [Column("NEXTVERSION", Order = 2, TypeName = "INTEGER")]
        public int NEXTVERSION { get; set; }
        [Required]
        [StringLength(40)]
        [Column("NAME", Order = 3, TypeName = "VARCHAR2(40)")]
        public string NAME { get; set; }
        [Required]
        [Column("FWTIMESTAMP", Order = 4, TypeName = "INTEGER")]
        public int  TIMESTAMP { get; set; }
    }

}
