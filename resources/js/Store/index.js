import Vuex from 'vuex';
import defaultData from "./Modules/Defaults";
import Auth from "./Modules/Auth";

const store = new Vuex.Store({
    modules: {
        defaultData,
        Auth
    }
})

export default store;
