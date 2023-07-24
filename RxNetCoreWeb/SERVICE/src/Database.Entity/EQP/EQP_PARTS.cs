using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SPCService.src.Database.Entity.EQP
{
    [Table("CUST_EQP_PARTS")]
    public class EQP_PARTS
    {
        [Key]
        [StringLength(20)]
        [Column("MOUDLE", Order = 1, TypeName = "VARCHAR2(20)")]
        public string? MOUDLE { get; set; }
        [StringLength(30)]
        [Column("PARTNO", Order = 2, TypeName = "VARCHAR2(30)")]
        public string? PARTNO { get; set; }
        [StringLength(100)]
        [Column("PARTNAME", Order = 3, TypeName = "VARCHAR2(100)")]
        public string? PARTNAME { get; set; }
        [StringLength(6)]
        [Column("LIFE", Order = 4, TypeName = "VARCHAR2(6)")]
        public string? LIFE { get; set; }
        [StringLength(30)]
        [Column("DEPT_INDEX", Order = 5, TypeName = "VARCHAR2(30)")]
        public string? DEPT_INDEX { get; set; }
        [StringLength(30)]
        [Column("MATERIAL_STATUS_INDEX", Order = 6, TypeName = "VARCHAR2(30)")]
        public string? MATERIAL_STATUS_INDEX { get; set; }
        [StringLength(30)]
        [Column("STATUS", Order = 7, TypeName = "VARCHAR2(30)")]
        public string? STATUS { get; set; }
        [StringLength(30)]
        [Column("PARTNUMBER", Order = 8, TypeName = "VARCHAR2(30)")]
        public string? PARTNUMBER { get; set; }
        [StringLength(30)]
        [Column("PARTSERIES", Order = 9, TypeName = "VARCHAR2(30)")]
        public string? PARTSERIES { get; set; }
        [StringLength(30)]
        [Column("OPERATOR", Order = 10, TypeName = "VARCHAR2(30)")]
        public string? OPERATOR { get; set; }
    }
}
