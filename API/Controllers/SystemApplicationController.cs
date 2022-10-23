using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using ThonTrang.Data.Models;
using ThonTrang.Data.Repositories;
using ThonTrang.Helpers;

namespace ThonTrang.API.Controllers
{
    public class SystemApplicationController : BaseController
    {
        private readonly ISystemApplicationRepository _systemApplicationRepository;
        public SystemApplicationController(ISystemApplicationRepository systemApplicationRepository) : base()
        {
            _systemApplicationRepository = systemApplicationRepository;
        }
        [HttpPost]
        public SystemApplication Save(SystemApplication model)
        {
            var result = AppGlobal.InitializationNumber;
            if (model.ID > 0)
            {
                result = _systemApplicationRepository.Update(model);
            }
            else
            {
                result = _systemApplicationRepository.Add(model);
            }
            return model;
        }

        [HttpGet]
        public List<SystemApplication> GetAllToList()
        {
            var result = _systemApplicationRepository.GetAllToList();
            return result;
        }        

        [HttpGet]
        public SystemApplication GetByID(int ID)
        {
            SystemApplication result = _systemApplicationRepository.GetByID(ID);
            if (result == null)
            {
                result = new SystemApplication();
                result.Active = true;
            }
            return result;
        }
    }
}

