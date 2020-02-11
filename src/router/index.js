//import Vue from 'vue';
//import Router from 'vue-router';

Vue.use(VueRouter);

// export default new VueRouter({
//     //mode:'history',
//     //base:'/dist/',
//     routes: [{
//             path: '/',
//             redirect: '/index'
//         },
//         {
//             path: '/index',
//             component: resolve => require(['../components/page/index.vue'], resolve),
//             meta: { title: '登录' }
//         },
//         {
//             path: '/login',
//             component: resolve => require(['../components/page/Login.vue'], resolve),
//             meta: { title: '登录' }
//         },
//         {
//             path: '/daikuan',
//             component: resolve => require(['../components/page/daikuan.vue'], resolve),
//             meta: { title: '贷款' }
//         },
//         {
//             path: '/mine',
//             component: resolve => require(['../components/page/mine.vue'], resolve),
//             meta: { title: '我的' }
//         }, {
//             path: '/shangwu',
//             component: resolve => require(['../components/page/shangwu.vue'], resolve),
//             meta: { title: '我的' }
//         },
//         {
//             path: '/register',
//             component: resolve => require(['../components/page/register.vue'], resolve),
//             meta: { title: '注册' }
//         },
//         {
//             path: '/index',
//             component: resolve => require(['../components/page/index.vue'], resolve),
//             meta: { title: '首页' }
//         },
//         {
//             path: '/404',
//             component: resolve => require(['../components/page/404.vue'], resolve)
//         },
//         {
//             path: '/403',
//             component: resolve => require(['../components/page/403.vue'], resolve)
//         },
//         {
//             path: '*',
//             redirect: '/404'
//         }
//     ]
// })

export default new VueRouter({
    routes: [{
            path: '/',
            redirect: '/index'
        },
        {
            path: '/home',
            component: resolve => require(['../components/page/home.vue'], resolve),
            meta: { title: '登录' },
            children: [{
                    path: '/home',
                    component: resolve => require(['../components/page/home.vue'], resolve),
                    meta: { title: '登录' }
                },
                {
                    path: '/index',
                    component: resolve => require(['../components/page/index.vue'], resolve),
                    meta: { title: '登录' }
                },
                
                {
                    path: '/daikuan',
                    component: resolve => require(['../components/page/daikuan.vue'], resolve),
                    meta: { title: '贷款' }
                },
                {
                    path: '/mine',
                    component: resolve => require(['../components/page/mine.vue'], resolve),
                    meta: { title: '我的' }
                },
                {
                    path: '/register',
                    component: resolve => require(['../components/page/register.vue'], resolve),
                    meta: { title: '注册' }
                },
                {
                    path: '/index',
                    component: resolve => require(['../components/page/index.vue'], resolve),
                    meta: { title: '首页' }
                },
                {
                    path: '/404',
                    component: resolve => require(['../components/page/404.vue'], resolve)
                },
                {
                    path: '/403',
                    component: resolve => require(['../components/page/403.vue'], resolve)
                },
                {
                    path: '*',
                    redirect: '/404'
                }
            ]
        },
        {
            path: '/login',
            component: resolve => require(['../components/page/Login.vue'], resolve),
            meta: { title: '登录' }
        },
        {
            path: '/new',
            component: resolve => require(['../components/page/new.vue'], resolve),
            meta: { title: '最新' }
        },
        {
            path: '/jobdetail',
            component: resolve => require(['../components/page/jobdetail.vue'], resolve),
            meta: { title: '工作详情' }
        },
        {
            path: '/publish',
            component: resolve => require(['../components/page/publish.vue'], resolve),
            meta: { title: '工作详情' }
        },
        {
            path: '/rule',
            component: resolve => require(['../components/page/rule.vue'], resolve),
            meta: { title: '发布协议' }
        },
        {
            path: '/positiontype',
            component: resolve => require(['../components/page/positiontype.vue'], resolve),
            meta: { title: '商务' }
        },
        {
            path: '/location',
            component: resolve => require(['../components/page/location.vue'], resolve),
            meta: { title: '反馈' }
        },
        {
            path: '/about',
            component: resolve => require(['../components/page/about.vue'], resolve),
            meta: { title: '反馈' }
        },
        {
            path: '/link',
            component: resolve => require(['../components/page/link.vue'], resolve),
            meta: { title: '外部链接' }
        },
        {
            path: '/404',
            component: resolve => require(['../components/page/404.vue'], resolve)
        },
        {
            path: '/403',
            component: resolve => require(['../components/page/403.vue'], resolve)
        },
        {
            path: '*',
            redirect: '/404'
        }
    ]
})