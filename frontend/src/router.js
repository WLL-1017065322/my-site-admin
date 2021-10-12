import { createRouter, createWebHistory } from "vue-router"
import Home from './views/Home.vue'
// import Blog from './views/Blog/Blog.vue'
// import BlogList from './views/Blog/List.vue'
// import BlogDetail from './views/Blog/Detail.vue'
import NotFound from './views/NotFound.vue'
import About from './views/About.vue'



const router = createRouter({
    history: createWebHistory(), // hash模式：createWebHashHistory，history模式：createWebHistory
    routes: [{
            path: '/',
            name: 'Home',
            component: Home,
            children: [
                { path: 'blog', name: 'About', component: About },
                { path: 'about', name: 'About', component: About },
                { path: 'about', name: 'About', component: About },
                { path: 'about', name: 'About', component: About },
                { path: 'about', name: 'About', component: About },
                { path: 'about', name: 'About', component: About },
            ]
        },
        { path: '/:pathMatch(.*)*', name: 'not-found', component: NotFound },
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