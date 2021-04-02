﻿using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Controllers
{

    public class UsersController : BaseApiController
    {
        private readonly DataContext _context;

        public UsersController(DataContext context)
        {
            _context = context;
        }

        [AllowAnonymous]
        [HttpGet]
        // ActionResult<> >>> TYPE of thing that going to RETURN
        // IEnumerable >>> Collection, allow to use simple iteration over a collection of specified type, READ ONLY
        // List<AppUser> will do the same thing
        // but List offers search, sort and manipulate list
        // async >>> asynchronous, best practice when querying something from database
        // ToListAsync() >>> return the list asynchronously
        public async Task<ActionResult<IEnumerable<AppUser>>> GetUsers()
        {
            
            var users = await _context.Users.ToListAsync();

            return users;
            
            // return _context.Users.ToList();
        }

        [Authorize]
        // api/users/1
        [HttpGet("{id}")]
        public async Task<ActionResult<AppUser>> GetUser(int id)
        {
            
            var user = await _context.Users.FindAsync(id);

            return user;
            
            // return _context.Users.Find(id);
        }
    }
}
