using System.Collections.Generic;
using System.Linq;
using ThonTrang.Data.Models;
using ThonTrang.Data.Repositories;
using ThonTrang.Helpers;

namespace ThonTrang.Data.Repositories
{
    public class CustomerWishlistRepository : Repository<CustomerWishlist>, ICustomerWishlistRepository
    {
        private readonly ThonTrangContext _context;
        public CustomerWishlistRepository(ThonTrangContext context) : base(context)
        {
            _context = context;
        }       
    }
}

