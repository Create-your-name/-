using System;
using System.ComponentModel.DataAnnotations;

namespace SPCService.Database.Entity
{
    public class SysPost
    {
        [Key]
        public string POST_ID { get; set; }
        public string POST_CODE { get; set; }
        public string POST_NAME { get; set; }
        public string POST_SORT { get; set; }
        public string STATUS { get; set; }
        public string CREATE_TIME { get; set; }
        public string CREATE_BY { get; set; }
        public string UPDATE_TIME { get; set; }
        public string UPDATE_BY { get; set; }
        public string REMARK { get; set; }
    }


    public class Dept
    {
        [Key]
        public int DEPT_ID { get; set; }
        public int PARENT_ID { get; set; }
        public string ANCESTORS { get; set; }
        public string DEPT_NAME { get; set; }
        public int ORDER_NUM { get; set; }
        public string LEADER { get; set; }
        public string PHONE { get; set; }
        public string EMAIL { get; set; }
        public string STATUS { get; set; }
        public string DEL_FLAG { get; set; }
        public string CREATE_BY { get; set; }
        public DateTime? CREATE_TIME { get; set; }
        public string UPDATE_BY { get; set; }
        public DateTime? UPDATE_TIME { get; set; }

    }
}
