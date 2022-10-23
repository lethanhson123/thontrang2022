using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using ThonTrang.Data.Models;
using ThonTrang.Data.Repositories;
using ThonTrang.Helpers;

namespace ThonTrang.API.Controllers
{
    public class WarehouseExportPaymentController : BaseController
    {
        private readonly IWarehouseExportPaymentRepository _warehouseExportPaymentRepository;
        public WarehouseExportPaymentController(IWarehouseExportPaymentRepository warehouseExportPaymentRepository) : base()
        {
            _warehouseExportPaymentRepository = warehouseExportPaymentRepository;
        }
        [HttpPost]
        public WarehouseExportPayment Save(WarehouseExportPayment model)
        {
            var result = AppGlobal.InitializationNumber;
            if (model.ID > 0)
            {
                result = _warehouseExportPaymentRepository.Update(model);
            }
            else
            {
                result = _warehouseExportPaymentRepository.Add(model);
            }            
            return model;
        }
        [HttpGet]
        public int Remove(int ID)
        {
            var result = _warehouseExportPaymentRepository.Remove(ID);
            return result;
        }
        [HttpGet]
        public List<WarehouseExportPayment> GetByParentIDToList(int parentID)
        {
            var result = _warehouseExportPaymentRepository.GetByParentIDToList(parentID);
            return result;
        }

        
    }
}

