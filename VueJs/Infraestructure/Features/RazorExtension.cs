using Microsoft.AspNetCore.Mvc.Razor;

namespace VueJs.Infraestructure.Features
{
    /// <summary>
    /// Definitions for Features Configurations, this a standard definition.
    /// </summary>
    public static class RazorExtensions
    {
        public static void ConfigureFeatureFolders(this RazorViewEngineOptions options)
        {
            // {0} - Action Name
            // {1} - Controller Name
            // {2} - Area Name
            // {3} - Feature Name
            options.ViewLocationFormats.Clear();
            options.ViewLocationFormats.Add("/Features/{3}/{1}/{0}.cshtml");
            options.ViewLocationFormats.Add("/Features/{3}/{0}.cshtml");
            options.ViewLocationFormats.Add("/Features/Shared/{0}.cshtml");

            options.ViewLocationExpanders.Add(new FeaturesViewLocationExpander());
        }

        public static void ConfigureFeatureFoldersSideBySideWithStandardViews(this RazorViewEngineOptions options)
        {
            // {0} - Action Name
            // {1} - Controller Name
            // {2} - Area Name
            // {3} - Feature Name

            // add support for features side-by-side with /Views
            // (do NOT clear ViewLocationFormats)
            options.ViewLocationFormats.Insert(0, "/Features/Shared/{0}.cshtml");
            options.ViewLocationFormats.Insert(0, "/Features/{3}/{0}.cshtml");
            options.ViewLocationFormats.Insert(0, "/Features/{3}/{1}/{0}.cshtml");

            options.ViewLocationExpanders.Add(new FeaturesViewLocationExpander());
        }
    }
}
