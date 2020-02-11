<template>
        <div class="wrapper">
           <!-- <Tabbar></Tabbar> -->
           <div class="content">
                <!-- <transition name="move" mode="out-in"> -->
                    <keep-alive :include="tagsList">
                        <router-view :key="$route.fullPath"></router-view>
                    </keep-alive>
                <!-- </transition> -->
                    <!-- <router-view :key="$route.fullPath"></router-view> -->

            </div>
        </div>
    </template>

<script>
    import Tabbar from "../common/Tabbar.vue"
    export default {
        data() {
            return {

            }
        },
        components: {
            Tabbar
        },
    }
</script>
<style>

</style>