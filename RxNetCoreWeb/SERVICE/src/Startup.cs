using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Arch;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using SPCService.Database;

using Quartz;
using Quartz.Impl;

namespace SPCService
{
    public class Startup
    {
        public static bool Development = false;
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {

           
            services.AddDbContext<AdminContext>();
            services.AddDbContext<SpcContext>();

            
            services
                .AddCors(options =>
                {
                    options.AddDefaultPolicy(builder =>
                    {
                        builder
                        .AllowAnyMethod()
                        .AllowAnyHeader();
                    });
                })
                .AddControllers();
            services.AddMvc().AddJsonOptions(options =>
            {
                options.JsonSerializerOptions.IncludeFields = true;
                options.JsonSerializerOptions.Converters.Add(new System.Text.Json.Serialization.JsonStringEnumConverter());
                options.JsonSerializerOptions.PropertyNamingPolicy = null;
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                Development = true;
                app.UseDeveloperExceptionPage();

            }
            else
            {
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            app.UseRouting();

            app.ConfigureCustomOptionsMiddleware();
            app.ConfigureCustomExceptionMiddleware();
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }

}
