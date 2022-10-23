﻿using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.IO;
using System.Text;
using System.Threading.Tasks;
using ThonTrang.Data.Models;
using ThonTrang.Data.Repositories;
using ThonTrang.Helpers;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Database;

namespace ThonTrang.API.Controllers
{
    public class ReportController : BaseController
    {
        private readonly IWebHostEnvironment _webHostEnvironment;
        private readonly IReportRepository _reportRepository;
        private readonly ICompanyRepository _companyRepository;
        private readonly ICustomerRepository _customerRepository;
        private readonly IProductRepository _productRepository;
        public ReportController(IWebHostEnvironment webHostEnvironment
            , IReportRepository reportRepository
            , ICompanyRepository companyRepository
            , ICustomerRepository customerRepository
            , IProductRepository productRepository
         ) : base()
        {
            _webHostEnvironment = webHostEnvironment;
            _reportRepository = reportRepository;
            _companyRepository = companyRepository;
            _customerRepository = customerRepository;
            _productRepository = productRepository;
        }
        [HttpGet]
        public List<ProductDataTransfer> TheKhoByDateBeginAndDateEndToList(string dateBegin, string dateEnd)
        {
            DateTime dateBegin001 = AppGlobal.InitializationDateTime;
            DateTime dateEnd001 = AppGlobal.InitializationDateTime;
            try
            {
                dateBegin = AppGlobal.CovertDateTime(dateBegin);
                dateEnd = AppGlobal.CovertDateTime(dateEnd);
                dateBegin001 = DateTime.Parse(dateBegin);
                dateEnd001 = DateTime.Parse(dateEnd);

            }
            catch (Exception e)
            {
                string mes = e.Message;
            }
            var result = _reportRepository.TheKhoByDateBeginAndDateEndToList(dateBegin001, dateEnd001);
            return result;
        }

