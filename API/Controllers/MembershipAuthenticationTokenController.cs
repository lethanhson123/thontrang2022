using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using ThonTrang.Data.Models;
using ThonTrang.Data.Repositories;
using ThonTrang.Helpers;

namespace ThonTrang.API.Controllers
{
    public class MembershipAuthenticationTokenController : BaseController
    {
        private readonly IMembershipAuthenticationTokenRepository _membershipAuthenticationTokenRepository;
        public MembershipAuthenticationTokenController(IMembershipAuthenticationTokenRepository membershipAuthenticationTokenRepository) : base()
        {
            _membershipAuthenticationTokenRepository = membershipAuthenticationTokenRepository;
        }
        [HttpPost]
        public MembershipAuthenticationToken Save(MembershipAuthenticationToken model)
        {
            var result = AppGlobal.InitializationNumber;
            if (model.ID > 0)
            {
                result = _membershipAuthenticationTokenRepository.Update(model);
            }
            else
            {
                result = _membershipAuthenticationTokenRepository.Add(model);
            }
            return model;
        }
        [HttpGet]
        public MembershipAuthenticationToken GetByAuthenticationToken(string authenticationToken)
        {
            var result = _membershipAuthenticationTokenRepository.GetByAuthenticationToken(authenticationToken);
            return result;
        }
    }
}

