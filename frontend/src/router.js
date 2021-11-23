import { createRouter, createWebHistory } from "vue-router"

import Index from './views/Index.vue'

import Home from './views/Home/Home.vue'
import MyInfo from './views/AboutMe/MyInfo.vue'


import BlogDetail from './views/Blog/Detail.vue'
import BlogList from './views/Blog/List.vue'
import BlogTags from './views/Blog/Tags.vue'
import BlogKeywords from './views/Blog/Keywords.vue'
import BlogBatch from './views/Blog/Batch.vue'



import Comment from './views/Comments/Comment.vue'
import LeaveMessage from './views/Comments/LeaveMessage.vue'

import Users from './views/Roles/Users.vue'
import Auth from './views/Roles/Auth.vue'


import NotFound from './views/NotFound.vue'
import Login from './views/Login/Login.vue'



const router = createRouter({
    history: createWebHistory(), // hash模式：createWebHashHistory，history模式：createWebHistory
    routes: [{
            path: '/',
            name: 'Index',
            component: Index,
            meta: { menuKey: '1', title: '首页' },
            children: [
                { path: 'home', name: 'Home', component: Home, meta: { menuKey: '1' } },
                { path: 'myinfo', name: 'MyInfo', component: MyInfo, meta: { menuKey: '2' } },

                { path: 'blog/list', name: 'BlogList', component: BlogList, meta: { menuKey: '3-1' } },
                { path: 'blog/detail', name: 'BlogDetail', component: BlogDetail, meta: { menuKey: '3-2' } },
                { path: 'blog/tags', name: 'BlogTags', component: BlogTags, meta: { menuKey: '3-3' } },
                { path: 'blog/keywords', name: 'BlogKeywords', component: BlogKeywords, meta: { menuKey: '3-4' } },
                { path: 'blog/batch', name: 'BlogBatch', component: BlogBatch, meta: { menuKey: '3-5' } },


                { path: 'comments/comment', name: 'Comment', component: Comment, meta: { menuKey: '4-1' } },
                { path: 'comments/leavemessage', name: 'LeaveMessage', component: LeaveMessage, meta: { menuKey: '4-2' } },

                { path: 'roles/users', name: 'Users', component: Users, meta: { menuKey: '5-1' } },
                { path: 'roles/auth', name: 'Auth', component: Auth, meta: { menuKey: '5-2' } },


                { path: '/:pathMatch(.*)*', name: 'not-found', component: NotFound },

            ]
        },
        { path: '/login', name: 'Login', component: Login },

    ]
})

router.beforeEach((to, from, next) => {
    if (to.name !== 'Login' && !localStorage.getItem('Authorization')) {
        next({ path: '/login' })
        return
    }
    if (to.matched.length === 0) { //如果未匹配到路由
        // next();
        from.name ? next({ name: from.name }) : next('/'); //如果上级也未匹配到路由则跳转登录页面，如果上级能匹配到则转上级路由
    } else {
        next(); //如果匹配到正确跳转
    }
});

export default router