using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EmployeeServer.Core.Entities
{
    public class EmployeeRole
    {
        public int Id { get; set; }
        [Required(ErrorMessage = "Employee id is required")]
        public int EmployeeId { get; set; }
        public int RoleId { get; set; }

        [Required(ErrorMessage = "Employee is required")]
        public Employee Employee { get; set; }

        [Required(ErrorMessage = "Role is required")]
        public Role? Role { get; set; }

        [Required(ErrorMessage = "Start date is required")]
        [DataType(DataType.Date)]
        [DisplayFormat(DataFormatString = "{0:yyyy-MM-dd}", ApplyFormatInEditMode = true)]
        public DateTime StartDate { get; set; }

        public bool IsManagement { get; set; }
    }
}
