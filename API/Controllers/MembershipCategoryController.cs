using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using ThonTrang.Data.Models;
using ThonTrang.Data.Repositories;
using ThonTrang.Helpers;

namespace ThonTrang.API.Controllers
{
    public class MembershipCategoryController : BaseController
    {
        private readonly IMembershipCategoryRepository _membershipCategoryRepository;
        public MembershipCategoryController(IMembershipCategoryRepository membershipCategoryRepository) : base()
        {
            _membershipCategoryRepository = membershipCategoryRepository;
        }
        [HttpPost]
        public MembershipCategory Save(MembershipCategory model)
        {
            var result = AppGlobal.InitializationNumber;
            if (model.ID > 0)
            {
                result = _membershipCategoryRepository.Update(model);
            }
            else
            {
                result = _membershipCategoryRepository.Add(model);
            }
            return model;
        }

        [HttpGet]
        public List<MembershipCategory> GetAllToList()
        {
            var result = _membershipCategoryRepository.GetAllToList();
            return result;
        }
        [HttpGet]
        public List<MembershipCategory> GetBySearchStringToList(string searchString)
        {
            var result = _membershipCategoryRepository.GetBySearchStringToList(searchString);
            return result;
        }

        [HttpGet]
        public MembershipCategory GetByID(int ID)
        {
            MembershipCategory result = _membershipCategoryRepository.GetByID(ID);
            if (result == null)
            {
                result = new MembershipCategory();
                result.Active = true;
            }
            return result;
        }
    }
}

