using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using ThonTrang.Data.Models;
using ThonTrang.Data.Repositories;
using ThonTrang.Helpers;

namespace ThonTrang.API.Controllers
{
    public class UnitController : BaseController
    {
        private readonly IUnitRepository _unitRepository;
        public UnitController(IUnitRepository unitRepository) : base()
        {
            _unitRepository = unitRepository;
        }
        [HttpPost]
        public Unit Save(Unit model)
        {
            var result = AppGlobal.InitializationNumber;
            if (model.ID > 0)
            {
                result = _unitRepository.Update(model);
            }
            else
            {
                result = _unitRepository.Add(model);
            }
            return model;
        }

        [HttpGet]
        public List<Unit> GetAllToList()
        {
            var result = _unitRepository.GetAllToList();
            return result;
        }
        [HttpGet]
        public List<Unit> GetBySearchStringToList(string searchString)
        {
            var result = _unitRepository.GetBySearchStringToList(searchString);
            return result;
        }

        [HttpGet]
        public Unit GetByID(int ID)
        {
            Unit result = _unitRepository.GetByID(ID);
            if (result == null)
            {
                result = new Unit();
                result.Active = true;
            }
            return result;
        }
    }
}

