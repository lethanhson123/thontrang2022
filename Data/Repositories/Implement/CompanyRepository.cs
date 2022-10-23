using System.Collections.Generic;
using System.Data;
using System.Linq;
using ThonTrang.Data.Models;
using ThonTrang.Data.Repositories;
using ThonTrang.Helpers;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Database;

namespace ThonTrang.Data.Repositories
{
    public class CompanyRepository : Repository<Company>, ICompanyRepository
    {
        private readonly ThonTrangContext _context;
        public CompanyRepository(ThonTrangContext context) : base(context)
        {
            _context = context;
        }
        public override List<Company> GetAllToList()
        {
            List<Company> list = new List<Company>();
            DataTable dt = SQLHelper.Fill(AppGlobal.SQLServerConectionString, "sp_CompanySelectAllItems");
            list = SQLHelper.ToList<Company>(dt);
            return list;
        }
    }
}

