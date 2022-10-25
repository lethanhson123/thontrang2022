using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using ThonTrang.Data.Models;
using ThonTrang.Data.Repositories;
using ThonTrang.Helpers;

namespace ThonTrang.API.Controllers
{
    public class ProductIngredientController : BaseController
    {
        private readonly IProductIngredientRepository _productIngredientRepository;
        public ProductIngredientController(IProductIngredientRepository productIngredientRepository) : base()
        {
            _productIngredientRepository = productIngredientRepository;
        }
        [HttpPost]
        public ProductIngredient Save(ProductIngredient model)
        {
            var result = AppGlobal.InitializationNumber;
            if (model.ID > 0)
            {
                result = _productIngredientRepository.Update(model);
            }
            else
            {
                result = _productIngredientRepository.Add(model);
            }
            return model;
        }

        [HttpGet]
        public List<ProductIngredient> GetAllToList()
        {
            var result = _productIngredientRepository.GetAllToList();
            return result;
        }        
        [HttpGet]
        public ProductIngredient GetByID(int ID)
        {
            ProductIngredient result = _productIngredientRepository.GetByID(ID);
            if (result == null)
            {
                result = new ProductIngredient();
                result.Active = true;
            }
            return result;
        }
    }
}

