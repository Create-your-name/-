using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;

namespace SPCService.DbModel
{
    [Table("SPC_MEASUREMENTSPEC_PN2M")]
    public class SPC_MEASUREMENTSPEC_PN2M
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
        [Column("SEQUENCE", Order = 2, TypeName = "NUMBER(22)")]
        public System.Decimal SEQUENCE { get; set; }
        [Required]
        [StringLength(4)]
        [Column("VALTYPE", Order = 3, TypeName = "CHAR(4)")]
        public string VALTYPE { get; set; }
        [StringLength(255)]
        [Column("VALDATA", Order = 4, TypeName = "VARCHAR2(255)")]
        public string VALDATA { get; set; }
        [StringLength(4)]
        [Column("KEYTYPE", Order = 5, TypeName = "CHAR(4)")]
        public string KEYTYPE { get; set; }
        [StringLength(255)]
        [Column("KEYDATA", Order = 6, TypeName = "VARCHAR2(255)")]
        public string KEYDATA { get; set; }
    }

}
