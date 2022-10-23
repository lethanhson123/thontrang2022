using System.Collections.Generic;
using System.Linq;
using ThonTrang.Data.Models;
using ThonTrang.Data.Repositories;
using ThonTrang.Helpers;

namespace ThonTrang.Data.Repositories
{
    public class MembershipSystemApplicationRepository : Repository<MembershipSystemApplication>, IMembershipSystemApplicationRepository
    {
        private readonly ThonTrangContext _context;
        public MembershipSystemApplicationRepository(ThonTrangContext context) : base(context)
        {
            _context = context;
        }       
    }
}

