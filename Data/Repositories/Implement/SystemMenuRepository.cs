using System.Collections.Generic;
using System.Data;
using System.Linq;
using ThonTrang.Data.Models;
using ThonTrang.Data.Repositories;
using ThonTrang.Helpers;

namespace ThonTrang.Data.Repositories
{
    public class SystemMenuRepository : Repository<SystemMenu>, ISystemMenuRepository
    {
        private readonly ThonTrangContext _context;
        public SystemMenuRepository(ThonTrangContext context) : base(context)
        {
            _context = context;
        }
        public override List<SystemMenu> GetAllToList()
        {
            List<SystemMenu> list = new List<SystemMenu>();
            DataTable dt = SQLHelper.Fill(AppGlobal.SQLServerConectionString, "sp_SystemMenuSelectAllItems");
            list = SQLHelper.ToList<SystemMenu>(dt);
            return list;
        }
    }
}

