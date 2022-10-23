using System.Collections.Generic;
using System.Linq;
using ThonTrang.Data.Models;
using ThonTrang.Data.Repositories;
using ThonTrang.Helpers;

namespace ThonTrang.Data.Repositories
{
    public class TruckRepository : Repository<Truck>, ITruckRepository
    {
        private readonly ThonTrangContext _context;
        public TruckRepository(ThonTrangContext context) : base(context)
        {
            _context = context;
        }       
    }
}

