﻿using Microsoft.AspNetCore.Mvc.ApplicationModels;
using System;
using System.Linq;
using System.Reflection;

namespace VueJs.Infraestructure.Features
{
    /// <summary>
    /// Conventios to define the use of Features
    /// </summary>
    public class FeaturesConvention : IControllerModelConvention
    {
        public void Apply(ControllerModel controller)
        {
            controller.Properties.Add("feature",
              GetFeatureName(controller.ControllerType));
        }
        private string GetFeatureName(TypeInfo controllerType)
        {
            string[] tokens = controllerType.FullName.Split('.');
            if (!tokens.Any(t => t == "Features")) return "";
            string featureName = tokens
              .SkipWhile(t => !t.Equals("features",
                StringComparison.CurrentCultureIgnoreCase))
              .Skip(1)
              .Take(1)
              .FirstOrDefault();
            return featureName;
        }
    }
}
