using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using ThonTrang.Data.Models;
using ThonTrang.Data.Repositories;
using ThonTrang.Helpers;

namespace ThonTrang.API.Controllers
{
    public class CustomerCategoryController : BaseController
    {
        private readonly ICustomerCategoryRepository _customerCategoryRepository;
        public CustomerCategoryController(ICustomerCategoryRepository customerCategoryRepository) : base()
        {
            _customerCategoryRepository = customerCategoryRepository;
        }
        [HttpPost]
        public CustomerCategory Save(CustomerCategory model)
        {
            var result = AppGlobal.InitializationNumber;
            if (model.ID > 0)
            {
                result = _customerCategoryRepository.Update(model);
            }
            else
            {
                result = _customerCategoryRepository.Add(model);
            }
            return model;
        }

        [HttpGet]
        public List<CustomerCategory> GetAllToList()
        {
            var result = _customerCategoryRepository.GetAllToList();
            return result;
        }
        [HttpGet]
        public List<CustomerCategory> GetBySearchStringToList(string searchString)
        {
            var result = _customerCategoryRepository.GetBySearchStringToList(searchString);
            return result;
        }

        [HttpGet]
        public CustomerCategory GetByID(int ID)
        {
            CustomerCategory result = _customerCategoryRepository.GetByID(ID);
            if (result == null)
            {
                result = new CustomerCategory();
                result.Active = true;
            }
            return result;
        }
    }
}

