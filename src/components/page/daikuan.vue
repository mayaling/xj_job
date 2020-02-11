<template>
    <div class="daikuan-page">
        	<scroller
		:on-refresh="refresh"
		:on-infinite="infinite">
        <div class="daikuan-pagetitle">
            <div class="daikuanlogo">
                <img src="../../../static/img/daikuanchaoshi@3x.png" alt="">
            </div>
        </div>
        <div class="daikuntip">
            <p>建议同时申请3~5款产品，通过率99%</p>
        </div>
        <div class="zuixinkouzi">
                <h5>最新口子</h5>
                    <div class="kouzi">
                            <template v-for="(item , index) in zuixindata">
                        <div class="kouzi-item" @click="gomoney(item,index)">
                            <p>
                                <img :src="item.image" alt="">
                                <span>{{item.name}}</span>
                            </p>
                            <p>{{item.max_price}}</p>
                            <p>最高可借（元）</p>
                        </div>
                    </template>
                    </div>
                
        </div>
        <div class="hot">
                <h5>热门推荐</h5>
                <template v-for="(item , index) in tuijiandata">
                    <div class="hotlist">
                        <div class="hotlisttop">
                            <div class="hotlisticon">
                                <img :src="item.image" alt="">
                            </div>
                            <div class="hostlistinner">
                                <p class="hotlistname">
                                    <span class="hotname">{{item.name}}</span>
                                    <span class="nametip">高通过率</span></p>
                                    <span class="hotlisttip">{{item.apply_num}}人已拿到钱</span>
                            </div>
                            <div class="gomoney" @click="gomoney(item,index)">
                                <span href="">去拿钱</span>
                            </div>
                        </div>
                        <div class="hotlistbottom">
                            <div class="hotlistbottom-price">
                                <p>{{item.max_price}}</p>
                                <span>借款金额</span>
                            </div>
                            <div class="hotlistbottom-date">
                                <p>{{item.max_duration}}天</p>
                                <span>最高借款期限</span>
                            </div>
                            <div class="hotlistbottom-radio">
                                <p>{{item.rate}}</p>
                                <span>日利率</span>
                            </div>
                        </div>
                    </div>
                </template>
        </div>
        <div class="loadmore" @click="loadmore()">
            <span>点击加载更多</span>
        </div>
        <div class="footer" style="min-height: 70px;"></div>
        </scroller>
        <!-- <Tabbar></Tabbar> -->
		<!-- <Tabbar :active="tabActive"></Tabbar> -->
        

        <!-- <Tabbar></Tabbar> -->
    </div>
</template>

<script>
    import Tabbar from "../common/Tabbar.vue"
	// import Tabbar from "../common/tabs.vue"

    import VueScroller from 'vue-scroller'
    Vue.use(VueScroller)
    export default {
        data(){
            return{
                zuixindata:"",
                tuijiandata:"",
                page:1,
                tabActive: 'daikuan'
            }
        },
        components: {
            Tabbar
        },
        // beforeRouteEnter: (to, from, next) => {
		// 	next(vm => {
		// 	vm.tabActive = '/' + to.name;
		// 	});
		// },
        created() {
            this.getzuixin();
			this.gettuijian();
        },
        methods: {
            getzuixin(){
				var _this = this;
				this.$get('products?type=new&per-page=4').then((res) => {
					// console.log(res)
                if (res.code === 1) {
					_this.zuixindata = res.info.items
					// _this.loading = false;
                } else {
                    this.$message.error('数据获取失败');
                }
				}).catch(() => {
					this.loading = false
				})
			},
			gettuijian(){
				var _this = this;
				this.$get('products?per-page=10&page=1&sort=sort').then((res) => {
                if (res.code === 1) {
					_this.tuijiandata = res.info.items
					// console.log(_this.tuijiandata)
					// _this.loading = false;
                } else {
                    this.$message.error('数据获取失败');
                }
				}).catch(() => {
					this.loading = false
				})
            },
            loadmore(){
                var _this = this;
                _this.page++;
                var newdata;
                console.log(_this.page)
                this.$get('products?per-page=10&sort=sort&page='+_this.page).then((res) => {
                if (res.code === 1) {
                    for(var i=0;i<res.info.items.length;i++){
                        _this.tuijiandata.push(res.info.items[i])
                    }
					console.log(_this.tuijiandata)
					// _this.loading = false;
                } else {
                    this.$message.error('数据获取失败');
                }
				}).catch(() => {
					this.loading = false
				})
            },
            gomoney(item,index){
                var _this = this;
				if(!localStorage.getItem("userinfo")){
					this.$router.push("/login")
				}else{
					_this.user_id = localStorage.getItem("userinfo")
					this.$router.push({path: '/link', query: {user_id:_this.user_id,product_id:item.id,url:item.url,name:item.name}});

					// this.$post('apply',{user_id:_this.user_id,product_id:item.id}).then((res) => {
					// 	this.$router.push({path: '/link', query: {user_id:_this.user_id,product_id:item.id,url:item.url,name:item.name}});
					// }).catch(() => {
					// 	this.loading = false
					// })
				}
            },
            refresh (done) {
				setTimeout(() => {
                    this.getzuixin();
			        this.gettuijian();
				done()
				}, 1500)
			},
        }
    }
</script>


<style scoped>
    /* .daikuan-pagetitle {
        width: 100%;
        height: 4.75rem;
        background: goldenrod;
    } */
</style>