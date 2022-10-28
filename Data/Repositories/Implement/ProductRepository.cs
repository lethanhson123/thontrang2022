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
    public class ProductRepository : Repository<Product>, IProductRepository
    {
        private readonly ThonTrangContext _context;
        public ProductRepository(ThonTrangContext context) : base(context)
        {
            _context = context;
        }
        public override void Initialization(Product model)
        {
            model.DateUpdated = AppGlobal.InitializationDateTime;
            if (model.DateCreated == null)
            {
                model.DateCreated = AppGlobal.InitializationDateTime;
            }
            if (model.Active == null)
            {
                model.Active = false;
            }
            if (!string.IsNullOrEmpty(model.NameOriginal))
            {
                model.NameOriginal = model.NameOriginal.Trim();
            }
            if (!string.IsNullOrEmpty(model.Specifications))
            {
                model.Specifications = model.Specifications.Trim();
            }
            if (!string.IsNullOrEmpty(model.NameSpecial))
            {
                model.NameSpecial = model.NameSpecial.Trim();
            }
            if (string.IsNullOrEmpty(model.Name))
            {
                model.Name = model.NameOriginal + " " + model.Specifications + " " + model.NameSpecial;
            }
            else
            {
                if (!string.IsNullOrEmpty(model.Name))
                {
                    model.Name = model.Name.Trim();
                }
                if (string.IsNullOrEmpty(model.NameOriginal))
                {

                }
                if (string.IsNullOrEmpty(model.Specifications))
                {

                }
                if (string.IsNullOrEmpty(model.NameSpecial))
                {

                }
            }
            if (string.IsNullOrEmpty(model.Display))
            {
                model.Display = model.Name;
            }
            if (string.IsNullOrEmpty(model.Code))
            {
                model.Code = model.Name;
            }
            if (model.Weight == null)
            {
                model.Weight = AppGlobal.InitializationNumber;
            }
            if (model.QuantityImport == null)
            {
                model.QuantityImport = AppGlobal.InitializationNumber;
            }
            if (model.QuantityImport02 == null)
            {
                model.QuantityImport02 = AppGlobal.InitializationNumber;
            }
            if (model.QuantityExport == null)
            {
                model.QuantityExport = AppGlobal.InitializationNumber;
            }
            if (model.QuantityExport02 == null)
            {
                model.QuantityExport02 = AppGlobal.InitializationNumber;
            }
            if (model.QuantityInStock == null)
            {
                model.QuantityInStock = AppGlobal.InitializationNumber;
            }
            if (model.QuantityInStock02 == null)
            {
                model.QuantityInStock02 = AppGlobal.InitializationNumber;
            }
            if (string.IsNullOrEmpty(model.ImageFileName))
            {
                if (model.CompanyID == AppGlobal.CompanyID)
                {
                    model.ImageFileName = AppGlobal.LogoFileName;
                }
                if (model.CompanyID == AppGlobal.BiBenID)
                {
                    model.ImageFileName = AppGlobal.BiBenFileName;
                }
                if (model.CompanyID == AppGlobal.VyTamID)
                {
                    model.ImageFileName = AppGlobal.VyTamFileName;
                }
            }
            if (string.IsNullOrEmpty(model.ImageURL))
            {
                model.ImageURL = AppGlobal.APISite + AppGlobal.Images + "/" + AppGlobal.Product + "/" + model.ImageFileName;
            }
        }
        public override List<Product> GetAllToList()
        {
            List<Product> list = new List<Product>();
            DataTable dt = SQLHelper.Fill(AppGlobal.SQLServerConectionString, "sp_ProductSelectAllItems");
            list = SQLHelper.ToList<Product>(dt);
            return list;
        }
        public override List<Product> GetBySearchStringToList(string searchString)
        {
            List<Product> list = new List<Product>();
            if (!string.IsNullOrEmpty(searchString))
            {
                searchString = searchString.Trim();
                SqlParameter[] parameters =
                {
                    new SqlParameter("@SearchString",searchString),
                };
                DataTable dt = SQLHelper.Fill(AppGlobal.SQLServerConectionString, "sp_ProductSelectItemsBySearchString", parameters);
                list = SQLHelper.ToList<Product>(dt);
            }
            else
            {
                list = GetAllToList();
            }
            return list;
        }
        public List<Product> GetByCompanyIDToList(int companyID)
        {
            List<Product> list = new List<Product>();
            SqlParameter[] parameters =
            {
                    new SqlParameter("@CompanyID",companyID),
                };
            DataTable dt = SQLHelper.Fill(AppGlobal.SQLServerConectionString, "sp_ProductSelectItemsByCompanyID", parameters);
            list = SQLHelper.ToList<Product>(dt);
            return list;
        }
        public List<Product> GetByCompanyIDAndSearchStringToList(int companyID, string searchString)
        {
            List<Product> list = new List<Product>();
            if (!string.IsNullOrEmpty(searchString))
            {
                searchString = searchString.Trim();
                SqlParameter[] parameters =
                {
                    new SqlParameter("@CompanyID",companyID),
                    new SqlParameter("@SearchString",searchString),
                };
                DataTable dt = SQLHelper.Fill(AppGlobal.SQLServerConectionString, "sp_ProductSelectItemsByCompanyIDAndSearchString", parameters);
                list = SQLHelper.ToList<Product>(dt);
            }
            else
            {
                list = GetByCompanyIDToList(companyID);
            }
            return list;
        }
        public List<Product> GetByDateBeginAndDateEndToList(DateTime dateBegin, DateTime dateEnd)
        {
            List<Product> list = new List<Product>();
            dateBegin = new DateTime(dateBegin.Year, dateBegin.Month, dateBegin.Day, 0, 0, 0);
            dateEnd = new DateTime(dateEnd.Year, dateEnd.Month, dateEnd.Day, 23, 59, 59);
            SqlParameter[] parameters =
            {
                    new SqlParameter("@DateBegin",dateBegin),
                    new SqlParameter("@DateEnd",dateEnd),
            };
            DataTable dt = SQLHelper.Fill(AppGlobal.SQLServerConectionString, "sp_ProductSelectItemsByDateBeginAndDateEnd", parameters);
            list = SQLHelper.ToList<Product>(dt);
            return list;
        }
        public List<Product> GetByDateBeginAndDateEndAndSearchStringToList(DateTime dateBegin, DateTime dateEnd, string searchString)
        {
            List<Product> list = new List<Product>();
            dateBegin = new DateTime(dateBegin.Year, dateBegin.Month, dateBegin.Day, 0, 0, 0);
            dateEnd = new DateTime(dateEnd.Year, dateEnd.Month, dateEnd.Day, 23, 59, 59);
            if (!string.IsNullOrEmpty(searchString))
            {
                searchString = searchString.Trim();
                SqlParameter[] parameters =
                {
                     new SqlParameter("@DateBegin",dateBegin),
                    new SqlParameter("@DateEnd",dateEnd),
                    new SqlParameter("@SearchString",searchString),
                };
                DataTable dt = SQLHelper.Fill(AppGlobal.SQLServerConectionString, "sp_ProductSelectItemsByDateBeginAndDateEndAndSearchString", parameters);
                list = SQLHelper.ToList<Product>(dt);
            }
            else
            {
                list = GetByDateBeginAndDateEndToList(dateBegin, dateEnd);
            }
            return list;
        }
    }
}

