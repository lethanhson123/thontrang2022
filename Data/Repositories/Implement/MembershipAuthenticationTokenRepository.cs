using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using ThonTrang.Data.Models;
using ThonTrang.Data.Repositories;
using ThonTrang.Helpers;

namespace ThonTrang.Data.Repositories
{
    public class MembershipAuthenticationTokenRepository : Repository<MembershipAuthenticationToken>, IMembershipAuthenticationTokenRepository
    {
        private readonly ThonTrangContext _context;
        public MembershipAuthenticationTokenRepository(ThonTrangContext context) : base(context)
        {
            _context = context;
        }
        public MembershipAuthenticationToken GetByAuthenticationToken(string authenticationToken)
        {
            MembershipAuthenticationToken result = new MembershipAuthenticationToken();
            if (!string.IsNullOrEmpty(authenticationToken))
            {
                authenticationToken = authenticationToken.Trim();
                result = _context.Set<MembershipAuthenticationToken>().AsNoTracking().FirstOrDefault(model => model.AuthenticationToken == authenticationToken);
            }
            return result;
        }
    }
}

