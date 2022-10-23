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
    public class ProvinceController : BaseController
    {
        private readonly IProvinceRepository _provinceRepository;
        public ProvinceController(IProvinceRepository provinceRepository) : base()
        {
            _provinceRepository = provinceRepository;
        }
        [HttpPost]
        public Province Save(Province model)
        {
            var result = AppGlobal.InitializationNumber;
            if (model.ID > 0)
            {
                result = _provinceRepository.Update(model);
            }
            else
            {
                result = _provinceRepository.Add(model);
            }
            return model;
        }

        [HttpGet]
        public List<Province> GetAllToList()
        {
            var result = _provinceRepository.GetAllToList();
            return result;
        }
        [HttpGet]
        public List<Province> GetBySearchStringToList(string searchString)
        {
            var result = _provinceRepository.GetBySearchStringToList(searchString);
            return result;
        }
        [HttpGet]
        public List<Province> GetByActiveToList(bool active)
        {
            var result = _provinceRepository.GetByActiveToList(active).OrderBy(item => item.Display).ToList();
            return result;
        }

        [HttpGet]
        public Province GetByID(int ID)
        {
            Province result = _provinceRepository.GetByID(ID);
            if (result == null)
            {
                result = new Province();
                result.Active = true;
            }
            return result;
        }
    }
}

