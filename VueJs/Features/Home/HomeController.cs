using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using VueJs.Controllers.Base;

namespace VueJs.Features.Home
{
    public class HomeController : FeatureController
    {
        public HomeController(IConfiguration configuration,
             IWebHostEnvironment hostingEnvironment) : base(configuration, hostingEnvironment)
        {

        }
        public IActionResult Index()
        {
            return View("Home");
        }
    }
}