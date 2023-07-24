using System;
using System.ComponentModel.DataAnnotations;

namespace SPCService.Database.Entity
{
    public class User
    {
        [Key]
        public int USER_ID { get; set; }
        public int DEPT_ID { get; set; }
        public string LOGIN_NAME { get; set; }
        public string USER_NAME { get; set; }
        public string PHONENUMBER { get; set; }
        public string USER_TYPE { get; set; }
        public string PASSWORD { get; set; }
        public string SALT { get; set; }
        public string STATUS { get; set; }
        public string DEL_FLAG { get; set; }
        public DateTime? CREATE_TIME { get; set; }
        public DateTime? UPDATE_TIME { get; set; }
        public string REMARK { get; set; }
        public string ROLE_KEY { get; set; }
    }
}
