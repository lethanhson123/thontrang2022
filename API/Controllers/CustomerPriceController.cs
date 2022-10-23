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
    public class CustomerPriceController : BaseController
    {
        private readonly ICustomerPriceRepository _customerPriceRepository;
        public CustomerPriceController(ICustomerPriceRepository customerPriceRepository) : base()
        {
            _customerPriceRepository = customerPriceRepository;
        }
        [HttpPost]
        public CustomerPrice Save(CustomerPrice model)
        {
            var result = AppGlobal.InitializationNumber;
            if (model.ID > 0)
            {
                result = _customerPriceRepository.Update(model);
            }
            else
            {
                result = _customerPriceRepository.Add(model);
            }
            return model;
        }
        [HttpPost]
        public int SaveItems()
        {
            var result = AppGlobal.InitializationNumber;
            List<CustomerPrice> listCustomerPrice = JsonConvert.DeserializeObject<List<CustomerPrice>>(Request.Form["listCustomerPrice"]);
            int userUpdated = JsonConvert.DeserializeObject<int>(Request.Form["userUpdated"]);
            foreach (CustomerPrice item in listCustomerPrice)
            {
                item.UserUpdated = userUpdated;
                result = result + _customerPriceRepository.Update(item);
            }
            return result;
        }
        [HttpGet]
        public List<CustomerPrice> GetByParentIDToList(int parentID)
        {
            var result = _customerPriceRepository.GetByParentIDToList(parentID);
            return result;
        }
        [HttpGet]
        public List<CustomerPrice> GetByParentIDAndIsWishlistToList(int parentID, bool isWishlist)
        {
            var result = _customerPriceRepository.GetByParentIDAndIsWishlistToList(parentID, isWishlist);
            return result;
        }

        [HttpGet]
        public List<CustomerPrice> GetByParentIDAndSearchStringAndIsWishlistToList(int parentID, string searchString, bool isWishlist)
        {
            var result = _customerPriceRepository.GetByParentIDAndSearchStringAndIsWishlistToList(parentID, searchString, isWishlist);
            return result;
        }
    }
}

