using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using ThonTrang.Data.Models;
using ThonTrang.Data.Repositories;
using ThonTrang.Helpers;

namespace ThonTrang.Data.Repositories
{
    public class WarehouseCancelDetailRepository : Repository<WarehouseCancelDetail>, IWarehouseCancelDetailRepository
    {
        private readonly ThonTrangContext _context;
        public WarehouseCancelDetailRepository(ThonTrangContext context) : base(context)
        {
            _context = context;
        }
        public override void Initialization(WarehouseCancelDetail model)
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

