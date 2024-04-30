using EmployeeServer.Core.Entities;

namespace EmployeeServer.Models
{
    public class EmployeeRolePostModel
    {
        //public int EmployeeId { get; set; }
        public int EmployeeId { get; set; }
        public int RoleId { get; set; }
        public DateTime StartDate { get; set; }
        public bool IsManagement { get; set; }
    }
}
