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
        path:'/mis/login',
        name:'MisLogin',
        component : () => import('../views/mis/login.vue')
    },

    {
        path: '/404',
        name: '404',
        component: () => import('../views/404.vue')
    },
    {
        path:'/:pathMatch(.*)*',
        redirect:'/404'
    }

];

const router=createRouter({
    history,
    routes
});
export default router;

// @ts-ignore
router.beforeEach((to, from, next) => {
    let permissions = localStorage.getItem('permissions');
    let token = localStorage.getItem('token');
    let fullPath = to.fullPath;
    if (fullPath.startsWith('/mis') && fullPath != '/mis/login') {
        if (permissions == null || permissions == '' || token == null || token == '') {
            next({ name: 'MisLogin' });
        } else {
            return next();
        }
    } else if (fullPath.startsWith('/front/customer') || fullPath.startsWith('/front/goods_snapshot')) {
        if (token == null || token == '') {
            next({ name: 'FrontIndex' });
        } else {
            return next();
        }
    } else {
        return next();
    }
});
