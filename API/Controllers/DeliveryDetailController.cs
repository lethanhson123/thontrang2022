using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using ThonTrang.Data.Models;
using ThonTrang.Data.Repositories;
using ThonTrang.Helpers;

namespace ThonTrang.API.Controllers
{
    public class DeliveryDetailController : BaseController
    {
        private readonly IDeliveryDetailRepository _deliveryDetailRepository;
        public DeliveryDetailController(IDeliveryDetailRepository deliveryDetailRepository) : base()
        {
            _deliveryDetailRepository = deliveryDetailRepository;
        }               
        [HttpGet]
        public List<DeliveryDetail> GetByParentIDToList(int parentID)
        {
            var result = _deliveryDetailRepository.GetByParentIDToList(parentID);
            return result;
        }
       
    }
}

