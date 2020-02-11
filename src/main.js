//import Vue from 'vue';
import App from './App';
import router from './router';
//import axios from 'axios';
//import ElementUI from 'element-ui';
//import 'element-ui/lib/theme-chalk/index.css';    // 默认主题
// import '../static/css/theme-green/index.css';       // 浅绿色主题
import "babel-polyfill";
import dayjs from 'dayjs';
import { postData, geteData, patchData, putData, delData } from './http';
import rem from './components/common/rem'
import '../static/js/appback'
import store from './store/'
import Vue from 'vue'
import $ from 'jquery'
import Vconsole from 'vconsole';
import AMap from 'vue-amap';
// import Cube from 'cube-ui'

/** VUE与APP交互 **/


// import JsBridge from 'vue-webview-js-bridge'
// Vue.prototype.$bridge = JsBridge


// Vue.prototype.$bridge = Bridge

// import JsBridge from './components/page/bridge'
// Vue.prototype.$bridge = JsBridge


// import './components/page/bridge'

// Vue.use(VueJsBridge, {
//   debug: true,
//   nativeHandlerName: 'webviewLoginSync',
// //   mock: true,
// //   mockHandler (payload, next) {
// //     // mock by payload
// //     // call next(data) to mock data
// //   }
//   // ...
// })

// 导入优化的封装类
// import opApp from './components/common/optimizeApp'
// console.log(window.$Hybrid);
// Vue.use(window.$Hybrid, this);

// Vue.config.productionTip = false

// new Vconsole();
// Vue.use(Cube)
Vue.use(AMap)
AMap.initAMapApiLoader({
    key: 'e3a983380eb501f532a4faa3fe862c9c',
    plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView',
    'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor',
    'AMap.CircleEditor', 'AMap.Geolocation'],
    v: '1.4.4'
});
Vue.directive('anchor',{
    inserted : function(el,binding){
        el.onclick = function(){
            document.documentElement.scrollTop = $('#anchor-'+binding.value).offset().top
        }
    }
})
// new Vconsole();
// Vue.prototype.HOME = '/api'
Vue.use(ELEMENT, { size: 'medium' });
Vue.prototype.$axios = axios;

Vue.prototype.$dayjs = dayjs;
Vue.prototype.$post = postData;
Vue.prototype.$get = geteData;
Vue.prototype.$patch = patchData;
Vue.prototype.$put = putData;
Vue.prototype.$del = delData;

//使用钩子函数对路由进行权限跳转
router.beforeEach((to, from, next) => {
    const role = localStorage.getItem('ms_username');
    const user = localStorage.getItem('role');
    if (!role && to.meta.admin) {
        next('/login');
    } else {
        // 简单的判断IE10及以下不进入富文本编辑器，该组件不兼容
        if (navigator.userAgent.indexOf('MSIE') > -1 && to.path === '/editor') {
            Vue.prototype.$alert('vue-quill-editor组件不兼容IE10及以下浏览器，请使用更高版本的浏览器查看', '浏览器不兼容通知', {
                confirmButtonText: '确定'
            });
        } else {
            next();
        }
    }
})

new Vue({
    router,
    render: h => h(App)
}).$mount('#app');