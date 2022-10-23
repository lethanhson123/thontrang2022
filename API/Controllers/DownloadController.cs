using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.IO;
using System.Text;
using System.Threading.Tasks;
using ThonTrang.Data.Models;
using ThonTrang.Data.Repositories;
using ThonTrang.Helpers;

namespace ThonTrang.API.Controllers
{
    public class DownloadController : BaseController
    {
        private readonly IWebHostEnvironment _webHostEnvironment;
        private readonly IOrderRepository _orderRepository;
        private readonly IOrderDetailRepository _orderDetailRepository;
        private readonly IWarehouseExportRepository _warehouseExportRepository;
        private readonly IWarehouseExportDetailRepository _warehouseExportDetailRepository;
        private readonly IDeliveryRepository _deliveryRepository;
        private readonly IDeliveryDetailRepository _deliveryDetailRepository;
        public DownloadController(IWebHostEnvironment webHostEnvironment
            , IOrderRepository orderRepository
            , IOrderDetailRepository orderDetailRepository
            , IWarehouseExportRepository warehouseExportRepository
            , IWarehouseExportDetailRepository warehouseExportDetailRepository
            , IDeliveryRepository deliveryRepository
            , IDeliveryDetailRepository deliveryDetailRepository
         ) : base()
        {
            _webHostEnvironment = webHostEnvironment;
            _orderRepository = orderRepository;
            _orderDetailRepository = orderDetailRepository;
            _warehouseExportRepository = warehouseExportRepository;
            _warehouseExportDetailRepository = warehouseExportDetailRepository;
            _deliveryRepository = deliveryRepository;
            _deliveryDetailRepository = deliveryDetailRepository;
        }
        [HttpGet]
        public List<YearMonth> GetMonthToList()
        {
            var result = YearMonth.GetMonthToList();
            return result;
        }
        [HttpGet]
        public List<YearMonth> GetYearToList()
        {
            var result = YearMonth.GetYearToList();
            return result;
        }
        [HttpGet]
        public JsonResult OrderByIDToHTML(int orderID)
        {
            string result = AppGlobal.InitializationString;
            string fileName = @"PhieuXuatVatTu_ThonTrang_" + AppGlobal.InitializationDateTimeCode + ".html";
            string subPath = AppGlobal.Download + "/" + AppGlobal.HTML;

            string contentHTML = AppGlobal.InitializationString;
            var physicalPathRead = Path.Combine(_webHostEnvironment.WebRootPath, subPath, "PhieuXuatVatTu_ThonTrang.html");
            using (FileStream fs = new FileStream(physicalPathRead, FileMode.Open))
            {
                using (StreamReader r = new StreamReader(fs, Encoding.UTF8))
                {
                    contentHTML = r.ReadToEnd();
                }
            }
            contentHTML = contentHTML.Replace("[DatePrint]", AppGlobal.InitializationDateTime.ToString("dd/MM/yyyy HH:mm:ss"));
            Order order = _orderRepository.GetByID(orderID);
            if (order != null)
            {
                List<OrderDetail> listOrderDetail = _orderDetailRepository.GetByParentIDToList(orderID);
                List<WarehouseExportDetail> listWarehouseExportDetail = _warehouseExportDetailRepository.GetByOrderIDToList(orderID);
                Delivery delivery = _deliveryRepository.GetByOrderID(orderID);

                contentHTML = contentHTML.Replace("[DateFounded]", order.DateFounded.Value.ToString("dd/MM/yyyy"));
                contentHTML = contentHTML.Replace("[Code]", order.Code);
                contentHTML = contentHTML.Replace("[CustomerDisplay]", order.CustomerDisplay);
                contentHTML = contentHTML.Replace("[Note]", order.Note);
                contentHTML = contentHTML.Replace("[AddressDelivery]", order.AddressDelivery);
                contentHTML = contentHTML.Replace("[CustomerPhone]", order.CustomerPhone);
                contentHTML = contentHTML.Replace("[TruckNumberControl]", delivery.TruckNumberControl);
                contentHTML = contentHTML.Replace("[TruckDriver]", delivery.TruckDriver + " (<b>" + delivery.TruckPhone + "</b>)");
                int STT = 0;
                int quantity = 0;
                int quantity001 = 0;
                int quantity002 = 0;
                decimal totalFinal = 0;
                StringBuilder content = new StringBuilder();
                foreach (OrderDetail item in listOrderDetail)
                {
                    WarehouseExportDetail itemWarehouseExportDetail = new WarehouseExportDetail();
                    foreach (WarehouseExportDetail warehouseExportDetail in listWarehouseExportDetail)
                    {
                        if (item.ProductID == warehouseExportDetail.ProductID)
                        {
                            itemWarehouseExportDetail = warehouseExportDetail;
                        }
                    }
                    STT = STT + 1;
                    content.AppendLine(@"<tr>");
                    content.AppendLine(@"<td style='text-align:center;'>" + STT + "</td>");
                    content.AppendLine(@"<td style='text-align:left;'>" + item.ProductDisplay + " (" + item.Quantity + ")</td>");
                    content.AppendLine(@"<td style='text-align:left;'>" + item.UnitDisplay + "</td>");
                    if (itemWarehouseExportDetail.ID == 0)
                    {
                        content.AppendLine(@"<td style='text-align:right;'></td>");
                        content.AppendLine(@"<td style='text-align:right;'></td>");
                        content.AppendLine(@"<td style='text-align:right;'></td>");
                        content.AppendLine(@"<td style='text-align:right;'></td>");
                        content.AppendLine(@"<td style='text-align:right;'></td>");
                    }
                    else
                    {
                        content.AppendLine(@"<td style='text-align:right;'>" + itemWarehouseExportDetail.Quantity + "</td>");
                        content.AppendLine(@"<td style='text-align:right;'>" + itemWarehouseExportDetail.QuantityExport + "</td>");
                        content.AppendLine(@"<td style='text-align:right;'>" + itemWarehouseExportDetail.QuantityExport02 + "</td>");
                        content.AppendLine(@"<td style='text-align:right;'>" + itemWarehouseExportDetail.Price.Value.ToString("N0") + "</td>");
                        content.AppendLine(@"<td style='text-align:right;'>" + itemWarehouseExportDetail.Total.Value.ToString("N0") + "</td>");
                        quantity = quantity + itemWarehouseExportDetail.Quantity.Value;
                        quantity001 = quantity001 + itemWarehouseExportDetail.QuantityExport.Value;
                        quantity002 = quantity002 + itemWarehouseExportDetail.QuantityExport02.Value;
                        totalFinal = totalFinal + itemWarehouseExportDetail.Total.Value;
                    }
                    content.AppendLine(@"</tr>");

                }
                contentHTML = contentHTML.Replace("[OrderDetail]", content.ToString());
                contentHTML = contentHTML.Replace("[Quantity]", quantity.ToString());
                contentHTML = contentHTML.Replace("[Quantity001]", quantity001.ToString());
                contentHTML = contentHTML.Replace("[Quantity002]", quantity002.ToString());
                contentHTML = contentHTML.Replace("[TotalFinal]", totalFinal.ToString("N0"));

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
        public JsonResult DeliveryByIDToHTML(int deliveryID)
        {
            string result = AppGlobal.InitializationString;
            string fileName = @"PhieuGiaoHang_ThonTrang_" + AppGlobal.InitializationDateTimeCode + ".html";
            string subPath = AppGlobal.Download + "/" + AppGlobal.HTML;

            string contentHTML = AppGlobal.InitializationString;
            var physicalPathRead = Path.Combine(_webHostEnvironment.WebRootPath, subPath, "PhieuGiaoHang_ThonTrang.html");
            using (FileStream fs = new FileStream(physicalPathRead, FileMode.Open))
            {
                using (StreamReader r = new StreamReader(fs, Encoding.UTF8))
                {
                    contentHTML = r.ReadToEnd();
                }
            }
            contentHTML = contentHTML.Replace("[DatePrint]", AppGlobal.InitializationDateTime.ToString("dd/MM/yyyy HH:mm:ss"));
            Delivery delivery = _deliveryRepository.GetByID(deliveryID);
            if (delivery != null)
            {

                contentHTML = contentHTML.Replace("[DateFounded]", delivery.DateFounded.Value.ToString("dd/MM/yyyy"));
                contentHTML = contentHTML.Replace("[DateDelivery]", delivery.DateDelivery.Value.ToString("dd/MM/yyyy"));
                contentHTML = contentHTML.Replace("[Code]", delivery.Code);
                contentHTML = contentHTML.Replace("[ProvinceName]", delivery.ProvinceName);
                contentHTML = contentHTML.Replace("[Weight]", delivery.Weight.Value.ToString("N2"));
                contentHTML = contentHTML.Replace("[TruckNumberControl]", delivery.TruckNumberControl);
                contentHTML = contentHTML.Replace("[TruckDriver]", delivery.TruckDriver + " (" + delivery.TruckPhone + ")");

                StringBuilder content = new StringBuilder();

                List<DeliveryDetail> listDeliveryDetail = _deliveryDetailRepository.GetByParentIDToList(delivery.ID);

                foreach (DeliveryDetail item in listDeliveryDetail)
                {
                    if (item.Weight > 0)
                    {
                        List<WarehouseExportDetail> listWarehouseExportDetail = _warehouseExportDetailRepository.GetByParentIDToList(item.OrderID.Value);
                        WarehouseExport warehouseExport = _warehouseExportRepository.GetByID(item.OrderID.Value);
                        List<OrderDetail> listOrderDetail = _orderDetailRepository.GetByParentIDToList(warehouseExport.ParentID.Value);

                        content.AppendLine(@"<hr/>");
                        content.AppendLine(@"<table style='width:100%; font-size:12px; line-height:16px;'>");
                        content.AppendLine(@"<tr>");
                        content.AppendLine(@"<td>Đơn hàng</td>");
                        content.AppendLine(@"<td><b>" + item.OrderCode + "</b></td>");
                        content.AppendLine(@"<td>Khách hàng</td>");
                        content.AppendLine(@"<td><b>" + item.CustomerDisplay + "</b></td>");
                        content.AppendLine(@"</tr>");
                        content.AppendLine(@"<tr>");
                        content.AppendLine(@"<td>Điện thoại</td>");
                        content.AppendLine(@"<td><b>" + item.CustomerPhone + "</b></td>");
                        content.AppendLine(@"<td>Địa chỉ</td>");
                        content.AppendLine(@"<td><b>" + item.AddressDelivery + "</b></td>");
                        content.AppendLine(@"</tr>");
                        content.AppendLine(@"</table>");

                        content.AppendLine(@"<table class='border' style='width: 100%; font-size:12px; line-height:16px;'>");
                        content.AppendLine(@"<thead>");
                        content.AppendLine(@"<tr>");
                        content.AppendLine(@"<th style='text-align:center;'><a style='cursor:pointer;'>STT</a></th>");
                        content.AppendLine(@"<th style='text-align:center;'><a style='cursor:pointer;'>Tên hàng</a></th>");
                        content.AppendLine(@"<th style='text-align:center;'><a style='cursor:pointer;'>ĐVT</a></th>");
                        content.AppendLine(@"<th style='text-align:center;'><a style='cursor:pointer;'>Số lượng</a></th>");
                        content.AppendLine(@"<th style='text-align:center;'><a style='cursor:pointer;'>Thùng</a></th>");
                        content.AppendLine(@"<th style='text-align:center;'><a style='cursor:pointer;'>Lẻ</a></th>");
                        content.AppendLine(@"<th style='text-align:center;'><a style='cursor:pointer;'>Đơn giá</a></th>");
                        content.AppendLine(@"<th style='text-align:center;'><a style='cursor:pointer;'>Thành tiền</a></th>");
                        content.AppendLine(@"</tr>");
                        content.AppendLine(@"</thead>");
                        content.AppendLine(@"<tbody>");

                        int STT = 0;
                        foreach (OrderDetail itemOrderDetail in listOrderDetail)
                        {
                            WarehouseExportDetail itemWarehouseExportDetail = new WarehouseExportDetail();
                            foreach (WarehouseExportDetail warehouseExportDetail in listWarehouseExportDetail)
                            {
                                if (itemOrderDetail.ProductID == warehouseExportDetail.ProductID)
                                {
                                    itemWarehouseExportDetail = warehouseExportDetail;
                                }
                            }
                            STT = STT + 1;
                            content.AppendLine(@"<tr>");
                            content.AppendLine(@"<td style='text-align:center;'>" + STT + "</td>");
                            content.AppendLine(@"<td style='text-align:left;'>" + itemOrderDetail.ProductDisplay + " (" + itemOrderDetail.Quantity + ")</td>");
                            content.AppendLine(@"<td style='text-align:left;'>" + itemOrderDetail.UnitDisplay + "</td>");
                            if (itemWarehouseExportDetail.ID == 0)
                            {
                                content.AppendLine(@"<td style='text-align:right;'></td>");
                                content.AppendLine(@"<td style='text-align:right;'></td>");
                                content.AppendLine(@"<td style='text-align:right;'></td>");
                                content.AppendLine(@"<td style='text-align:right;'></td>");
                                content.AppendLine(@"<td style='text-align:right;'></td>");
                            }
                            else
                            {
                                content.AppendLine(@"<td style='text-align:right;'>" + itemWarehouseExportDetail.Quantity + "</td>");
                                content.AppendLine(@"<td style='text-align:right;'>" + itemWarehouseExportDetail.QuantityExport + "</td>");
                                content.AppendLine(@"<td style='text-align:right;'>" + itemWarehouseExportDetail.QuantityExport02 + "</td>");
                                content.AppendLine(@"<td style='text-align:right;'>" + itemWarehouseExportDetail.Price.Value.ToString("N0") + "</td>");
                                content.AppendLine(@"<td style='text-align:right;'>" + itemWarehouseExportDetail.Total.Value.ToString("N0") + "</td>");
                            }
                            content.AppendLine(@"</tr>");
                        }
                        content.AppendLine(@"</tbody>");
                        content.AppendLine(@"</table>");
                        content.AppendLine(@"<hr/>");
                    }

                }
                contentHTML = contentHTML.Replace("[DeliveryDetail]", content.ToString());
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
        public JsonResult WarehouseExportDetailByDateBeginAndDateEndToHTML(string dateBegin, string dateEnd)
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
            string result = AppGlobal.InitializationString;
            string fileName = @"PhieuKho_ThonTrang_" + AppGlobal.InitializationDateTimeCode + ".html";
            string subPath = AppGlobal.Download + "/" + AppGlobal.HTML;

            string contentHTML = AppGlobal.InitializationString;
            var physicalPathRead = Path.Combine(_webHostEnvironment.WebRootPath, subPath, "PhieuKho_ThonTrang.html");
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

            List<WarehouseExportDetail> list = _warehouseExportDetailRepository.GetByDateBeginAndDateEndToList(dateBegin001, dateEnd001);

            StringBuilder content = new StringBuilder();
            int STT = 0;

            foreach (WarehouseExportDetail item in list)
            {
                STT = STT + 1;
                content.AppendLine(@"<tr>");
                content.AppendLine(@"<td style='text-align:center;'>" + STT + "</td>");
                content.AppendLine(@"<td style='text-align:right;'>" + item.DateUpdated.Value.ToString("dd/MM/yyyy") + "</td>");
                content.AppendLine(@"<td style='text-align:left;'>" + item.Code + "</td>");
                content.AppendLine(@"<td style='text-align:left;'>" + item.Display + "</td>");
                content.AppendLine(@"<td style='text-align:left;'>" + item.ProductDisplay + "</td>");
                content.AppendLine(@"<td style='text-align:left;'>" + item.UnitDisplay + "</td>");
                content.AppendLine(@"<td style='text-align:right;'>" + item.Quantity.Value.ToString("N0") + "</td>");
                content.AppendLine(@"<td style='text-align:right;'>" + item.QuantityExport.Value.ToString("N0") + "</td>");
                content.AppendLine(@"<td style='text-align:right;'>" + item.QuantityExport02.Value.ToString("N0") + "</td>");

                content.AppendLine(@"</tr>");
            }
            contentHTML = contentHTML.Replace("[Details]", content.ToString());

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