        [HttpGet]
        public JsonResult ChiTietBanHangByCustomerIDAndDateBeginAndDateEndToHTML(int customerID, string dateBegin, string dateEnd)
        {
            string result = AppGlobal.InitializationString;
            DateTime dateBegin001 = AppGlobal.InitializationDateTime;
            DateTime dateEnd001 = AppGlobal.InitializationDateTime;
            try
            {
                dateBegin = AppGlobal.CovertDateTime(dateBegin);
                dateEnd = AppGlobal.CovertDateTime(dateEnd);
                dateBegin001 = DateTime.Parse(dateBegin);
                dateEnd001 = DateTime.Parse(dateEnd);

            }
            catch (Exception e)
            {
                string mes = e.Message;
            }
            string fileName = @"ChiTietBanHang_ThonTrang_" + AppGlobal.InitializationDateTimeCode + ".html";
            string subPath = AppGlobal.Download + "/" + AppGlobal.HTML;

            string contentHTML = AppGlobal.InitializationString;
            var physicalPathRead = Path.Combine(_webHostEnvironment.WebRootPath, subPath, "ChiTietBanHang_ThonTrang.html");
            using (FileStream fs = new FileStream(physicalPathRead, FileMode.Open))
            {
                using (StreamReader r = new StreamReader(fs, Encoding.UTF8))
                {
                    contentHTML = r.ReadToEnd();
                }
            }
            contentHTML = contentHTML.Replace("[DatePrint]", AppGlobal.InitializationDateTime.ToString("dd/MM/yyyy HH:mm:ss"));
            contentHTML = contentHTML.Replace("[DateBegin]", dateBegin001.ToString("dd/MM/yyyy"));
            contentHTML = contentHTML.Replace("[DateEnd]", dateEnd001.ToString("dd/MM/yyyy"));

            CustomerDataTransfer customerDataTransfer = _reportRepository.ChiTietBanHangByCustomerIDAndDateBeginAndDateEnd(customerID, dateBegin001, dateEnd001);
            if (customerDataTransfer != null)
            {

                contentHTML = contentHTML.Replace("[Display]", customerDataTransfer.Display);
                contentHTML = contentHTML.Replace("[Phone]", customerDataTransfer.Phone);
                contentHTML = contentHTML.Replace("[ProvinceName]", customerDataTransfer.ProvinceName);
                contentHTML = contentHTML.Replace("[ParentName]", customerDataTransfer.ParentName);
                contentHTML = contentHTML.Replace("[NoDauKy]", customerDataTransfer.NoDauKy.Value.ToString("N0"));
                contentHTML = contentHTML.Replace("[PhatSinh]", customerDataTransfer.PhatSinh.Value.ToString("N0"));
                contentHTML = contentHTML.Replace("[NoCuoiKy]", customerDataTransfer.NoCuoiKy.Value.ToString("N0"));
                contentHTML = contentHTML.Replace("[ThanhToan]", customerDataTransfer.ThanhToan.Value.ToString("N0"));


                customerDataTransfer.NoCuoiKy = customerDataTransfer.NoDauKy;
                List<WarehouseExportDetail> list = _reportRepository.ChiTietBanHangByCustomerIDAndDateBeginAndDateEnd001ToList(customerID, dateBegin001, dateEnd001);

                StringBuilder content = new StringBuilder();
                int STT = 0;
                foreach (WarehouseExportDetail item in list)
                {
                    STT = STT + 1;
                    content.AppendLine(@"<tr>");
                    content.AppendLine(@"<td style='text-align:center;'>" + STT + "</td>");
                    content.AppendLine(@"<td style='text-align:left;'>" + item.Code + "</td>");
                    content.AppendLine(@"<td style='text-align:right;'>" + item.DateUpdated.Value.ToString("dd/MM/yyyy") + "</td>");
                    content.AppendLine(@"<td style='text-align:left;'>" + item.ProductDisplay + "</td>");
                    content.AppendLine(@"<td style='text-align:left;'>" + item.UnitDisplay + "</td>");
                    content.AppendLine(@"<td style='text-align:right;'>" + item.Quantity + "</td>");
                    content.AppendLine(@"<td style='text-align:right;'>" + item.QuantityExport + "</td>");
                    content.AppendLine(@"<td style='text-align:right;'>" + item.QuantityExport02 + "</td>");
                    content.AppendLine(@"<td style='text-align:right;'>" + item.Price.Value.ToString("N0") + "</td>");
                    content.AppendLine(@"<td style='text-align:right;'><b>" + item.Total.Value.ToString("N0") + "</b></td>");
                    switch (item.SortOrder)
                    {
                        case 0:
                            customerDataTransfer.NoCuoiKy = customerDataTransfer.NoCuoiKy + +item.Total;
                            content.AppendLine(@"<td style='text-align:right;'></td>");
                            break;
                        case 1:
                            customerDataTransfer.NoCuoiKy = customerDataTransfer.NoCuoiKy - item.Total;
                            content.AppendLine(@"<td style='text-align:right;'><b style='color: green;'>" + item.Total.Value.ToString("N0") + "</b></td>");
                            break;
                    }
                    content.AppendLine(@"<td style='text-align:right;'><b style='color: red;'>" + customerDataTransfer.NoCuoiKy.Value.ToString("N0") + "</b></td>");
                    content.AppendLine(@"</tr>");
                }
                contentHTML = contentHTML.Replace("[Details]", content.ToString());
            }
            var physicalPathCreate = Path.Combine(_webHostEnvironment.WebRootPath, subPath, fileName);
            using (FileStream fs = new FileStream(physicalPathCreate, FileMode.Create))
            {
                using (StreamWriter w = new StreamWriter(fs, Encoding.UTF8))
                {
                    w.WriteLine(contentHTML);
                }
            }
            result = AppGlobal.APISite + subPath + "/" + fileName;
            return Json(result);
        }
        [HttpGet]
        public JsonResult CongNoDoiChieuByCustomerIDAndDateBeginAndDateEndToHTML(int customerID, string dateBegin, string dateEnd)
        {
            string result = AppGlobal.InitializationString;
            DateTime dateBegin001 = AppGlobal.InitializationDateTime;
            DateTime dateEnd001 = AppGlobal.InitializationDateTime;
            try
            {
                dateBegin = AppGlobal.CovertDateTime(dateBegin);
                dateEnd = AppGlobal.CovertDateTime(dateEnd);
                dateBegin001 = DateTime.Parse(dateBegin);
                dateEnd001 = DateTime.Parse(dateEnd);

            }
            catch (Exception e)
            {
                string mes = e.Message;
            }
            string fileName = @"CongNoDoiChieu_ThonTrang_" + AppGlobal.InitializationDateTimeCode + ".html";
            string subPath = AppGlobal.Download + "/" + AppGlobal.HTML;

            string contentHTML = AppGlobal.InitializationString;
            var physicalPathRead = Path.Combine(_webHostEnvironment.WebRootPath, subPath, "CongNoDoiChieu_ThonTrang.html");
            using (FileStream fs = new FileStream(physicalPathRead, FileMode.Open))
            {
                using (StreamReader r = new StreamReader(fs, Encoding.UTF8))
                {
                    contentHTML = r.ReadToEnd();
                }
            }
            contentHTML = contentHTML.Replace("[DatePrint]", AppGlobal.InitializationDateTime.ToString("dd/MM/yyyy HH:mm:ss"));
            contentHTML = contentHTML.Replace("[DateBegin]", dateBegin001.ToString("dd/MM/yyyy"));
            contentHTML = contentHTML.Replace("[DateEnd]", dateEnd001.ToString("dd/MM/yyyy"));

            Company company = _companyRepository.GetByID(1);
            if (company != null)
            {
                if (company.ID > 0)
                {
                    contentHTML = contentHTML.Replace("[CompanyName]", company.Name);
                }
            }

            CustomerDataTransfer customerDataTransfer = _reportRepository.ChiTietBanHangByCustomerIDAndDateBeginAndDateEnd(customerID, dateBegin001, dateEnd001);
            if (customerDataTransfer != null)
            {

                contentHTML = contentHTML.Replace("[Display]", customerDataTransfer.Display);
                contentHTML = contentHTML.Replace("[Phone]", customerDataTransfer.Phone);
                contentHTML = contentHTML.Replace("[ProvinceName]", customerDataTransfer.ProvinceName);
                contentHTML = contentHTML.Replace("[ParentName]", customerDataTransfer.ParentName);
                contentHTML = contentHTML.Replace("[NoDauKy]", customerDataTransfer.NoDauKy.Value.ToString("N0"));
                contentHTML = contentHTML.Replace("[PhatSinh]", customerDataTransfer.PhatSinh.Value.ToString("N0"));
                contentHTML = contentHTML.Replace("[NoCuoiKy]", customerDataTransfer.NoCuoiKy.Value.ToString("N0"));
                contentHTML = contentHTML.Replace("[ThanhToan]", customerDataTransfer.ThanhToan.Value.ToString("N0"));


                customerDataTransfer.NoCuoiKy = customerDataTransfer.NoDauKy;
                List<WarehouseExportDetail> list = _reportRepository.ChiTietBanHangByCustomerIDAndDateBeginAndDateEnd001ToList(customerID, dateBegin001, dateEnd001);

                StringBuilder content = new StringBuilder();
                int STT = 0;
                foreach (WarehouseExportDetail item in list)
                {
                    STT = STT + 1;
                    content.AppendLine(@"<tr>");
                    content.AppendLine(@"<td style='text-align:center;'>" + STT + "</td>");
                    content.AppendLine(@"<td style='text-align:left;'>" + item.Code + "</td>");
                    content.AppendLine(@"<td style='text-align:right;'>" + item.DateUpdated.Value.ToString("dd/MM/yyyy") + "</td>");
                    content.AppendLine(@"<td style='text-align:left;'>" + item.ProductDisplay + "</td>");
                    content.AppendLine(@"<td style='text-align:left;'>" + item.UnitDisplay + "</td>");
                    content.AppendLine(@"<td style='text-align:right;'>" + item.Quantity + "</td>");
                    content.AppendLine(@"<td style='text-align:right;'>" + item.QuantityExport + "</td>");
                    content.AppendLine(@"<td style='text-align:right;'>" + item.QuantityExport02 + "</td>");
                    content.AppendLine(@"<td style='text-align:right;'>" + item.Price.Value.ToString("N0") + "</td>");
                    content.AppendLine(@"<td style='text-align:right;'><b>" + item.Total.Value.ToString("N0") + "</b></td>");
                    switch (item.SortOrder)
                    {
                        case 0:
                            customerDataTransfer.NoCuoiKy = customerDataTransfer.NoCuoiKy + +item.Total;
                            content.AppendLine(@"<td style='text-align:right;'></td>");
                            break;
                        case 1:
                            customerDataTransfer.NoCuoiKy = customerDataTransfer.NoCuoiKy - item.Total;
                            content.AppendLine(@"<td style='text-align:right;'><b style='color: green;'>" + item.Total.Value.ToString("N0") + "</b></td>");
                            break;
                    }
                    content.AppendLine(@"<td style='text-align:right;'><b style='color: red;'>" + customerDataTransfer.NoCuoiKy.Value.ToString("N0") + "</b></td>");
                    content.AppendLine(@"<td style='text-align:right;'></td>");
                    content.AppendLine(@"<td style='text-align:right;'></td>");
                    content.AppendLine(@"<td style='text-align:right;'></td>");
                    content.AppendLine(@"</tr>");
                }
                contentHTML = contentHTML.Replace("[Details]", content.ToString());
            }
            var physicalPathCreate = Path.Combine(_webHostEnvironment.WebRootPath, subPath, fileName);
            using (FileStream fs = new FileStream(physicalPathCreate, FileMode.Create))
            {
                using (StreamWriter w = new StreamWriter(fs, Encoding.UTF8))
                {
                    w.WriteLine(contentHTML);
                }
            }
            result = AppGlobal.APISite + subPath + "/" + fileName;
            return Json(result);
        }
        [HttpGet]
        public JsonResult CongNoPhaiThuByCustomerIDAndDateBeginAndDateEndToHTML(int customerID, string dateBegin, string dateEnd)
        {
            string result = AppGlobal.InitializationString;
            DateTime dateBegin001 = AppGlobal.InitializationDateTime;
            DateTime dateEnd001 = AppGlobal.InitializationDateTime;
            try
            {
                dateBegin = AppGlobal.CovertDateTime(dateBegin);
                dateEnd = AppGlobal.CovertDateTime(dateEnd);
                dateBegin001 = DateTime.Parse(dateBegin);
                dateEnd001 = DateTime.Parse(dateEnd);

            }
            catch (Exception e)
            {
                string mes = e.Message;
            }
            string fileName = @"CongNoPhaiThu_ThonTrang_" + AppGlobal.InitializationDateTimeCode + ".html";
            string subPath = AppGlobal.Download + "/" + AppGlobal.HTML;

            string contentHTML = AppGlobal.InitializationString;
            var physicalPathRead = Path.Combine(_webHostEnvironment.WebRootPath, subPath, "CongNoPhaiThu_ThonTrang.html");
            using (FileStream fs = new FileStream(physicalPathRead, FileMode.Open))
            {
                using (StreamReader r = new StreamReader(fs, Encoding.UTF8))
                {
                    contentHTML = r.ReadToEnd();
                }
            }
            contentHTML = contentHTML.Replace("[DatePrint]", AppGlobal.InitializationDateTime.ToString("dd/MM/yyyy HH:mm:ss"));
            contentHTML = contentHTML.Replace("[DateBegin]", dateBegin001.ToString("dd/MM/yyyy"));
            contentHTML = contentHTML.Replace("[DateEnd]", dateEnd001.ToString("dd/MM/yyyy"));



            CustomerDataTransfer customerDataTransfer = _reportRepository.ChiTietBanHangByCustomerIDAndDateBeginAndDateEnd(customerID, dateBegin001, dateEnd001);
            if (customerDataTransfer != null)
            {
                decimal? total = customerDataTransfer.DebtThonTrang + customerDataTransfer.DebtBiben + customerDataTransfer.DebtVyTam;
                contentHTML = contentHTML.Replace("[Display]", customerDataTransfer.Display);
                contentHTML = contentHTML.Replace("[Phone]", customerDataTransfer.Phone);
                contentHTML = contentHTML.Replace("[ProvinceName]", customerDataTransfer.ProvinceName);
                contentHTML = contentHTML.Replace("[ParentName]", customerDataTransfer.ParentName);
                contentHTML = contentHTML.Replace("[DebtThonTrang]", customerDataTransfer.DebtThonTrang.Value.ToString("N0"));
                contentHTML = contentHTML.Replace("[DebtBiben]", customerDataTransfer.DebtBiben.Value.ToString("N0"));
                contentHTML = contentHTML.Replace("[DebtVyTam]", customerDataTransfer.DebtVyTam.Value.ToString("N0"));
                contentHTML = contentHTML.Replace("[Total]", total.Value.ToString("N0"));

                StringBuilder content = new StringBuilder();

                List<WarehouseExportDetail> list = _reportRepository.ChiTietBanHangByCustomerIDAndDateBeginAndDateEnd002ToList(customerID, dateBegin001, dateEnd001);
                int STT = 0;

                int companyID = 0;
                foreach (WarehouseExportDetail item in list)
                {
                    if (item.StatusID != companyID)
                    {
                        companyID = item.StatusID.Value;
                        customerDataTransfer.NoCuoiKy = 0;
                    }
                    STT = STT + 1;
                    content.AppendLine(@"<tr>");
                    content.AppendLine(@"<td style='text-align:center;'>" + STT + "</td>");
                    content.AppendLine(@"<td style='text-align:left;'>" + item.Display + "</td>");
                    content.AppendLine(@"<td style='text-align:left;'></td>");
                    switch (item.SortOrder)
                    {
                        case 0:
                            content.AppendLine(@"<td style='text-align:right;'>" + item.DateUpdated.Value.ToString("dd/MM/yyyy") + "</td>");
                            break;
                        case 1:
                            content.AppendLine(@"<td style='text-align:right;'>" + item.DateUpdated.Value.ToString("dd/MM/yyyy") + "</td>");
                            break;
                        default:
                            content.AppendLine(@"<td style='text-align:right;'></td>");
                            break;
                    }

                    content.AppendLine(@"<td style='text-align:left;'></td>");
                    content.AppendLine(@"<td style='text-align:left;'>" + item.Code + "</td>");
                    switch (item.SortOrder)
                    {
                        case 0:
                            content.AppendLine(@"<td style='text-align:left;'>" + item.ProductDisplay + "</td>");
                            break;
                        case 1:
                            content.AppendLine(@"<td style='text-align:left;'>" + item.ProductDisplay + "</td>");
                            break;
                        default:
                            content.AppendLine(@"<td style='text-align:left;'><b>" + item.ProductDisplay + "</b></td>");
                            break;
                    }
                    content.AppendLine(@"<td style='text-align:right;'>" + item.Quantity + "</td>");
                    content.AppendLine(@"<td style='text-align:right;'>" + item.Price.Value.ToString("N0") + "</td>");
                    content.AppendLine(@"<td style='text-align:right;'><b>" + item.Total.Value.ToString("N0") + "</b></td>");
                    switch (item.SortOrder)
                    {
                        case 0:
                            customerDataTransfer.NoCuoiKy = customerDataTransfer.NoCuoiKy + item.Total;
                            content.AppendLine(@"<td style='text-align:right;'></td>");
                            break;
                        case 1:
                            customerDataTransfer.NoCuoiKy = customerDataTransfer.NoCuoiKy - item.Total;
                            content.AppendLine(@"<td style='text-align:right;'><b style='color: green;'>" + item.Total.Value.ToString("N0") + "</b></td>");
                            break;
                        default:
                            content.AppendLine(@"<td style='text-align:right;'></td>");
                            break;
                    }
                    content.AppendLine(@"<td style='text-align:right;'><b style='color: red;'>" + customerDataTransfer.NoCuoiKy.Value.ToString("N0") + "</b></td>");
                    content.AppendLine(@"</tr>");
                }
                contentHTML = contentHTML.Replace("[Details]", content.ToString());
            }
            var physicalPathCreate = Path.Combine(_webHostEnvironment.WebRootPath, subPath, fileName);
            using (FileStream fs = new FileStream(physicalPathCreate, FileMode.Create))
            {
                using (StreamWriter w = new StreamWriter(fs, Encoding.UTF8))
                {
                    w.WriteLine(contentHTML);
                }
            }
            result = AppGlobal.APISite + subPath + "/" + fileName;
            return Json(result);
        }

