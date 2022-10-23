using System.Collections.Generic;
using System.Linq;
using ThonTrang.Data.Models;
using ThonTrang.Data.Repositories;
using ThonTrang.Helpers;

namespace ThonTrang.Data.Repositories
{
    public class UnitRepository : Repository<Unit>, IUnitRepository
    {
        private readonly ThonTrangContext _context;
        public UnitRepository(ThonTrangContext context) : base(context)
        {
            _context = context;
        }       
    }
}

