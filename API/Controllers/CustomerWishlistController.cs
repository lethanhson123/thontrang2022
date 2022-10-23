using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using ThonTrang.Data.Models;
using ThonTrang.Data.Repositories;
using ThonTrang.Helpers;

namespace ThonTrang.API.Controllers
{
    public class CustomerWishlistController : BaseController
    {
        private readonly ICustomerWishlistRepository _customerWishlistRepository;
        public CustomerWishlistController(ICustomerWishlistRepository customerWishlistRepository) : base()
        {
            _customerWishlistRepository = customerWishlistRepository;
        }
        [HttpPost]
        public CustomerWishlist Save(CustomerWishlist model)
        {
            var result = AppGlobal.InitializationNumber;
            if (model.ID > 0)
            {
                result = _customerWishlistRepository.Update(model);
            }
            else
            {
                result = _customerWishlistRepository.Add(model);
            }
            return model;
        }

        [HttpGet]
        public List<CustomerWishlist> GetByParentIDToList(int parentID)
        {
            var result = _customerWishlistRepository.GetByParentIDToList(parentID);
            return result;
        }

        [HttpGet]
        public CustomerWishlist GetByID(int ID)
        {
            CustomerWishlist result = _customerWishlistRepository.GetByID(ID);
            if (result == null)
            {
                result = new CustomerWishlist();
                result.Active = true;
            }
            return result;
        }
    }
}

