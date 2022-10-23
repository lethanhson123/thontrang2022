using System.Collections.Generic;
using System.Linq;
using ThonTrang.Data.Models;
using ThonTrang.Data.Repositories;
using ThonTrang.Helpers;

namespace ThonTrang.Data.Repositories
{
    public class DistrictRepository : Repository<District>, IDistrictRepository
    {
        private readonly ThonTrangContext _context;
        public DistrictRepository(ThonTrangContext context) : base(context)
        {
            _context = context;
        }
        public override void Initialization(District model)
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
                    model.Display = model.Display.Replace(@"Quận", @"");
                    model.Display = model.Display.Replace(@"Huyện", @"");
                    model.Display = model.Display.Replace(@"Thị xã", @"");
                    model.Display = model.Display.Trim();
                }
            }
        }
    }
}

