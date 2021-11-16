import { createRouter, createWebHistory } from "vue-router"

import Index from './views/Index.vue'

import Home from './views/Home.vue'
import MyInfo from './views/AboutMe/MyInfo.vue'


import BlogDetail from './views/Blog/Detail.vue'
import BlogList from './views/Blog/List.vue'
import BlogTags from './views/Blog/Tags.vue'
import BlogKeywords from './views/Blog/Keywords.vue'


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
            children: [
                { path: 'home', name: 'Home', component: Home },
                { path: 'myinfo', name: 'MyInfo', component: MyInfo },

                { path: 'blog/list', name: 'BlogList', component: BlogList },
                { path: 'blog/detail', name: 'BlogDetail', component: BlogDetail },
                { path: 'blog/tags', name: 'BlogTags', component: BlogTags },
                { path: 'blog/keywords', name: 'BlogKeywords', component: BlogKeywords },


                { path: 'comments/comment', name: 'Comment', component: Comment },
                { path: 'comments/leavemessage', name: 'LeaveMessage', component: LeaveMessage },

                { path: 'roles/users', name: 'Users', component: Users },
                { path: 'roles/auth', name: 'Auth', component: Auth },


                { path: '/:pathMatch(.*)*', name: 'not-found', component: NotFound },

            ]
        },
        { path: '/login', name: 'Login', component: Login },

    ]
})

// router.beforeEach((to, from, next) => {
//     console.log(to.matched);
//     if (to.matched.length === 0) { //如果未匹配到路由
//         next();
//         // from.name ? next({ name: from.name }) : next('/'); //如果上级也未匹配到路由则跳转登录页面，如果上级能匹配到则转上级路由
//     } else {
//         next(); //如果匹配到正确跳转
//     }
// });

export default router