using System;
using System.Linq;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using SPCService.Database;
using Protocol;
using SPCService.DbModel;
using Arch;
using SPCService.BusinessModel;
using SPCService.Helper;

namespace SPCService;

public class SPCCatagoryService
{
    public static async Task<APIResponse> GetCatagoryTree(SpcContext db)
    {
        var allNode = await (from doc in db.SPC_CATAGORY
                       select doc).ToListAsync();


        var tops = allNode.Where(n => n.CLEVEL == 1)
            .Select(n => MakeViewMode(n, allNode))
            .ToList();

        var resp = new GetSpcCatagoryNodesResp();
        resp.nodes.AddRange(tops);

        return APIResponse.OK(resp);
    }

    private static SpcCatagoryNode MakeViewMode(SPC_CATAGORY entity, List<SPC_CATAGORY> all)
    {
        var node = new SpcCatagoryNode
        {
            title = entity.NAME,
            key = entity.SYSID,
            cataLevel = entity.CLEVEL,
            isLeaf = entity.CLEVEL >= 3,
        };

        var children = all.Where(n => n.PARENT == entity.SYSID).ToList();

        foreach (var child in children)
        {
            node.children.Add(MakeViewMode(child, all));
        }

        return node;
    }

    public static async Task<APIResponse> AddCatagoryNode(SpcContext db, AddSpcCatagoryNodeReq node)
    {

        if (string.IsNullOrEmpty(node.parent))
        {
            if (node.cataLevel != 1)
                return APIResponse.Error(ErrorCode.BadRequest);
        }
        else
        {
            var parentEntity = await db.SPC_CATAGORY.Where(doc => doc.SYSID == node.parent).FirstOrDefaultAsync();

            if (parentEntity == null || node.cataLevel != parentEntity.CLEVEL + 1)
                return APIResponse.Error(ErrorCode.BadRequest);
        }

        var entityNode = new SPC_CATAGORY
        {
            SYSID = SPCUtils.GetSysID(typeof(SPC_CATAGORY)),
            NAME = node.title,
            CLEVEL = node.cataLevel,
            PARENT = node.parent,
        };

        db.SPC_CATAGORY.Add(entityNode);
        await db.SaveChangesAsync();

        return APIResponse.OK(null);
    }

    public static async Task<APIResponse> QueryCatagoryMSpec(SpcContext db, QueryCatagoryMSpecReq req)
    {
        var resp = new QueryCatagoryMSpecResp();

        var global = await (from doc in db.SPC_MEASUREMENTSPEC
                            select doc).ToListAsync();

        var whereClause =  $"select * from {EdcMDataService.measurementspectable} where sysid in (select fromid from {EdcMDataService.measurementspecN2Mtable} where toid = '{req.catagoryId}' and linkname = '{EnumLinkName.catagory.ToString()}')";
        var cata = DapperHelper.Query<SPC_MEASUREMENTSPEC>(whereClause);

        resp.globalList.AddRange(global.Select(MakeSimpleViewModel));
        resp.cataList.AddRange(cata.Select(MakeSimpleViewModel));
        return APIResponse.OK(resp);
    }

    private static CEdcMeasSpec MakeSimpleViewModel(SPC_MEASUREMENTSPEC entity)
    {
        return new CEdcMeasSpec
        {
            Sysid = entity.SYSID,
            name = entity.NAME,
            description = entity.DESCRIPTION
        };
    }

    public static async Task<APIResponse> UpdateCatagoryMSpec(SpcContext db, UpdateCatagoryMSpecReq req)
    {
        var resp = new QueryCatagoryMSpecResp();

        var global = await (from doc in db.SPC_MEASUREMENTSPEC
                            select doc).ToListAsync();

        var cata = await (from e in db.SPC_MEASUREMENTSPEC_N2M
                          where e.TOID == req.catagoryId && e.LINKNAME == EnumLinkName.catagory.ToString()
                          select e
                          ).ToListAsync();


        //删除
        db.SPC_MEASUREMENTSPEC_N2M.RemoveRange(cata.ToArray());
        await db.SaveChangesAsync();

        //添加
        int sequnce = 1;
        foreach (var sysid in req.mspecList)
        {
            var n2m = new SPC_MEASUREMENTSPEC_N2M
            {
                FROMID = sysid,
                LINKNAME = EnumLinkName.catagory.ToString(),
                TOID = req.catagoryId,
                SEQUENCE = sequnce++,
            };
            db.SPC_MEASUREMENTSPEC_N2M.Add(n2m);
        }

        await db.SaveChangesAsync();

        return APIResponse.OK(new UpdateCatagoryMSpecResp());
    }
}
