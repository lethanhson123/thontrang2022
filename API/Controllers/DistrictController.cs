using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ThonTrang.Data.Models;
using ThonTrang.Data.Repositories;
using ThonTrang.Helpers;

namespace ThonTrang.API.Controllers
{
    public class DistrictController : BaseController
    {
        private readonly IDistrictRepository _districtRepository;
        public DistrictController(IDistrictRepository districtRepository) : base()
        {
            _districtRepository = districtRepository;
        }
        [HttpPost]
        public District Save(District model)
        {
            var result = AppGlobal.InitializationNumber;
            if (model.ID > 0)
            {
                result = _districtRepository.Update(model);
            }
            else
            {
                result = _districtRepository.Add(model);
            }
            return model;
        }

        [HttpGet]
        public List<District> GetAllToList()
        {
            var result = _districtRepository.GetAllToList();
            return result;
        }
        [HttpGet]
        public List<District> GetBySearchStringToList(string searchString)
        {
            var result = _districtRepository.GetBySearchStringToList(searchString);
            return result;
        }
        [HttpGet]
        public List<District> GetByParentIDToList(int parentID)
        {
            var result = _districtRepository.GetByParentIDToList(parentID).OrderBy(item=>item.Display).ToList();
            return result;
        }

        [HttpGet]
        public District GetByID(int ID)
        {
            District result = _districtRepository.GetByID(ID);
            if (result == null)
            {
                result = new District();
                result.Active = true;
            }
            return result;
        }
    }
}

