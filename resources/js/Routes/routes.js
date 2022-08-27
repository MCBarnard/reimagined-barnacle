const routes = [
    {
        path: '/',
        component: () => import('../Pages/Default.vue'),
        name: 'default'
    },
    {
        path: '/another',
        component: () => import('../Pages/Another.vue'),
        name: 'another'
    },
    {
        path: '/login',
        component: () => import('../Pages/Login.vue'),
        name: 'login'
    },
    {
        path: '/register',
        component: () => import('../Pages/Register.vue'),
        name: 'register'
    },
]

export default routes;
