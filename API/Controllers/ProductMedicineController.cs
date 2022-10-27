using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using ThonTrang.Data.Models;
using ThonTrang.Data.Repositories;
using ThonTrang.Helpers;

namespace ThonTrang.API.Controllers
{
    public class ProductMedicineController : BaseController
    {
        private readonly IProductMedicineRepository _productMedicineRepository;
        public ProductMedicineController(IProductMedicineRepository productMedicineRepository) : base()
        {
            _productMedicineRepository = productMedicineRepository;
        }
        [HttpPost]
        public ProductMedicine Save(ProductMedicine model)
        {
            var result = AppGlobal.InitializationNumber;
            if (model.ID > 0)
            {
                result = _productMedicineRepository.Update(model);
            }
            else
            {
                result = _productMedicineRepository.Add(model);
            }
            return model;
        }
        [HttpGet]
        public int Remove(int ID)
        {
            var result = _productMedicineRepository.Remove(ID);
            return result;
        }
        [HttpGet]
        public List<ProductMedicine> GetByParentIDToList(int parentID)
        {
            var result = _productMedicineRepository.GetByParentIDToList(parentID);
            return result;
        }
        [HttpGet]
        public ProductMedicine GetByID(int ID)
        {
            ProductMedicine result = _productMedicineRepository.GetByID(ID);
            if (result == null)
            {
                result = new ProductMedicine();
                result.Active = true;
            }
            return result;
        }
    }
}

