using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;

namespace SPCService.DbModel
{
    [Table("FWEQPEQUIPMENTVERSION")]
    public class EQUIPMENT_VERSION
    {
        [Key]
        [Required]
        [Column("SYSID", Order = 1, TypeName = "INTEGER")]
        public int SYSID { get; set; }
        [StringLength(20)]
        [Column("NAME", Order = 2, TypeName = "VARCHAR2(40)")]
        public string? NAME { get; set; }
    }

}
