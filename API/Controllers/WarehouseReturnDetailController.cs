using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using ThonTrang.Data.Models;
using ThonTrang.Data.Repositories;
using ThonTrang.Helpers;

namespace ThonTrang.API.Controllers
{
    public class WarehouseReturnDetailController : BaseController
    {
        private readonly IWarehouseReturnDetailRepository _warehouseReturnDetailRepository;
        private readonly IWarehouseReturnRepository _warehouseReturnRepository;
        public WarehouseReturnDetailController(IWarehouseReturnDetailRepository warehouseReturnDetailRepository, IWarehouseReturnRepository warehouseReturnRepository) : base()
        {
            _warehouseReturnDetailRepository = warehouseReturnDetailRepository;
            _warehouseReturnRepository = warehouseReturnRepository;
        }
        [HttpPost]
        public WarehouseReturnDetail Save(WarehouseReturnDetail model)
        {
            var result = AppGlobal.InitializationNumber;
            if (model.ID > 0)
            {
                result = _warehouseReturnDetailRepository.Update(model);
            }
            else
            {
                result = _warehouseReturnDetailRepository.Add(model);
            }
            if (result > 0)
            {
                _warehouseReturnRepository.InitializationByID(model.ParentID.Value);
            }
            return model;
        }
        [HttpGet]
        public List<WarehouseReturnDetail> GetByParentIDToList(int parentID)
        {
            var result = _warehouseReturnDetailRepository.GetByParentIDToList(parentID);
            return result;
        }
        [HttpGet]
        public int Remove(int ID)
        {
            var result = _warehouseReturnDetailRepository.Remove(ID);
            return result;
        }
    }
}

