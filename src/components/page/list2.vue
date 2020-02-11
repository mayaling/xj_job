<template>
	<div class="table" v-loading="loading" element-loading-text="加载中">
		<div class="tabBd bc2" v-if="list.length > 0">
			<ul class="clearfix">
				<li class="clearfix" v-for="item in list">
					<router-link v-if="item.node" :to="{path:'detail',query:{id:item.course[0].id}}" title="item.title" class="clearfix">
						<div class="fl" :style="{backgroundImage:'url(' + item.url + ')'}"></div>
						<div class="fr">
							<div class="title oh oh_2">{{item.course[0].title}}</div>
							<div class="price">￥{{item.course[0].price}}</div>
						</div>
					</router-link>
					<!--<router-link v-else-if="item.course.length == 1 && item.course[0].node" :to="{path:'detail',query:{id:item.course[0].course[0].id}}"  class="clearfix">
						<div class="fl" :style="{backgroundImage:'url(' + item.url + ')'}"></div>
						<div class="fr">
							<div class="title oh oh_2">{{item.name}}</div>
						</div>
					</router-link>-->
					<router-link v-else :to="{path:'list',query:{id:item.id}}" class="clearfix">
						<div class="fl" :style="{backgroundImage:'url(' + item.url + ')'}"></div>
						<div class="fr">
							<div class="title oh oh_2">{{item.name}}</div>
						</div>
					</router-link>
				</li>
			</ul>
		</div>
		<div class="noData" v-show="nodata">该分类暂无课程</div>
	</div>
</template>


<script>
  export default {
    name: 'teacher',
    data() {
      return {
      	id:0,
				list:[],
				ulwidth:'',
				liwidth:'',
				cur:0,
				nodata:false,
				loading:true
      }
    },
    created(){
    	var id = this.$route.query.id
    	this.$get('index.php/category/getchildrencategory',{categoryId:id}).then((res) => {
    		if(res.code == 0){
					document.title = res.msg
					this.list = res.data;
					if(res.data.length == 0){
						this.nodata = true
					}
    			this.loading = false
    		}else{
      		this.$message.error('数据请求失败');
      		this.loading = false
    		}
    	}).catch((err) =>{
    		this.loading = false
    	})
    },
    computed: {

    },
    methods: {
    	goto(id){
    		this.$route.push({name:'/list',params:{id:id}})
    	}	
    }
  }
</script>

<style scoped>
</style>
