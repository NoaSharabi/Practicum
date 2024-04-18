using EmployeeServer.Core.Entities;
using EmployeeServer.Core.Repositories;
using EmployeeServer.Core.Services;
using EmployeeServer.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EmployeeServer.Service.Services
{
    public class EmployeeRoleService : IEmployeeRoleService
    {
        private readonly IEmployeeRoleRepository _employeeRoleRepository;
        public EmployeeRoleService(IEmployeeRoleRepository employeeRoleRepository)
        {
            _employeeRoleRepository = employeeRoleRepository;
        }
        public async Task<IEnumerable<EmployeeRole>> GetAllAsync()
        {
            return await _employeeRoleRepository.GetAllAsync();
        }
        public async Task<EmployeeRole> GetByIdAsync(int employeeRoleId)
        {
            return await _employeeRoleRepository.GetByIdAsync(employeeRoleId);
        }
        public async Task<EmployeeRole> AddAsync(EmployeeRole employeeRole)
        {
            return await _employeeRoleRepository.AddAsync(employeeRole);
        }

        public async Task<EmployeeRole> UpdateAsync(EmployeeRole employeeRole)
        {
            return await _employeeRoleRepository.UpdateAsync(employeeRole);
        }

        public async Task DeleteAsync(int employeeRoleId)
        {
            await _employeeRoleRepository.DeleteAsync(employeeRoleId);
        }


    }
}
