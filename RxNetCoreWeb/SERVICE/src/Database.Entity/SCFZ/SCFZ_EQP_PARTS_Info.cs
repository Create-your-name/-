using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;

namespace SPCService.DbModel
{
    [Table("SCFZ_EQP_PARTS")]

    [PrimaryKey(nameof(PARTNO), nameof(MOUDLE) , nameof(PARTS_NAME))]
    public class SCFZ_EQP_PARTS
    {


        [Required]
        [StringLength(20)]
        [Column("MOUDLE", Order = 0, TypeName = "VARCHAR2(20)")]
        public string MOUDLE { get; set; }
        [Required]
        [StringLength(45)]
        [Column("EQPID", Order = 1, TypeName = "VARCHAR2(45)")]
        public string EQPID { get; set; }
        [Required]
        [StringLength(30)]
        [Column("TYPES", Order = 2, TypeName = "VARCHAR2(45)")]
        public string TYPES { get; set; }
        [StringLength(40)]
        [Column("LOCATION", Order = 3, TypeName = "VARCHAR2(40)")]
        public string LOCATION { get; set; }
        [Required]
        [StringLength(10)]
        [Column("PARTNO", Order = 4, TypeName = "VARCHAR2(20)")]
        public string PARTNO { get; set; }

        [StringLength(40)]
        [Column("LIFE", Order = 5, TypeName = "VARCHAR2(40)")]
        public string LIFE { get; set; }
        [StringLength(40)]
        [Column("DESCRIPTION", Order = 6, TypeName = "VARCHAR2(40)")]
        public string DESCRIPTION { get; set; }
        [StringLength(255)]
        [Column("DEPARTMENT", Order = 7, TypeName = "VARCHAR2(255)")]
        public string DEPARTMENT { get; set; }

        [Required]
        [StringLength(20)]
        [Column("STARTTIME", Order = 8, TypeName = "VARCHAR2(45)")]
        public  string STARTTIME { get; set; }
        [StringLength(30)]
        [Column("STATUS", Order = 9, TypeName = "VARCHAR2(20)")]
        public string? STATUS { get; set; }

        [StringLength(300)]
        [Column("PARTS_NAME", Order = 10, TypeName = "VARCHAR2(300)")]
        public string? PARTS_NAME { get; set; }

        [Column("ERROR_SPEC", Order = 10, TypeName = "INTEGER")]
        public string? ERROR_SPEC { get; set; }

        [Column("WARN_SPEC", Order = 11, TypeName = "INTEGER")]
        public string? WARN_SPEC { get; set; }

        [Column("DATA", Order = 12, TypeName = "INTEGER")]
        public string? DATA { get; set; }

    }

}
