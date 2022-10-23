using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using ThonTrang.Data.Models;
using ThonTrang.Data.Repositories;
using ThonTrang.Helpers;

namespace ThonTrang.API.Controllers
{
    public class CustomerCategoryPriceController : BaseController
    {
        private readonly ICustomerCategoryPriceRepository _customerCategoryPriceRepository;
        private readonly ICustomerPriceRepository _customerPriceRepository;
        public CustomerCategoryPriceController(ICustomerCategoryPriceRepository customerCategoryPriceRepository, ICustomerPriceRepository customerPriceRepository) : base()
        {
            _customerCategoryPriceRepository = customerCategoryPriceRepository;
            _customerPriceRepository = customerPriceRepository;
        }
        [HttpPost]
        public CustomerCategoryPrice Save(CustomerCategoryPrice model)
        {
            var result = AppGlobal.InitializationNumber;
            if (model.ID > 0)
            {
                result = _customerCategoryPriceRepository.Update(model);
                if (result > 0)
                {
                    _customerPriceRepository.UpdateItemsByCustomerCategoryIDAndProductIDAndPrice(model.ParentID.Value, model.ProductID.Value, model.Price.Value);
                }
            }
            else
            {
                result = _customerCategoryPriceRepository.Add(model);
            }
            return model;
        }


        [HttpGet]
        public List<CustomerCategoryPrice> GetByParentIDAndSearchStringToList(int parentID, string searchString)
        {
            var result = _customerCategoryPriceRepository.GetByParentIDAndSearchStringToList(parentID, searchString);
            return result;
        }

        [HttpGet]
        public CustomerCategoryPrice GetByID(int ID)
        {
            CustomerCategoryPrice result = _customerCategoryPriceRepository.GetByID(ID);
            if (result == null)
            {
                result = new CustomerCategoryPrice();
                result.Active = true;
            }
            return result;
        }
    }
}

