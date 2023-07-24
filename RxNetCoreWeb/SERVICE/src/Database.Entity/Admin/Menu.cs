using System;
using System.ComponentModel.DataAnnotations;

namespace SPCService.Database.Entity
{
    public class Menu
    {
        [Key]
        public int MENU_ID { get; set; }
        public string MENU_NAME { get; set; }
        public int? PARENT_ID { get; set; }
        public int ORDER_NUM { get; set; }
        public string URL { get; set; }
        public string TARGET { get; set; }
        public string MENU_TYPE { get; set; }
        public string VISIBLE { get; set; }
        public string IS_REFRESH { get; set; }
        public string PERMS { get; set; }
        public string ICON { get; set; }
        public string CREATE_BY { get; set; }
        public DateTime? CREATE_TIME { get; set; }
        public string UPDATE_BY { get; set; }
        public DateTime? UPDATE_TIME { get; set; }
        public string REMARK { get; set; }

    }

    public class RoleMenu
    {
        [Key]
        public int ID { get; set; }
        public int MENU_ID { get; set; }
        public int ROLE_ID { get; set; }
    }
}
