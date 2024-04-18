using EmployeeServer.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EmployeeServer.Core.Repositories
{
    public interface IEmployeeRoleRepository
    {
        Task<IEnumerable<EmployeeRole>> GetAllAsync();
        Task<EmployeeRole> GetByIdAsync(int empRoleId);
        Task<EmployeeRole> AddAsync(EmployeeRole employeeRoleId);

        Task<EmployeeRole> UpdateAsync(EmployeeRole employeeRoleId);

        Task DeleteAsync(int employeeRoleId);

    }
}
