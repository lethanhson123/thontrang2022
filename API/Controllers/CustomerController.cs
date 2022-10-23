using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using ThonTrang.Data.Models;
using ThonTrang.Data.Repositories;
using ThonTrang.Helpers;

namespace ThonTrang.API.Controllers
{
    public class CustomerController : BaseController
    {
        private readonly ICustomerRepository _customerRepository;
        public CustomerController(ICustomerRepository customerRepository) : base()
        {
            _customerRepository = customerRepository;
        }
        [HttpPost]
        public Customer Save(Customer model)
        {
            var result = AppGlobal.InitializationNumber;
            if (model.ID > 0)
            {
                result = _customerRepository.Update(model);
            }
            else
            {
                result = _customerRepository.Add(model);
            }
            return model;
        }

        [HttpGet]
        public List<Customer> GetAllToList()
        {
            var result = _customerRepository.GetAllToList();
            return result;
        }        
        [HttpGet]
        public List<Customer> GetBySearchStringToList(string searchString)
        {
            var result = _customerRepository.GetBySearchStringToList(searchString);
            return result;
        }
        [HttpGet]
        public List<Customer> GetByParentIDAndProvinceIDToList(int parentID, int provinceID)
        {
            var result = _customerRepository.GetByParentIDAndProvinceIDToList(parentID, provinceID);
            return result;
        }

        [HttpGet]
        public Customer GetByID(int ID)
        {
            Customer result = _customerRepository.GetByID(ID);
            if (result == null)
            {
                result = new Customer();
                result.Active = true;
            }
            return result;
        }
        [HttpGet]
        public Customer GetByIDString(string ID)
        {
            Customer result = new Customer();
            try
            {
                ID = ID.Split('.')[0];
                ID = ID.Split('/')[ID.Split('/').Length - 1];
                result = _customerRepository.GetByID(int.Parse(ID));
            }
            catch (Exception e)
            {
                string mes = e.Message;
            }
            if (result == null)
            {
                result = new Customer();               
                result.Active = true;      
                result.ParentID = 1;
                result.ProvinceID = 51;
                result.DistrictID = 583;
                result.WardID = 9123;
                result.DateJoin = AppGlobal.InitializationDateTime;
            }
            return result;
        }
    }
}

