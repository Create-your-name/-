using Arch;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using SPCService.Database.Entity;

namespace SPCService.Database
{
    public class AdminContext : DbContext
    {
		public DbSet<AppConfigV> APPCONFIG_V { get; set; }
		public DbSet<JwtSecret> JWTSECRETS { get; set; }

		public DbSet<SysPost> SYS_POST { get; set; }
		public DbSet<Role> SYS_ROLE { get; set; }
		public DbSet<User> SYS_USER { get; set; }
		public DbSet<Dept> SYS_DEPT { get; set; }
		public DbSet<Menu> SYS_MENU { get; set; }
		public DbSet<RoleMenu> SYS_ROLE_MENU { get; set; }

		
		protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
		{
			optionsBuilder.UseOracle(ServerConfig.GetString("oracle"), b => b.UseOracleSQLCompatibility("11"));  
			//optionsBuilder.UseOracle(@"User Id=ANST_WAFERMAPPING;Password=anstwafermapping123;Data Source=(DESCRIPTION = (ADDRESS_LIST= (ADDRESS = (PROTOCOL = TCP)(HOST = 223.68.192.31)(PORT = 11521))) (CONNECT_DATA = (SERVICE_NAME = PROMOTE)));");
		}

		protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
			modelBuilder.Entity<User>()
				.Property(b => b.USER_ID)
				.HasColumnName("USER_ID")
				.UseHiLo("SEQ_SYSUSERID");
			modelBuilder.Entity<Role>()
				.Property(b => b.ROLE_ID)
				.HasColumnName("ROLE_ID")
				.UseHiLo("SEQ_SYSROLEID");
			modelBuilder.Entity<Dept>()
				.Property(b => b.DEPT_ID)
				.HasColumnName("DEPT_ID")
				.UseHiLo("SEQ_SYSDEPTID");

			modelBuilder.Entity<Menu>()
				.Property(b => b.MENU_ID)
				.HasColumnName("MENU_ID")
				.UseHiLo("SEQ_SYSMENUID");

			base.OnModelCreating(modelBuilder);
		}
    }

}
