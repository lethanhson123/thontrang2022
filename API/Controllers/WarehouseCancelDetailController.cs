using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using ThonTrang.Data.Models;
using ThonTrang.Data.Repositories;
using ThonTrang.Helpers;

namespace ThonTrang.API.Controllers
{
    public class WarehouseCancelDetailController : BaseController
    {
        private readonly IWarehouseCancelDetailRepository _warehouseCancelDetailRepository;
        private readonly IWarehouseCancelRepository _warehouseCancelRepository;
        public WarehouseCancelDetailController(IWarehouseCancelDetailRepository warehouseCancelDetailRepository, IWarehouseCancelRepository warehouseCancelRepository) : base()
        {
            _warehouseCancelDetailRepository = warehouseCancelDetailRepository;
            _warehouseCancelRepository = warehouseCancelRepository;
        }
        [HttpPost]
        public WarehouseCancelDetail Save(WarehouseCancelDetail model)
        {
            var result = AppGlobal.InitializationNumber;
            if (model.ID > 0)
            {
                result = _warehouseCancelDetailRepository.Update(model);
            }
            else
            {
                result = _warehouseCancelDetailRepository.Add(model);
            }
            if (result > 0)
            {
                _warehouseCancelRepository.InitializationByID(model.ParentID.Value);
            }
            return model;
        }
        [HttpGet]
        public List<WarehouseCancelDetail> GetByParentIDToList(int parentID)
        {
            var result = _warehouseCancelDetailRepository.GetByParentIDToList(parentID);
            return result;
        }        
        [HttpGet]
        public int Remove(int ID)
        {
            var result = _warehouseCancelDetailRepository.Remove(ID);
            return result;
        }
    }
}

