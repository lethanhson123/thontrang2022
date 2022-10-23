using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using ThonTrang.Data.Models;
using ThonTrang.Data.Repositories;
using ThonTrang.Helpers;

namespace ThonTrang.Data.Repositories
{
    public class ReportRepository : IReportRepository
    {
        public ReportRepository()
        {
        }
        public CustomerDataTransfer ChiTietBanHangByCustomerIDAndDateBeginAndDateEnd(int customerID, DateTime dateBegin, DateTime dateEnd)
        {
            CustomerDataTransfer result = new CustomerDataTransfer();

            dateBegin = new DateTime(dateBegin.Year, dateBegin.Month, dateBegin.Day, 0, 0, 0);
            dateEnd = new DateTime(dateEnd.Year, dateEnd.Month, dateEnd.Day, 23, 59, 59);
            SqlParameter[] parameters =
            {
                    new SqlParameter("@CustomerID",customerID),
                    new SqlParameter("@DateBegin",dateBegin),
                    new SqlParameter("@DateEnd",dateEnd),
                };
            DataTable dt = SQLHelper.Fill(AppGlobal.SQLServerConectionString, "sp_Report_ChiTietBanHangByCustomerIDAndDateBeginAndDateEnd", parameters);
            List<CustomerDataTransfer> list = SQLHelper.ToList<CustomerDataTransfer>(dt);
            if (list.Count > 0)
            {
                result = list[0];
            }
            return result;
        }

        public List<WarehouseExportDetail> ChiTietBanHangByCustomerIDAndDateBeginAndDateEnd001ToList(int customerID, DateTime dateBegin, DateTime dateEnd)
        {
            List<WarehouseExportDetail> result = new List<WarehouseExportDetail>();
            dateBegin = new DateTime(dateBegin.Year, dateBegin.Month, dateBegin.Day, 0, 0, 0);
            dateEnd = new DateTime(dateEnd.Year, dateEnd.Month, dateEnd.Day, 23, 59, 59);
            SqlParameter[] parameters =
            {
                    new SqlParameter("@CustomerID",customerID),
                    new SqlParameter("@DateBegin",dateBegin),
                    new SqlParameter("@DateEnd",dateEnd),
                };
            DataTable dt = SQLHelper.Fill(AppGlobal.SQLServerConectionString, "sp_Report_ChiTietBanHangByCustomerIDAndDateBeginAndDateEnd001", parameters);
            result = SQLHelper.ToList<WarehouseExportDetail>(dt);
            return result;
        }
        public List<WarehouseExportDetail> ChiTietBanHangByCustomerIDAndDateBeginAndDateEnd002ToList(int customerID, DateTime dateBegin, DateTime dateEnd)
        {
            List<WarehouseExportDetail> result = new List<WarehouseExportDetail>();
            dateBegin = new DateTime(dateBegin.Year, dateBegin.Month, dateBegin.Day, 0, 0, 0);
            dateEnd = new DateTime(dateEnd.Year, dateEnd.Month, dateEnd.Day, 23, 59, 59);
            SqlParameter[] parameters =
            {
                    new SqlParameter("@CustomerID",customerID),
                    new SqlParameter("@DateBegin",dateBegin),
                    new SqlParameter("@DateEnd",dateEnd),
                };
            DataTable dt = SQLHelper.Fill(AppGlobal.SQLServerConectionString, "sp_Report_ChiTietBanHangByCustomerIDAndDateBeginAndDateEnd002", parameters);
            result = SQLHelper.ToList<WarehouseExportDetail>(dt);
            return result;
        }
        public List<ProductDataTransfer> TheKhoByDateBeginAndDateEndToList(DateTime dateBegin, DateTime dateEnd)
        {
            List<ProductDataTransfer> result = new List<ProductDataTransfer>();
            dateBegin = new DateTime(dateBegin.Year, dateBegin.Month, dateBegin.Day, 0, 0, 0);
            dateEnd = new DateTime(dateEnd.Year, dateEnd.Month, dateEnd.Day, 23, 59, 59);
            SqlParameter[] parameters =
            {                    
                    new SqlParameter("@DateBegin",dateBegin),
                    new SqlParameter("@DateEnd",dateEnd),
                };
            DataTable dt = SQLHelper.Fill(AppGlobal.SQLServerConectionString, "sp_Report_TheKhoByDateBeginAndDateEnd", parameters);
            result = SQLHelper.ToList<ProductDataTransfer>(dt);
            return result;
        }
        public List<ProductDataTransfer> TheKhoByProductIDAndDateBeginAndDateEndToList(int productID, DateTime dateBegin, DateTime dateEnd)
        {
            List<ProductDataTransfer> result = new List<ProductDataTransfer>();
            dateBegin = new DateTime(dateBegin.Year, dateBegin.Month, dateBegin.Day, 0, 0, 0);
            dateEnd = new DateTime(dateEnd.Year, dateEnd.Month, dateEnd.Day, 23, 59, 59);
            SqlParameter[] parameters =
            {
                    new SqlParameter("@ProductID",productID),
                    new SqlParameter("@DateBegin",dateBegin),
                    new SqlParameter("@DateEnd",dateEnd),
                };
            DataTable dt = SQLHelper.Fill(AppGlobal.SQLServerConectionString, "sp_Report_TheKhoByProductIDAndDateBeginAndDateEnd", parameters);
            result = SQLHelper.ToList<ProductDataTransfer>(dt);
            return result;
        }
    }
}

