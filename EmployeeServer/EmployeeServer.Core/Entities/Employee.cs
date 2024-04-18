using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EmployeeServer.Core.Entities
{
    public enum Gender
    {
        Male = 1,
        Female = 2
    }
    public class Employee
    {

        public int Id { get; set; }

        [Required(ErrorMessage = "Id number is required")]
        [MinLength(9, ErrorMessage = "Id number must include 9 digits")]
        [MaxLength(9, ErrorMessage = "Id number include 9 digits only")]
        public string Identity { get; set; }

        [Required(ErrorMessage = "First name is required")]
        public string FirstName { get; set; }

        [Required(ErrorMessage = "Last name is required")]
        public string LastName { get; set; }

        [Required(ErrorMessage = "Start date is required")]
        [DataType(DataType.Date)]
        [DisplayFormat(DataFormatString = "{0:yyyy-MM-dd}", ApplyFormatInEditMode = true)]
        [Display(Name = "Start Date")]
        public DateTime StartDate { get; set; }

        [Required(ErrorMessage = "Birth date is required")]
        [DataType(DataType.Date)]
        [DisplayFormat(DataFormatString = "{0:yyyy-MM-dd}", ApplyFormatInEditMode = true)]
        [Display(Name = "Birth date")]
        public DateTime BirthDate { get; set; }

        [Required(ErrorMessage = "Gender is required")]
        public Gender Gender { get; set; }

        [Required(ErrorMessage = "Employee activity status is required")]

        public bool EmployeeActivityStatus { get; set; }
        public List<EmployeeRole> Roles { get; set; }

    }
}
