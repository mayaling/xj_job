<template>
    <div class="login-page">
        <div class="login-head">
            <!-- <router-link :to="{path:'mine'}"> -->
                <div class="login-headimg" @click="prev()">
                    <img src="../../../static/img/houtui@3x.png" alt="">
                </div>
            <!-- </router-link> -->
        </div>
        <div class="login-logo">
            <img src="../../../static/img/loginlogo.png" alt="">
        </div>
        <el-form :model="form" ref="form" class="login-form">
            <el-form-item  >
                <div class="logininput-item">
                <input type="text" class="phpne" placeholder="请输入手机号码（无需注册）" v-model.trim="form.phone">
                </div>
            </el-form-item>
            <el-form-item >
                <div class="logininput-item">
                    <input type="text" class="mscode" placeholder="请输入验证码" v-model.trim="form.message">
                    <span class="lineborder"></span>
                    <span class="sendmessage" :class="{disabled: !this.canClick}"  @click="sendmessage()" >{{content}}</span>
                </div>
            </el-form-item>
        </el-form>
        <div class="login-btn"  @click="login()">
            <img src="../../../static/img/denglu@3x.png" alt="">
        </div>
    </div>
  </template>

  <script>
    export default {
      data(){
        return {
            loading:true,
            form: {
                phone: '',
                message:''
            },
            ismessage:true,
            istime:true,
            content: '发送验证码',  // 按钮里显示的内容
            totalTime: 60,      //记录具体倒计时时间
            canClick: true //添加canClick
        }
      },
      created(){
        // this.$post('get-sms-code').then((res)=>{
        //     if(res.code == 0){
        //         this.loading = false
        //     }else{
        //         this.loading = false
        //     }
        // }).catch(() => {this.loading = false})
      },
      computed: {
  
      },
    methods: {
        sendmessage(){
            var _this = this;

            if(!_this.tel(_this.form.phone)){
                this.$message.error("手机号码格式不正确");
            }else{
                if (!this.canClick) return 
                this.canClick = false
                this.$post('get-sms-code',
                {mobile:_this.form.phone,},
             ).then((res) => {
                    if(res.code === 1){
                        this.$message({ 
                            message: '获取验证码成功',
                            type: 'success'
                        });
                   
                    this.content = this.totalTime + 's后重发'
                    let clock = window.setInterval(() => {
                        this.totalTime--
                        this.content = this.totalTime + 's后重发'
                        if (this.totalTime < 0) {
                            window.clearInterval(clock)
                            this.content = '重发验证码'
                            this.totalTime = 10
                            this.canClick = true  //这里重新开启
                        }
                    },1000)
                    }else{
                        if(res.info){
                        this.$message.error(res.info.msg);
                        }else{
                            this.$message.error(res.message);
                        }
                    }
                    this.loading = false
                    }).catch(() => {this.loading = false})
                }

        },
        login(){
            var _this = this;
            if(!_this.tel && !_this.message){
                this.$message.error("手机号验证码不能为空");
            }else{
                this.$post('get-access-token',{mobile:_this.form.phone,sms_code:_this.form.message}
             ).then((res) => {
                    if(res.code === 1){
                        localStorage.setItem('access_token',res.info.access_token);
                        _this.access_token = localStorage.getItem("access_token")
                        this.$get('users/0?access_token='+_this.access_token).then((res) => {
                            if(res.code === 1){
                                localStorage.setItem("info",JSON.stringify(res.info))
                                localStorage.setItem("userinfo",res.info.id)
                                _this.userdata = res.info;
                                _this.mobile =  res.info.mobile.replace(/^(\d{3})\d{4}(\d+)/,"$1****$2")
                            }else{
                                this.$message.error(res.msg);
                            }
                            this.loading = false
                        }).catch(() => {this.loading = false})
                        // _this. getuser()
                        // localStorage.setItem('mobile',res.info.mobile);
                        this.$router.push('/index');

                    }else{
                        this.$message.error(res.msg);
                    }
                    this.loading = false
                    }).catch(() => {this.loading = false})
                }
        },
        getuser(){
            var _this = this;
            _this.access_token = localStorage.getItem("access_token")
            this.$get('users/0?access_token='+_this.access_token).then((res) => {
                if(res.code === 1){
                    localStorage.setItem("info",JSON.stringify(re.data.info))
                    localStorage.setItem("userinfo",res.info.id)
                    _this.userdata = res.info;
                    _this.mobile =  res.info.mobile.replace(/^(\d{3})\d{4}(\d+)/,"$1****$2")
                }else{
                    this.$message.error(res.msg);
                }
                this.loading = false
            }).catch(() => {this.loading = false})
        },
        tel:function tel(str){
            var re = /^(((13[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1})|(198)|(199)|(166)|(165)|(146)|(148))+\d{8})$/;
            return re.test(str)
        },
        prev () {
            this.$router.go(-1)
        }
    }
}
</script>

<style scoped>
    .disabled{
        /* background-color: #ddd; */
        border-color: #ddd;
        color:#00B0B5;
        cursor: not-allowed; 
    }
</style>