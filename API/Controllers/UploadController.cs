using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using OfficeOpenXml;
using System;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;
using ThonTrang.Data.Models;
using ThonTrang.Data.Repositories;
using ThonTrang.Helpers;

namespace ThonTrang.API.Controllers
{
    public class UploadController : BaseController
    {
        private readonly IWebHostEnvironment _webHostEnvironment;
        private readonly IProvinceRepository _provinceRepository;
        private readonly IDistrictRepository _districtRepository;
        private readonly IWardRepository _wardRepository;
        private readonly ICompanyRepository _companyRepository;
        private readonly IUnitRepository _unitRepository;
        private readonly IProductRepository _productRepository;
        private readonly IProductCategoryRepository _productCategoryRepository;
        private readonly IMembershipRepository _membershipRepository;
        private readonly ICustomerRepository _customerRepository;
        private readonly IMembershipCategoryRepository _membershipCategoryRepository;
        private readonly ICustomerCategoryRepository _customerCategoryRepository;
        private readonly IMembershipCustomerRepository _membershipCustomerRepository;
        public UploadController(IWebHostEnvironment webHostEnvironment
            , IProvinceRepository provinceRepository
            , IDistrictRepository districtRepository
            , IWardRepository wardRepository
            , ICompanyRepository companyRepository
            , IUnitRepository unitRepository
            , IProductRepository productRepository
            , IProductCategoryRepository productCategoryRepository
            , IMembershipRepository membershipRepository
            , ICustomerRepository customerRepository
            , IMembershipCategoryRepository membershipCategoryRepository
            , ICustomerCategoryRepository customerCategoryRepository
            , IMembershipCustomerRepository membershipCustomerRepository
            ) : base()
        {
            _webHostEnvironment = webHostEnvironment;
            _provinceRepository = provinceRepository;
            _districtRepository = districtRepository;
            _wardRepository = wardRepository;
            _companyRepository = companyRepository;
            _unitRepository = unitRepository;
            _productRepository = productRepository;
            _productCategoryRepository = productCategoryRepository;
            _membershipRepository = membershipRepository;
            _customerRepository = customerRepository;
            _membershipCategoryRepository = membershipCategoryRepository;
            _customerCategoryRepository = customerCategoryRepository;
            _membershipCustomerRepository = membershipCustomerRepository;
        }
        [HttpPost]
        public JsonResult PostProvinceListByExcelFile()
        {
            string result = AppGlobal.InitializationString;
            if (Request.Form.Files.Count > 0)
            {
                var file = Request.Form.Files[0];
                if (file == null || file.Length == 0)
                {
                }
                if (file != null)
                {
                    string fileExtension = Path.GetExtension(file.FileName);
                    string fileName = Path.GetFileNameWithoutExtension(file.FileName);
                    fileName = "Province_" + AppGlobal.InitializationDateTimeCode + fileExtension;
                    string pathSub = AppGlobal.Upload;
                    string webRootPath = _webHostEnvironment.WebRootPath;
                    var physicalPath = Path.Combine(_webHostEnvironment.WebRootPath, AppGlobal.Upload, fileName);
                    using (var stream = new FileStream(physicalPath, FileMode.Create))
                    {
                        file.CopyTo(stream);
                    }
                    try
                    {
                        FileInfo fileLocation = new FileInfo(physicalPath);
                        if (fileLocation.Length > 0)
                        {
                            if ((fileExtension == ".xlsx") || (fileExtension == ".xls"))
                            {
                                using (ExcelPackage package = new ExcelPackage(fileLocation))
                                {
                                    if (package.Workbook.Worksheets.Count > 0)
                                    {
                                        ExcelWorksheet workSheet = package.Workbook.Worksheets[1];
                                        if (workSheet != null)
                                        {
                                            int totalRows = workSheet.Dimension.Rows;
                                            for (int i = 2; i <= totalRows; i++)
                                            {
                                                try
                                                {
                                                    Province province = new Province();
                                                    if (workSheet.Cells[i, 1].Value != null)
                                                    {
                                                        province.Name = workSheet.Cells[i, 1].Value.ToString().Trim();
                                                    }
                                                    if (workSheet.Cells[i, 2].Value != null)
                                                    {
                                                        province.Code = workSheet.Cells[i, 2].Value.ToString().Trim();
                                                    }
                                                    Province provinceCheck = _provinceRepository.GetByCode(province.Code);
                                                    if (provinceCheck == null)
                                                    {
                                                        _provinceRepository.Add(province);
                                                    }
                                                    else
                                                    {
                                                        province = provinceCheck;
                                                    }

                                                    District district = new District();
                                                    district.ParentID = province.ID;
                                                    if (workSheet.Cells[i, 3].Value != null)
                                                    {
                                                        district.Name = workSheet.Cells[i, 3].Value.ToString().Trim();
                                                    }
                                                    if (workSheet.Cells[i, 4].Value != null)
                                                    {
                                                        district.Code = workSheet.Cells[i, 4].Value.ToString().Trim();
                                                    }
                                                    District districtCheck = _districtRepository.GetByCode(district.Code);
                                                    if (districtCheck == null)
                                                    {
                                                        _districtRepository.Add(district);
                                                    }
                                                    else
                                                    {
                                                        district = districtCheck;
                                                    }

                                                    Ward ward = new Ward();
                                                    ward.ParentID = district.ID;
                                                    if (workSheet.Cells[i, 5].Value != null)
                                                    {
                                                        ward.Name = workSheet.Cells[i, 5].Value.ToString().Trim();
                                                    }
                                                    if (workSheet.Cells[i, 6].Value != null)
                                                    {
                                                        ward.Code = workSheet.Cells[i, 6].Value.ToString().Trim();
                                                    }
                                                    Ward wardCheck = _wardRepository.GetByCode(ward.Code);
                                                    if (wardCheck == null)
                                                    {
                                                        _wardRepository.Add(ward);
                                                    }

                                                }
                                                catch (Exception e)
                                                {
                                                    result = e.Message;
                                                }
                                            }

                                        }
                                    }
                                }
                            }
                        }
                    }
                    catch (Exception e)
                    {
                        result = e.Message;
                    }
                }
            }
            return Json(result);
        }
        [HttpPost]
        public JsonResult PostProductListByExcelFile()
        {
            string result = AppGlobal.InitializationString;
            if (Request.Form.Files.Count > 0)
            {
                var file = Request.Form.Files[0];
                if (file == null || file.Length == 0)
                {
                }
                if (file != null)
                {
                    string fileExtension = Path.GetExtension(file.FileName);
                    string fileName = Path.GetFileNameWithoutExtension(file.FileName);
                    fileName = "Product_" + AppGlobal.InitializationDateTimeCode + fileExtension;
                    string pathSub = AppGlobal.Upload;
                    string webRootPath = _webHostEnvironment.WebRootPath;
                    var physicalPath = Path.Combine(_webHostEnvironment.WebRootPath, AppGlobal.Upload, fileName);
                    using (var stream = new FileStream(physicalPath, FileMode.Create))
                    {
                        file.CopyTo(stream);
                    }
                    try
                    {
                        FileInfo fileLocation = new FileInfo(physicalPath);
                        if (fileLocation.Length > 0)
                        {
                            if ((fileExtension == ".xlsx") || (fileExtension == ".xls"))
                            {
                                using (ExcelPackage package = new ExcelPackage(fileLocation))
                                {
                                    if (package.Workbook.Worksheets.Count > 0)
                                    {
                                        ExcelWorksheet workSheet = package.Workbook.Worksheets[1];
                                        if (workSheet != null)
                                        {
                                            int totalRows = workSheet.Dimension.Rows;
                                            for (int i = 2; i <= totalRows; i++)
                                            {
                                                try
                                                {
                                                    Product product = new Product();
                                                    product.ParentID = 9;
                                                    product.CompanyID = AppGlobal.CompanyID;
                                                    product.UnitID = AppGlobal.UnitID;
                                                    product.UnitID02 = AppGlobal.UnitID02;
                                                    product.Name = AppGlobal.InitializationString;
                                                    product.NameOriginal = AppGlobal.InitializationString;
                                                    product.Specifications = AppGlobal.InitializationString;
                                                    product.NameSpecial = AppGlobal.InitializationString;
                                                    ProductCategory productCategory = new ProductCategory();
                                                    if (workSheet.Cells[i, 1].Value != null)
                                                    {
                                                        productCategory.Name = workSheet.Cells[i, 1].Value.ToString().Trim();
                                                    }
                                                    productCategory = _productCategoryRepository.GetByName(productCategory.Name);
                                                    if (productCategory != null)
                                                    {
                                                        product.ParentID = productCategory.ID;
                                                    }

                                                    if (workSheet.Cells[i, 2].Value != null)
                                                    {
                                                        product.NameOriginal = workSheet.Cells[i, 2].Value.ToString().Trim();
                                                    }
                                                    if (workSheet.Cells[i, 3].Value != null)
                                                    {
                                                        product.Specifications = workSheet.Cells[i, 3].Value.ToString().Trim();
                                                    }
                                                    if (workSheet.Cells[i, 4].Value != null)
                                                    {
                                                        product.NameSpecial = workSheet.Cells[i, 4].Value.ToString().Trim();
                                                    }

                                                    Company company = new Company();
                                                    if (workSheet.Cells[i, 5].Value != null)
                                                    {
                                                        company.Code = workSheet.Cells[i, 5].Value.ToString().Trim();
                                                    }
                                                    company = _companyRepository.GetByCode(company.Code);
                                                    if (company != null)
                                                    {
                                                        product.CompanyID = company.ID;
                                                    }

                                                    Unit unit = new Unit();
                                                    if (workSheet.Cells[i, 6].Value != null)
                                                    {
                                                        unit.Name = workSheet.Cells[i, 6].Value.ToString().Trim();
                                                    }
                                                    unit = _unitRepository.GetByName(unit.Name);
                                                    if (unit != null)
                                                    {
                                                        product.UnitID = unit.ID;
                                                    }

                                                    if (workSheet.Cells[i, 7].Value != null)
                                                    {
                                                        try
                                                        {
                                                            product.SpecificationsNumber = int.Parse(workSheet.Cells[i, 7].Value.ToString().Trim());
                                                        }
                                                        catch (Exception e)
                                                        {
                                                            string message = e.Message;
                                                        }

                                                    }


                                                    product.Name = product.NameOriginal.Trim() + " " + product.Specifications.Trim() + " " + product.NameSpecial.Trim();

                                                    Product productCheck = _productRepository.GetByName(product.Name);
                                                    if (productCheck != null)
                                                    {
                                                        productCheck.ParentID = product.ParentID;
                                                        productCheck.UnitID = product.UnitID;
                                                        productCheck.CompanyID = product.CompanyID;
                                                        productCheck.NameOriginal = product.NameOriginal;
                                                        productCheck.Specifications = product.Specifications;
                                                        productCheck.NameSpecial = product.NameSpecial;
                                                        productCheck.SpecificationsNumber = product.SpecificationsNumber;
                                                        _productRepository.Update(productCheck);
                                                    }
                                                    else
                                                    {
                                                        _productRepository.Add(product);
                                                    }
                                                }
                                                catch (Exception e)
                                                {
                                                    result = e.Message;
                                                }
                                            }

                                        }
                                    }
                                }
                            }
                        }
                    }
                    catch (Exception e)
                    {
                        result = e.Message;
                    }
                }
            }
            return Json(result);
        }
        [HttpPost]
        public JsonResult PostMembershipListByExcelFile()
        {
            string result = AppGlobal.InitializationString;
            if (Request.Form.Files.Count > 0)
            {
                var file = Request.Form.Files[0];
                if (file == null || file.Length == 0)
                {
                }
                if (file != null)
                {
                    string fileExtension = Path.GetExtension(file.FileName);
                    string fileName = Path.GetFileNameWithoutExtension(file.FileName);
                    fileName = "Membership_" + AppGlobal.InitializationDateTimeCode + fileExtension;
                    string pathSub = AppGlobal.Upload;
                    string webRootPath = _webHostEnvironment.WebRootPath;
                    var physicalPath = Path.Combine(_webHostEnvironment.WebRootPath, AppGlobal.Upload, fileName);
                    using (var stream = new FileStream(physicalPath, FileMode.Create))
                    {
                        file.CopyTo(stream);
                    }
                    try
                    {
                        FileInfo fileLocation = new FileInfo(physicalPath);
                        if (fileLocation.Length > 0)
                        {
                            if ((fileExtension == ".xlsx") || (fileExtension == ".xls"))
                            {
                                using (ExcelPackage package = new ExcelPackage(fileLocation))
                                {
                                    if (package.Workbook.Worksheets.Count > 0)
                                    {
                                        ExcelWorksheet workSheet = package.Workbook.Worksheets[1];
                                        if (workSheet != null)
                                        {
                                            int totalRows = workSheet.Dimension.Rows;
                                            for (int i = 2; i <= totalRows; i++)
                                            {
                                                try
                                                {
                                                    Membership membership = new Membership();
                                                    membership.Active = true;
                                                    membership.ParentID = 3;
                                                    MembershipCategory membershipCategory = new MembershipCategory();
                                                    if (workSheet.Cells[i, 1].Value != null)
                                                    {
                                                        membershipCategory.Name = workSheet.Cells[i, 1].Value.ToString().Trim();
                                                    }
                                                    membershipCategory = _membershipCategoryRepository.GetByName(membershipCategory.Name);
                                                    if (membershipCategory != null)
                                                    {
                                                        membership.ParentID = membershipCategory.ID;
                                                    }
                                                    if (workSheet.Cells[i, 2].Value != null)
                                                    {
                                                        membership.Name = workSheet.Cells[i, 2].Value.ToString().Trim();
                                                    }
                                                    if (workSheet.Cells[i, 3].Value != null)
                                                    {
                                                        membership.Display = workSheet.Cells[i, 3].Value.ToString().Trim();
                                                    }
                                                    if (workSheet.Cells[i, 4].Value != null)
                                                    {
                                                        membership.Phone = workSheet.Cells[i, 4].Value.ToString().Trim();
                                                    }
                                                    if (workSheet.Cells[i, 5].Value != null)
                                                    {
                                                        membership.Email = workSheet.Cells[i, 5].Value.ToString().Trim();
                                                    }
                                                    Membership membershipCheck = _membershipRepository.GetByName(membership.Name);
                                                    if (membershipCheck == null)
                                                    {
                                                        _membershipRepository.Add(membership);
                                                    }
                                                }
                                                catch (Exception e)
                                                {
                                                    result = e.Message;
                                                }
                                            }

                                        }
                                    }
                                }
                            }
                        }
                    }
                    catch (Exception e)
                    {
                        result = e.Message;
                    }
                }
            }
            return Json(result);
        }
        [HttpPost]
        public JsonResult PostCustomerListByExcelFile()
        {
            string result = AppGlobal.InitializationString;
            if (Request.Form.Files.Count > 0)
            {
                var file = Request.Form.Files[0];
                if (file == null || file.Length == 0)
                {
                }
                if (file != null)
                {
                    string fileExtension = Path.GetExtension(file.FileName);
                    string fileName = Path.GetFileNameWithoutExtension(file.FileName);
                    fileName = "Customer_" + AppGlobal.InitializationDateTimeCode + fileExtension;
                    string pathSub = AppGlobal.Upload;
                    string webRootPath = _webHostEnvironment.WebRootPath;
                    var physicalPath = Path.Combine(_webHostEnvironment.WebRootPath, AppGlobal.Upload, fileName);
                    using (var stream = new FileStream(physicalPath, FileMode.Create))
                    {
                        file.CopyTo(stream);
                    }
                    try
                    {
                        FileInfo fileLocation = new FileInfo(physicalPath);
                        if (fileLocation.Length > 0)
                        {
                            if ((fileExtension == ".xlsx") || (fileExtension == ".xls"))
                            {
                                using (ExcelPackage package = new ExcelPackage(fileLocation))
                                {
                                    if (package.Workbook.Worksheets.Count > 0)
                                    {
                                        ExcelWorksheet workSheet = package.Workbook.Worksheets[1];
                                        if (workSheet != null)
                                        {
                                            int totalRows = workSheet.Dimension.Rows;
                                            for (int i = 2; i <= totalRows; i++)
                                            {
                                                try
                                                {
                                                    bool isDateJoin = false;
                                                    bool isProvinceID = false;
                                                    bool isParentID = false;
                                                    Customer customer = new Customer();
                                                    customer.Active = true;
                                                    customer.ProvinceID = 59;
                                                    customer.ParentID = 1;
                                                    customer.DateJoin = AppGlobal.InitializationDateTime;
                                                    if (workSheet.Cells[i, 1].Value != null)
                                                    {
                                                        customer.Name = workSheet.Cells[i, 1].Value.ToString().Trim();
                                                    }

                                                    CustomerCategory customerCategory = new CustomerCategory();
                                                    if (workSheet.Cells[i, 2].Value != null)
                                                    {
                                                        customerCategory.Name = workSheet.Cells[i, 2].Value.ToString().Trim();
                                                    }
                                                    customerCategory = _customerCategoryRepository.GetByName(customerCategory.Name);
                                                    if (customerCategory != null)
                                                    {
                                                        customer.ParentID = customerCategory.ID;
                                                        isParentID = true;
                                                    }

                                                    Province province = new Province();
                                                    if (workSheet.Cells[i, 3].Value != null)
                                                    {
                                                        province.Display = workSheet.Cells[i, 3].Value.ToString().Trim();
                                                    }
                                                    province = _provinceRepository.GetByDisplay(province.Display);
                                                    if (province != null)
                                                    {
                                                        customer.ProvinceID = province.ID;
                                                        isProvinceID = true;
                                                    }
                                                    try
                                                    {
                                                        if (workSheet.Cells[i, 4].Value != null)
                                                        {
                                                            customer.DateJoin = DateTime.Parse(workSheet.Cells[i, 4].Value.ToString().Trim());
                                                            isDateJoin = true;
                                                        }
                                                    }
                                                    catch (Exception e)
                                                    {
                                                        result = e.Message;
                                                    }
                                                    if (workSheet.Cells[i, 5].Value != null)
                                                    {
                                                        customer.Phone = workSheet.Cells[i, 5].Value.ToString().Trim();
                                                    }
                                                    if (workSheet.Cells[i, 6].Value != null)
                                                    {
                                                        customer.Address = workSheet.Cells[i, 6].Value.ToString().Trim();
                                                    }
                                                    if (workSheet.Cells[i, 7].Value != null)
                                                    {
                                                        customer.Email = workSheet.Cells[i, 7].Value.ToString().Trim();
                                                    }
                                                    if (workSheet.Cells[i, 8].Value != null)
                                                    {
                                                        customer.TaxCode = workSheet.Cells[i, 8].Value.ToString().Trim();
                                                    }
                                                    if (workSheet.Cells[i, 9].Value != null)
                                                    {
                                                        customer.Display = workSheet.Cells[i, 9].Value.ToString().Trim();
                                                    }

                                                    Customer customerCheck = _customerRepository.GetByName(customer.Name);
                                                    if (customerCheck == null)
                                                    {
                                                        _customerRepository.Add(customer);
                                                    }
                                                    else
                                                    {
                                                        customer.ID = customerCheck.ID;
                                                        customerCheck.Phone = customer.Phone;
                                                        customerCheck.Address = customer.Address;
                                                        customerCheck.Email = customer.Email;
                                                        customerCheck.TaxCode = customer.TaxCode;
                                                        customerCheck.Display = customer.Display;
                                                        if (isDateJoin == true)
                                                        {
                                                            customerCheck.DateJoin = customer.DateJoin;
                                                        }
                                                        if (isParentID == true)
                                                        {
                                                            customerCheck.ParentID = customer.ParentID;
                                                        }
                                                        if (isProvinceID == true)
                                                        {
                                                            customerCheck.ProvinceID = customer.ProvinceID;
                                                        }
                                                        _customerRepository.Update(customerCheck);                                                        
                                                    }
                                                    Membership membership = new Membership();
                                                    if (workSheet.Cells[i, 10].Value != null)
                                                    {
                                                        membership.Name = workSheet.Cells[i, 10].Value.ToString().Trim();
                                                    }
                                                    membership = _membershipRepository.GetByName(membership.Name);
                                                    if (membership != null)
                                                    {
                                                        MembershipCustomer membershipCustomer = _membershipCustomerRepository.GetByParentIDAndCustomerID(membership.ID, customer.ID);
                                                        if (membershipCustomer == null)
                                                        {
                                                            membershipCustomer = new MembershipCustomer();
                                                            membershipCustomer.Active = true;
                                                            membershipCustomer.ParentID = membership.ID;
                                                            membershipCustomer.CustomerID = customer.ID;
                                                            membershipCustomer.ProvinceID = customer.ProvinceID;
                                                            if (membershipCustomer.ParentID > 0)
                                                            {
                                                                if (membershipCustomer.CustomerID > 0)
                                                                {
                                                                    _membershipCustomerRepository.Add(membershipCustomer);
                                                                }
                                                            }
                                                        }
                                                        else
                                                        {
                                                            if (workSheet.Cells[i, 10].Value != null)
                                                            {
                                                                membershipCustomer.Active = true;
                                                                _membershipCustomerRepository.Update(membershipCustomer);
                                                            }
                                                        }
                                                    }
                                                }
                                                catch (Exception e)
                                                {
                                                    result = e.Message;
                                                }
                                            }

                                        }
                                    }
                                }
                            }
                        }
                    }
                    catch (Exception e)
                    {
                        result = e.Message;
                    }
                }
            }
            return Json(result);
        }
    }
}

