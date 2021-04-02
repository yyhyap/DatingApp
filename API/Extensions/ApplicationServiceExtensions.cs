using API.Data;
using API.Interfaces;
using API.Services;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Extensions
{
    public static class ApplicationServiceExtensions
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services, IConfiguration config)
        {
            // services.AddScoped >>> scoped to the lifetime of HTTP request (using inside API Controller)
            services.AddScoped<ITokenService, TokenService>();

            // dependency injection for DataContext
            services.AddDbContext<DataContext>(options =>
            {
                // GetConnectionString >>> Short hand for GetSection("ConnectionStrings")[name]
                // "ConnectionStrings" is defined in appsettings.Development.json
                options.UseSqlite(config.GetConnectionString("DefaultConnection"));
            });

            return services;
        }
    }
}
