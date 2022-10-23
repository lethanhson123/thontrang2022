using System.Collections.Generic;
using System.Linq;
using ThonTrang.Data.Models;
using ThonTrang.Data.Repositories;
using ThonTrang.Helpers;

namespace ThonTrang.Data.Repositories
{
    public class ProvinceRepository : Repository<Province>, IProvinceRepository
    {
        private readonly ThonTrangContext _context;
        public ProvinceRepository(ThonTrangContext context) : base(context)
        {
            _context = context;
        }
        public override void Initialization(Province model)
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
                if (!string.IsNullOrEmpty(model.Name))
                {
                    model.Display = model.Name;
                    model.Display = model.Display.Replace(@"Thành phố", @"");
                    model.Display = model.Display.Replace(@"Tỉnh", @"");
                    model.Display = model.Display.Trim();
                }
            }            
        }
    }
}

