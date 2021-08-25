/// <reference path="../../wwwroot/js/typings/jquery/jquery.d.ts" />
/// <reference path="../../wwwroot/js/typings/lodash/lodash.d.ts" />
/// <reference path="../../wwwroot/js/typings/moment/moment.d.ts" />

module Common {
    export function isArray(obj: any): boolean {
        return Object.prototype.toString.call(obj) === '[object Array]';
    }

    export class Controller<TModel> {
        // #region constructor and factory

        static current;

        getName() {
            var funcNameRegex = /function (.{1,})\(/;
            var results = (funcNameRegex).exec((<any>this).constructor.toString());
            return (results && results.length > 1) ? results[1] : "";
        }

        static registerController(c: any) {

            if (!Common.Controller.current) {
                // to unique controller registered
                Common.Controller.current = c;
            } else if (Object.prototype.toString.call(Common.Controller.current) === '[object Array]') {
                // to an array of controllers 
                Common.Controller.current.push(c);
            } else {
                // to unique controller, changes for an array
                Common.Controller.current = [Common.Controller.current, c];
            }
        }

        static initialize(controllerType: { new(any?); }, entityUrl: string, initialDataUrl?: string) {
            var controller;

            if (initialDataUrl) {
                $.ajax(initialDataUrl, {
                    type: "POST",
                    success: (data) => {
                        controller = new controllerType(data);
                        controller.serviceUrl = entityUrl;
                        Common.Controller.registerController(controller);
                    }
                });
            }
            else {
                controller = new controllerType();
                controller.serviceUrl = entityUrl;
                Common.Controller.registerController(controller);
            }
        }

        static initializeChild(controller: any) {
            Common.Controller.registerController(controller);
            return controller;
        }

        static getController(uid: number) {
            if ($.isArray(Common.Controller.current)) {
                var results = Common.Controller.current.filter(function (x) { return x.UID == uid });
                if (results != undefined) {
                    return results[0];
                }
            }
            return null;
        }

        static getControllerByName(name: string) {
            if ($.isArray(Common.Controller.current)) {
                var results = Common.Controller.current.filter(function (x) { return x.getName() == name });

                if ((results != undefined) && (results.length > 0)) {
                    return results[0];
                }
            }
            else {
                if (Common.Controller.current.getName() == name) {
                    return Common.Controller.current;
                }
            }
            return null;
        }
    }

    export module IsValid {

        let lettersRegexp = /^[A-Za-zñÑóúíáé\s]+$/;
        let numberRegexp = /^([0-9])*$/;
        let numberPositiveRegexp = /^([-])*$/;
        let numberDecimalRegexp = /^([0-9.])*$/;
        let numberDecimalNegativeRegexp = /^([0-9.-])*$/;
        let alphanumericRegexp = /^[0-9a-zA-Z\s]+$/;



        export function lettersOnly(s) {
            return lettersRegexp.test(s);
        }

        export function isCuitValid(cuit) {
            if (cuit.length != 11)
                return false;
            if (!isNumber(cuit))
                return false;

            var acumulado = 0;
            var digitos = cuit.split("");
            var digito = digitos.pop();

            for (var i = 0; i < digitos.length; i++) {
                acumulado += digitos[9 - i] * (2 + (i % 6));
            }

            var verif = 11 - (acumulado % 11);
            if (verif == 11) {
                verif = 0;
            } else if (verif == 10) {
                verif = 9;
            }

            return digito == verif;
        }

        export function isNumber(a) {
            return numberRegexp.test(a)
        }

        export function isNumberPositive(a) {
            return numberPositiveRegexp.test(a)
        }

        export function isDecimal(a) {
            return numberDecimalRegexp.test(a);
        }

        export function isDecimalNegative(a) {
            return numberDecimalNegativeRegexp.test(a);
        }

        export function isAlphanumeric(a) {
            return alphanumericRegexp.test(a)
        }
    }

    export module HelperFunctions {

        // This function gives format to an array object, in order to make it compatible with Natal autocomplete source data.
        export function formatVariable(inVariable, idProperty, textProperty) {
            var outVariable = [];
            for (var i = 0; i < inVariable.length; i++) {
                var entity = { id: 0, text: "" };
                entity.id = inVariable[i][idProperty];
                entity.text = inVariable[i][textProperty];
                outVariable.push(entity);
            }
            return outVariable;
        }
    }
}