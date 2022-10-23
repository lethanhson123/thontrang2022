using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using ThonTrang.Data.Models;
using ThonTrang.Data.Repositories;
using ThonTrang.Helpers;

namespace ThonTrang.Data.Repositories
{
    public class MembershipRepository : Repository<Membership>, IMembershipRepository
    {
        private readonly ThonTrangContext _context;
        public MembershipRepository(ThonTrangContext context) : base(context)
        {
            _context = context;
        }
        public override void Initialization(Membership model)
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
        private static void EncryptPassword(Membership model)
        {
            model.Password = SecurityHelper.Encrypt(model.GUICode, model.Password);
        }
        public static void DecryptPassword(Membership model)
        {
            model.Password = SecurityHelper.Decrypt(model.GUICode, model.Password);
        }
        public int InitializationSQL()
        {
            int result = AppGlobal.InitializationNumber;
            SQLHelper.ExecuteNonQuery(AppGlobal.SQLServerConectionString, "sp_MembershipInitialization");
            return result;
        }
        public Membership AuthenticationByAccountAndPasswordAndURL(string account, string password, string urlDestination)
        {
            Membership result = new Membership();
            result = _context.Set<Membership>().AsNoTracking().FirstOrDefault(model => model.Account == account && model.Active == true);
            bool check = false;
            if (result != null)
            {
                if (string.IsNullOrEmpty(result.GUICode))
                {
                    result.Password = password;
                    Update(result);
                }
                string passwordDecrypt = SecurityHelper.Decrypt(result.GUICode, result.Password);
                if (passwordDecrypt.Equals(password))
                {
                    check = true;
                }
            }
            if (check == true)
            {
                MembershipAuthenticationToken membershipAuthenticationToken = new MembershipAuthenticationToken();
                membershipAuthenticationToken.ParentID = result.ID;
                membershipAuthenticationToken.AuthenticationToken = AppGlobal.InitializationGUICode;
                membershipAuthenticationToken.DateBegin = AppGlobal.InitializationDateTime;
                membershipAuthenticationToken.DateEnd = membershipAuthenticationToken.DateBegin.Value.AddMonths(1);
                membershipAuthenticationToken.DateCreated = AppGlobal.InitializationDateTime;
                membershipAuthenticationToken.DateUpdated = AppGlobal.InitializationDateTime;
                membershipAuthenticationToken.Active = true;
                _context.Set<MembershipAuthenticationToken>().Add(membershipAuthenticationToken);
                int resultSave = _context.SaveChanges();
                result.Note = membershipAuthenticationToken.AuthenticationToken;
                result.Description = urlDestination + "?AuthenticationToken=" + membershipAuthenticationToken.AuthenticationToken;
            }
            else
            {
                result = new Membership();
            }
            return result;
        }
        public override List<Membership> GetAllToList()
        {
            List<Membership> list = new List<Membership>();
            DataTable dt = SQLHelper.Fill(AppGlobal.SQLServerConectionString, "sp_MembershipSelectAllItems");
            list = SQLHelper.ToList<Membership>(dt);
            return list;
        }
        public override List<Membership> GetBySearchStringToList(string searchString)
        {
            List<Membership> list = new List<Membership>();
            if (!string.IsNullOrEmpty(searchString))
            {
                SqlParameter[] parameters =
               {
                    new SqlParameter("@SearchString",searchString),
                };
                DataTable dt = SQLHelper.Fill(AppGlobal.SQLServerConectionString, "sp_MembershipSelectItemsBySearchString", parameters);
                list = SQLHelper.ToList<Membership>(dt);
            }
            else
            {
                list = GetAllToList();
            }
            return list;
        }

    }
}

