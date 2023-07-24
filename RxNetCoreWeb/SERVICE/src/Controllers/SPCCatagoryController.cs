using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Arch;
using System.Threading.Tasks;
using Protocol;
using SPCService.Database;

namespace SPCService;

[Route("api/spc-catagory")]
[ApiController]
public class SPCCatagoryController : ControllerExt
{
    private SpcContext dbContext;
    public SPCCatagoryController(SpcContext dbContext)
    {
        this.dbContext = dbContext;
    }

    [HttpPost("get-nodes")]
    public async Task<APIResponse> GetCatagory()
    {
        var resp = await SPCCatagoryService.GetCatagoryTree(dbContext);

        return resp;
    }

    [HttpPost("add-node")]
    public async Task<APIResponse> AddCatagoryNode()
    {
        var req = await GetBodyJsonAsync<AddSpcCatagoryNodeReq>();
        var resp = await SPCCatagoryService.AddCatagoryNode(dbContext, req);

        return resp;
    }


    [HttpPost("update-node")]
    public async Task<APIResponse> UpdateCatagoryNode()
    {
        return null;
    }

    [HttpPost("QueryCatagoryMSpec")]
    public async Task<APIResponse> QueryCatagoryMSpec()
    {
        var req = await GetBodyJsonAsync<QueryCatagoryMSpecReq>();
        return await SPCCatagoryService.QueryCatagoryMSpec(dbContext, req);
    }

    [HttpPost("UpdateCatagoryMSpec")]
    public async Task<APIResponse> UpdateCatagoryMSpec()
    {
        var req = await GetBodyJsonAsync<UpdateCatagoryMSpecReq>();
        return await SPCCatagoryService.UpdateCatagoryMSpec(dbContext, req);
    }
}
