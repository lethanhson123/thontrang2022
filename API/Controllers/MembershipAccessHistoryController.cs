using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using ThonTrang.Data.Models;
using ThonTrang.Data.Repositories;
using ThonTrang.Helpers;

namespace ThonTrang.API.Controllers
{
    public class MembershipAccessHistoryController : BaseController
    {
        private readonly IMembershipAccessHistoryRepository _membershipAccessHistoryRepository;
        public MembershipAccessHistoryController(IMembershipAccessHistoryRepository membershipAccessHistoryRepository) : base()
        {
            _membershipAccessHistoryRepository = membershipAccessHistoryRepository;
        }
        [HttpPost]
        public MembershipAccessHistory Save(MembershipAccessHistory model)
        {
            var result = AppGlobal.InitializationNumber;
            if (model.ID > 0)
            {
                result = _membershipAccessHistoryRepository.Update(model);
            }
            else
            {
                result = _membershipAccessHistoryRepository.Add(model);
            }
            return model;
        }
        
        [HttpGet]
        public List<MembershipAccessHistory> GetByDateBeginAndDateEndToList(string dateBeginString, string dateEndString)
        {
            DateTime dateBegin = new DateTime(AppGlobal.InitializationDateTime.Year, AppGlobal.InitializationDateTime.Month, AppGlobal.InitializationDateTime.Day, 0, 0, 0);
            DateTime dateEnd = new DateTime(AppGlobal.InitializationDateTime.Year, AppGlobal.InitializationDateTime.Month, AppGlobal.InitializationDateTime.Day, 23, 59, 59);
            try
            {
                if (!string.IsNullOrEmpty(dateBeginString))
                {
                    dateBeginString = dateBeginString.Trim();
                }
                if (!string.IsNullOrEmpty(dateEndString))
                {
                    dateEndString = dateEndString.Trim();
                }
                dateBegin = DateTime.Parse(dateBeginString);
                dateEnd = DateTime.Parse(dateEndString);
            }
            catch (Exception e)
            {
                string mes = e.Message;
            }
            var result = _membershipAccessHistoryRepository.GetByDateBeginAndDateEndToList(dateBegin, dateEnd);
            return result;
        }
        
    }
}

