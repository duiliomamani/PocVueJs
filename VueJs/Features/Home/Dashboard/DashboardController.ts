/// <reference path="../../../wwwroot/js/typings/lodash/lodash.d.ts" />
'use strict';

module VueJs.Home {
    export class DashboardController {

        apiHomeHelper: VueJs.Home.HomeApiHelper;
        data: any;
        created: () => void;
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
            this.el = "#dashboard";
            this.data = {
                loading: false,
                selection: 0,
                labels: _HomeLabels,
                selectionChange: "Seleccion Tipo de Persona",
                personTypes: null
            }

            this.created = function () {
                this.init();
            }
            this.busEvents = {
            }

            this.methods = {
                async init() {
                    this.loading = true;
                    console.log(this.labels.lblWelcome);
                    let result = await this.$options.apiHomeHelper.GetPersonTypes();
                    if (result.is_successfull) {
                        this.personTypes = result.data;
                        console.log(this.personTypes);
                    }
                },
                reserve() {
                    this.loading = true;
                    this.selection = Math.floor(Math.random() * this.personTypes.length);
                    console.log(this.selection);
                    this.selectionChange = "Cambio de Seleccion a " + this.personTypes[this.selection].name;
                    setTimeout(() => (this.loading = false), 2000);
                    alert(this.selectionChange);
                },
            }

            this.computed = {
            }

            this.watch = {
            }
        }
    }
}