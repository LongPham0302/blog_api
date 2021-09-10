import Vue from 'vue'
import VueRouter from 'vue-router'

import HomePage from './Page/HomePage'
import Login from './Page/Login'
import Register from './Page/Register'
import ChangePassword from './Page/ChangePassword'
import PostDetail from './Page/PostDetail'
import PostUpload from './Page/PostUpload'
import UserPage from './Page/UserPage'
import UserProfile from './Page/UserProfile'
import Search from './Page/Search'

import { ifNotauthenticated, ifauthenticated } from './plugin/authenticate'
Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'home-page',
        component: HomePage
    },
    {
        path: '/login',
        name: 'login',
        component: Login,
        beforeEnter: ifNotauthenticated
    },
    {
        path: '/register',
        name: 'register',
        component: Register,
        ifNotauthenticated: ifauthenticated
    },
    {
        path: '/user/:id/password',
        name: 'change-password',
        component: ChangePassword
    },
    {
        path: '/post-detail/:id',
        name: 'post-detail',
        component: PostDetail,
        beforeEnter: ifauthenticated

    },
    {
        path: '/upload',
        name: 'upload',
        component: PostUpload
    },
    {
        path: '/user/:id',
        name: 'user-page',
        component: UserPage,
        beforeEnter: ifauthenticated

    },
    {
        path: '/user/:id/profile',
        name: 'user-profile',
        component: UserProfile
    },
    {
        path: '/search',
        name: 'search',
        component: Search
    }
]


const router = new VueRouter({
    mode: 'history',
    routes
})
export default router;