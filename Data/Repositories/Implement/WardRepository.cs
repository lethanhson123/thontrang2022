using System.Collections.Generic;
using System.Linq;
using ThonTrang.Data.Models;
using ThonTrang.Data.Repositories;
using ThonTrang.Helpers;

namespace ThonTrang.Data.Repositories
{
    public class WardRepository : Repository<Ward>, IWardRepository
    {
        private readonly ThonTrangContext _context;
        public WardRepository(ThonTrangContext context) : base(context)
        {
            _context = context;
        }
        public override void Initialization(Ward model)
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
            if (string.IsNullOrEmpty(model.Display))
            {
                if (!string.IsNullOrEmpty(model.Name))
                {
                    model.Display = model.Name;
                    model.Display = model.Display.Replace(@"Phường", @"");
                    model.Display = model.Display.Replace(@"Xã", @"");
                    model.Display = model.Display.Replace(@"Thị trấn", @"");
                    model.Display = model.Display.Trim();
                }
            }
        }
    }
}

