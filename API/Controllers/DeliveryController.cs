using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using ThonTrang.Data.Models;
using ThonTrang.Data.Repositories;
using ThonTrang.Helpers;

namespace ThonTrang.API.Controllers
{
    public class DeliveryController : BaseController
    {
        private readonly IDeliveryRepository _deliveryRepository;
        public DeliveryController(IDeliveryRepository deliveryRepository) : base()
        {
            _deliveryRepository = deliveryRepository;
        }
        [HttpPost]
        public Delivery Save(Delivery model)
        {
            var result = AppGlobal.InitializationNumber;
            if (model.ID > 0)
            {
                result = _deliveryRepository.Update(model);
            }
            else
            {
                result = _deliveryRepository.Add(model);
            }
            return model;
        }

        [HttpGet]
        public List<Delivery> GetByDateBeginAndDateEndToList(string dateBegin, string dateEnd)
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
            var result = _deliveryRepository.GetByDateBeginAndDateEndToList(dateBegin001, dateEnd001);
            return result;
        }

        [HttpGet]
        public Delivery GetByID(int ID)
        {
            Delivery result = _deliveryRepository.GetByID(ID);
            if (result == null)
            {
                result = new Delivery();
                result.Active = true;
            }
            return result;
        }
        [HttpGet]
        public Delivery GetByIDString(string ID)
        {
            Delivery result = new Delivery();
            try
            {
                ID = ID.Split('.')[0];
                ID = ID.Split('/')[ID.Split('/').Length - 1];
                result = _deliveryRepository.GetByID(int.Parse(ID));
            }
            catch (Exception e)
            {
                string mes = e.Message;
            }
            if (result == null)
            {
                result = new Delivery();
            }
            return result;
        }
    }
}

