using EmployeeServer.Core.Entities;
using EmployeeServer.Core.Repositories;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;


namespace EmployeeServer.Data.Repositories
{
    public class EmplyeeRoleRepository : IEmployeeRoleRepository
    {
        private readonly DataContext _dataContext;
        public EmplyeeRoleRepository(DataContext context)
        {
            _dataContext = context;
        }
        public async Task<EmployeeRole> GetByIdAsync(int empRoleId)
        {
            return await _dataContext.EmployeeRoles.Include(e => e.Role).Include(e => e.Employee).FirstAsync(e => e.Id == empRoleId);
        }
        public async Task<IEnumerable<EmployeeRole>> GetAllAsync()
        {
            return await _dataContext.EmployeeRoles.ToListAsync();
        }
        public async Task<EmployeeRole> AddAsync(EmployeeRole employeeRole)
        {
            // בדיקה שהתפקיד לא נבחר כבר לעובד
            var existingRole = await _dataContext.EmployeeRoles
                .FirstOrDefaultAsync(er => er.EmployeeId == employeeRole.EmployeeId && er.RoleId == employeeRole.RoleId);
            if (existingRole != null)
            {
                throw new ArgumentException("The employee has this role already");
            }
            //בדיקה  שהתאריך מאוחר או שווה לתאריך תחילת העבודה
            var checkDate = await _dataContext.EmployeeRoles
               .FirstOrDefaultAsync(er => er.EmployeeId == employeeRole.EmployeeId && er.StartDate >= employeeRole.StartDate);
            if (checkDate != null)
            {
                throw new ArgumentException("Employee already has a role with a start date on/after the provided start date");
            }
            _dataContext.EmployeeRoles.Add(employeeRole);
            
            await _dataContext.SaveChangesAsync();
            return employeeRole;
        }
        
        public async Task<EmployeeRole> UpdateAsync(EmployeeRole employeeRole)
        {
            var existEmployeeRole = await GetByIdAsync(employeeRole.Id);
            if (employeeRole.StartDate < existEmployeeRole.Employee.StartDate)
            {
                throw new ArgumentException("Employee role start date must be after or equal to employee start date");
            }
            _dataContext.Entry(existEmployeeRole).CurrentValues.SetValues(employeeRole);
            await _dataContext.SaveChangesAsync();
            return existEmployeeRole;
        }

        public async Task DeleteAsync(int employeeRoleId)
        {
            var employeeRole = await GetByIdAsync(employeeRoleId);
            _dataContext.EmployeeRoles.Remove(employeeRole);
            await _dataContext.SaveChangesAsync();
        }


    }
}
