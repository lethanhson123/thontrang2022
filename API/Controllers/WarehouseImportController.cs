using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using ThonTrang.Data.Models;
using ThonTrang.Data.Repositories;
using ThonTrang.Helpers;

namespace ThonTrang.API.Controllers
{
    public class WarehouseImportController : BaseController
    {
        private readonly IWarehouseImportRepository _warehouseImportRepository;
        public WarehouseImportController(IWarehouseImportRepository warehouseImportRepository) : base()
        {
            _warehouseImportRepository = warehouseImportRepository;
        }
        [HttpPost]
        public WarehouseImport Save(WarehouseImport model)
        {
            var result = AppGlobal.InitializationNumber;
            if (model.ID > 0)
            {
                result = _warehouseImportRepository.Update(model);
            }
            else
            {
                result = _warehouseImportRepository.Add(model);
            }
            return model;
        }

        [HttpGet]
        public List<WarehouseImport> GetByActiveAndCompanyIDAndYearAndMonthAndSearchStringToList(bool active, int companyID, int year, int month, string searchString)
        {
            var result = _warehouseImportRepository.GetByActiveAndCompanyIDAndYearAndMonthAndSearchStringToList(active, companyID, year, month, searchString);
            return result;
        }

        [HttpGet]
        public WarehouseImport GetByID(int ID)
        {
            WarehouseImport result = _warehouseImportRepository.GetByID(ID);
            if (result == null)
            {
                result = new WarehouseImport();                
            }
            return result;
        }
        [HttpGet]
        public WarehouseImport GetByIDString(string ID)
        {
            WarehouseImport result = new WarehouseImport();
            try
            {
                ID = ID.Split('.')[0];
                ID = ID.Split('/')[ID.Split('/').Length - 1];
                result = _warehouseImportRepository.GetByID(int.Parse(ID));
            }
            catch (Exception e)
            {
                string mes = e.Message;
            }
            if (result == null)
            {
                result = new WarehouseImport();               
            }
            return result;
        }
    }
}

