using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using ThonTrang.Data.Models;
using ThonTrang.Data.Repositories;
using ThonTrang.Helpers;

namespace ThonTrang.API.Controllers
{
    public class OrderController : BaseController
    {
        private readonly IOrderRepository _orderRepository;
        private readonly IOrderDetailRepository _orderDetailRepository;
        public OrderController(IOrderRepository orderRepository, IOrderDetailRepository orderDetailRepository) : base()
        {
            _orderRepository = orderRepository;
            _orderDetailRepository = orderDetailRepository;
        }
        [HttpPost]
        public Order Save(Order model)
        {
            var result = AppGlobal.InitializationNumber;
            if (model.ID > 0)
            {
                result = _orderRepository.Update(model);
            }
            else
            {
                result = _orderRepository.Add(model);
            }            
            model = _orderRepository.GetByID(model.ID);
            return model;
        }
        [HttpPost]
        public int SaveShoppingCart()
        {
            var result = AppGlobal.InitializationNumber;
            List<OrderDetail> listOrderDetail = JsonConvert.DeserializeObject<List<OrderDetail>>(Request.Form["listOrderDetail"]);
            int customerID = JsonConvert.DeserializeObject<int>(Request.Form["customerID"]);
            int orderID = JsonConvert.DeserializeObject<int>(Request.Form["orderID"]);
            int userUpdated = JsonConvert.DeserializeObject<int>(Request.Form["userUpdated"]);
            Order order = new Order();
            order.ID = orderID;
            if (order.ID == 0)
            {                
                order.UserUpdated = userUpdated;
                order.UserFoundedID = userUpdated;                
                order.CustomerID = customerID;                           
                _orderRepository.Add(order);
            }            
            foreach (OrderDetail item in listOrderDetail)
            {
                item.ParentID = order.ID;                
                item.UserUpdated = userUpdated;
                _orderDetailRepository.Add(item);
            }            
            return result;
        }

        [HttpGet]
        public List<Order> GetByActiveAndStatusIDAndYearAndMonthAndSearchStringToList(bool active, int statusID, int year, int month, string searchString)
        {
            var result = _orderRepository.GetByActiveAndStatusIDAndYearAndMonthAndSearchStringToList(active, statusID, year, month, searchString);
            return result;
        }

        [HttpGet]
        public List<Order> GetByActiveAndStatusIDAndUserFoundedIDAndSearchStringToList(bool active, int statusID, int userFoundedID, string searchString)
        {
            var result = _orderRepository.GetByActiveAndStatusIDAndUserFoundedIDAndSearchStringToList(active, statusID, userFoundedID, searchString);
            return result;
        }

        [HttpGet]
        public Order GetByID(int ID)
        {
            Order result = _orderRepository.GetByID(ID);
            if (result == null)
            {
                result = new Order();                
            }
            return result;
        }
        [HttpGet]
        public Order GetByIDString(string ID)
        {
            Order result = new Order();
            try
            {
                ID = ID.Split('.')[0];
                ID = ID.Split('/')[ID.Split('/').Length - 1];
                result = _orderRepository.GetByID(int.Parse(ID));
            }
            catch (Exception e)
            {
                string mes = e.Message;
            }
            if (result == null)
            {
                result = new Order();                
            }
            return result;
        }
    }
}

