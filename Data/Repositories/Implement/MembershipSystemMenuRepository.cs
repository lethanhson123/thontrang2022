using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using ThonTrang.Data.Models;
using ThonTrang.Data.Repositories;
using ThonTrang.Helpers;

namespace ThonTrang.Data.Repositories
{
    public class MembershipSystemMenuRepository : Repository<MembershipSystemMenu>, IMembershipSystemMenuRepository
    {
        private readonly ThonTrangContext _context;
        public MembershipSystemMenuRepository(ThonTrangContext context) : base(context)
        {
            _context = context;
        }
        public override List<MembershipSystemMenu> GetByParentIDToList(int parentID)
        {
            List<MembershipSystemMenu> list = new List<MembershipSystemMenu>();
            SqlParameter[] parameters =
            {
                    new SqlParameter("@ParentID",parentID),
                };
            DataTable dt = SQLHelper.Fill(AppGlobal.SQLServerConectionString, "sp_MembershipSystemMenuSelectItemsByParentID", parameters);
            list = SQLHelper.ToList<MembershipSystemMenu>(dt);
            return list;
        }
        public override List<MembershipSystemMenu> GetByParentIDAndActiveToList(int parentID, bool active)
        {
            List<MembershipSystemMenu> list = new List<MembershipSystemMenu>();
            SqlParameter[] parameters =
            {
                    new SqlParameter("@ParentID",parentID),
                    new SqlParameter("@Active",active),
                };
            DataTable dt = SQLHelper.Fill(AppGlobal.SQLServerConectionString, "sp_MembershipSystemMenuSelectItemsByParentIDAndActive", parameters);
            list = SQLHelper.ToList<MembershipSystemMenu>(dt);
            return list;
        }
    }
}

