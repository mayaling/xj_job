<template>
        <div class="shangwu-page">
            <div class="shangwu-head">
                <router-link :to="{path:'mine'}">
                    <div class="shangwu-headimg">
                        <img src="../../../static/img/fanhui@3x.png" alt="">
                    </div>
                </router-link>
               
                <h5>商务合作</h5>
            </div>
            <el-form :model="ruleForm"  ref="ruleForm" class="shangwu-form">
                <el-form-item prop="name">
                    <div class="shangwuinput-item">
                        <span>联系人</span>
                    <input type="text" v-model.trim="form.name">
                    </div>
                </el-form-item>
                <el-form-item prop="email">
                    <div class="shangwuinput-item">
                            <span>邮箱</span>
                        <input type="text" v-model.trim="form.email">
                    </div>
                </el-form-item>
                <el-form-item prop="produce">
                        <div class="shangwuinput-produce">
                            <textarea  style="background:#F2F3F7; height:7.56rem;width:calc(100% - 1.5rem);margin-left:0.75rem;margin-top:0.75rem; border: none;outline: none;" placeholder="请简单介绍下自己" v-model.trim="form.produce"></textarea >
                            <p>0/200</p>  
                        </div>
                    </el-form-item>
            </el-form>
            <div class="shangwu-btn">
                <span @click="sendshangwu">
                    提交
                </span>
            </div>
        </div>
      </template>

<script>
    export default {
        data() {
            return {
                form: {
                    name: '',
                    email: '',
                    produce: ''
                },
            }
        },
        created(){

        },
        methods: {
            sendshangwu(){
                var _this = this;
                this.$post('feedback',{user_name:_this.form.name,email:_this.form.email,content:_this.form.produce,type:2}
                    ).then((res) => {
                        console.log(res)
                        if(res.code === 1){
                            this.$message({
                                message: '提交成功',
                                type: 'success'
                            });
                            setTimeout(function(){
                                _this.$router.push('/mine');
                            },1000);
                        }else{
                            this.$message.error(res.msg);
                        }
                        this.loading = false
                }).catch(() => {this.loading = false})
            }
        },

    }
</script>


<style scoped>

</style>