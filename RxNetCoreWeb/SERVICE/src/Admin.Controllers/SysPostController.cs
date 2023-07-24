using Arch;
using Microsoft.AspNetCore.Mvc;
using Protocol;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using SPCService.Database;
using SPCService.src.UserService;

namespace SPCService.src.Controllers
{
    //[AuthRoles(RoleGroup.RoleManager)]
    [Route("api/system/post")]
    public class SysPostController : ControllerExt
    {
        private AdminContext dbContext;
        public SysPostController(AdminContext dbContext)
        {
            this.dbContext = dbContext;
        }

        [HttpPost("list")]
        public APIResponse GetPostList()
        {
            var all = SysPostService.QueryAllPost(dbContext)
                .Select(postInfo => new PostInfoPb
                {
                    postId = postInfo.POST_ID,
                    postCode = postInfo.POST_CODE,
                    postName = postInfo.POST_NAME,
                    postSort = postInfo.POST_SORT,
                    status = postInfo.STATUS,
                    createTime = postInfo.CREATE_TIME,
                    createBy = postInfo.CREATE_BY,
                    updateTime = postInfo.UPDATE_TIME,
                    updateBy = postInfo.UPDATE_BY,
                    remark = postInfo.REMARK,
                });
            return OK(all);
        }

        [HttpPost("remove")]
        public APIResponse RemovePost()
        {
            var json = GetBodyJson<PostRemoveReq>();

            if (SysPostService.RemovePost(dbContext, json.postId))
            {
                return OK();
            }
            else
            {
                return ErrorCode.PostNotExist;
            }
        }

        [HttpPost("create")]
        public APIResponse CreatePost()
        {
            var json = GetBodyJson<PostCreateReq>();

            if (SysPostService.CreatePost(dbContext, json.postCode, json.postName, json.postSort, json.status))
            {
                return OK();
            }
            else
            {
                return ErrorCode.PostAlreadyExist;
            }
        }

        [HttpPost("alert")]
        public APIResponse AlertPost()
        {
            var json = GetBodyJson<PostAlertReq>();

            if (SysPostService.AlertPost(dbContext, json.postId, json.postCode, json.postName, json.postSort, json.status))
            {
                return OK();
            }
            else
            {
                return ErrorCode.PostAlreadyExist;
            }
        }
    }
}
