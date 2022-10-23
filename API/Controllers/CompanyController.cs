using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Reflection;
using System.Threading.Tasks;
using ThonTrang.Data.Models;
using ThonTrang.Data.Repositories;
using ThonTrang.Helpers;

namespace ThonTrang.API.Controllers
{
    public class CompanyController : BaseController
    {
        private readonly ICompanyRepository _companyRepository;
        public CompanyController(ICompanyRepository companyRepository) : base()
        {
            _companyRepository = companyRepository;
        }
        [HttpPost]
        public Company Save(Company model)
        {
            var result = AppGlobal.InitializationNumber;
            if (model.ID > 0)
            {
                result = _companyRepository.Update(model);
            }
            else
            {
                result = _companyRepository.Add(model);
            }
            return model;
        }

        [HttpGet]
        public List<Company> GetAllToList()
        {
            var result = _companyRepository.GetAllToList();
            return result;
        }
        [HttpGet]
        public List<Company> GetBySearchStringToList(string searchString)
        {
            var result = _companyRepository.GetBySearchStringToList(searchString);
            return result;
        }

        [HttpGet]
        public Company GetByID(int ID)
        {
            Company result = _companyRepository.GetByID(ID);
            if (result == null)
            {
                result = new Company();
                result.Active = true;
            }
            return result;
        }
        [HttpGet]
        public Company GetByIDString(string ID)
        {
            Company result = new Company();           
            try
            {
                ID = ID.Split('.')[0];
                ID = ID.Split('/')[ID.Split('/').Length - 1];
                result = _companyRepository.GetByID(int.Parse(ID));
            }
            catch (Exception e)
            {
                string mes = e.Message;
            }
            if (result == null)
            {
                result = new Company();
                result.Active = true;                
            }
            return result;
        }
    }
}

