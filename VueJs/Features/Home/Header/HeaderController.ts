/// <reference path="../../../wwwroot/js/typings/lodash/lodash.d.ts" />
'use strict';

module VueJs.Home {
    export class HeaderController {

        apiHomeHelper: VueJs.Home.HomeApiHelper;
        data: any;
        mounted: () => void;
        el: string;
        mixins: any;
        methods: any;
        computed: any;
        watch: any;
        busEvents: any;

        constructor() {
            var self = this;
            this.apiHomeHelper = new VueJs.Home.HomeApiHelper();
            this.el = "#header";
            this.data = {
                loading: false,
                personTypes: null
            }

            this.mounted = function () {
                this.init();
            }

            this.busEvents = {
            }

            this.methods = {
                async init() {
                    this.loading = true;
                    let result = await this.$options.apiHomeHelper.GetPersonTypes();
                    if (result.is_successfull) {
                        this.personTypes = result.data;
                        console.log(this.personTypes);
                    }
                },
                reserve() {
                    alert("hola");
                }
            }

            this.computed = {
            }

            this.watch = {
            }
        }
    }
}