import {createRouter,createWebHistory,RouteRecordRaw} from "vue-router";

const history = createWebHistory();


const routes: Array<RouteRecordRaw> = [
    {
        path:'/front',
        name:'Front',
        component:()=>import('../views/front/main.vue'),
        children:[
            {
                path:'index',
                name:'FrontIndex',
                component : () => import('../views/front/index.vue')
            }
        ]
    },
    {
        path:'/mis',
        name:'Main',
        component:()=>import('../views/mis/main.vue'),
        children:[

        ]
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
