using System.Collections.Generic;
using System.Linq;
using ThonTrang.Data.Models;
using ThonTrang.Data.Repositories;
using ThonTrang.Helpers;

namespace ThonTrang.Data.Repositories
{
    public class DeliveryDetailRepository : Repository<DeliveryDetail>, IDeliveryDetailRepository
    {
        private readonly ThonTrangContext _context;
        public DeliveryDetailRepository(ThonTrangContext context) : base(context)
        {
            _context = context;
        }       
    }
}

