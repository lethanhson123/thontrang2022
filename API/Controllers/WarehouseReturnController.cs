using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using ThonTrang.Data.Models;
using ThonTrang.Data.Repositories;
using ThonTrang.Helpers;

namespace ThonTrang.API.Controllers
{
    public class WarehouseReturnController : BaseController
    {
        private readonly IWarehouseReturnRepository _warehouseReturnRepository;
        public WarehouseReturnController(IWarehouseReturnRepository warehouseReturnRepository) : base()
        {
            _warehouseReturnRepository = warehouseReturnRepository;
        }
        [HttpPost]
        public WarehouseReturn Save(WarehouseReturn model)
        {
            var result = AppGlobal.InitializationNumber;
            if (model.ID > 0)
            {
                result = _warehouseReturnRepository.Update(model);
            }
            else
            {
                result = _warehouseReturnRepository.Add(model);
            }
            _warehouseReturnRepository.InitializationByID(model.ID);
            return model;
        }

        [HttpGet]
        public List<WarehouseReturn> GetByActiveAndCompanyIDAndYearAndMonthAndSearchStringToList(bool active, int companyID, int year, int month, string searchString)
        {
            var result = _warehouseReturnRepository.GetByActiveAndCompanyIDAndYearAndMonthAndSearchStringToList(active, companyID, year, month, searchString);
            return result;
        }

        [HttpGet]
        public WarehouseReturn GetByID(int ID)
        {
            WarehouseReturn result = _warehouseReturnRepository.GetByID(ID);
            if (result == null)
            {
                result = new WarehouseReturn();                
            }
            return result;
        }
        [HttpGet]
        public WarehouseReturn GetByIDString(string ID)
        {
            WarehouseReturn result = new WarehouseReturn();
            try
            {
                ID = ID.Split('.')[0];
                ID = ID.Split('/')[ID.Split('/').Length - 1];
                result = _warehouseReturnRepository.GetByID(int.Parse(ID));
            }
            catch (Exception e)
            {
                string mes = e.Message;
            }
            if (result == null)
            {
                result = new WarehouseReturn();               
            }
            return result;
        }
    }
}

