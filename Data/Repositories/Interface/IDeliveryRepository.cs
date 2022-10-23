using System;
using System.Collections.Generic;
using ThonTrang.Data.Models;
using ThonTrang.Data.Repositories;

namespace ThonTrang.Data.Repositories
{
    public interface IDeliveryRepository : IRepository<Delivery>
    {
        public Delivery GetByOrderID(int orderID);
        public List<Delivery> GetByDateBeginAndDateEndToList(DateTime dateBegin, DateTime dateEnd);
    }
}

