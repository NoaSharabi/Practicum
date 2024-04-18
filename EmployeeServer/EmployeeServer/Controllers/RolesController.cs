using AutoMapper;
using EmployeeServer.Core.DTOs;
using EmployeeServer.Core.Entities;
using EmployeeServer.Core.Services;
using EmployeeServer.Models;
using EmployeeServer.Service;
using Microsoft.AspNetCore.Mvc;
using System.Data;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace EmployeeServer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RolesController : ControllerBase
    {
        private readonly IRoleService _roleService;
        private readonly IMapper _mapper;
        public RolesController(IRoleService roleService, IMapper mapper)
        {
            _roleService = roleService;
            _mapper = mapper;

        }
        // GET: api/<RoleController>
        [HttpGet]
        public async Task<ActionResult> Get()
        {
            var roles = await _roleService.GetAllAsync();
            return Ok(_mapper.Map<IEnumerable<RoleDto>>(roles));
        }

        // GET api/<RoleController>/5
        [HttpGet("{id}")]
        public async Task<ActionResult> Get(int id)
        {
            var role = await _roleService.GetByIdAsync(id);
            return Ok(_mapper.Map<RoleDto>(role));
        }

        // POST api/<RoleController>
        [HttpPost]
        public async Task<ActionResult> Post([FromBody] RolePostModel model)
        {
            var role = await _roleService.AddAsync(_mapper.Map<Role>(model));
            return Ok(_mapper.Map<RoleDto>(role));
        }

        // PUT api/<RoleController>/5
        [HttpPut("{id}")]
        public async Task<ActionResult> Put(int id, [FromBody] RolePostModel model)
        {
            var role = await _roleService.GetByIdAsync(id);
            if (role is null)
            {
                return NotFound();
            }
            _mapper.Map(model, role);
            await _roleService.UpdateAsync(role);
            role = await _roleService.GetByIdAsync(id);
            return Ok(_mapper.Map<RoleDto>(role));
        }

        // DELETE api/<RoleController>/5
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            var role = await _roleService.GetByIdAsync(id);
            if (role is null)
            {
                return NotFound();
            }
            await _roleService.DeleteAsync(id);
            return Ok();
        }
    }
}
