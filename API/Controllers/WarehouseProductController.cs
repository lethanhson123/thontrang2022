using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using ThonTrang.Data.Models;
using ThonTrang.Data.Repositories;
using ThonTrang.Helpers;

namespace ThonTrang.API.Controllers
{
    public class WarehouseProductController : BaseController
    {
        private readonly IWarehouseProductRepository _warehouseProductRepository;
        public WarehouseProductController(IWarehouseProductRepository warehouseProductRepository) : base()
        {
            _warehouseProductRepository = warehouseProductRepository;
        }
        [HttpPost]
        public WarehouseProduct Save(WarehouseProduct model)
        {
            var result = AppGlobal.InitializationNumber;
            if (model.ID > 0)
            {
                result = _warehouseProductRepository.Update(model);
            }
            else
            {
                result = _warehouseProductRepository.Add(model);
            }
            return model;
        }

        [HttpGet]
        public List<WarehouseProduct> GetAllToList()
        {
            var result = _warehouseProductRepository.GetAllToList();
            return result;
        }
        [HttpGet]
        public List<WarehouseProduct> GetBySearchStringToList(string searchString)
        {
            var result = _warehouseProductRepository.GetBySearchStringToList(searchString);
            return result;
        }

        [HttpGet]
        public WarehouseProduct GetByID(int ID)
        {
            WarehouseProduct result = _warehouseProductRepository.GetByID(ID);
            if (result == null)
            {
                result = new WarehouseProduct();
                result.Active = true;
            }
            return result;
        }
    }
}

