import {createRouter,createWebHistory,RouteRecordRaw} from "vue-router";

const history = createWebHistory();


const routes: Array<RouteRecordRaw> = [
    {
        path: '/front/index',
        name: '/front/index',
        component: () => import('../views/front/index.vue')
    },
    {
        path: '/mis/login',
        name: '/mis/login',
        component: () => import('../views/mis/login.vue')
    },
    {
        path: '/404',
        name: '404',
        component: () => import('../views/404.vue')
    },

];

const router=createRouter({
    history,
    routes
});
export default router;
