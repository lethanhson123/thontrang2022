using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using OfficeOpenXml.Style;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using ThonTrang.Data.Models;
using ThonTrang.Data.Repositories;
using ThonTrang.Helpers;

namespace ThonTrang.API.Controllers
{
    public class MembershipCustomerController : BaseController
    {
        private readonly IMembershipCustomerRepository _membershipCustomerRepository;
        public MembershipCustomerController(IMembershipCustomerRepository membershipCustomerRepository, ICustomerRepository customerRepository) : base()
        {
            _membershipCustomerRepository = membershipCustomerRepository;
        }

        [HttpPost]
        public int SaveItems()
        {
            var result = AppGlobal.InitializationNumber;
            List<MembershipCustomer> listMembershipCustomer = JsonConvert.DeserializeObject<List<MembershipCustomer>>(Request.Form["listMembershipCustomer"]);
            int userUpdated = JsonConvert.DeserializeObject<int>(Request.Form["userUpdated"]);
            foreach (MembershipCustomer item in listMembershipCustomer)
            {
                item.UserUpdated = userUpdated;
                result = result + _membershipCustomerRepository.Update(item);
            }
            return result;
        }

        [HttpGet]
        public List<MembershipCustomer> GetByParentIDToList(int parentID)
        {
            var result = _membershipCustomerRepository.GetByParentIDToList(parentID);
            return result;
        }
        [HttpGet]
        public List<MembershipCustomer> GetByParentIDAndActiveAndSearchStringToList(int parentID, bool active, string searchString)
        {
            var result = _membershipCustomerRepository.GetByParentIDAndActiveAndSearchStringToList(parentID, active, searchString);
            return result;
        }
    }
}

