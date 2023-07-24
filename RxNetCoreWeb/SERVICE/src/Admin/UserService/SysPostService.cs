using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using SPCService.Database;
using SPCService.Database.Entity;

namespace SPCService.src.UserService
{
    public static class SysPostService
    {
        public static SysPost LoadByCode(AdminContext db, string postCode)
        {
            return db.SYS_POST.Where(p => p.POST_CODE == postCode).FirstOrDefault();
        }

        public static SysPost LoadById(AdminContext db, string postId)
        {
            return db.SYS_POST.Where(p => p.POST_ID == postId).FirstOrDefault();
        }

        public static List<SysPost> QueryAllPost(AdminContext db)
        {
            return db.SYS_POST.ToList();
        }

        public static bool RemovePost(AdminContext db, string postId)
        {
            db.Remove(new SysPost { POST_ID = postId });
            return db.SaveChanges() > 0;
        }

        public static bool CreatePost(AdminContext db, string postCode, string postName, string postSort, string status)
        {
            if (LoadByCode(db, postCode) != null)
            {
                Log.Error($"Code {postCode} already exist!");
                return false;
            }

            string sql = "insert into SYS_POST(POST_CODE,POST_NAME,POST_SORT,STATUS) values('" + postCode + "','"
                + postName + "','" + postSort + "','" + status + "');";

            db.Database.ExecuteSqlRaw(sql);
            db.SaveChanges();

            return true;
        }

        public static bool AlertPost(AdminContext db,string postId, string postCode, string postName, string postSort, string status)
        {
            var sysPost = LoadById(db, postId);
            if (sysPost == null)
            {
                Console.WriteLine(postId+postCode+postName);
                return false;
            }
            sysPost.POST_CODE = postCode;
            sysPost.POST_NAME = postName;
            sysPost.POST_SORT = postSort;
            sysPost.STATUS = status;
            db.Update(sysPost);
            db.SaveChanges();

            return true;
        }
    }
}
