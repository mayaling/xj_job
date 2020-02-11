<template>
    <div class="ahout-page">
        <div class="ahout-head">
            <router-link :to="{path:'mine'}">
                <div class="ahout-headimg">
                    <img src="../../../static/img/fanhui@3x.png" alt="">
                </div>
            </router-link>
           
            <h5>关于我们</h5>
        </div>
        <div class="about-logo">
            <img src="../../../static/img/loginlogo.png" alt="">
        </div>
        <div class="about-loginout" @click="loginout">退出登录</div>
        <div class="about-footer">
            <span> 登录即同意随手花用户协议与隐私条款</span>
            <span>Copyright © 2019 Suishouhua.com. All rights Reserced.</span>
        </div>
    </div>
  </template>

<script>
export default {
    data() {
        return {
            ruleForm: {
                name: '',
                email: '',
                produce: ''
            },
        }
    },
    created() {
        
    },
    methods: {
        loginout(){
            localStorage.clear();
            this.$router.push("/mine")
        }
    },

}
</script>


<style scoped>

</style>