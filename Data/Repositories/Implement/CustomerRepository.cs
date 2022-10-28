using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using ThonTrang.Data.Models;
using ThonTrang.Data.Repositories;
using ThonTrang.Helpers;

namespace ThonTrang.Data.Repositories
{
    public class CustomerRepository : Repository<Customer>, ICustomerRepository
    {
        private readonly ThonTrangContext _context;
        public CustomerRepository(ThonTrangContext context) : base(context)
        {
            _context = context;
        }
        public override void Initialization(Customer model)
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
            if (!string.IsNullOrEmpty(model.Name))
            {
                model.Name = model.Name.Trim();
            }
            if (string.IsNullOrEmpty(model.Display))
            {
                model.Display = model.Name;
            }
            if (string.IsNullOrEmpty(model.Code))
            {
                model.Code = model.Name;
            }
            if (string.IsNullOrEmpty(model.GUICode))
            {
                model.GUICode = AppGlobal.InitializationGUICode;
            }
            if (string.IsNullOrEmpty(model.Account))
            {
                model.Account = model.Phone;
            }
            if (string.IsNullOrEmpty(model.Password))
            {
                model.Password = "0";
            }
            EncryptPassword(model);
        }
        private static void EncryptPassword(Customer model)
        {
            model.Password = SecurityHelper.Encrypt(model.GUICode, model.Password);
        }
        public static void DecryptPassword(Customer model)
        {
            model.Password = SecurityHelper.Decrypt(model.GUICode, model.Password);
        }
        public override List<Customer> GetAllToList()
        {
            List<Customer> list = new List<Customer>();
            DataTable dt = SQLHelper.Fill(AppGlobal.SQLServerConectionString, "sp_CustomerSelectAllItems");
            list = SQLHelper.ToList<Customer>(dt);
            return list;
        }       
        public override List<Customer> GetBySearchStringToList(string searchString)
        {
            List<Customer> list = new List<Customer>();
            if (!string.IsNullOrEmpty(searchString))
            {
                searchString = searchString.Trim();
                SqlParameter[] parameters =
                {
                    new SqlParameter("@SearchString",searchString),
                };
                DataTable dt = SQLHelper.Fill(AppGlobal.SQLServerConectionString, "sp_CustomerSelectItemsBySearchString", parameters);
                list = SQLHelper.ToList<Customer>(dt);
            }
            else
            {
                list = GetAllToList();
            }
            return list;
        }
        public List<Customer> GetByParentIDAndProvinceIDToList(int parentID, int provinceID)
        {
            List<Customer> list = new List<Customer>();
            SqlParameter[] parameters =
               {
                    new SqlParameter("@ParentID",parentID), 
                    new SqlParameter("@ProvinceID",provinceID),
               };
            DataTable dt = SQLHelper.Fill(AppGlobal.SQLServerConectionString, "sp_CustomerSelectItemsByParentIDAndProvinceID", parameters);
            list = SQLHelper.ToList<Customer>(dt);
            return list;
        }
    }
}

