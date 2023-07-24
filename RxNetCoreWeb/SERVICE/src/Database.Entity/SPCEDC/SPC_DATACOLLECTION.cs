using System;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;

namespace SPCService.DbModel
{
    [Table("SPC_DATACOLLECTION")]
    public class SPC_DATACOLLECTION
    {
        [Key]
        [Required]
        [StringLength(45)]
        [Column("SYSID", Order = 0, TypeName = "VARCHAR2(45)")]
        public string SYSID { get; set; }
        [Required]
        [StringLength(40)]
        [Column("EDCPLAN", Order = 1, TypeName = "VARCHAR2(40)")]
        public string EDCPLAN { get; set; }
        [StringLength(40)]
        [Column("PRODUCT", Order = 2, TypeName = "VARCHAR2(40)")]
        public string PRODUCT { get; set; }
        [StringLength(51)]
        [Column("PLAN", Order = 3, TypeName = "VARCHAR2(51)")]
        public string PLAN { get; set; }
        [StringLength(40)]
        [Column("INITIALSTEP", Order = 4, TypeName = "VARCHAR2(40)")]
        public string INITIALSTEP { get; set; }
        [StringLength(40)]
        [Column("LOT", Order = 5, TypeName = "VARCHAR2(40)")]
        public string LOT { get; set; }
        [StringLength(40)]
        [Column("BATCH", Order = 6, TypeName = "VARCHAR2(40)")]
        public string BATCH { get; set; }
        [StringLength(40)]
        [Column("STAGE", Order = 7, TypeName = "VARCHAR2(40)")]
        public string STAGE { get; set; }
        [StringLength(40)]
        [Column("AREA", Order = 8, TypeName = "VARCHAR2(40)")]
        public string AREA { get; set; }
        [StringLength(40)]
        [Column("TAG1", Order = 9, TypeName = "VARCHAR2(40)")]
        public string TAG1 { get; set; }
        [StringLength(40)]
        [Column("TAG2", Order = 10, TypeName = "VARCHAR2(40)")]
        public string TAG2 { get; set; }
        [StringLength(255)]
        [Column("GROUPHISTKEY", Order = 11, TypeName = "VARCHAR2(255)")]
        public string GROUPHISTKEY { get; set; }
        [StringLength(1)]
        [Column("DONE", Order = 12, TypeName = "CHAR(1)")]
        public string DONE { get; set; }
        [StringLength(18)]
        [Column("MODIFIEDDATETIME", Order = 13, TypeName = "CHAR(18)")]
        public string MODIFIEDDATETIME { get; set; }
        [Required]
        [Column("FWTIMESTAMP", Order = 14, TypeName = "INTEGER")]
        public int TIMESTAMP { get; set; }
    }

}
