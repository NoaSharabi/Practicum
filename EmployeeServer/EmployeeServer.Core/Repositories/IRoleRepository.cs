using EmployeeServer.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EmployeeServer.Core.Repositories
{
    public interface IRoleRepository
    {
        Task<IEnumerable<Role>> GetAllAsync();

        Task<Role> GetByIdAsync(int roleId);

        Task<Role> AddAsync(Role role);

        Task<Role> UpdateAsync(Role role);

        Task DeleteAsync(int roleId);
    }
}
