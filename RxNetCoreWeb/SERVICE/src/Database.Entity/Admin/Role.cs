using System;
using System.ComponentModel.DataAnnotations;

namespace SPCService.Database.Entity
{
    public class Role
    {
        [Key]
        public int ROLE_ID { get; set; }
        public string ROLE_NAME { get; set; }
        public string ROLE_KEY { get; set; }
        public int ROLE_SORT { get; set; }
        public string DATA_SCOPE { get; set; }
        public string STATUS { get; set; }
        public string DEL_FLAG { get; set; }
        public string CREATE_BY { get; set; }
        public DateTime? CREATE_TIME { get; set; }
        public string UPDATE_BY { get; set; }
        public DateTime? UPDATE_TIME { get; set; }
        public string REMARK { get; set; }
    }
}
