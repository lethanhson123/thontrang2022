using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using ThonTrang.Data.Models;
using ThonTrang.Data.Repositories;
using ThonTrang.Helpers;

namespace ThonTrang.API.Controllers
{
    public class StatusController : BaseController
    {
        private readonly IStatusRepository _statusRepository;
        public StatusController(IStatusRepository statusRepository) : base()
        {
            _statusRepository = statusRepository;
        }
        [HttpPost]
        public Status Save(Status model)
        {
            var result = AppGlobal.InitializationNumber;
            if (model.ID > 0)
            {
                result = _statusRepository.Update(model);
            }
            else
            {
                result = _statusRepository.Add(model);
            }
            return model;
        }

        [HttpGet]
        public List<Status> GetAllToList()
        {
            var result = _statusRepository.GetAllToList();
            return result;
        }
        [HttpGet]
        public List<Status> GetBySearchStringToList(string searchString)
        {
            var result = _statusRepository.GetBySearchStringToList(searchString);
            return result;
        }

        [HttpGet]
        public Status GetByID(int ID)
        {
            Status result = _statusRepository.GetByID(ID);
            if (result == null)
            {
                result = new Status();
                result.Active = true;
            }
            return result;
        }
    }
}

