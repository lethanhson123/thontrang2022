using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using ThonTrang.Data.Models;
using ThonTrang.Data.Repositories;
using ThonTrang.Helpers;

namespace ThonTrang.API.Controllers
{
    public class WarehouseExportDetailController : BaseController
    {
        private readonly IWarehouseExportDetailRepository _warehouseExportDetailRepository;
        private readonly IWarehouseExportRepository _warehouseExportRepository;
        public WarehouseExportDetailController(IWarehouseExportDetailRepository warehouseExportDetailRepository, IWarehouseExportRepository warehouseExportRepository) : base()
        {
            _warehouseExportDetailRepository = warehouseExportDetailRepository;
            _warehouseExportRepository = warehouseExportRepository;
        }
        [HttpPost]
        public WarehouseExportDetail Save(WarehouseExportDetail model)
        {
            var result = AppGlobal.InitializationNumber;
            if (model.ID > 0)
            {
                result = _warehouseExportDetailRepository.Update(model);
            }
            else
            {
                result = _warehouseExportDetailRepository.Add(model);
            }
            if (result > 0)
            {
                _warehouseExportRepository.InitializationByID(model.ParentID.Value);
            }
            return model;
        }
        [HttpGet]
        public List<WarehouseExportDetail> GetByParentIDToList(int parentID)
        {
            var result = _warehouseExportDetailRepository.GetByParentIDToList(parentID);
            return result;
        }
        [HttpGet]
        public List<WarehouseExportDetail> GetByDateBeginAndDateEndToList(string dateBegin, string dateEnd)
        {
            DateTime dateBegin001 = AppGlobal.InitializationDateTime;
            DateTime dateEnd001 = AppGlobal.InitializationDateTime;
            try
            {
                dateBegin = AppGlobal.CovertDateTime(dateBegin);
                dateEnd = AppGlobal.CovertDateTime(dateEnd);
                dateBegin001 = DateTime.Parse(dateBegin);
                dateEnd001 = DateTime.Parse(dateEnd);

            }
            catch (Exception e)
            {
                string mes = e.Message;
            }
            var result = _warehouseExportDetailRepository.GetByDateBeginAndDateEndToList(dateBegin001, dateEnd001);
            return result;
        }
        [HttpGet]
        public int Remove(int ID)
        {
            var result = _warehouseExportDetailRepository.Remove(ID);
            return result;
        }
        [HttpGet]
        public WarehouseExportDetail GetByID(int ID)
        {
            WarehouseExportDetail result = _warehouseExportDetailRepository.GetByID(ID);
            if (result == null)
            {
                result = new WarehouseExportDetail();
            }
            return result;
        }
    }
}

