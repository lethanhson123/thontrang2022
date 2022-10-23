using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using ThonTrang.Data.Models;
using ThonTrang.Data.Repositories;
using ThonTrang.Helpers;

namespace ThonTrang.API.Controllers
{
    public class SystemMenuController : BaseController
    {
        private readonly ISystemMenuRepository _systemMenuRepository;
        public SystemMenuController(ISystemMenuRepository systemMenuRepository) : base()
        {
            _systemMenuRepository = systemMenuRepository;
        }
        [HttpPost]
        public SystemMenu Save(SystemMenu model)
        {
            var result = AppGlobal.InitializationNumber;
            if (string.IsNullOrEmpty(model.Icon))
            {
                model.Icon = "radio_button_unchecked";
            }
            if (model.ID > 0)
            {
                result = _systemMenuRepository.Update(model);
            }
            else
            {
                result = _systemMenuRepository.Add(model);
            }
            return model;
        }

        [HttpGet]
        public List<SystemMenu> GetAllToList()
        {
            var result = _systemMenuRepository.GetAllToList();
            return result;
        }        

        [HttpGet]
        public SystemMenu GetByID(int ID)
        {
            SystemMenu result = _systemMenuRepository.GetByID(ID);
            if (result == null)
            {
                result = new SystemMenu();
                result.ParentID = 0;
                result.SortOrder = 0;
                result.Active = true;
            }
            return result;
        }
    }
}

