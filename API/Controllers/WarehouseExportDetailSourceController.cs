using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using ThonTrang.Data.Models;
using ThonTrang.Data.Repositories;
using ThonTrang.Helpers;

namespace ThonTrang.API.Controllers
{
    public class WarehouseExportDetailSourceController : BaseController
    {
        private readonly IWarehouseExportDetailSourceRepository _warehouseExportDetailSourceRepository;
        public WarehouseExportDetailSourceController(IWarehouseExportDetailSourceRepository warehouseExportDetailSourceRepository) : base()
        {
            _warehouseExportDetailSourceRepository = warehouseExportDetailSourceRepository;
        }
        [HttpPost]
        public WarehouseExportDetailSource Save(WarehouseExportDetailSource model)
        {
            var result = AppGlobal.InitializationNumber;
            if (model.ID > 0)
            {
                result = _warehouseExportDetailSourceRepository.Update(model);
            }
            else
            {
                result = _warehouseExportDetailSourceRepository.Add(model);
            }
            _warehouseExportDetailSourceRepository.InitializationByID(model.ID);
            return model;
        }       
        [HttpGet]
        public List<WarehouseExportDetailSource> GetByParentIDToList(int parentID)
        {
            var result = _warehouseExportDetailSourceRepository.GetByParentIDToList(parentID);
            return result;
        }       
    }
}

