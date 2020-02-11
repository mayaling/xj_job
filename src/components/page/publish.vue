<template>
    <div class="publish-page">
        <!-- 标题 -->
        <div class="publish-head">
            <router-link :to="{path:'index'}">
                <div class="publish-headimg">
                    <img src="../../../static/img/houtui@3x.png" alt="">
                </div>
            </router-link>
            <h5>发布</h5>
        </div>
        <el-form :model="form" ref="form" :rules="rules" class="item-add-list" id="publish-box">
            <el-form-item  prop="company_name">
                <div class="publish-titlebox">
                        <div class="publish-title">
                            <el-collapse v-model="activeNames" @change="handleChange">
                                <el-collapse-item title="公司信息" name="1">
                                    <div>
                                        <el-input v-model="form.company_name" placeholder="请填写"></el-input>
                                    </div>
                                </el-collapse-item>
                            </el-collapse>
                        </div>
                    </div>
            </el-form-item>
            <el-form-item  prop="position_name">
                <div class="publish-titlebox">
                        <div class="publish-title">
                            <el-collapse @change="handleChange">
                                <el-collapse-item title="职位名称" name="1">
                                    <div>
                                        <el-input v-model="form.position_name" placeholder="请填写"></el-input>
                                    </div>
                                </el-collapse-item>
                            </el-collapse>
                        </div>
                    </div>
            </el-form-item>
            <el-form-item  prop="position_name">
                <div class="publish-titlebox">
                        <div class="publish-title">
                            <el-collapse @change="handleChange">
                                <el-collapse-item title="职位类别" name="1">
                                        <div>
                                            <el-input v-model="form.position_type" placeholder="请填写"></el-input>
                                        </div>
                                    </el-collapse-item>
                            </el-collapse>
                        </div>
                    </div>
            </el-form-item>
            <el-form-item  prop="work_address">
                <div class="publish-titlebox">
                        <div class="publish-title">
                            <el-collapse @change="handleChange">
                                <el-collapse-item title="工作地址" name="1">
                                    <div>
                                        <el-input v-model="form.work_address" placeholder="请填写"></el-input>
                                    </div>
                                </el-collapse-item>
                            </el-collapse>
                        </div>
                    </div>
            </el-form-item>
            <el-form-item  prop="salary_range">
                    <div class="publish-titlebox">
                            <div class="publish-title">
                                <el-collapse @change="handleChange">
                                    <el-collapse-item title="薪资范围" name="1">
                                        <div>
                                            <el-select v-model="form.salary_range">
                                                    <template v-for="item in salarydata">
                                                            <el-option :label="item.name" :value="item.name"></el-option>
                                                    </template>
                                            </el-select>
                                        </div>
                                    </el-collapse-item>
                                </el-collapse>
                            </div>
                        </div>
            </el-form-item>
            <el-form-item  prop="experience_requir">
                <div class="publish-titlebox">
                        <div class="publish-title">
                            <el-collapse @change="handleChange">
                                <el-collapse-item title="经验要求" name="1">
                                        <div>
                                            <el-select v-model="form.experience_requir">
                                                    <template v-for="item in experiencedata">
                                                            <el-option :label="item.name" :value="item.name"></el-option>
                                                    </template>
                                            </el-select>
                                        </div>
                                    </el-collapse-item>
                            </el-collapse>
                        </div>
                    </div>
        </el-form-item>
        <el-form-item  prop="minimum_education">
            <div class="publish-titlebox">
                    <div class="publish-title">
                        <el-collapse @change="handleChange">
                            <el-collapse-item title="最低学历" name="3">
                                    <div>
                                        <el-select v-model="form.minimum_education">
                                                <template v-for="item in educationdata">
                                                        <el-option :label="item.name" :value="item.name"></el-option>
                                                </template>
                                        </el-select>
                                    </div>
                                </el-collapse-item>
                        </el-collapse>
                    </div>
                </div>
        </el-form-item>

            <el-form-item  prop="description">
                    <div class="publish-titlebox">
                            <div class="publish-title">
                                <el-collapse @change="handleChange">
                                    <el-collapse-item title="职位描述" name="1">
                                        <div class="publishinput-produce">
                                            <el-input type="textarea" :autosize="{ minRows: 4}" v-model="form.description" placeholder="填写详细、清晰的职位描述，有助于您更准确地展开招聘需求例如：1.工作内容… 2.任务要求… 3.特别说明…">
                                            </el-input>
                                            <!-- <el-input type="textarea" v-model="form.description"></el-input> -->
                                            <!-- <textarea v-model="form.description" style="background: #F4F4F4; height:7.56rem;width:calc(100% - 1.5rem);margin-left:0.75rem;margin-top:0.75rem; margin-bottom:0.75rem;border: none;outline: none;" 
                                            placeholder="填写详细、清晰的职位描述，有助于您更准确地展开招聘需求例如：1.工作内容… 2.任务要求… 3.特别说明…">
                                            </textarea > -->
                                        </div>
                                    </el-collapse-item>
                                </el-collapse>
                            </div>
                        </div>
            </el-form-item>
            <el-form-item  prop="skill_requirement">
                <div class="publish-titlebox">
                        <div class="publish-title">
                            <el-collapse @change="handleChange">
                                    <el-collapse-item title="技能要求" name="1">
                                        <div>
                                            <el-input v-model="form.skill_requirement" placeholder="请填写"></el-input>
                                        </div>
                                    </el-collapse-item>
                                </el-collapse>
                        </div>
                    </div>
        </el-form-item>
            <el-form-item>
                <div class="publish-positiondescbox">
                    <div class="publish-positiondesc">
                        <span>发布职位即表示遵守
                            <span class="rule" @click="handelrule">《犀亿职位信息发布规则》</span>
                            所有职位均有人专人审核，请仔细阅读，如违法规则将可能导致您账号被锁定。
                        </span>
                    </div>
                </div>
            </el-form-item>
            <el-form-item>
                <div class="publish-loginbtnbox">
                    <div class="publish-loginbtn" @click="onSubmit('form')">
                        <span>立即发布</span>
                    </div>
                </div>
            </el-form-item>

        </el-form>
        <!-- <div class="publish-positiondescbox">
            <div class="publish-positiondesc">
                <span>发布职位即表示遵守
                    <span class="rule">《犀亿职位信息发布规则》</span>
                    所有职位均有人专人审核，请仔细阅读，如违法规则将可能导致您账号被锁定。
                </span>
            </div>
        </div>
        <div class="publish-loginbtnbox">
            <div class="publish-loginbtn" @click="onSubmit('form')">
                <span>立即发布</span>
            </div>
        </div> -->
        <div class="footer" style="min-height: 20px;background:#ffffff;">
        </div>
    </div>
  </template>

