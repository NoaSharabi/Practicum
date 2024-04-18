using EmployeeServer.Core.Entities;

namespace EmployeeServer.Models
{
   
    public class EmployeePostModel
    {
            
        public string Identity { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime BirthDate { get; set; }
        public Gender Gender { get; set; }
        public List<EmployeeRolePostModel> Roles { get; set; }

    }
}

