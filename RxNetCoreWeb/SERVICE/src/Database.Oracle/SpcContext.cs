using Arch;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using SPCService.Database.Entity;
using SPCService.DbModel;
using SPCService.src.Database.Entity.EQP;

namespace SPCService.Database;

public class SpcContext : DbContext
{
    public static string OracleConn
    => ServerConfig.GetString("oracle");

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        //optionsBuilder.UseOracle(ServerConfig.GetString("oracle"), b => b.UseOracleSQLCompatibility("11"));
        //var dbStr = "User Id=FASTSPC;Password=fastspc12;Data Source=(DESCRIPTION = (ADDRESS_LIST= (ADDRESS = (PROTOCOL = TCP)(HOST = 223.68.192.31)(PORT = 11521))) (CONNECT_DATA = (SERVICE_NAME = PROMOTE)));";
        optionsBuilder.UseOracle(OracleConn);
    }
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {

        modelBuilder.Entity<SPC_CHART_N2M>().HasKey(t => new
        {
            t.FROMID,
            t.LINKNAME,
            t.SEQUENCE
        });
        modelBuilder.Entity<SPC_CHARTTEMPLATE_N2M>().HasKey(t => new { t.FROMID, t.LINKNAME, t.SEQUENCE });
        modelBuilder.Entity<SPC_MEASUREMENTSPEC_PN2M>().HasKey(t => new { t.FROMID, t.LINKNAME, t.SEQUENCE });
        modelBuilder.Entity<SPC_PLAN_N2M>().HasKey(t => new { t.FROMID, t.LINKNAME, t.SEQUENCE });
        modelBuilder.Entity<SPC_PLANVERSION_N2M>().HasKey(t => new { t.FROMID, t.LINKNAME, t.SEQUENCE });
        modelBuilder.Entity<SPC_MEASUREMENTSPEC_N2M>().HasKey(t => new { t.FROMID, t.LINKNAME, t.SEQUENCE });
    }
    public DbSet<SPC_ANNOTATION> SPC_ANNOTATION { get; set; }

    public DbSet<SCFZ_EQP_PARTS> SCFZ_EQP_PARTS { get; set; }
    public DbSet<SPC_CHART> SPC_CHART { get; set; }
    public DbSet<SPC_CHARTPARAMETER> SPC_CHARTPARAMETER { get; set; }
    public DbSet<SPC_CHARTTEMPLATE> SPC_CHARTTEMPLATE { get; set; }
    public DbSet<SPC_CHARTTEMPLATE_N2M> SPC_CHARTTEMPLATE_N2M { get; set; }
    public DbSet<SPC_CHART_N2M> SPC_CHART_N2M { get; set; }
    public DbSet<SPC_DATACOLLECTION> SPC_DATACOLLECTION { get; set; }
    public DbSet<SPC_DATAPOINT> SPC_DATAPOINT { get; set; }
    public DbSet<SPC_DATAPOINTHISTORY> SPC_DATAPOINTHISTORY { get; set; }
    public DbSet<SPC_DERIVATION> SPC_DERIVATION { get; set; }
    public DbSet<SPC_MEASUREMENT> SPC_MEASUREMENT { get; set; }
    public DbSet<SPC_MEASUREMENTSPEC> SPC_MEASUREMENTSPEC { get; set; }
    public DbSet<SPC_MEASUREMENTSPEC_PN2M> SPC_MEASUREMENTSPEC_PN2M { get; set; }
    public DbSet<SPC_PLAN> SPC_PLAN { get; set; }
    public DbSet<SPC_PLANVERSION> SPC_PLANVERSION { get; set; }
    public DbSet<SPC_PLANVERSION_N2M> SPC_PLANVERSION_N2M { get; set; }
    public DbSet<SPC_PLAN_N2M> SPC_PLAN_N2M { get; set; }
    public DbSet<SPC_SAMPLINGPLAN> SPC_SAMPLINGPLAN { get; set; }
    public DbSet<SPC_CUSTOMRULE> SPC_CUSTOMRULE { get; set; }
    public DbSet<SPC_LOG> SPC_LOG { get; set; }

    //----
    public DbSet<SPC_CATAGORY> SPC_CATAGORY { get; set; }
    public DbSet<SPC_MEASUREMENTSPEC_N2M> SPC_MEASUREMENTSPEC_N2M { get; set; }

    public DbSet<QC_LIST> QC_LIST { get; set; }
    public DbSet<CUST_EQP_EDC_PLAN> CUST_EQP_EDC_PLAN { get; set; }
    public DbSet<EQUIPMENT_VERSION> EQUIPMENT_VERSION { get; set; }
    public DbSet<PM_LIST> PM_LIST { get; set; }
    public DbSet<EQP_PM_LIST> EQP_PM_LIST { get; set; }
    public DbSet<PM_LIST_LOG> PM_LIST_LOG { get; set; }
    public DbSet<CUST_PM_FORM> CUST_PM_FORM { get; set; }
    public DbSet<CUST_PM_CHECKLIST> CUST_PM_CHECKLIST { get; set; }
    public DbSet<EQUIPMENT_TYPE> EQUIPMENT_TYPE { get; set; }
    public DbSet<CUST_BM_FORM> CUST_BM_FORM { get; set; }
    public DbSet<CUST_BM_CHECKLIST_GROUP> CUST_BM_CHECKLIST_GROUP { get; set; }
    public DbSet<CUST_BM_CHECKLIST> CUST_BM_CHECKLIST { get; set; }
    public DbSet<CUST_PM_BM_DATA> CUST_PM_BM_DATA { get; set; }
    public DbSet<CUST_PM_BM_DATA_CHECKLIST> CUST_PM_BM_DATA_CHECKLIST { get; set; }
    public DbSet<EQP_PARTS> EQP_PARTS { get; set; }

    public object GetSetByType(Type entityType)
    {
        return GetType()
            .GetMethod("Set", types: Type.EmptyTypes)
            .MakeGenericMethod(entityType)
            .Invoke(this, null);
    }
}
