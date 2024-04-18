using AutoMapper;
using EmployeeServer.Core.DTOs;
using EmployeeServer.Core.Entities;
using EmployeeServer.Core.Services;

using EmployeeServer.Models;
using EmployeeServer.Service;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace EmployeeServer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeRoleController : ControllerBase
    {

        private readonly IEmployeeRoleService _employeeRoleService;
        private readonly IMapper _mapper;
        public EmployeeRoleController(IEmployeeRoleService employeeRoleService, IMapper mapper)
        {
            _employeeRoleService = employeeRoleService;
            _mapper = mapper;

        }
        [HttpGet]
        public async Task<ActionResult> Get()
        {
            var employeeRoleList = await _employeeRoleService.GetAllAsync();
            return Ok(_mapper.Map<IEnumerable<EmployeeRoleDto>>(employeeRoleList));
        }
        // GET: api/<EmployeeRoleController>
        [HttpGet("{id}")]
 
        public async Task<ActionResult> Get(int id)
        {
            var employeeRole = await _employeeRoleService.GetByIdAsync(id);
            return Ok(_mapper.Map<EmployeeRoleDto>(employeeRole));
        }
        // POST api/<EmployeeRoleController>
        [HttpPost]
        public async Task<ActionResult> Post([FromBody] EmployeeRolePostModel model)
        {
            var newEmployeeRole = await _employeeRoleService.AddAsync(_mapper.Map<EmployeeRole>(model));
            return Ok(_mapper.Map<EmployeeRoleDto>(newEmployeeRole));
        }

        // PUT api/<EmployeeRoleController>/5
        [HttpPut("{id}")]
        
        public async Task<ActionResult> Put(int id, [FromBody] EmployeeRolePostModel model)
        {
            var updateEmployeeRole = await _employeeRoleService.GetByIdAsync(id);
            if (updateEmployeeRole is null)
            {
                return NotFound();
            }
            _mapper.Map(model, updateEmployeeRole);
            await _employeeRoleService.UpdateAsync(updateEmployeeRole);
            updateEmployeeRole = await _employeeRoleService.GetByIdAsync(id);
            return Ok(_mapper.Map<EmployeeRoleDto>(updateEmployeeRole));

        }
        // DELETE api/<EmployeeRoleController>/5
        [HttpDelete("{id}")]

        public async Task<ActionResult> Delete(int employeeId)
        {
            var employeeRole = await _employeeRoleService.GetByIdAsync(employeeId);
            if (employeeRole is null)
            {
                return NotFound();
            }
            await _employeeRoleService.DeleteAsync(employeeId);
            return NoContent();
        }
    }
}
