module VueJs.Home {

    export class HomeApiHelper extends ApiHelper.ApiHelperBase {

        constructor() {
            super('', true);
        }

        GetPersonTypes() {
            return this.get(this.controller + "/person/types", null, null, true);
        }
    }
}