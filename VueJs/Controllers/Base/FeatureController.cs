using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;

namespace VueJs.Controllers.Base
{
    //[Authorize]
    [ResponseCache(Duration = 0, Location = ResponseCacheLocation.Client, NoStore = true)]
    public class FeatureController : Controller
    {
        protected readonly IConfiguration _configuration;
        private readonly IWebHostEnvironment _hostingEnvironment;
        public FeatureController(IConfiguration configuration, IWebHostEnvironment hostingEnvironment)
        {
            _hostingEnvironment = hostingEnvironment;
            _configuration = configuration;
        }
        public string SiteUrl
        {
            get
            {
                return string.Format("{0}://{1}", Request.Scheme, Request.Host);
            }
        }
    }
}
