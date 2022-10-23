using System.Collections.Generic;
using System.Linq;
using ThonTrang.Data.Models;
using ThonTrang.Data.Repositories;
using ThonTrang.Helpers;

namespace ThonTrang.Data.Repositories
{
    public class MembershipCategoryRepository : Repository<MembershipCategory>, IMembershipCategoryRepository
    {
        private readonly ThonTrangContext _context;
        public MembershipCategoryRepository(ThonTrangContext context) : base(context)
        {
            _context = context;
        }       
    }
}

