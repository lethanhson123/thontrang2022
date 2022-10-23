using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using ThonTrang.Data.Models;
using ThonTrang.Data.Repositories;
using ThonTrang.Helpers;

namespace ThonTrang.API.Controllers
{
    public class ProductCategoryController : BaseController
    {
        private readonly IProductCategoryRepository _productCategoryRepository;
        public ProductCategoryController(IProductCategoryRepository productCategoryRepository) : base()
        {
            _productCategoryRepository = productCategoryRepository;
        }
        [HttpPost]
        public ProductCategory Save(ProductCategory model)
        {
            var result = AppGlobal.InitializationNumber;
            if (model.ID > 0)
            {
                result = _productCategoryRepository.Update(model);
            }
            else
            {
                result = _productCategoryRepository.Add(model);
            }
            return model;
        }

        [HttpGet]
        public List<ProductCategory> GetAllToList()
        {
            var result = _productCategoryRepository.GetAllToList();
            return result;
        }
        [HttpGet]
        public List<ProductCategory> GetBySearchStringToList(string searchString)
        {
            var result = _productCategoryRepository.GetBySearchStringToList(searchString);
            return result;
        }

        [HttpGet]
        public ProductCategory GetByID(int ID)
        {
            ProductCategory result = _productCategoryRepository.GetByID(ID);
            if (result == null)
            {
                result = new ProductCategory();
                result.Active = true;
            }
            return result;
        }
    }
}

