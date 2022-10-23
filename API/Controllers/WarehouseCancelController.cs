using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using ThonTrang.Data.Models;
using ThonTrang.Data.Repositories;
using ThonTrang.Helpers;

namespace ThonTrang.API.Controllers
{
    public class WarehouseCancelController : BaseController
    {
        private readonly IWarehouseCancelRepository _warehouseCancelRepository;
        public WarehouseCancelController(IWarehouseCancelRepository warehouseCancelRepository) : base()
        {
            _warehouseCancelRepository = warehouseCancelRepository;
        }
        [HttpPost]
        public WarehouseCancel Save(WarehouseCancel model)
        {
            var result = AppGlobal.InitializationNumber;
            if (model.ID > 0)
            {
                result = _warehouseCancelRepository.Update(model);
            }
            else
            {
                result = _warehouseCancelRepository.Add(model);
            }
            _warehouseCancelRepository.InitializationByID(model.ID);
            return model;
        }

        [HttpGet]
        public List<WarehouseCancel> GetByActiveAndCompanyIDAndYearAndMonthAndSearchStringToList(bool active, int companyID, int year, int month, string searchString)
        {
            var result = _warehouseCancelRepository.GetByActiveAndCompanyIDAndYearAndMonthAndSearchStringToList(active, companyID, year, month, searchString);
            return result;
        }

        [HttpGet]
        public WarehouseCancel GetByID(int ID)
        {
            WarehouseCancel result = _warehouseCancelRepository.GetByID(ID);
            if (result == null)
            {
                result = new WarehouseCancel();                
            }
            return result;
        }
        [HttpGet]
        public WarehouseCancel GetByIDString(string ID)
        {
            WarehouseCancel result = new WarehouseCancel();
            try
            {
                ID = ID.Split('.')[0];
                ID = ID.Split('/')[ID.Split('/').Length - 1];
                result = _warehouseCancelRepository.GetByID(int.Parse(ID));
            }
            catch (Exception e)
            {
                string mes = e.Message;
            }
            if (result == null)
            {
                result = new WarehouseCancel();              
            }
            return result;
        }
    }
}

