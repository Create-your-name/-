using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;

namespace SPCService.DbModel;

[Table("SPC_CATAGORY")]
public class SPC_CATAGORY
{
    [Key]
    [Required]
    [StringLength(45)]
    [Column("SYSID", Order = 0, TypeName = "VARCHAR2(45)")]
    public string SYSID { get; set; }
    [Required]
    [Column("NAME", Order = 1, TypeName = "VARCHAR2(255)")]
    public string NAME { get; set; }
    [Required]
    [Column("CLEVEL", Order = 2, TypeName = "INTEGER")]
    public int CLEVEL { get; set; }
    [Column("PARENT", Order = 3, TypeName = "VARCHAR2(45)")]
    public string PARENT { get; set; }
}
