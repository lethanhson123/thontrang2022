using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using ThonTrang.Data.Models;
using ThonTrang.Data.Repositories;
using ThonTrang.Helpers;

namespace ThonTrang.API.Controllers
{
    public class WarehouseImportDetailController : BaseController
    {
        private readonly IWarehouseImportDetailRepository _warehouseImportDetailRepository;
        private readonly IWarehouseImportRepository _warehouseImportRepository;
        public WarehouseImportDetailController(IWarehouseImportDetailRepository warehouseImportDetailRepository, IWarehouseImportRepository warehouseImportRepository) : base()
        {
            _warehouseImportDetailRepository = warehouseImportDetailRepository;
            _warehouseImportRepository = warehouseImportRepository;
        }
        [HttpPost]
        public WarehouseImportDetail Save(WarehouseImportDetail model)
        {
            var result = AppGlobal.InitializationNumber;
            if (model.ID > 0)
            {
                result = _warehouseImportDetailRepository.Update(model);
            }
            else
            {
                result = _warehouseImportDetailRepository.Add(model);
            }            
            return model;
        }
        [HttpGet]
        public List<WarehouseImportDetail> GetByParentIDToList(int parentID)
        {
            var result = _warehouseImportDetailRepository.GetByParentIDToList(parentID);
            return result;
        }
        
        [HttpGet]
        public int Remove(int ID)
        {
            var result = _warehouseImportDetailRepository.Remove(ID);
            return result;
        }
    }
}

