using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Controllers
{
    public class BuggyController : BaseApiController
    {
        private readonly DataContext _context;

        public BuggyController(DataContext context)
        {
            _context = context;
        }

        [Authorize]
        [HttpGet("auth")]
        public ActionResult<string> GetSecret()
        {
            return "secret text";
        }

        [HttpGet("not-found")]
        public ActionResult<AppUser> GetNotFound()
        {
            // not going to have any user with ID -1
            // Find >>> find entity with primary key, if no entity found, return null
            var thing = _context.Users.Find(-1);

            if(thing == null)
            {
                return NotFound();
            }

            return Ok(thing);
        }

        [HttpGet("server-error")]
        public ActionResult<string> GetServerError()
        {
            // not going to have any user with ID -1
            // Find >>> find entity with primary key, if no entity found, return null
            var thing = _context.Users.Find(-1);

            // will generate null reference exception
            var thingToReturn = thing.ToString();

            return thingToReturn;            
        }

        [HttpGet("bad-request")]
        public ActionResult<string> GetBadRequest()
        {
            return BadRequest("This is bad request");
        }
    }
}
