using EmployeeServer.Core.Entities;
using EmployeeServer.Core.Repositories;
using EmployeeServer.Core.Services;
using EmployeeServer.Data.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EmployeeServer.Service
{
    public class EmployeeService : IEmployeeService
    {
        private readonly IEmployeeRepository _employeeRepository;

        public EmployeeService(IEmployeeRepository employeeRepository)
        {
            _employeeRepository = employeeRepository;
        }


        public async Task<IEnumerable<Employee>> GetAllAsync()
        {
            return await _employeeRepository.GetAllAsync();
        }

        public async Task<Employee> GetByIdAsync(int employeeId)
        {
            return await _employeeRepository.GetByIdAsync(employeeId);
        }
        public async Task<Employee> AddAsync(Employee employee)
        {
            var roleIds = employee.Roles.Select(r => r.RoleId).ToList();
            var roleDates = employee.Roles.Select(r => r.StartDate).ToList();
            if (roleIds.Count != roleIds.Distinct().Count())
            {
                throw new InvalidOperationException("Duplicate roles are not allowed.");
            }
            if (!(roleDates.All(date => date > employee.StartDate || date == employee.StartDate)))
            {
                throw new InvalidOperationException("Not all the roles' start dates are before the employee's start date.");
            }
            return await _employeeRepository.AddAsync(employee);
        }
        public async Task<Employee> UpdateAsync(Employee employee)
        {
            var roleIds = employee.Roles.Select(r => r.RoleId).ToList();
            var roleDates = employee.Roles.Select(r => r.StartDate).ToList();
            if (roleIds.Count != roleIds.Distinct().Count())
            {
                throw new InvalidOperationException("Duplicate Roles are not allowed.");
            }
            if (!(roleDates.All(date => date > employee.StartDate || date == employee.StartDate)))
            {
                throw new InvalidOperationException("Not all job entry dates are before the employee's start date.");
            }
            return await _employeeRepository.UpdateAsync(employee);
        }

        public async Task DeleteAsync(int employeeId)
        {
            await _employeeRepository.DeleteAsync(employeeId);
        }

    }
}
