<template>
        <div class="index-page">
            <div class="index-head-box">
                <div class="index-head">
                    <h5>工作</h5>
                    <div class="indexheadimg" @click="checklogin">
                        <!-- <router-link :to="{path:'publish',query:{pathlink:pathlink}}"> -->
                            <img src="../../../static/img/jiahao.png" alt="">
                        <!-- </router-link> -->
                    </div>
                </div>
            </div>
            <div class="index-banner">
                <ul class="tabchange">
                    <!-- <router-link :to="{path:'addproduct'}"><li>推荐</li></router-link>
                    <router-link :to="{path:'addproduct'}">	<li>最新</li></router-link> -->
                    <!-- <li><router-link :to="{path:'addproduct'}">推荐</router-link></li> -->
                    <li ><router-link :to="{path:'index'}">推荐</router-link></li>
                    <li class="selected">最新</li>
                </ul>
                <ul class="shaixuan">
                    <router-link :to="{path:'location',query:{pathlink:pathlink}}">
                        <li>
                            <!-- <span>地区</span> -->
                            <span v-if="!work_address">{{city}}</span>
                            <span v-if="work_address">{{city1}}</span>
                            <span>
                                <img src="../../../static/img/Rectangle 4 Copy.png" alt="">
                            </span>
                        </li>
                    </router-link>
                    <router-link :to="{path:'positiontype',query:{pathlink:pathlink}}">
                        <li class="positiontype">
                            <span>筛选</span>
                            <span>
                                <img src="../../../static/img/Rectangle 4 Copy.png" alt="">
                            </span>
                        </li>
                    </router-link>
                </ul>
            </div>
            <div class="job">
			    <span v-if="isdata" class="datatips">暂无数据</span>
                <template v-for="(item , index) in listdata">
                        <div class="joblist-box">
                        <!-- <router-link :to="{path:'jobdetail'}"> -->
                            <div class="joblist" @click="gomoney(item,index)"> 
                                <div class="joblisttop">
                                    <!-- <div class="joblisticon">
                                        <img src="./imgs/Group 25@3x.png" alt="">
                                    </div> -->
                                    <div class="joblistinner">
                                        <p class="joblistname">
                                            <span class="jobname">{{item.position_name}}</span>
                                            <!-- <span class="nametip">高通过率</span> -->
                                        </p>
                                        <span class="jobtitle">{{item.company_name}}</span>
                                        <div class="slogan">
                                            <div class="nametip">
                                                <span >{{item.work_address}}</span>
                                                <span>{{item.experience_requir}}</span>
                                                <span>{{item.minimum_education}}</span>
                                            </div>
                                            <!-- <span class="nametip">上海 宝山区 顾村</span>
                                            <span class="nametip">经验不限</span>
                                            <span class="nametip">大专</span> -->
                                        </div>
                                    </div>
                                    <div class="jobprice">
                                        <span>{{item.salary_range}}</span>
                                    </div>
                                    <div class="jolist-bottom">
                                        <div class="joblist-logo">
                                            <img :src="item.avatar_image" alt="">
                                        </div>
                                        <div class="joblist-desc">
                                            {{item.nick_name}}
                                        </div>
                                        <div class="joblist-time">
                                            {{item.create_time}}
                                        </div>
                                    </div>
                                </div>
                                <!-- <div class="joblistbottom">
                                    <div class="joblistbottom-price">
                                        <p>123</p>
                                        <span>借款范围(元)</span>
                                    </div>
                                    <div class="joblistbottom-date">
                                        <p>123天</p>
                                        <span>放款时间</span>
                                    </div>
                                    <div class="joblistbottom-radio">
                                        <p>123</p>
                                        <span>日利率</span>
                                    </div>
                                </div> -->
                            </div>
                        <!-- </router-link> -->
                    </div>
                </template>
            </div>
    
            <div id="amap-main">
            </div>
    
            <!-- <el-form :model="ruleForm"  ref="ruleForm" class="index-form">
                <el-form-item prop="name">
                    <div class="indexinput-item">
                        <span>联系人</span>
                    <input type="text" v-model.trim="form.name">
                    </div>
                </el-form-item>
                <el-form-item prop="email">
                    <div class="indexinput-item">
                            <span>邮箱</span>
                        <input type="text" v-model.trim="form.email">
                    </div>
                </el-form-item>
                <el-form-item prop="produce">
                        <div class="indexinput-produce">
                            <textarea  style="background:#F2F3F7; height:7.56rem;width:calc(100% - 1.5rem);margin-left:0.75rem;margin-top:0.75rem; border: none;outline: none;" placeholder="请简单介绍下自己" v-model.trim="form.produce"></textarea >
                            <p>0/200</p>  
                        </div>
                    </el-form-item>
            </el-form> -->
        </div>
      </template>
    
    <script>
    import SendMessageToApp from '../../jsAppInteractive/index3.js'

    export default {
        data() {
            return {
                form: {
                    name: '',
                    email: '',
                    produce: '',
			        pathlink:"",
                },
                listdata:"",
                city:"地区",
                city1:"",
                isdata:false,
            }
        },
        created(){
            this.access_token = this.getUrlParam('access_token')
            this.pathlink = this.$route.path;
            
            this.access_token = this.getUrlParam('access_token')
            this.minimum_education = sessionStorage.getItem("minimum_education")
            this.salary_range = sessionStorage.getItem("salary_range")
            this.experience_requir = sessionStorage.getItem("experience_requir")
            if(this.minimum_education === "全部"){
                this.minimum_education = ''
            }
            this.salary_range = sessionStorage.getItem("salary_range")
            if(this.salary_range === "全部"){
                this.salary_range = ''
            }
            this.experience_requir = sessionStorage.getItem("experience_requir")
            if(this.experience_requir === "全部"){
                this.experience_requir = ''
            }
            // this.work_address = sessionStorage.getItem("work_address")
            if(sessionStorage.getItem("work_address")==="全部"){
                this.work_address = ''
            }else{
                this.work_address = sessionStorage.getItem("work_address")
            }
            console.log(this.experience_requir)
        
            this.pathlink = this.$route.path;
            // this.getLocation(); // 调用获取地理位置
            // this.getLngLatLocation()
        },
        mounted() {
            if(this.work_address){
                this.city1 = this.work_address
                setTimeout(() => {
                    this.loading = false
                    this.city = "全部"
                    // this.city = localStorage.getItem("city")
                    this.getlistdata()
                }, 500)
            }else{
                setTimeout(() => {
                    this.loading = false
                    this.city = "全部"
                    // this.city = localStorage.getItem("city")
                    this.getlistdata()
                }, 500)
            }
            // setTimeout(() => {
            //     this.loading = false
            //     this.city = localStorage.getItem("city")
            //     this.getlistdata()
            // }, 500)
        },
        destroyed() {
            // sessionStorage.clear()
            // sessionStorage.removeItem("minimum_education") 
            // sessionStorage.removeItem("salary_range")  
            // sessionStorage.removeItem("experience_requir")  
        },
        methods: {
            checklogin(){
                if(this.access_token != null){
                    this.$router.push({path: '/publish', query: {pathlink:this.pathlink}})
                }else{
                    // alert(111)
                    this.checkapp()
                }
            },
            checkapp(){
			    SendMessageToApp('webviewLoginSync')
            },
            getlistdata(){
                this.$get('works?sort=-id',{
                    minimum_education:this.minimum_education?this.minimum_education:"",
                    salary_range:this.salary_range?this.salary_range:"",
                    experience_requir:this.experience_requir?this.experience_requir:"",
                    work_address:this.city1?this.city1:""
                }).then((res) => {
                        console.log(res)
                        if(res.code === 1){
                            this.listdata = res.info.items
                            if(this.listdata.length === 0){
                                this.isdata = true
                            }
                            console.log(this.listdata)
                            // this.$message({
                            //     message: '提交成功',
                            //     type: 'success'
                            // });
                            // setTimeout(function(){
                            //     _this.$router.push('/mine');
                            // },1000);
                        }else{
                            this.$message.error(res.msg);
                        }
                        this.loading = false
                }).catch(() => {this.loading = false})
            },
            // sendindex(){
            // 	var _this = this;
            // 	this.$post('feedback',{user_name:_this.form.name,email:_this.form.email,content:_this.form.produce,type:2}
            // 		).then((res) => {
            // 			console.log(res)
            // 			if(res.code === 1){
            // 				this.$message({
            // 					message: '提交成功',
            // 					type: 'success'
            // 				});
            // 				setTimeout(function(){
            // 					_this.$router.push('/mine');
            // 				},1000);
            // 			}else{
            // 				this.$message.error(res.msg);
            // 			}
            // 			this.loading = false
            // 	}).catch(() => {this.loading = false})
            // },
            getUrlParam(name) {
                var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
                var r = window.location.search.substr(1).match(reg);
                if (r != null) return decodeURI(r[2]); return null;
            },
            gomoney(item,index){
                var _this = this;
                this.$router.push({path: '/jobdetail', query: {id:item.id,pathlink:this.pathlink}});
                // if(!localStorage.getItem("userinfo")){
                // 	this.$router.push("/login")
                // }else{
                // }
            },
            getLocation() {
                const that = this;
                AMap.plugin("AMap.Geolocation", function() {
                    var geolocation = new AMap.Geolocation({
                    // 是否使用高精度定位，默认：true
                    enableHighAccuracy: true,
                    // 设置定位超时时间，默认：无穷大
                    timeout: 10000,
                    // 定位按钮的停靠位置的偏移量，默认：Pixel(10, 20)
                    buttonOffset: new AMap.Pixel(10, 20),
                    //  定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
                    zoomToAccuracy: true,
                    //  定位按钮的排放位置,  RB表示右下
                    buttonPosition: "RB"
                    });

                    geolocation.getCurrentPosition();
                    AMap.event.addListener(geolocation, "complete", onComplete);
                    AMap.event.addListener(geolocation, "error", onError);

                    function onComplete(data) {
                    // data是具体的定位信息
                    console.log(data);
                    }

                    function onError(data) {
                    // 定位出错
                    console.log(data);
                    // 失败之后调用这个方法，使用IP定位获取当前城市信息
                    that.getLngLatLocation();
                    }
                });
            },
            // IP定位获取当前城市信息
            getLngLatLocation() {
                AMap.plugin("AMap.CitySearch", function() {
                    var citySearch = new AMap.CitySearch();
                    citySearch.getLocalCity(function(status, result) {
                    if (status === "complete" && result.info === "OK") {
                        // 查询成功，result即为当前所在城市信息
                        console.log(result)
                        console.log(result.city)
                        localStorage.setItem("city",result.city)
                        // this.city = result.city;
                    }
                    });
                });
            }
        },
    
    }
    </script>
    
    
    <style scoped>
    
    
    </style>