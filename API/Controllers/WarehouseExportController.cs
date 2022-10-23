using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using ThonTrang.Data.Models;
using ThonTrang.Data.Repositories;
using ThonTrang.Helpers;

namespace ThonTrang.API.Controllers
{
    public class WarehouseExportController : BaseController
    {
        private readonly IWarehouseExportRepository _warehouseExportRepository;
        public WarehouseExportController(IWarehouseExportRepository warehouseExportRepository) : base()
        {
            _warehouseExportRepository = warehouseExportRepository;
        }
        [HttpPost]
        public WarehouseExport Save(WarehouseExport model)
        {
            var result = AppGlobal.InitializationNumber;
            if (model.ID > 0)
            {
                result = _warehouseExportRepository.Update(model);
            }
            else
            {
                result = _warehouseExportRepository.Add(model);
            }
            _warehouseExportRepository.InitializationByID(model.ID);
            return model;
        }

        [HttpGet]
        public List<WarehouseExport> GetByActiveAndCompanyIDAndYearAndMonthAndSearchStringToList(bool active, int companyID, int year, int month, string searchString)
        {
            var result = _warehouseExportRepository.GetByActiveAndCompanyIDAndYearAndMonthAndSearchStringToList(active, companyID, year, month, searchString);
            return result;
        }
        [HttpGet]
        public List<WarehouseExport> GetByActiveAndCustomerIDToList(bool active, int customerID)
        {
            var result = _warehouseExportRepository.GetByActiveAndCustomerIDToList(active, customerID);
            return result;
        }

        [HttpGet]
        public int CovertOrderToWarehouseExportByOrderIDAndUserUpdated(string ID, int userUpdated)
        {
            int orderID = AppGlobal.InitializationNumber;
            try
            {
                ID = ID.Split('.')[0];
                ID = ID.Split('/')[ID.Split('/').Length - 1];
                orderID = int.Parse(ID);
            }
            catch (Exception e)
            {
                string mes = e.Message;
            }
            var result = _warehouseExportRepository.CovertOrderToWarehouseExportByOrderIDAndUserUpdated(orderID, userUpdated);
            return result;
        }
        [HttpGet]
        public WarehouseExport GetByActiveAndCompanyIDAndParentID(bool active, int companyID, string ID)
        {
            int parentID = AppGlobal.InitializationNumber;
            try
            {
                ID = ID.Split('.')[0];
                ID = ID.Split('/')[ID.Split('/').Length - 1];
                parentID = int.Parse(ID);
            }
            catch (Exception e)
            {
                string mes = e.Message;
            }
            var result = _warehouseExportRepository.GetByActiveAndCompanyIDAndParentID(active, companyID, parentID);
            return result;
        }

        [HttpGet]
        public WarehouseExport GetByID(int ID)
        {
            WarehouseExport result = _warehouseExportRepository.GetByID(ID);
            if (result == null)
            {
                result = new WarehouseExport();                
            }
            return result;
        }
        [HttpGet]
        public WarehouseExport GetByIDString(string ID)
        {
            WarehouseExport result = new WarehouseExport();
            try
            {
                ID = ID.Split('.')[0];
                ID = ID.Split('/')[ID.Split('/').Length - 1];
                result = _warehouseExportRepository.GetByID(int.Parse(ID));
            }
            catch (Exception e)
            {
                string mes = e.Message;
            }
            if (result == null)
            {
                result = new WarehouseExport();               
            }
            return result;
        }
    }
}

