using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using ThonTrang.Data.Models;
using ThonTrang.Data.Repositories;
using ThonTrang.Helpers;

namespace ThonTrang.API.Controllers
{
    public class MembershipSystemMenuController : BaseController
    {
        private readonly IMembershipSystemMenuRepository _membershipSystemMenuRepository;
        public MembershipSystemMenuController(IMembershipSystemMenuRepository membershipSystemMenuRepository) : base()
        {
            _membershipSystemMenuRepository = membershipSystemMenuRepository;
        }
        [HttpPost]
        public int SaveItems()
        {
            var result = AppGlobal.InitializationNumber;
            List<MembershipSystemMenu> listMembershipSystemMenu = JsonConvert.DeserializeObject<List<MembershipSystemMenu>>(Request.Form["listMembershipSystemMenu"]);
            int userUpdated = JsonConvert.DeserializeObject<int>(Request.Form["userUpdated"]);
            foreach (MembershipSystemMenu item in listMembershipSystemMenu)
            {
                item.UserUpdated = userUpdated;
                if (item.ID > 0)
                {
                    result = result + _membershipSystemMenuRepository.Update(item);
                }
                else
                {
                    result = result + _membershipSystemMenuRepository.Add(item);
                }
            }
            return result;
        }
        [HttpGet]
        public List<MembershipSystemMenu> GetByParentIDToList(int parentID)
        {
            var result = _membershipSystemMenuRepository.GetByParentIDToList(parentID);
            return result;
        }
        [HttpGet]
        public List<MembershipSystemMenu> GetByParentIDAndActiveToList(int parentID, bool active)
        {
            var result = _membershipSystemMenuRepository.GetByParentIDAndActiveToList(parentID, active);
            return result;
        }
    }
}

