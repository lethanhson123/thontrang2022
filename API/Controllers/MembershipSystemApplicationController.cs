using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using ThonTrang.Data.Models;
using ThonTrang.Data.Repositories;
using ThonTrang.Helpers;

namespace ThonTrang.API.Controllers
{
    public class MembershipSystemApplicationController : BaseController
    {
        private readonly IMembershipSystemApplicationRepository _membershipSystemApplicationRepository;
        public MembershipSystemApplicationController(IMembershipSystemApplicationRepository membershipSystemApplicationRepository) : base()
        {
            _membershipSystemApplicationRepository = membershipSystemApplicationRepository;
        }
        [HttpPost]
        public MembershipSystemApplication Save(MembershipSystemApplication model)
        {
            var result = AppGlobal.InitializationNumber;
            if (model.ID > 0)
            {
                result = _membershipSystemApplicationRepository.Update(model);
            }
            else
            {
                result = _membershipSystemApplicationRepository.Add(model);
            }
            return model;
        }

        [HttpGet]
        public List<MembershipSystemApplication> GetByParentIDToList(int parentID)
        {
            var result = _membershipSystemApplicationRepository.GetByParentIDToList(parentID);
            return result;
        }

        [HttpGet]
        public MembershipSystemApplication GetByID(int ID)
        {
            MembershipSystemApplication result = _membershipSystemApplicationRepository.GetByID(ID);
            if (result == null)
            {
                result = new MembershipSystemApplication();
                result.Active = true;
            }
            return result;
        }
    }
}

