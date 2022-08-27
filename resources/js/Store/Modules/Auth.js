const Auth = {
    state: {
        authentication: {
            loggedIn: window.Authentication.logged_in,
            user: window.Authentication.user,
        },
    },
    getters: {
        userAuthenticated: state => state.authentication.loggedIn,
        authenticatedUserData: state => state.authentication.user,
    },
    mutations: {
        SET_USER_AUTHENTICATED (state, auth) {
            state.authentication.loggedIn = auth;
        },
        SET_AUTHENTICATED_USER_DATA (state, data) {
            state.authentication.user = data;
        },
    },
    actions: {
        ACTION_SET_USER_AUTHENTICATED ({ commit }, authed) {
            commit("SET_USER_AUTHENTICATED", authed);
        },
        ACTION_SET_AUTHENTICATED_USER_DATA ({ commit }, data) {
            commit("SET_AUTHENTICATED_USER_DATA", data);
        },
    }
};

export default Auth;
