<template>
        <div class="jobdetail-page">
            <template v-for="(item , index) in detaildata">
                <!-- 标题 -->
                <div class="jobdetail-head">
                    <!-- <router-link :to="{path:'index'}"> -->
                        <div class="jobdetail-headimg" @click="goback()">
                            <img src="../../../static/img/houtui@3x.png" alt="">
                        </div>
                    <!-- </router-link> -->
                    <h5>工作详情</h5>
                </div>
                <!-- titile部分 -->
                <div class="jobdetail-mainhead">
                    <div class="mianhead-box">
                        <div class="jobdetail-title">
                            <span class="title">{{item.position_name}}</span>
                            <span class="price">{{item.salary_range}}</span>
                        </div>
                        <div class="jobdetail-titletips">
                            <ul>
                                <li>
                                    <img src="../../../static/img/Group 9 Copy 2@2x.png" alt="">
                                    {{item.work_address}}
                                </li>
                                <li>
                                    <img src="../../../static/img/学历 2@2x.png" alt="">
                                    {{item.minimum_education}}
                                </li>
                                <li>
                                    <img src="../../../static/img/公文包 2@2x.png" alt="">
                                    {{item.experience_requir}}
                                </li>
                            </ul>
                        </div>
                    
                    </div>
                </div>
                <!-- 描述部分 -->
                <div class="jobdetail-descbox">
                    <div class="jobdetai-desc">
                        <p>职位描述</p>
                        <span v-html="item.description"></span>
                            <!-- <span class="lookall">查看全部</span> -->
                    </div>
                </div>

                <!-- 技能部分 -->
                <div class="jobdetial-abilitybox">
                    <div class="jobdetial-ability">
                    <p>技能要求</p>
                    <div class="abilitytip">
                        <span>{{item.skill_requirement}}</span>
                            <!-- <span >交互</span>
                            <span>网页设计</span>
                            <span>JAVA</span> -->
                        </div>
                    </div>
                </div>
                <!-- 地址 -->
                <div class="jobdetial-addressbox">
                    <div class="jobdetial-address">
                        <p> 
                            <img src="../../../static/img/Group 9 Copy 2@2x.png" alt="">
                            {{item.work_address}}
                            <!-- <span>
                                <img src="../../../static/img/qianjing@3x.png" alt="">
                            </span> -->
                        </p>
                    </div>
                </div>
                <p style="width:100%;height: 0.5rem;background: #F4F4F4;"></p>
            </template>
            <div class="footer" style="min-height: 50px">

            </div>
            <!-- <div class="toudi-btn" @click="dialogTableVisible = true" v-if="uploaded===0"> -->
            <div class="toudi-btn" @click="checklogin" v-if="uploaded===0">

                <span type="text" >简历投递</span>
            </div>
            <div class="toudi-btn" @click="alertupload()" v-if="uploaded===1" style="background:#e4e7ed">
                <span type="text" >已投递</span>
            </div>
            <div class="footer" style="min-height: 50px">

                </div>
            <!-- <div class="toudi-btn" disabeld>
                <span type="text" >简历投递</span>
            </div> -->
            <!-- <el-button type="primary" disabled class="toudi-btn" v-if="uploaded===1">123</el-button> -->
            <!-- <div class="toudi-btn">
                <span type="text" disabled>简历投递</span>
            </div> -->
            <el-dialog title="上传简历" :visible.sync="dialogTableVisible">
                <!-- <div>123</div> -->
                <!-- <el-upload class="upload-demo"  ref="upload" action="https://jsonplaceholder.typicode.com/posts/"
                    :on-preview="handlePreview"
                    :on-remove="handleRemove"
                    :file-list="fileList"
                    :auto-upload="false">
                    <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                    <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
                    <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                    </el-upload> -->
                    <!-- <el-upload class="upload-demo" :on-preview="handlePreview" :on-remove="handleRemove"   :file-list="fileList" list-type="picture" :on-change="handleChange" :http-request="addAttachment"> 
                        <el-button size="small" type="primary">点击上传</el-button>

                    </el-upload> -->
                    <el-upload class="upload-demo" :on-preview="handlePreview" :on-remove="handleRemove"  :file-list="fileList" list-type="picture" :on-change="handleChange" :http-request="addAttachment"> 
                        <el-button size="small" type="primary">点击上传</el-button>
                        <!-- <el-button @click="loadfile">确定</el-button> -->
                    </el-upload>
            </el-dialog>
        </div>
      </template>

