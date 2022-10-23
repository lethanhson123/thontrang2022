using System.Collections.Generic;
using System.Linq;
using ThonTrang.Data.Models;
using ThonTrang.Data.Repositories;
using ThonTrang.Helpers;

namespace ThonTrang.Data.Repositories
{
    public class SystemApplicationRepository : Repository<SystemApplication>, ISystemApplicationRepository
    {
        private readonly ThonTrangContext _context;
        public SystemApplicationRepository(ThonTrangContext context) : base(context)
        {
            _context = context;
        }       
    }
}

