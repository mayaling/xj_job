<template>
	<div class="table foot_fixed" v-loading="loading" element-loading-text="加载中">
		<div class="d-banner" v-if="course.url"><img :src="course.url"/></div>
		<div class="iteamInfo bc2" v-if="course.title">
			<div class="hd">详情</div>
			<div class="bd">
				<div class="name">{{course.title}}</div>
				<div class="tags">
					<span>大集团保障</span>
					<span>顶尖专家带队</span>
					<span>全新教育模式</span>
				</div>
				<div class="price clearfix">
					<div class="fl">￥{{course.package_intro[0]}}</div>
					<div class="fr">{{course.package_intro[1]}}</div>
				</div>
			</div>
		</div>
		<div class="lecturer bc2" v-if="teacher !=''">
			<div class="hd">老师介绍<span>（1）</span></div>
			<div class="bd">
				<div class="title bc2 clearfix">
					<img class="fl" :src="teacher.cover_image" />
					<div class="fr">
						<h3>{{teacher.name}}</h3>
						<p v-html="teacher.description"></p>
					</div>
				</div>
				<div class="info">{{teacher.detail}}</div>
			</div>
		</div>
		<div class="about bc2" v-if="course.description">
			<div class="hd">课程介绍</div>
			<div class="bd" v-html="course.description"></div>
			<div class="bd" v-if="course.welfare" v-html="course.welfare" style="margin-top:10px;"></div>
		</div>
		<div class="about parentClass bc2" v-if="parentClass.length > 0">
			<div class="hd">课程介绍</div>
			<div class="bd">
				<dl v-for="item in parentClass">
					<dt>{{item.module}}</dt>
					<dd>{{item.topic1}} ({{item.class_hour}}/课时)</dd>
					<dd>{{item.topic2}} ({{item.class_hour}}/课时)</dd>
					<dd>{{item.topic3}} ({{item.class_hour}}/课时)</dd>
					<dd>{{item.topic4}} ({{item.class_hour}}/课时)</dd>
					<dd>{{item.topic5}} ({{item.class_hour}}/课时)</dd>
				</dl>
			</div>
		</div>
		<div class="about bc2" v-if="course.detail">
			<div class="hd">课程详情</div>
			<div class="bd" v-html="course.detail"></div>
		</div>
		<div class="form bc2" v-if="formshow">
			<div class="hd">信息填写</div>
			<div class="bd">
				<ul>
					<li class="clearfix">
						<div class="fl"><font>*</font>家长姓名：</div>
						<div class="fr"><input class="ipt" type="text" v-model.trim="p_name" placeholder="请输入" /></div>
						<div class="clear"></div>
					</li>
					<li class="clearfix">
						<div class="fl"><font>*</font>学生姓名：</div>
						<div class="fr"><input class="ipt" type="text" v-model.trim="s_name" placeholder="请输入" /></div>
						<div class="clear"></div>
					</li>
					<li class="clearfix">
						<div class="fl"><font>*</font>手机号码：</div>
						<div class="fr"><input class="ipt" type="text" v-model.trim="phone" placeholder="请输入" /></div>
						<div class="clear"></div>
					</li>
					<li class="clearfix">
						<div class="fl"><font>*</font>所在地区：</div>
						<div class="fr">
							<select name="" class="ipt" @change="blur" v-model="province">
								<option key="0" label="请选择" value="请选择"></option>
								<option v-for="item in provinces" :key="item.name" :label="item.name" :value="item.name">{{item.name}}</option>
							</select>
						</div>
						<div class="clear"></div>
					</li>
					<li class="clearfix">
						<div class="fl"><font>*</font>就读学校：</div>
						<div class="fr"><input class="ipt" type="text" v-model.trim="school" placeholder="请输入" /></div>
						<div class="clear"></div>
					</li>
					<li class="clearfix">
						<div class="fl"><font>*</font>当前年级：</div>
						<div class="fr"><input class="ipt" type="text" v-model.trim="grade" placeholder="请输入" /></div>
						<div class="clear"></div>
					</li>
				</ul>
			</div>
		</div>
		<div class="foot clearfix" v-if="formshow">
			<a class="pay" @click="pay">立即支付</a>
		</div>
	</div>
</template>

<script>
  export default {
    name: 'studentDetail',
    data() {
      return {
      	id:0,
	    	teacher:'',
	    	course:'',
	    	parentClass:[],
	    	provinces:[],
	    	s_name:'',
	    	p_name:'',
	    	phone:'',
	    	school:'',
	    	grade:'',
	    	province:'请选择',
	    	formshow:false,
				loading:true
      }    
    },
    created(){
			this.id = this.$route.query.id
			this.$get('index.php/course/getcourseinfo',{courseId:this.id}).then((res) => {
				if(res.code == 0){
					console.log(res.data)
					if(res.data.course){
						if(res.data.course.detail){
							res.data.course.detail = this.trim(res.data.course.detail)
							res.data.course.description = this.trim(res.data.course.description)
						}
						if(res.data.course.welfare){
							res.data.course.welfare = this.trim(res.data.course.welfare)
						}
						document.title = res.data.course.title
						res.data.course.package_intro = res.data.course.package_intro.split("/")
						this.course = res.data.course
					}
					if(res.data.teacher){
						res.data.teacher.description = this.trim(res.data.teacher.description)
						this.teacher = res.data.teacher
					}
					if(res.data.parentClass){
						this.parentClass = res.data.parentClass
					}
					if(res.data.province){
						this.provinces = res.data.province
					}
					this.formshow = true
					this.loading = false
				}else{
					this.$message('数据请求失败');
      		this.loading = false
				}
      }).catch(() => {
      	this.loading = false
      })
    },
    computed: {

    },
    methods: {
    	pay(){
				var _this = this
				if(_this.p_name == '' || _this.s_name == '' || _this.grade == '' || _this.phone == '' || _this.province == '请选择' || _this.school == ''){
					this.$message('带*项为必填！');
				}else if(!_this.tel(_this.phone)){
					this.$message('手机号码格式不正确！');
				}else{
					window.location.href='http://dev.myworldclassroom.com/wxpay/example/liyang.php?name=' + _this.s_name + '&parentName=' + _this.p_name +'&grade=' + _this.grade + '&phone=' + _this.phone + '&province=' + _this.province + '&school=' + _this.school + '&courseId='+ _this.id;
				}				
			},
			blur(){
				console.log('cess')
				var u = navigator.userAgent, app = navigator.appVersion; 
				var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
				if(isiOS){
					window.setTimeout(function(){ 
				    window.scrollTo(100, document.body.clientHeight - window.screen.availHeight + 50);
				　　},20); 
				}
			},
			trim(str) {
				return str.replace(/\n|\r\n/g,"<br/>")
      },
      tel(str){
      	var re = /^(((13[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1})|(198)|(199)|(166)|(165)|(146)|(148))+\d{8})$/;
      	return re.test(str)
      }
    }
  }
</script>
<style scoped>
</style>
