import { createRouter, createWebHashHistory } from 'vue-router'
import { routes } from './routes' 

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

// 前置守卫
router.beforeEach(() => {})

// 后置守卫
router.afterEach(() => {})

export default router