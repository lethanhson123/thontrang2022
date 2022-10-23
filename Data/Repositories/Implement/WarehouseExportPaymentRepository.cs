using System.Collections.Generic;
using System.Data;
using System.Linq;
using ThonTrang.Data.Models;
using ThonTrang.Data.Repositories;
using ThonTrang.Helpers;

namespace ThonTrang.Data.Repositories
{
    public class WarehouseExportPaymentRepository : Repository<WarehouseExportPayment>, IWarehouseExportPaymentRepository
    {
        private readonly ThonTrangContext _context;
        public WarehouseExportPaymentRepository(ThonTrangContext context) : base(context)
        {
            _context = context;
        }       
    }
}

