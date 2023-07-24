using Arch;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Protocol;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using SPCService.Database;
using SPCService.Database.Entity;
using SPCService.src.DeptService;

namespace SPCService.src.Controllers
{
    [Route("api/dept")]
    [ApiController]
    public class DeptController : ControllerExt
    {
        private AdminContext dbContext;
        public DeptController(AdminContext dbContext)
        {
            this.dbContext = dbContext;
        }
        [HttpPost("create")]
        public APIResponse CreateDept()
        {
            var json = GetBodyJson<DeptCreateReq>();
            if (SystemDeptService.CreateDept(dbContext, json))
            {
                return OK();
            }
            else
            {
                return ErrorCode.PermissionDenied;
            }
        }

        [HttpPost("delete")]
        public APIResponse DeleteDept()
        {
            var json = GetBodyJson<DeptDeleteReq>();
            if (SystemDeptService.DeleteDept(dbContext, json))
            {
                return OK();
            }
            else
            {
                return ErrorCode.PermissionDenied;
            }
        }

        [HttpPost("update")]
        public APIResponse UpdateDept()
        {
            var json = GetBodyJson<DeptUpdateReq>();
            if (SystemDeptService.UpdateDept(dbContext, json))
            {
                return OK();
            }
            else
            {
                return ErrorCode.PermissionDenied;
            }
        }

        [HttpPost("selectalldept")]
        public APIResponse SelectAllDepts()
        {
            var json = GetBodyJson<DeptSelectReq>();
            var allDepts= SystemDeptService.SelectAllDepts(dbContext, json).Select(u => new DeptInfoPb
            {
                DEPT_NAME = u.DEPT_NAME,
                ORDER_NUM = u.ORDER_NUM.ToString(),
                STATUS = u.STATUS,
                CREATE_TIME = u.CREATE_TIME.ToString(),
                DEPT_ID = u.DEPT_ID.ToString()
            });
           
            return OK(allDepts);
        }

        [HttpPost("selectdeptbyid")]
        public APIResponse SelectDeptByID()
        {
            var json = GetBodyJson<SelectDeptByIDReq>();
            Dept dept = SystemDeptService.SelectDeptByID(dbContext, json);
            if(dept!=null)
            {
                return OK(new SelectDeptByIDResp
                {
                    PARENT_ID = dept.DEPT_ID.ToString(),
                    DEPT_NAME = dept.DEPT_NAME,
                    ORDER_NUM = dept.ORDER_NUM.ToString(),
                    LEADER = dept.LEADER,
                    PHONE=dept.PHONE,
                    EMAIL=dept.EMAIL,
                    STATUS=dept.STATUS
                });
            }
            else
            {
                return ErrorCode.PermissionDenied;
            }

        }

        [HttpPost("choosedept")]
        public APIResponse ChooseDept()
        {
            var all = SystemDeptService.ChooseDept(dbContext).Select(u => new ChooseDeptResp
            {
                DEPT_ID = u.DEPT_ID.ToString(),
                DEPT_NAME = u.DEPT_NAME,
                ANCESTORS = u.ANCESTORS,
                PARENT_ID = u.PARENT_ID.ToString()
            });
            return OK(all);
        }

        [HttpGet("depttreeselect")]
        public APIResponse GetDeptTreeSelect() 
        {
            var all = SystemDeptService.ChooseDept(dbContext).Select(u => new ChooseDeptResp
            {
                DEPT_ID = u.DEPT_ID.ToString(),
                DEPT_NAME = u.DEPT_NAME,
                ANCESTORS = u.ANCESTORS,
                PARENT_ID = u.PARENT_ID.ToString()
            }).ToList();
            List<TreeSelect> target = GetTreeSelect(all);
            return OK(target);
        }

        private List<TreeSelect> GetTreeSelect(List<ChooseDeptResp> list,string parent_id = "0") 
        {
            var entity = list.Where(u => u.PARENT_ID == parent_id).ToList();
            List<TreeSelect> l = new List<TreeSelect>();
            foreach (var item in entity) 
            {
                TreeSelect e = new TreeSelect();
                e.title = item.DEPT_NAME;
                e.value = item.DEPT_ID;
                e.children = GetTreeSelect(list, item.DEPT_ID);
                l.Add(e);
            }
            return l;
        }
    }

    public class TreeSelect 
    {
        public string title { get; set; }

        public string value { get; set; }

        public List<TreeSelect> children { get; set; }
    }
}
