import * as VueRouter from 'vue-router';
import routes from './routes';
import store from "../Store";
import authenticatedRoutes from "./AuthenticatedRoutes";

const router = VueRouter.createRouter({
    history: VueRouter.createWebHistory(),
    routes,
});

router.beforeEach(async (to, from) => {
    if (
        // make sure the user is authenticated
        !store.getters.userAuthenticated &&
        // ❗️ Avoid an infinite redirect
        to.name !== 'login' &&
        // Check all routes that need authentication
        authenticatedRoutes.includes(to.name)
    ) {
        // redirect the user to the login page
        return { name: 'login' }
    }
})

export default router;
