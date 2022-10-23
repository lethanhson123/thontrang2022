using System.Collections.Generic;
using ThonTrang.Data.Models;
using ThonTrang.Data.Repositories;

namespace ThonTrang.Data.Repositories
{
    public interface IOrderRepository : IRepository<Order>
    {        
        public List<Order> GetByActiveAndStatusIDAndYearAndMonthAndSearchStringToList(bool active, int statusID, int year, int month, string searchString);
        public List<Order> GetByActiveAndStatusIDAndUserFoundedIDAndSearchStringToList(bool active, int statusID, int userFoundedID, string searchString);
    }
}

