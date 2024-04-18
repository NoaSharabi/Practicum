using EmployeeServer.Core.Entities;
using EmployeeServer.Core.Repositories;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EmployeeServer.Data.Repositories
{
    public class EmployeeRepository : IEmployeeRepository
    {
        private readonly DataContext _dataContext;

        public EmployeeRepository(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        public async Task<IEnumerable<Employee>> GetAllAsync()
        {
            return await _dataContext.Employees.Where(e => e.EmployeeActivityStatus).Include(e => e.Roles).ThenInclude(er => er.Role).ToListAsync();
        }
        public async Task<Employee> GetByIdAsync(int employeeId)
        {
            return await _dataContext.Employees.Where(e => e.EmployeeActivityStatus).Include(e => e.Roles).ThenInclude(j => j.Role).FirstAsync(c => c.Id == employeeId);
        }

        public async Task<Employee> AddAsync(Employee employee)
        {
            employee.EmployeeActivityStatus = true;
            _dataContext.Employees.Add(employee);
            await _dataContext.SaveChangesAsync();
            return employee;
        }

        public async Task<Employee> UpdateAsync(Employee employee)
        {
            var existEmployee = await GetByIdAsync(employee.Id);
            _dataContext.Entry(existEmployee).CurrentValues.SetValues(existEmployee);
            await _dataContext.SaveChangesAsync();
            return existEmployee;
        }

        public async Task DeleteAsync(int employeeId)
        {
            var employee = await GetByIdAsync(employeeId);
            employee.EmployeeActivityStatus = false;
            await _dataContext.SaveChangesAsync();
        }
    }
}