<script>
import SendMessageToApp from '../../jsAppInteractive/index3.js'

    export default {
        data() {
            return {
                dialogTableVisible: false,
                form: {
                    name: '',
                    email: '',
                    produce: '',
                    fileList:""
                },
                detaildata:"",
                pathlink:"",
                fileData:"",
                uploaded:"",
                upshow:false,
                access_token:"",
            }
        },
        created(){
            this.access_token = this.getUrlParam('access_token')
			this.id = this.$route.query.id
            this.pathlink = this.$route.query.pathlink
            this.getupload()
            this.getdetail()
            if(this.uploaded === 1){
                this.upshow = true;
            }else{
                this.upshow = false;
            }
            console.log(this.uploaded)
        },
        methods: {
            checklogin(){
                if(this.access_token != null){
                    this.dialogTableVisible = true;
                    // this.$router.push({path: '/publish', query: {pathlink:this.pathlink}})
                }else{
                    // alert(111)
                    this.checkapp()
                }
            },
            checkapp(){
			    SendMessageToApp('webviewLoginSync')
            },
            alertupload(){
                this.$message({
                message: '您已投递，无需重复投递',
                type: 'warning'
                });
            },
            getupload(){
                var _this = this;
                this.$get('work/check-uploaded?work_id='+ this.id).then((res) => {
                        console.log(res)
                        if(res.code === 1){
                            this.uploaded = res.info.uploaded;
                            // if(!res.info.uploaded){
                            //     this.uploaded = false;
                            //     console.log(111)
                            // }else{
                            //     this.uploaded = true;
                            //     console.log(222)
                            // }
                        }else{
                            this.$message.error(res.msg);
                        }
                        this.loading = false
                }).catch(() => {this.loading = false})
            },
            getUrlParam(name) {
                var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
                var r = window.location.search.substr(1).match(reg);
                if (r != null) return decodeURI(r[2]); return null;
            },
            getdetail(){
                var _this = this;
                this.$get('works?sort=-id&id='+ this.id).then((res) => {
                        console.log(res)
                        if(res.code === 1){
                            this.detaildata = res.info.items;
                            for(var i=0;i<this.detaildata.length;i++){
                                this.detaildata[i].description = this.trim(this.detaildata[i].description )
                            }
                            // console.log(this.detaildata[0].description)
                        }else{
                            this.$message.error(res.msg);
                        }
                        this.loading = false
                }).catch(() => {this.loading = false})
            },
            goback(){
                if(this.pathlink==="/index"){
                    this.$router.push("/index")
                }else{
                    this.$router.push("/new")
                }
            },
            trim(str) {
				return str.replace(/\n|\r\n/g,"<br/>")
            },
            loadfile(){
                this.$message({
                    message: "上传成功",
                    type: 'success'
                });
                setTimeout(() => {
                    this.dialogTableVisible = false;
                    this.uploaded=1
                }, 1000)
            },
            // addAttachment(){
            //     this.$message({
            //         message: "上传成功",
            //         type: 'success'
            //     });
            //     setTimeout(() => {
            //         this.dialogTableVisible = false;
            //         this.uploaded=1
            //     }, 1000)
            // },
            // 自定义上传方法
            addAttachment ( file ) {
                // 用于显示
                // this.imageUrl = URL.createObjectURL(file.file);
                // console.log( this.imageUrl )
                //保存一份文件信息，用于上传
                this.fileData = file.file;
                console.log( this.fileData)
                var formData = new FormData();  
                formData.append("uploadFile",this.fileData);
                formData.append("work_id", this.id);
                axios({
                    method: 'post',
                    url: 'https://xijin.sshua.com/work/upload-resume',
                    data: formData,
                    config: {headers: {'Content-Type': 'multipart/form-data' , 'Authorization': 'Bearer ' + localStorage.getItem('access_token')}}
                  })
                  .then((response)=>{
                        console.log(response)
                        if(response.data.code==1){
                            this.imageurl = response.data.info.url;
                            this.$message({
                                message: "上传成功",
                                type: 'success'
                            });
                            setTimeout(() => {
                                this.dialogTableVisible = false;
                                this.uploaded=1
                            }, 1000)
                        }else{
                            this.$message.error(response.data.message);
                            // if(response.info.image){
                            //     this.$message.error(response.data.info.image[0]);
                            // }else{
                            //     this.$message.error(response.data.message);
                            // }
                        }
                  }).catch((response)=>{
                    this.$message.error(response.message);
                  });                               
            },        

            handleRemove(file, fileList) {
                console.log(file, fileList);
                this.hideUpload = fileList.length >= this.limitCount;
            },
            handlePictureCardPreview(file) {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            },
            handleChange(file, fileList) {
                this.fileList = fileList.slice(-1);
                this.imageshow = false;
            }     
        },

    }
</script>


<style scoped>


</style>