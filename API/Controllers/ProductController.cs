using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;
using ThonTrang.Data.Models;
using ThonTrang.Data.Repositories;
using ThonTrang.Helpers;

namespace ThonTrang.API.Controllers
{
    public class ProductController : BaseController
    {
        private readonly IWebHostEnvironment _webHostEnvironment;
        private readonly IProductRepository _productRepository;
        public ProductController(IWebHostEnvironment webHostEnvironment, IProductRepository productRepository) : base()
        {
            _productRepository = productRepository;
            _webHostEnvironment = webHostEnvironment;
        }
        [HttpPost]
        public Product SaveAndUploadFiles()
        {
            var result = AppGlobal.InitializationNumber;
            Product model = JsonConvert.DeserializeObject<Product>(Request.Form["data"]);
            bool isAttachments = JsonConvert.DeserializeObject<bool>(Request.Form["isAttachments"]);
            if (string.IsNullOrEmpty(model.Slug))
            {
                model.Slug = AppGlobal.SetName(model.Name);
            }
            try
            {
                if (Request.Form.Files.Count > 0)
                {
                    if (isAttachments != true)
                    {
                        for (int i = 0; i < Request.Form.Files.Count; i++)
                        {
                            var file = Request.Form.Files[i];
                            if (file == null || file.Length == 0)
                            {
                            }
                            if (file != null)
                            {
                                string fileExtension = Path.GetExtension(file.FileName);
                                if (fileExtension.Contains("txt") == false)
                                {
                                    string fileName = Path.GetFileNameWithoutExtension(file.FileName);
                                    fileName = model.Slug + "_" + AppGlobal.InitializationDateTimeCode + fileExtension;
                                    model.ImageFileName = fileName;

                                    string pathSub = AppGlobal.Images + "/" + AppGlobal.Product;
                                    var physicalPath = Path.Combine(_webHostEnvironment.WebRootPath, pathSub, fileName);
                                    using (var stream = new FileStream(physicalPath, FileMode.Create))
                                    {
                                        file.CopyTo(stream);
                                        
                                    }
                                }
                            }
                        }
                    }
                }
            }
            catch (Exception e)
            {
                string mes = e.Message;
            }
            if (model.ID > 0)
            {
                result = _productRepository.Update(model);
            }
            else
            {
                result = _productRepository.Add(model);
            }
            if (Request.Form.Files.Count > 0)
            {
                if (isAttachments == true)
                {
                    foreach (var fileTapTinDinhKem in Request.Form.Files)
                    {
                        if (fileTapTinDinhKem != null)
                        {              
                        }
                    }
                }
            }
            return model;
        }

        [HttpGet]
        public List<Product> GetAllToList()
        {
            var result = _productRepository.GetAllToList();
            return result;
        }
        [HttpGet]
        public List<Product> GetBySearchStringToList(string searchString)
        {
            var result = _productRepository.GetBySearchStringToList(searchString);
            return result;
        }
        [HttpGet]
        public List<Product> GetByParentIDToList(int parentID)
        {
            var result = _productRepository.GetByParentIDToList(parentID);
            return result;
        }
        [HttpGet]
        public List<Product> GetByCompanyIDAndSearchStringToList(int companyID, string searchString)
        {
            var result = _productRepository.GetByCompanyIDAndSearchStringToList(companyID, searchString);
            return result;
        }
        [HttpGet]
        public List<Product> GetByDateBeginAndDateEndAndSearchStringToList(string dateBegin, string dateEnd, string searchString)
        {
            DateTime dateBegin001 = new DateTime(AppGlobal.InitializationDateTime.Year, AppGlobal.InitializationDateTime.Month, AppGlobal.InitializationDateTime.Day, 0, 0, 0);
            DateTime dateEnd001 = new DateTime(AppGlobal.InitializationDateTime.Year, AppGlobal.InitializationDateTime.Month, AppGlobal.InitializationDateTime.Day, 23, 59, 59);
            try
            {
                if (!string.IsNullOrEmpty(dateBegin))
                {
                    dateBegin = dateBegin.Trim();
                }
                if (!string.IsNullOrEmpty(dateEnd))
                {
                    dateEnd = dateEnd.Trim();
                }
                dateBegin001 = DateTime.Parse(dateBegin);
                dateEnd001 = DateTime.Parse(dateEnd);     
            }
            catch (Exception e)
            {
                string mes = e.Message;
            }
            var result = _productRepository.GetByDateBeginAndDateEndAndSearchStringToList(dateBegin001, dateEnd001, searchString);
            return result;
        }
        [HttpGet]
        public Product GetByID(int ID)
        {
            Product result = _productRepository.GetByID(ID);
            if (result == null)
            {
                result = new Product();
                result.Active = true;
            }
            return result;
        }
        [HttpGet]
        public Product GetByIDString(string ID)
        {
            Product result = new Product();
            try
            {
                ID = ID.Split('.')[0];
                ID = ID.Split('/')[ID.Split('/').Length - 1];
                result = _productRepository.GetByID(int.Parse(ID));
            }
            catch (Exception e)
            {
                string mes = e.Message;
            }
            if (result == null)
            {
                result = new Product();
                result.Weight = 0;
                result.Weight02 = 0;
                result.SpecificationsNumber = 0;
                result.Active = true;
                result.UnitID = 1;
                result.CompanyID = 1;
                result.ParentID = 1;
            }
            return result;
        }
    }
}

