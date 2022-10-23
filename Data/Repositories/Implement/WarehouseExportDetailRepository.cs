using System.Data.SqlClient;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using ThonTrang.Data.Models;
using ThonTrang.Data.Repositories;
using ThonTrang.Helpers;
using System;

namespace ThonTrang.Data.Repositories
{
    public class WarehouseExportDetailRepository : Repository<WarehouseExportDetail>, IWarehouseExportDetailRepository
    {
        private readonly ThonTrangContext _context;
        public WarehouseExportDetailRepository(ThonTrangContext context) : base(context)
        {
            _context = context;
        }
        public override void Initialization(WarehouseExportDetail model)
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

        public List<WarehouseExportDetail> GetByOrderIDToList(int orderID)
        {
            List<WarehouseExportDetail> list = new List<WarehouseExportDetail>();
            SqlParameter[] parameters =
            {
                    new SqlParameter("@OrderID",orderID),                    
            };
            DataTable dt = SQLHelper.Fill(AppGlobal.SQLServerConectionString, "sp_WarehouseExportDetailSelectItemsByOrderID", parameters);
            list = SQLHelper.ToList<WarehouseExportDetail>(dt);
            return list;
        }
        public List<WarehouseExportDetail> GetByDateBeginAndDateEndToList(DateTime dateBegin, DateTime dateEnd)
        {
            List<WarehouseExportDetail> list = new List<WarehouseExportDetail>();
            dateBegin = new DateTime(dateBegin.Year, dateBegin.Month, dateBegin.Day, 0, 0, 0);
            dateEnd = new DateTime(dateEnd.Year, dateEnd.Month, dateEnd.Day, 23, 59, 59);
            SqlParameter[] parameters =
            {
                    new SqlParameter("@DateBegin",dateBegin),
                    new SqlParameter("@DateEnd",dateEnd),
            };
            DataTable dt = SQLHelper.Fill(AppGlobal.SQLServerConectionString, "sp_WarehouseExportDetailSelectItemsByDateBeginAndDateEnd", parameters);
            list = SQLHelper.ToList<WarehouseExportDetail>(dt);
            return list;
        }
    }
}

