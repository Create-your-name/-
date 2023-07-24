using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;

namespace SPCService.DbModel
{
    [Table("CUST_EQP_EDC_PLAN")]
    public class CUST_EQP_EDC_PLAN
    {
        [Key]
        [Required]
        [StringLength(45)]
        [Column("EQUIPMENTTYPE", Order = 1, TypeName = "VARCHAR2(45)")]
        public string EQUIPMENTTYPE { get; set; }
        [Required]
        [StringLength(45)]
        [Column("EQUIPMENTID", Order = 2, TypeName = "VARCHAR2(45)")]
        public string EQUIPMENTID { get; set; }
        [Required]
        [StringLength(45)]
        [Column("EDCPLANID", Order = 3, TypeName = "VARCHAR2(45)")]
        public string EDCPLANID { get; set; }
        [StringLength(1)]
        [Column("SPCHOLD", Order = 4, TypeName = "VARCHAR2(1)")]
        public string? SPCHOLD { get; set; }
        [StringLength(20)]
        [Column("LASTCOLLECTDATE", Order = 5, TypeName = "VARCHAR2(20)")]
        public string? LASTCOLLECTDATE { get; set; }
        [StringLength(4000)]
        [Column("PMITEM", Order = 6, TypeName = "VARCHAR2(4000)")]
        public string? PMITEM { get; set; }
    }

}
