'use strict';

var Vuetify: any;

module VueJs.Home {

    export class FooterController{

        data: any;
        created: () => void;
        mounted: () => void;
        el: string;
        mixins: any;
        methods: any;
        computed: any;
        watch: any;
        busEvents: any;
        vuetify: any;

        constructor() {
            var self = this;
            this.vuetify = new Vuetify();
            this.el = "#footer";
            this.data = {
                loading: false,
                links: [
                    'Home',
                    'About Us',
                    'Team',
                    'Services',
                    'Blog',
                    'Contact Us',
                ],
            }

            this.created = function () {
                this.init();
            }
            this.busEvents = {
            }

            this.methods = {
                async init() {
                    this.loading = true;
                    console.log(this.links);
                },
            }

            this.computed = {
            }

            this.watch = {
            }
        }
    }
}