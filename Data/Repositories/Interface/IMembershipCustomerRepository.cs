using System.Collections.Generic;
using ThonTrang.Data.Models;
using ThonTrang.Data.Repositories;

namespace ThonTrang.Data.Repositories
{
    public interface IMembershipCustomerRepository : IRepository<MembershipCustomer>
    {
        public MembershipCustomer GetByParentIDAndCustomerID(int parentID, int customerID);
        public List<MembershipCustomer> GetByParentIDAndActiveAndSearchStringToList(int parentID, bool active, string searchString);
    }
}

