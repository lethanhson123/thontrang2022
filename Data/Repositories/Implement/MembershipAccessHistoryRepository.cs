using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using ThonTrang.Data.Models;
using ThonTrang.Data.Repositories;
using ThonTrang.Helpers;

namespace ThonTrang.Data.Repositories
{
    public class MembershipAccessHistoryRepository : Repository<MembershipAccessHistory>, IMembershipAccessHistoryRepository
    {
        private readonly ThonTrangContext _context;
        public MembershipAccessHistoryRepository(ThonTrangContext context) : base(context)
        {
            _context = context;
        }
        public List<MembershipAccessHistory> GetByDateBeginAndDateEndToList(DateTime dateBegin, DateTime dateEnd)
        {
            List<MembershipAccessHistory> result = new List<MembershipAccessHistory>();
            dateBegin = new DateTime(dateBegin.Year, dateBegin.Month, dateBegin.Day, 0, 0, 0);
            dateEnd = new DateTime(dateEnd.Year, dateEnd.Month, dateEnd.Day, 23, 59, 59);
            result = _context.Set<MembershipAccessHistory>().Where(model => model.DateAccess >= dateBegin && model.DateAccess <= dateEnd).OrderByDescending(model => model.DateAccess).ToList();
            return result;
        }
    }
}

