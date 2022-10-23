using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using ThonTrang.Data.Models;
using ThonTrang.Data.Repositories;
using ThonTrang.Helpers;

namespace ThonTrang.API.Controllers
{
    public class TruckController : BaseController
    {
        private readonly ITruckRepository _truckRepository;
        public TruckController(ITruckRepository truckRepository) : base()
        {
            _truckRepository = truckRepository;
        }
        [HttpPost]
        public Truck Save(Truck model)
        {
            var result = AppGlobal.InitializationNumber;
            if (model.ID > 0)
            {
                result = _truckRepository.Update(model);
            }
            else
            {
                result = _truckRepository.Add(model);
            }
            return model;
        }

        [HttpGet]
        public List<Truck> GetAllToList()
        {
            var result = _truckRepository.GetAllToList();
            return result;
        }        

        [HttpGet]
        public Truck GetByID(int ID)
        {
            Truck result = _truckRepository.GetByID(ID);
            if (result == null)
            {
                result = new Truck();
                result.Weight = 0;
                result.Active = true;
            }
            return result;
        }
    }
}

