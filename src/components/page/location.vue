<template>
    <div class="location-page">
        <!-- 标题 -->
        <div class="location-head">
            <!-- <router-link :to="{path:'index'}"> -->
                <div class="location-headimg" @click="goback()">
                    <img src="../../../static/img/houtui@3x.png" alt="">
                </div>
            <!-- </router-link> -->
            <h5 >选择地区</h5>
        </div>
        <!-- <template>
            <div>
                <el-amap vid="amap" :plugin="plugin" class="amap-demo"></el-amap>
            </div>
        </template> -->
        <div id="amap-main">

        </div>
        <div class="dingwei-title">
                当前定位
        </div>
        <div class="dingwei-box" @click="handelnowlocation()">
            <div class="dingwei">
                <i class="el-icon-location"></i>
                <b>{{this.city}}</b>
                <!-- <b v-if="!city">正在获取当前定位</b>
                <b>{{city}}</b> -->
            </div>
        </div>

        <div class="citylist-box">
            <template  v-for="(item , index) in citydata">
                <div class="citylist-item" :id="'gocity-'+index">
                    <div class="citylist-title">
                        {{item.name}}
                    </div>
                    <div class="citylist-name" v-for="item in citydata[index].cities" @click="handelcity(item,index)">
                        {{item.name}}
                    </div>
                </div>
            </template>
        </div>
        <div class="gocity">
            <template  v-for="(item , index) in citydata">
                <p @click="jump('gocity-'+index)">{{item.name}}</p>
            </template>
        </div>
       
    </div>
  </template>

<script>
// import { location } from "./map.js";
import { lazyAMapApiLoaderInstance } from 'vue-amap';
import citylist from "./city.json"
export default {
    data() {
        return {
            form: {
                name: '',
                email: '',
                produce: ''
            },
            loading:false,
            citydata:"",
            positions: {
                lng: "",
                lat: "",
                address: "",
                loaded: false
            },
            pathlink:"",
            text:"",
            city:"正在获取当前定位",
            center: [121.59996, 31.197646],
            plugin: [
                {
                pName: "Geolocation",
                events: {
                    init(o) {
                    // o 是高德地图定位插件实例
                    o.getCurrentPosition((status, result) => {
                        console.log(result.position.lng,result.position.lat);  //  能获取定位的所有信息
                        if (result && result.position) {
                        // self.str = result.formattedAddress;
                        // self.positions.address = self.str.substring(
                        //   self.str.indexOf("市") + 1
                        // );
                        self.positions.lng = result.position.lng;
                        self.positions.lat = result.position.lat;
                        self.positions.loaded = true;
                        self.$nextTick();
                        // 把获取的数据提交到 store 的数据中，以便其他单文件组件使用
                        // self.$store.commit("POSITION", self.positions);
                        // console.log(self.positions);
                        sessionStorage.setItem(
                            "id",
                            JSON.stringify(
                            result.position.lng + "," + result.position.lat
                            )
                        );
                        }
                    });
                    }
                }
                }
            ]
        }
    },
    created(){
        this.getLocation();
        this.getLngLatLocation()
        this.pathlink = this.$route.query.pathlink
    },
    mounted() {
        // this.getLocation(); // 调用获取地理位置
        // this.getLngLatLocation()
        this.citydata = citylist;
        console.log(this.citydata)
        this.loading = true
        setTimeout(() => {
            this.loading = false
            this.city = localStorage.getItem("city")
            // done()
        }, 1000)
        //  console.log(window.sessionStorage.id)  //可以获取到经纬度
        //  lazyAMapApiLoaderInstance.load().then(() => {
        //     this.map = new AMap.Map('amap-main', {center: new AMap.LngLat(121.59996, 31.197646)});
        //     console.log(this.map)
        // });
    },
    methods: {
        jump(domId){
            // 当前窗口正中心位置到指定dom位置的距离

            //页面滚动了的距离
            let height = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop; 
            
            //指定dom到页面顶端的距离
            let dom = document.getElementById(domId);
            let domHeight = dom.offsetTop-40;
            
            //滚动距离计算
            var S = Number(height) - Number(domHeight);

            //判断上滚还是下滚
            if(S<0){
                //下滚
                S = Math.abs(S);
                window.scrollBy({ top: S, behavior: "smooth" });
            }else if(S==0){
                //不滚
                window.scrollBy({ top: 0, behavior: "smooth" });
            }else{
                //上滚
                S = -S
                window.scrollBy({ top: S, behavior: "smooth" });
            }
        },
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
        },
        /**获取地图定位*/
        // getLocation() {
        //     let _that = this;
        //     let geolocation = location.initMap("map-container"); //定位
        //     AMap.event.addListener(geolocation, "complete", result => {
        //         _that.lat = result.position.lat;
        //         _that.lng = result.position.lng;
        //         _that.province = result.addressComponent.province;
        //         _that.city = result.addressComponent.city;
        //         _that.district = result.addressComponent.district;
        //     });
        // },
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
        },
        goback(){
            if(this.pathlink==="/index"){
                this.$router.push("/index")
                // _this.$router.push({path:'/index',query:{minimum_education:this.choose?this.choose:"", salary_range:this.choose1?this.choose1:"", experience_requir:this.choose2?this.choose2:"",}});
            }else{
                // _this.$router.push({path:'/new',query:{minimum_education:this.choose?this.choose:"", salary_range:this.choose1?this.choose1:"", experience_requir:this.choose2?this.choose2:"",}});
                this.$router.push("/new")
            }
        },
        handelcity(item,index){
            console.log(item.name)
            this.$get('works',{work_address:item.name}).then((res) => {
                    console.log(res)
                    if(res.code === 1){
                        sessionStorage.setItem('work_address',item.name)
                        if(this.pathlink==="/index"){
                            this.$router.push("/index")
                        }else{
                            this.$router.push("/new")
                        }
                    }else{
                        this.$message.error(res.msg);
                    }
                    this.loading = false
            }).catch(() => {this.loading = false})
        },
        handelnowlocation(){
            this.$get('works',{work_address:this.city}).then((res) => {
                console.log(res)
                if(res.code === 1){
                    sessionStorage.setItem('work_address',this.city)
                    if(this.pathlink==="/index"){
                        this.$router.push("/index")
                    }else{
                        this.$router.push("/new")
                    }
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