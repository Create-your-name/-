using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;

namespace SPCService.DbModel
{
    [Table("SPC_PLANVERSION_N2M")]
    public class SPC_PLANVERSION_N2M
    {
        [Required]
        [StringLength(45)]
        [Column("FROMID", Order = 0, TypeName = "VARCHAR2(45)")]
        public string FROMID { get; set; }
        [Required]
        [StringLength(20)]
        [Column("LINKNAME", Order = 1, TypeName = "VARCHAR2(20)")]
        public string LINKNAME { get; set; }
        [Required]
        [Column("SEQUENCE", Order = 2, TypeName = "INTEGER")]
        public int SEQUENCE { get; set; }
        [Required]
        [StringLength(45)]
        [Column("TOID", Order = 3, TypeName = "VARCHAR2(45)")]
        public string TOID { get; set; }
        [StringLength(4)]
        [Column("KEYTYPE", Order = 4, TypeName = "CHAR(4)")]
        public string KEYTYPE { get; set; }
        [StringLength(255)]
        [Column("KEYDATA", Order = 5, TypeName = "VARCHAR2(255)")]
        public string KEYDATA { get; set; }
    }

}