<script>
export default {
    data() {
        return {
            form: {
                company_name:"",
                position_name:"",
                position_type:"",
                work_address:"",
                salary_range:"",
                experience_requir:"",
                minimum_education:"",
                description:"",
                skill_requirement:""
            },
            pathlink:"",
            companyname:"",
            activeNames:"1",
            access_token:"",
            educationdata:[{
                "id": 1,
                "name": "全部",
            },
            {
                "id": 2,
                "name": "初中及以下",
            }, {
                "id": 3,
                "name": "中专/中技",
            },
            {
                "id": 4,
                "name": "高中",
            },{
                "id": 5,
                "name": "大专",
            },{
                "id": 6,
                "name": "本科",
            },{
                "id": 7,
                "name": "硕士",
            },{
                "id": 8,
                "name": "博士",
            }],
            salarydata:[
                {
                    "id": 1,
                    "name": "全部",
                },
                {
                    "id": 2,
                    "name": "3K以下",
                }, {
                    "id":3,
                    "name": "3-5K",
                },
                {
                    "id": 4,
                    "name": "5-10K",
                },{
                    "id": 5,
                    "name": "10-20K",
                },{
                    "id": 6,
                    "name": "20-50K",
                },{
                    "id": 7,
                    "name": "50K以上",
                }
            ],
            experiencedata:[
                {
                    "id": 1,
                    "name": "全部",
                },
                {
                    "id": 2,
                    "name": "在校生",
                }, {
                    "id":3,
                    "name": "应届生",
                },
                {
                    "id": 4,
                    "name": "1年以内",
                },{
                    "id": 5,
                    "name": "1-3年",
                },{
                    "id": 6,
                    "name": "3-5年",
                },{
                    "id": 7,
                    "name": "5-10年",
                },{
                    "id": 8,
                    "name": "10年以上",
                }
            ],
            rules: {
                company_name:[
                    {
                    required: true,
                    message: '公司信息不可为空！',
                    trigger: ['blur']
                }],
                position_name: [{
                    required: true,
                    message: '公司职位不可为空！',
                    trigger: 'blur'
                }],
                position_type: [{
                    required: true,
                    message: '职位类别不可为空！',
                    trigger: 'blur'
                }],
                work_address: [{
                    required: true,
                    message: '工作地址不可为空！',
                    trigger: ['blur']
                }],
                salary_range: [{
                    required: true,
                    message: '薪资范围不可为空！',
                    trigger: ['blur','change']
                }],
                experience_requir: [{
                    required: true,
                    message: '经验要求不可为空！',
                    trigger: ['blur','change']
                }],
                minimum_education: [{
                    required: true,
                    message: '最低学历不可为空！',
                    trigger: ['blur','change']
                }],
                description: [{
                    required: true,
                    message: '职位描述不可为空！',
                    trigger: 'blur'
                }],
                skill_requirement: [{
                    required: true,
                    message: '技能要求不可为空！',
                    trigger: 'blur'
                }], 
            }
        }
    },
    created(){
        this.access_token = localStorage.getItem('access_token')
        // if(!localStorage.getItem('access_token')){
        //     this.setupWebViewJavascriptBridge()
        // }else{
        //     return
        // }
        // this.access_token = this.getUrlParam('access_token')
        //     if(!this.access_token){
        //         this.setupWebViewJavascriptBridge()
        //     }else{
        //         return;
        // }
        this.pathlink = this.$route.query.pathlink
    },
    methods: {
        handelrule(){
            this.$router.push("/rule")
        },
        setupWebViewJavascriptBridge(bridge) {
            this.bridge.webviewLoginSync('ObjC Echo', params, (data) => {
                console.log(data)
            // 处理返回数据

            })
            /* Initialize your app here */
            //所有与iOS交互的JS代码放这里！
            //JS如何调用iOS代码
            // bridge.callHandler('promotionHandler',
            //     {'title': 'Raymon'},
            //     function callback(response) {
            //     log('JS got response', response)
            //     }
            // })
        },

        checklogin(){
            this.$bridge.webviewLoginSync('ObjC Echo', params, (data) => {
                console.log(data)
            // 处理返回数据

            })
        },
        // publish(){
        //     var _this = this;
        //     this.$post('works',
        //         {
        //             company_name:_this.form.company_name,
        //             position_name:_this.form.position_name,
        //             position_type:_this.form.position_type,
        //             work_address:_this.form.work_address,
        //             salary_range:_this.form.salary_range,
        //             experience_requir:_this.form.experience_requir,
        //             minimum_education:_this.form.minimum_education,
        //             description:_this.form.description,
        //             skill_requirement:this.form.skill_requirement
        //             // "access-token":"O8INtHCANSEHBFgqXtYNrD52gR5HKDNU",
        //         }
        //         ).then((res) => {
        //             console.log(res)
        //             if(res.code === 1){
        //                 this.$message({
        //                     message: '提交成功',
        //                     type: 'success'
        //                 });
        //                 setTimeout(function(){
        //                     _this.$router.push('/index');
        //                 },500);
        //             }else{
        //                 this.$message.error(res.msg);
        //             }
        //             this.loading = false
        //     }).catch(() => {this.loading = false})
        // },
         //提交数据
         onSubmit(formName) {
            var _this = this;
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.$post('works', 
                    {
                        company_name:_this.form.company_name,
                        position_name:_this.form.position_name,
                        position_type:_this.form.position_type,
                        work_address:_this.form.work_address,
                        salary_range:_this.form.salary_range,
                        experience_requir:_this.form.experience_requir,
                        minimum_education:_this.form.minimum_education,
                        description:_this.form.description,
                        skill_requirement:this.form.skill_requirement
                        // "access-token":"O8INtHCANSEHBFgqXtYNrD52gR5HKDNU",
                    }
                    ).then((res) => {
                        console.log(res)
                        if(res.code === 1){
                            this.$message({
                                message: res.message,
                                type: 'success'
                            });
                            if(this.pathlink==="/index"){
                                setTimeout(function(){
                                    _this.$router.push('/index');
                                },500);
                            }else{
                                setTimeout(function(){
                                    _this.$router.push('/new');
                                },500);
                            }
                          
                        }else{
                            this.$message.error(res.msg);
                        }
                    })
                } else {
                    this.$message.error("请完善红色提示内容");
                    return false;
                }
            });
            // this.$emit('closedialog');  
        },
    },

}
</script>


<style>
.el-input__inner{
    border: none!important;
}
.el-collapse{
    border:none!important;
}
.el-icon-arrow-up:before {
    content:none!important;
}

</style>