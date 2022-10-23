using System.Collections.Generic;
using System.Linq;
using ThonTrang.Data.Models;
using ThonTrang.Data.Repositories;
using ThonTrang.Helpers;

namespace ThonTrang.Data.Repositories
{
    public class WarehouseProductRepository : Repository<WarehouseProduct>, IWarehouseProductRepository
    {
        private readonly ThonTrangContext _context;
        public WarehouseProductRepository(ThonTrangContext context) : base(context)
        {
            _context = context;
        }       
    }
}

