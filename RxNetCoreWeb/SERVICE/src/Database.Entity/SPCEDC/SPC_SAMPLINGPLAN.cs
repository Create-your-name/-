using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;

namespace SPCService.DbModel
{
    [Table("SPC_SAMPLINGPLAN")]
    public class SPC_SAMPLINGPLAN
    {
        [Key]
        [Required]
        [StringLength(45)]
        [Column("SYSID", Order = 0, TypeName = "VARCHAR2(45)")]
        public string SYSID { get; set; }
        [Required]
        [StringLength(40)]
        [Column("COLLECTIONTYPE", Order = 1, TypeName = "VARCHAR2(40)")]
        public string COLLECTIONTYPE { get; set; }
        [StringLength(40)]
        [Column("PROMPT", Order = 2, TypeName = "VARCHAR2(40)")]
        public string PROMPT { get; set; }
        [StringLength(255)]
        [Column("OPERATORINSTRUCTIONS", Order = 3, TypeName = "VARCHAR2(255)")]
        public string OPERATORINSTRUCTIONS { get; set; }
        [Required]
        [Column("NUMBEROFUNITS", Order = 4, TypeName = "INTEGER")]
        public int NUMBEROFUNITS { get; set; }
        [Required]
        [Column("NUMBEROFSITES", Order = 5, TypeName = "INTEGER")]
        public int NUMBEROFSITES { get; set; }
        [Required]
        [Column("NUMBEROFSAMPLES", Order = 6, TypeName = "INTEGER")]
        public int NUMBEROFSAMPLES { get; set; }
    }

}
