using EmployeeServer.Core.Entities;
using EmployeeServer.Core.Repositories;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EmployeeServer.Data.Repositories
{
    public class RoleRepoisitory:IRoleRepository
    {


        private readonly DataContext _dataContext;

        public RoleRepoisitory(DataContext context)
        {
            _dataContext = context;
        }

        public async Task<Role> GetByIdAsync(int roleId)
        {
            return await _dataContext.Roles.FirstAsync(c => c.Id == roleId);
        }

        public async Task<IEnumerable<Role>> GetAllAsync()
        {
            return await _dataContext.Roles.ToListAsync();
        }

        public async Task<Role> AddAsync(Role role)
        {
            _dataContext.Roles.Add(role);
            await _dataContext.SaveChangesAsync();
            return role;
        }

        public async Task<Role> UpdateAsync(Role role)
        {
            var existRole = await GetByIdAsync(role.Id);
            _dataContext.Entry(existRole).CurrentValues.SetValues(existRole);
            await _dataContext.SaveChangesAsync();
            return existRole;

        }

        public async Task DeleteAsync(int roleId)
        {
            var role = await GetByIdAsync(roleId);
            _dataContext.Roles.Remove(role);
            await _dataContext.SaveChangesAsync();
        }

    }

}


