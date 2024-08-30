import { createRouter, createWebHashHistory } from 'vue-router'
import { routes } from './routes' 

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

// 前置守卫
router.beforeEach((to) => {
    if(to.path == '/login') {
        return
    }

    if(!localStorage.getItem('TOKEN')) {
        return '/login'
    }

    return ;
})

// 后置守卫
router.afterEach(() => {})

export default router