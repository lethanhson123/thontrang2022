using System;
using System.Collections.Generic;
using ThonTrang.Data.Models;
using ThonTrang.Data.Repositories;

namespace ThonTrang.Data.Repositories
{
    public interface IMembershipAccessHistoryRepository : IRepository<MembershipAccessHistory>
    {
        public List<MembershipAccessHistory> GetByDateBeginAndDateEndToList(DateTime dateBegin, DateTime dateEnd);
    }
}

