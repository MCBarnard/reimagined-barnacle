const defaultData = {
    state: {
        user: {
            name: undefined,
        },
    },
    getters: {
        userName: state => state.user.name,
    },
    mutations: {
        SET_USER_NAME (state, name) {
            state.user.name = name;
        },
    },
    actions: {
        ACTION_SET_USERNAME ({ commit }, name) {
            commit("SET_USER_NAME", name);
        },
    }
};

export default defaultData;
