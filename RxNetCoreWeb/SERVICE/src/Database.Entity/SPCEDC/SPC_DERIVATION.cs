using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;

namespace SPCService.DbModel
{
    [Table("SPC_DERIVATION")]
    public class SPC_DERIVATION
    {
        [Key]
        [Required]
        [StringLength(45)]
        [Column("SYSID", Order = 0, TypeName = "VARCHAR2(45)")]
        public string SYSID { get; set; }
        [Required]
        [StringLength(40)]
        [Column("EDCOPERATOR", Order = 1, TypeName = "VARCHAR2(40)")]
        public string EDCOPERATOR { get; set; }
        [Required]
        [StringLength(40)]
        [Column("OPERAND1", Order = 2, TypeName = "VARCHAR2(40)")]
        public string OPERAND1 { get; set; }
        [StringLength(40)]
        [Column("OPERAND2", Order = 3, TypeName = "VARCHAR2(40)")]
        public string OPERAND2 { get; set; }
        [Required]
        [StringLength(40)]
        [Column("DATAHANDLINGTYPE", Order = 4, TypeName = "VARCHAR2(40)")]
        public string DATAHANDLINGTYPE { get; set; }
        [StringLength(40)]
        [Column("DATA1", Order = 5, TypeName = "VARCHAR2(40)")]
        public string DATA1 { get; set; }
        [StringLength(40)]
        [Column("DATA2", Order = 6, TypeName = "VARCHAR2(40)")]
        public string DATA2 { get; set; }
        [StringLength(40)]
        [Column("LIMITSELECTION", Order = 7, TypeName = "VARCHAR2(40)")]
        public string LIMITSELECTION { get; set; }
        [StringLength(255)]
        [Column("UPPERLIMIT", Order = 8, TypeName = "VARCHAR2(255)")]
        public string UPPERLIMIT { get; set; }
        [StringLength(255)]
        [Column("LOWERLIMIT", Order = 9, TypeName = "VARCHAR2(255)")]
        public string LOWERLIMIT { get; set; }
        [Required]
        [StringLength(1)]
        [Column("STOREINDATABASE", Order = 10, TypeName = "CHAR(1)")]
        public string STOREINDATABASE { get; set; }
    }

}
