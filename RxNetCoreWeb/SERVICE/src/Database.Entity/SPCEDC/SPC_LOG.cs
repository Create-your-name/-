using Arch;
using Protocol;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema; 

namespace SPCService.DbModel
{
    [Table("SPC_LOG")]
    public class SPC_LOG
    {
        [Key]
        [Required]
        [StringLength(45)]
        [Column("SYSID", Order = 0, TypeName = "VARCHAR2(45)")]
        public string SYSID { get; set; }
        [StringLength(40)]
        [Column("USERNAME", Order = 1, TypeName = "VARCHAR2(40)")]
        public string UserName { get; set; }
        [StringLength(20)]
        [Column("OPTYPE", Order = 2, TypeName = "VARCHAR2(20)")]
        public string OPType { get; set; }
        [StringLength(18)]
        [Column("OPTIME", Order = 3, TypeName = "VARCHAR2(18)")]
        public string OPTime { get; set; }

        [Required]
        [Column("OLDVALUE", Order = 4, TypeName = "CLOB")]
        public string OLDVALUE { get; set; }
        [Required]
        [Column("NEWVALUE", Order = 5, TypeName = "CLOB")]
        public string NEWVALUE { get; set; }
        [StringLength(40)]
        [Column("OBJECTNAME", Order = 6, TypeName = "VARCHAR2(40)")]
        public string ObjectName { get; set; }
        [Column("CLIENTINFO", Order = 7, TypeName = "CLOB")]
        public string ClientInfo { get; set; }


        public SPC_LOG(Arch.ClientInfo client, EnumOpType opType)
        {
            if (client != null)
            {
                UserName = client.UserName;
                ClientInfo = JsonUtil.Serialize(client);
            }
            OPTime = TimeUtil.GetDateString();
            OPType = opType.ToString();

        }
        public SPC_LOG()
        {
        }
    }

}
