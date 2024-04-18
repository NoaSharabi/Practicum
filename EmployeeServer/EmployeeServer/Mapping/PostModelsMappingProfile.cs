using AutoMapper;
using EmployeeServer.Core.Entities;
using EmployeeServer.Models;

namespace EmployeeServer.Mapping
{
    public class PostModelsMappingProfile : Profile
    {
        public PostModelsMappingProfile()
        {
            CreateMap<EmployeePostModel, Employee>().ReverseMap();
            CreateMap<RolePostModel, Role>().ReverseMap();
            CreateMap<EmployeeRolePostModel, EmployeeRole>().ReverseMap();
        }

    }
}
