using System.Collections.Generic;
using ThonTrang.Data.Models;
using ThonTrang.Data.Repositories;

namespace ThonTrang.Data.Repositories
{
    public interface IMembershipAuthenticationTokenRepository : IRepository<MembershipAuthenticationToken>
    {
        public MembershipAuthenticationToken GetByAuthenticationToken(string authenticationToken);
    }
}

