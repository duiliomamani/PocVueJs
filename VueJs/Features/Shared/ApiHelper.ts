/// <reference path="../../wwwroot/js/typings/jquery/jquery.d.ts" />

module ApiHelper {

    export class ApiHelperBase {

        private _apiRoot: string = 'https://app-onboardingapi-qa-001.azurewebsites.net/api/v2';
        token: string = '';
        domain: string = '';
        private _showGenericError: boolean;
        controller: string;
        // self: any;
        get: (url: string, params?: any, enableGenericError?: boolean, async?: boolean) => any;
        getbinary: (url: string, params: any, enableGenericError?: boolean) => any;
        post: (url: string, params: any, data: any, enableGenericError?: boolean, async?: boolean) => any;
        put: (url: string, params: any, data: any, enableGenericError?: boolean, async?: boolean) => any;
        private makeRequest: (url: string, params: any, data: any, verb: string, async?: boolean) => any;
        delete: (url: string, params, data) => any;
        hasErrors: () => boolean;
        error: (jqXHR: JQueryXHR, textStatus: string, errorThrow: string) => any;

        constructor(controller: string, cors: boolean = false) {
            this.controller = controller;
            this._showGenericError = false;

            this.get = (url: string, params: any, enableGenericError?: boolean, async?: boolean) => {
                if (async == null)
                    async = true;

                this._showGenericError = enableGenericError != undefined ? enableGenericError : true;
                if (params != undefined) {
                    url += '?' + $.param(params);
                }
                if (cors) {
                    return $.ajax({
                        type: "GET",
                        url: this._apiRoot + url,
                        async: async,
                        cache: true,
                        contentType: 'application/json; charset=utf-8',
                        error: this.error,
                        headers: {
                            'Authorization': 'Bearer ' + this.token,
                        },
                    });
                }
                return $.ajax({
                    type: "GET",
                    url: this._apiRoot + url,
                    async: async,
                    cache: true,
                    contentType: 'application/json; charset=utf-8',
                    error: this.error,
                });

            };

            this.getbinary = (url: string, params: any, enableGenericError?: boolean) => {

                this._showGenericError = enableGenericError != undefined ? enableGenericError : true;
                if (params != undefined) {
                    url += '?' + $.param(params);
                }
                $.ajaxSetup({
                    beforeSend: function (jqXHR, settings) {
                        settings.xhr().responseType = 'arraybuffer';
                        settings.processData = false;
                    }
                })

                if (cors) {
                    return $.ajax({
                        type: "GET",
                        url: this._apiRoot + url,
                        xhrFields: {
                            responseType: 'blob'
                        },
                        contentType: 'application/json; charset=utf-8',
                        processData: false,
                        dataType: 'binary',
                        headers: {
                            'Authorization': 'Bearer ' + this.token
                        },
                    });
                }
                return $.ajax({
                    type: "GET",
                    url: this._apiRoot + url,
                    xhrFields: {
                        responseType: 'blob'
                    },
                    contentType: 'application/json; charset=utf-8',
                    dataType: 'binary',
                    processData: false,
                });
            };

            this.post = (url: string, params: any, data: any, enableGenericError?: boolean, async?: boolean) => {
                this._showGenericError = enableGenericError != undefined ? enableGenericError : true;
                return this.makeRequest(url, params, data, "POST", async);
            };

            this.put = (url: string, params: any, data: any, enableGenericError?: boolean, async?: boolean) => {
                this._showGenericError = enableGenericError != undefined ? enableGenericError : true;
                return this.makeRequest(url, params, data, "PUT", async);
            };

            this.makeRequest = (url: string, params: any, data: any, verb: string, async?: boolean) => {
                if (params != undefined) {
                    url += '?' + $.param(params);
                }
                if (async == null)
                    async = true;

                if (cors) {
                    return $.ajax({
                        type: verb,
                        url: this._apiRoot + url,
                        data: JSON.stringify(data),
                        async: async,
                        contentType: 'application/json; charset=utf-8',
                        headers: {
                            'Authorization': 'Bearer ' + this.token
                        },
                    });
                }

                return $.ajax({
                    type: verb,
                    url: this._apiRoot + url,
                    async: async,
                    data: JSON.stringify(data),
                    contentType: 'application/json; charset=utf-8',
                });
            };

            this.delete = (url: string, params, data) => {
                return this.makeRequest(url, params, data, 'DELETE');
            };

            this.error = (jqXHR: JQueryXHR, textStatus: string, errorThrow: string) => {
                if (!this._showGenericError) {
                    return;
                }
                var message = '';
                switch (jqXHR.status) {
                    case 400:
                        message = jqXHR.responseJSON != undefined ? jqXHR.responseJSON.Message : jqXHR.responseText;
                        break;
                    case 403:
                        window.location.href = '/Account/AccessDenied';
                    case 404:
                        message = 'Se ha producido un error en el sistema, comuniquese con el Administrador (' + jqXHR.status + ')';
                        break;
                    case 501:
                        return;
                    default:
                        return;
                        break;
                }

            };
        }
    }
}