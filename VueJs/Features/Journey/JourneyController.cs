using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using VueJs.Controllers.Base;

namespace VueJs.Features.Journey
{
    public class JourneyController : FeatureController
    {
        public JourneyController(IConfiguration configuration,
             IWebHostEnvironment hostingEnvironment) : base(configuration, hostingEnvironment)
        {

        }
        [Route("Journey")]
        public IActionResult Index()
        {
            return View("Index");
        }
    }
}
