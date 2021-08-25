'use strict';

module VueJs.Journey {
    export class JourneyController {

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
            this.el = "#journey";
            this.data = {
                loading: false,
            }

            this.created = function () {
                this.init();
            }
            this.busEvents = {
            }

            this.methods = {
                async init() {
                    this.loading = true;
                },
                journey() {
                    alert("ventana journey")
                },
            }

            this.computed = {
            }

            this.watch = {
            }
        }
    }
}