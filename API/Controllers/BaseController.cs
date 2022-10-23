
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.AspNetCore.Routing;
using System.Globalization;
using System.Threading;

namespace ThonTrang.API.Controllers
{
    [ApiController]
    [Route("[controller]/[action]")]
    public class BaseController : Controller, IActionFilter
    {     

        public BaseController()
        {            
        }
    }
}
