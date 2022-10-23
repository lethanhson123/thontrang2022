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
    public class WardController : BaseController
    {
        private readonly IWardRepository _wardRepository;
        public WardController(IWardRepository wardRepository) : base()
        {
            _wardRepository = wardRepository;
        }
        [HttpPost]
        public Ward Save(Ward model)
        {
            var result = AppGlobal.InitializationNumber;
            if (model.ID > 0)
            {
                result = _wardRepository.Update(model);
            }
            else
            {
                result = _wardRepository.Add(model);
            }
            return model;
        }

        [HttpGet]
        public List<Ward> GetAllToList()
        {
            var result = _wardRepository.GetAllToList();
            return result;
        }
        [HttpGet]
        public List<Ward> GetBySearchStringToList(string searchString)
        {
            var result = _wardRepository.GetBySearchStringToList(searchString);
            return result;
        }
        [HttpGet]
        public List<Ward> GetByParentIDToList(int parentID)
        {
            var result = _wardRepository.GetByParentIDToList(parentID).OrderBy(item => item.Display).ToList();
            return result;
        }

        [HttpGet]
        public Ward GetByID(int ID)
        {
            Ward result = _wardRepository.GetByID(ID);
            if (result == null)
            {
                result = new Ward();
                result.Active = true;
            }
            return result;
        }
    }
}

