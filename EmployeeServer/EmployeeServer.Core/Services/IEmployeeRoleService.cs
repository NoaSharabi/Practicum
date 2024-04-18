using EmployeeServer.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EmployeeServer.Core.Services
{
    public interface IEmployeeRoleService
    {
       
        Task<IEnumerable<EmployeeRole>> GetAllAsync();
        Task<EmployeeRole> GetByIdAsync(int empRoleId);

        Task<EmployeeRole> AddAsync(EmployeeRole empRoleId);

        Task<EmployeeRole> UpdateAsync(EmployeeRole empRoleId);

        Task DeleteAsync(int empRoleId);
    }
}
