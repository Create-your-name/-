using Protocol;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using SPCService.Database;
using SPCService.Database.Entity;

namespace SPCService.src.DeptService
{
    public class SystemDeptService
    {
        public static bool CreateDept(AdminContext db, DeptCreateReq createData)
        {
            try
            {
                Dept dept = new Dept
                {
                    DEPT_NAME = createData.DEPT_NAME,
                    PARENT_ID=int.Parse(createData.PARENT_ID),
                    ANCESTORS=db.SYS_DEPT.Where(u=>u.DEPT_ID==int.Parse(createData.PARENT_ID)).Select(u=>u.ANCESTORS)+","+createData.PARENT_ID,
                    ORDER_NUM=int.Parse(createData.ORDER_NUM),
                    LEADER=createData.LEADER,
                    PHONE=createData.PHONE,
                    EMAIL=createData.EMAIL,
                    STATUS=createData.STATUS,
                    DEL_FLAG="0",
                    CREATE_BY=createData.LOGIN_NAME,
                    CREATE_TIME=DateTime.Now,
                    UPDATE_BY=null,
                    UPDATE_TIME=null
                };
                db.SYS_DEPT.Add(dept);
                db.SaveChanges();
                return true;
            }
            catch(Exception ex)
            {
                return false;
            }
        }

        public static bool DeleteDept(AdminContext db, DeptDeleteReq deleteData)
        {
            try
            {
                Dept dept =  db.SYS_DEPT.Where(u => u.DEPT_ID == int.Parse(deleteData.DEPT_ID)).FirstOrDefault();
                dept.DEL_FLAG = "1";
                db.SaveChanges();
                return true;
            }
            catch(Exception )
            {
                return false;
            }
        }

        public static bool UpdateDept(AdminContext db,DeptUpdateReq updateData)
        {
            try
            {
                Dept dept = db.SYS_DEPT.Where(u => u.DEPT_ID == int.Parse(updateData.DEPT_ID)).FirstOrDefault();
                if(!string.IsNullOrEmpty(updateData.DEPT_NAME))
                {
                    dept.DEPT_NAME = updateData.DEPT_NAME;
                }
                if(!string.IsNullOrEmpty(updateData.EMAIL))
                {
                    dept.EMAIL = updateData.EMAIL;
                }
                if(!string.IsNullOrEmpty(updateData.LEADER))
                {
                    dept.LEADER = updateData.LEADER;
                }
                if(!string.IsNullOrEmpty(updateData.ORDER_NUM))
                {
                    dept.ORDER_NUM = int.Parse(updateData.ORDER_NUM);
                }
                if(!string.IsNullOrEmpty(updateData.PARENT_ID))
                {
                    dept.PARENT_ID = int.Parse(updateData.PARENT_ID);
                }
                if(!string.IsNullOrEmpty(updateData.PHONE))
                {
                    dept.PHONE = updateData.PHONE;
                }
                if(!string.IsNullOrEmpty(updateData.STATUS))
                {
                    dept.STATUS = updateData.STATUS;
                }
                dept.UPDATE_BY = updateData.LOGIN_NAME;
                dept.UPDATE_TIME = DateTime.Now;
                dept.ANCESTORS = db.SYS_DEPT.Where(u => u.DEPT_ID == int.Parse(updateData.PARENT_ID)).Select(u => u.ANCESTORS) + "," + updateData.PARENT_ID;
                db.SaveChanges();
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }

        public static List<Dept> SelectAllDepts(AdminContext db,DeptSelectReq selectData)
        {
            try
            {
                List<Dept> depts = db.SYS_DEPT.Where(u=>u.DEL_FLAG=="0").ToList();
                if (!string.IsNullOrEmpty(selectData.DEPT_NAME))
                {
                    depts = depts.Where(u => u.DEPT_NAME.Contains(selectData.DEPT_NAME)).ToList();
                }
                if (!string.IsNullOrEmpty(selectData.STATUS))
                {
                    depts = depts.Where(u => u.STATUS == selectData.STATUS).ToList();
                }
                return depts;
            }
            catch(Exception )
            {
                return null;
            }
            
        }

        public static Dept SelectDeptByID(AdminContext db, SelectDeptByIDReq selectData)
        {
            try
            {
                Dept dept = db.SYS_DEPT.Where(u => u.DEPT_ID == int.Parse(selectData.DEPT_ID)).FirstOrDefault();
                return dept;
            }
            catch(Exception )
            {
                return null;
            }
        }

        public static List<Dept> ChooseDept(AdminContext db)
        {
            try
            {
                List<Dept> depts = db.SYS_DEPT.Where(u => u.DEL_FLAG=="0").ToList();
                return depts;
            }
            catch (Exception)
            {
                return null;
            }
        }
    }
}
