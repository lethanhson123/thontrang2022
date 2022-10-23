using System.Collections.Generic;
using ThonTrang.Data.Models;
using ThonTrang.Data.Repositories;

namespace ThonTrang.Data.Repositories
{
    public interface IMembershipRepository : IRepository<Membership>
    {
        public Membership AuthenticationByAccountAndPasswordAndURL(string account, string password, string urlDestination);
    }
}

