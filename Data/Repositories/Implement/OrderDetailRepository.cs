using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using ThonTrang.Data.Models;
using ThonTrang.Data.Repositories;
using ThonTrang.Helpers;

namespace ThonTrang.Data.Repositories
{
    public class OrderDetailRepository : Repository<OrderDetail>, IOrderDetailRepository
    {
        private readonly ThonTrangContext _context;
        public OrderDetailRepository(ThonTrangContext context) : base(context)
        {
            _context = context;
        }
        public override void Initialization(OrderDetail model)
        {
            model.DateUpdated = AppGlobal.InitializationDateTime;
            if (model.DateCreated == null)
            {
                model.DateCreated = AppGlobal.InitializationDateTime;
            }
            if (model.Active == null)
            {
                model.Active = true;
            }
            if (string.IsNullOrEmpty(model.Code))
            {
                model.Code = AppGlobal.InitializationDateTimeTicksCode.Substring(0, 5);
            }
            if (string.IsNullOrEmpty(model.Name))
            {
                model.Name = model.Code;
            }
            if (!string.IsNullOrEmpty(model.Name))
            {
                model.Name = model.Name.Trim();
            }
            if (string.IsNullOrEmpty(model.Display))
            {
                model.Display = model.Name;
            }
            if (model.Quantity == null)
            {
                model.Quantity = AppGlobal.InitializationNumber;
            }
            if (model.Price == null)
            {
                model.Price = AppGlobal.InitializationNumber;
            }
            if (model.Weight == null)
            {
                model.Weight = AppGlobal.InitializationNumber;
            }
            model.Total = model.Quantity * model.Price;            
        }        
    }
}

