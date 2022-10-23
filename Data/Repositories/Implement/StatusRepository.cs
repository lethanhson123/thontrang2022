using System.Collections.Generic;
using System.Linq;
using ThonTrang.Data.Models;
using ThonTrang.Data.Repositories;
using ThonTrang.Helpers;

namespace ThonTrang.Data.Repositories
{
    public class StatusRepository : Repository<Status>, IStatusRepository
    {
        private readonly ThonTrangContext _context;
        public StatusRepository(ThonTrangContext context) : base(context)
        {
            _context = context;
        }       
    }
}

