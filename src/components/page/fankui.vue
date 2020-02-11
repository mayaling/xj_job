<template>
        <div class="fankui-page">
            <div class="fankui-head">
                <router-link :to="{path:'mine'}">
                    <div class="fankui-headimg">
                        <img src="../../../static/img/fanhui@3x.png" alt="">
                    </div>
                </router-link>
                <h5>我要反馈</h5>
            </div>
            <p class="fankui-title">意见或建议</p>
            <el-form :model="ruleForm"  ref="ruleForm" class="fankui-form">
                <el-form-item prop="produce">
                    <div class="fankuiinput-produce">
                        <textarea  style="background:#F2F3F7; height:7.56rem;width:calc(100% - 1.5rem);margin-left:0.75rem;margin-top:0.75rem; border: none;outline: none;" placeholder="请输入您要咨询的问题，24小时内我们会给您进行回复！" v-model.trim="form.content"></textarea >
                        <p>0/200</p>  
                    </div>
                </el-form-item>
            </el-form>
            <p class="fankui-title">请选择问题类型</p>
            <div class="fankuitype">
                <template >
                <span :key="index"  :class="activeClass == index ? 'active':''" @click="getItem(item,index)"  v-for="(item,index) in nodes">{{item.name}}</span>
                </template>
            </div>
            <!-- <div class="fankuitype">
                <span @click="change" :class="[isActive?'change':'changs']">页面展示</span>
                <span>产品问题</span>
                <span>操作问题</span>
            </div> -->
            <div class="fankui-btn">
                <span @click="sendfankui">
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
                    content: '',
                },
                isActive:true,
                activeClass: -1,
                choose:"",
                nodes:[
                    {
                        "id": 1,
                        "name": "页面展示",
                    },
                    {
                        "id": 2,
                        "name": "产品问题",
                    }, {
                        "id": 3,
                        "name": "操作问题",
                    },
                ]
            }
        },
        created() {
            // console.log(this.nodes)
        },
        methods: {
            change(){
                this.isActive = !this.isActive;
                    if (this.isActive == true) {
                        this.activeDisplay = 'block';
                    } else {
                        this.activeDisplay = 'none';
                    }
            },
            getItem(item,index){
                this.activeClass = index;  // 把当前点击元素的index，赋值给activeClass
                this.choose = item.id
                console.log(this.choose)
            },
            sendfankui(){
                var _this = this;
                console.log(_this.choose)
                _this.user_id = localStorage.getItem("userinfo")
                console.log(_this.user_id)
                this.$post('feedback',{content:_this.form.content,type:1,user_id:_this.user_id?_this.user_id:"",feedback_type:_this.choose?_this.choose:""}
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
.change{
    background: #00BCC1;
    color: #FFFFFF;
}
.active{
    background: #00BCC1;
    color: #FFFFFF;
}
</style>