        [HttpGet]
        public JsonResult TonKhoThanhPhamByProductIDAndDateBeginAndDateEndToHTML(int productID, string dateBegin, string dateEnd)
        {
            string result = AppGlobal.InitializationString;
            DateTime dateBegin001 = AppGlobal.InitializationDateTime;
            DateTime dateEnd001 = AppGlobal.InitializationDateTime;
            try
            {
                dateBegin = AppGlobal.CovertDateTime(dateBegin);
                dateEnd = AppGlobal.CovertDateTime(dateEnd);
                dateBegin001 = DateTime.Parse(dateBegin);
                dateEnd001 = DateTime.Parse(dateEnd);

            }
            catch (Exception e)
            {
                string mes = e.Message;
            }
            string fileName = @"PhieuTonKhoThanhPham_ThonTrang_" + AppGlobal.InitializationDateTimeCode + ".html";
            string subPath = AppGlobal.Download + "/" + AppGlobal.HTML;

            string contentHTML = AppGlobal.InitializationString;
            var physicalPathRead = Path.Combine(_webHostEnvironment.WebRootPath, subPath, "PhieuTonKhoThanhPham_ThonTrang.html");
            using (FileStream fs = new FileStream(physicalPathRead, FileMode.Open))
            {
                using (StreamReader r = new StreamReader(fs, Encoding.UTF8))
                {
                    contentHTML = r.ReadToEnd();
                }
            }
            contentHTML = contentHTML.Replace("[DatePrint]", AppGlobal.InitializationDateTime.ToString("dd/MM/yyyy HH:mm:ss"));
            contentHTML = contentHTML.Replace("[DateBegin]", dateBegin001.ToString("dd/MM/yyyy"));
            contentHTML = contentHTML.Replace("[DateEnd]", dateEnd001.ToString("dd/MM/yyyy"));

            Product product = _productRepository.GetByID(productID);
            if (product != null)
            {

                contentHTML = contentHTML.Replace("[ProductDisplay]", product.Display);


                List<ProductDataTransfer> list = _reportRepository.TheKhoByProductIDAndDateBeginAndDateEndToList(productID, dateBegin001, dateEnd001);

                StringBuilder content = new StringBuilder();
                int STT = 0;
                foreach (ProductDataTransfer item in list)
                {
                    STT = STT + 1;
                    content.AppendLine(@"<tr>");
                    content.AppendLine(@"<td style='text-align:center;'>" + STT + "</td>");
                    content.AppendLine(@"<td style='text-align:left;'>" + item.CustomerDisplay + "</td>");
                    content.AppendLine(@"<td style='text-align:right;'><b>" + item.TonDauKy.Value.ToString("N0") + "</b></td>");
                    content.AppendLine(@"<td style='text-align:right;'>" + item.TonDauKy / product.SpecificationsNumber + "</td>");
                    content.AppendLine(@"<td style='text-align:right;'>" + item.TonDauKy % product.SpecificationsNumber + "</td>");
                    content.AppendLine(@"<td style='text-align:right;'><b>" + item.QuantityImport.Value.ToString("N0") + "</b></td>");
                    content.AppendLine(@"<td style='text-align:right;'>" + item.QuantityImport / product.SpecificationsNumber + "</td>");
                    content.AppendLine(@"<td style='text-align:right;'>" + item.QuantityImport % product.SpecificationsNumber + "</td>");
                    content.AppendLine(@"<td style='text-align:right;'><b>" + item.QuantityExport.Value.ToString("N0") + "</b></td>");
                    content.AppendLine(@"<td style='text-align:right;'>" + item.QuantityExport / product.SpecificationsNumber + "</td>");
                    content.AppendLine(@"<td style='text-align:right;'>" + item.QuantityExport % product.SpecificationsNumber + "</td>");
                    content.AppendLine(@"<td style='text-align:right;'><b>" + item.TonCuoiKy.Value.ToString("N0") + "</b></td>");
                    content.AppendLine(@"<td style='text-align:right;'>" + item.TonCuoiKy / product.SpecificationsNumber + "</td>");
                    content.AppendLine(@"<td style='text-align:right;'>" + item.TonCuoiKy % product.SpecificationsNumber + "</td>");
                    content.AppendLine(@"</tr>");
                }
                contentHTML = contentHTML.Replace("[Details]", content.ToString());
            }
            var physicalPathCreate = Path.Combine(_webHostEnvironment.WebRootPath, subPath, fileName);
            using (FileStream fs = new FileStream(physicalPathCreate, FileMode.Create))
            {
                using (StreamWriter w = new StreamWriter(fs, Encoding.UTF8))
                {
                    w.WriteLine(contentHTML);
                }
            }
            result = AppGlobal.APISite + subPath + "/" + fileName;
            return Json(result);
        }
    }
}

