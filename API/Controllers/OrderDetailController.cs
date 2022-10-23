using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using ThonTrang.Data.Models;
using ThonTrang.Data.Repositories;
using ThonTrang.Helpers;

namespace ThonTrang.API.Controllers
{
    public class OrderDetailController : BaseController
    {
        private readonly IOrderDetailRepository _orderDetailRepository;
        private readonly IOrderRepository _orderRepository;
        public OrderDetailController(IOrderDetailRepository orderDetailRepository, IOrderRepository orderRepository) : base()
        {
            _orderDetailRepository = orderDetailRepository;
            _orderRepository = orderRepository;
        }
        [HttpPost]
        public OrderDetail Save(OrderDetail model)
        {
            var result = AppGlobal.InitializationNumber;
            if (model.ID > 0)
            {
                result = _orderDetailRepository.Update(model);
            }
            else
            {
                result = _orderDetailRepository.Add(model);
            }           
            return model;
        }
        [HttpGet]
        public List<OrderDetail> GetByParentIDToList(int parentID)
        {
            var result = _orderDetailRepository.GetByParentIDToList(parentID);
            return result;
        }       
        [HttpGet]
        public int Remove(int ID)
        {
            var result = _orderDetailRepository.Remove(ID);
            return result;
        }
    }
}

