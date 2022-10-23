using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using ThonTrang.Data.Models;
using ThonTrang.Data.Repositories;
using ThonTrang.Helpers;

namespace ThonTrang.API.Controllers
{
    public class MembershipController : BaseController
    {
        private readonly IMembershipRepository _membershipRepository;
        public MembershipController(IMembershipRepository membershipRepository) : base()
        {
            _membershipRepository = membershipRepository;
        }
        [HttpPost]
        public Membership Save(Membership model)
        {
            var result = AppGlobal.InitializationNumber;
            if (model.ID > 0)
            {
                result = _membershipRepository.Update(model);
            }
            else
            {
                result = _membershipRepository.Add(model);
            }
            return model;
        }

        [HttpGet]
        public List<Membership> GetAllToList()
        {
            var result = _membershipRepository.GetAllToList();
            return result;
        }
        [HttpGet]
        public List<Membership> GetBySearchStringToList(string searchString)
        {
            var result = _membershipRepository.GetBySearchStringToList(searchString);
            return result;
        }

        [HttpGet]
        public Membership GetByID(int ID)
        {
            Membership result = _membershipRepository.GetByID(ID);
            if (result == null)
            {
                result = new Membership();
                result.Active = true;
            }
            return result;
        }
        [HttpGet]
        public Membership GetByIDString(string ID)
        {
            Membership result = new Membership();
            try
            {
                ID = ID.Split('.')[0];
                ID = ID.Split('/')[ID.Split('/').Length - 1];
                result = _membershipRepository.GetByID(int.Parse(ID));
            }
            catch (Exception e)
            {
                string mes = e.Message;
            }
            if (result == null)
            {
                result = new Membership();                
                result.Active = true;                
            }
            return result;
        }
        [HttpGet]
        public Membership AuthenticationByAccountAndPasswordAndURL(string account, string password, string urlDestination)
        {
            Membership result = _membershipRepository.AuthenticationByAccountAndPasswordAndURL(account, password, urlDestination);           
            return result;
        }
    }
}

