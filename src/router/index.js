import { createRouter, createWebHistory } from 'vue-router'

const routerHistory = createWebHistory()




const routes = [
    {
        //首页
        path: '/',
        //未访问配置路径时自动跳转index页
        redirect: '/index'
    },
    {
        path: '/index',  
        name: 'index',
        url:'1',
        // 内部引用
        component: () => import('@/views/index')
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('@/views/login')
    },
    {
        path: '/chat',
        name: 'chat',
        component: () => import('@/views/chat')
    },
    {
        path: '/loginPass',
        name: 'loginPass',
        component: () => import('@/views/loginPass')
    },
    {
        path: '/register',
        name: 'register',
        component: () => import('@/views/register')
    },
    {
        path: '/writeArticle',
        name: 'writeArticle',
        component: () => import('@/views/writeArticle')
    }, 
    {
        path: '/JobDiscuss',
        name: 'JobDiscuss',
        component: () => import('@/views/JobDiscuss')
    }, 
    {
        path: '/study_day',
        name: 'study_day',
        component: () => import('@/views/study_day')
    }
    , 
    {
        path: '/find',
        name: 'find',
        component: () => import('@/views/find')
    },
     {
        path: '/put_together',
        name: 'put_together',
        component: () => import('@/views/put_together')
    },
     {
        path: '/wall',
        name: 'wall',
        component: () => import('@/views/wall')
    }, 
    {
        path: '/life_intersting',
        name: 'life_intersting',
        component: () => import('@/views/life_intersting')
    }, 
    {
        path: '/other',
        name: 'other',
        component: () => import('@/views/other')
    }, 
    {
        path: '/checkout',
        name: 'checkout',
        component: () => import('@/views/checkout')
    },
    {
        path: '/Detail',
        name: 'Detail',
        component: () => import('@/views/Detail')
    },
    {
        path: '/searchDetail',
        name: 'searchDetail',
        component: () => import('@/views/searchDetail')
    },
    {
        path: '/personal',
        name: 'personal',
        component: () => import('@/views/personal')
    },
    {
        path: '/my_fav',
        name: 'my_fav',
        component: () => import('@/views/my_fav')
    },
    {
        path: '/my_fans',
        name: 'my_fans',
        component: () => import('@/views/my_fans')
    },
    {
        path: '/my_info',
        name: 'my_info',
        component: () => import('@/views/my_info')
    },
    {
        path: '/ranking',
        name: 'ranking',
        component: () => import('@/views/ranking')
    },
]

const router = createRouter({
    history: routerHistory,
 routes
});

export default router