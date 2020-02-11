<template>
        <div class="mine-page">
            <div class="mine-pagetitle">
                <img src="../../../static/img/wodexiaobiao@3x.png" alt="" class="minetitlepage">
                <div class="mine-logintip" v-show="login">
                    <div class="mine-logintipimg">
                        <img src="../../../static/img/Group 25@3x.png" alt="">
                    </div>
                    <router-link :to="{path:'login'}" class="clearfix">
                        <p>登陆/注册</p>
                    </router-link>
                    <span>登陆之后可享受更多权益</span>
                </div>
                <div class="mine-logintip" v-show="user">
                    <div class="mine-logintipimg">
                        <img src="../../../static/img/Group 25@3x.png" alt="">
                    </div>
                        <p>{{userdata.mobile}}</p>
                    <span>按时还款，有利于额度提升哦～</span>
                </div>
            </div>
            <div class="minetools">
                <router-link :to="{path:'shangwu'}" class="clearfix">
                    <div class="minetools-item">
                        <div class="minetlools-logo">
                            <img src="../../../static/img/hezuo@3x.png" alt="">
                        </div>
                        <p>商务合作</p>
                        <span>
                            <img src="../../../static/img/qianjing@3x.png" alt="">
                        </span>
                    </div>
                </router-link>
                <router-link :to="{path:'fankui'}" class="clearfix">
                <div class="minetools-item">
                    <div class="minetlools-logo">
                        <img src="../../../static/img/kefu@3x.png" alt="">
                    </div>
                    <p>我要反馈</p>
                    <span>
                        <img src="../../../static/img/qianjing@3x.png" alt="">
                    </span>
                </div>
                </router-link>
                <div class="minetools-item">
                        <div class="minetlools-logo">
                            <img src="../../../static/img/shanchu@3x.png" alt="">
                        </div>
                        <p>删除缓存</p>
                        <span>
                            <img src="../../../static/img/qianjing@3x.png" alt="">
                        </span>
                    </div>
                    <router-link :to="{path:'about'}" class="clearfix">
                    <div class="minetools-item">
                            <div class="minetlools-logo">
                                <img src="../../../static/img/aixin@3x.png" alt="">
                            </div>
                            <p>关于我们</p>
                            <span>
                                <img src="../../../static/img/qianjing@3x.png" alt="">
                            </span>
                        </div>
                    </router-link>
            </div>
        <!-- <Tabbar></Tabbar> -->

        </div>
      </template>

<script>
      import Tabbar from "../common/Tabbar.vue"
    export default {
        data(){
            return{
                userdata:"",
                mobile:"",
                login:true,
            }
        },
        components: {
            Tabbar
        },
        mounted() {
            // if(localStorage.getItem("info")){
            //     this.userdata = JSON.parse(localStorage.getItem('info')) ;
            //     console.log(this.userdata.mobile)
            //     this.login = false;
            //     this.user = true;
            // }else{
            //     this.login = true;
            //     this.user = false;
            // }
        },
        created(){
            if(localStorage.getItem("info")){
                this.userdata = JSON.parse(localStorage.getItem('info')) ;
                this.userdata.mobile =  this.userdata.mobile.replace(/^(\d{3})\d{4}(\d+)/,"$1****$2")
                this.login = false;
                this.user = true;
            }else{
                this.login = true;
                this.user = false;
            }
            // console.log(this.userdata)
            // if(localStorage.getItem('access_token')){
            //     this.login = false;
            //     this.user = true;
            // }else{
            //     this.login = true;
            // }
            // this.getuser()
        },
        methods: {
            getuser(){
                var _this = this;
                _this.access_token = localStorage.getItem("access_token")
                this.$axios.get('api/users/0?access_token='+_this.access_token).then((res) => {
                    if(res.data.code === 1){
                        this.login = false;
                        this.user = true;
                        localStorage.setItem("userinfo",res.data.info.id)
                        _this.userdata = res.data.info;
                        _this.mobile =  res.data.info.mobile.replace(/^(\d{3})\d{4}(\d+)/,"$1****$2")
                    }else{
                        this.$message.error(res.msg);
                    }
                    this.loading = false
                }).catch(() => {this.loading = false})
            }
        }
    }
</script>


<style scoped>

</style>