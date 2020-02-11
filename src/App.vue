<template>
    <div id="app">
            <!-- <scroller style="top: 44px"
            :on-refresh="refresh"
            :on-infinite="infinite">
          </scroller> -->
           <!-- <transition name="move" mode="out-in">
                    <keep-alive :include="tagsList">
                         <router-view></router-view>
                    </keep-alive>
                </transition> -->
                <!-- <transition name="slide-fade">
                    <router-view></router-view>
                </transition> -->
            <router-view></router-view>
        <!-- <Tabbar></Tabbar> -->
    </div>
</template>
<style scoped>
    /*@import "../static/css/color-dark.css";*/
    /*深色主题*/
    /*@import "../static/css/theme-green/color-green.css";   浅绿色主题*/
    /*@import "../static/css/main.css";*/
    .slide-fade{
  position: absolute;left:0;right: 0;
    }
    .slide-fade-enter-active {
    transition: all 1.2s ease;
    }
    .slide-fade-leave-active {

    transition: all .1s cubic-bezier(2.0, 0.5, 0.8, 1.0);
    }
    .slide-fade-enter, .slide-fade-leave-to
    {
    left:0;right: 0;
    transform: translateX(50px);
    opacity: 0;
    }

</style>
<script>
    import Tabbar from './components/common/Tabbar'
    import VueScroller from 'vue-scroller'
    Vue.use(VueScroller)
    export default {
        name: 'app',
        created: function() {
            this.$router.push('/')
        },
        components: {
            Tabbar
        },
        // beforeRouteEnter: (to, from, next) => {
		// 	next(vm => {
		// 	vm.tabActive = '/' + to.this.page;
		// 	});
		// },
        created() {
          
        },  
        methods: {
          
        },
    }
</script>