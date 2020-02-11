<template>
  <div class="reg-wrap" v-loading="loading" element-loading-text="数据提交中">
		<el-form :model="form" ref="form" label-width="0px" class="demo-ruleForm">
			<ul class="reg clearfix">
				<li class="clearfix">
					<img src="../../assets/login_01.png" />
					<el-input class="login-input" v-model="form.phone" clearable placeholder="请输入手机号"></el-input>
				</li>
				<li class="code clearfix">
					<img src="../../assets/login_02.png" />
					<el-input class="login-input" v-model="form.code" clearable placeholder="请输入验证码"></el-input>
					<el-button class="codeBtn" :class="codeCss" @click="getCode">{{codeTxt}}</el-button>
				</li>
				<li class="clearfix">
					<img src="../../assets/login_03.png" />
					<el-input class="login-input" v-model="form.pwd" type="password" clearable placeholder="请设置密码"></el-input>
				</li>
				<li class="clearfix">
					<img src="../../assets/login_03.png" />
					<el-input class="login-input" v-model="form.pwd2" type="password" clearable placeholder="请重复密码"></el-input>
				</li>
			</ul>
			<div class="regBtn">
				<el-button type="primary" @click="submitForm('ruleForm')">注册</el-button>
			</div>
  </el-form>
  </div>
</template>

<script>
  export default {
    data: function(){
    	var re = /^(((13[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1})|(198)|(199)|(166)|(165)|(146)|(148))+\d{8})$/;
    	var phoneRule = (rule, value, callback) => {
        if(!re.test(value)) {
          callback(new Error('请输入正确手机号'));
        }else{
          callback();
        }
      };
      return {
      	loading:false,
      	codeTxt:'获取验证码',
      	codeCss:'gray',
        form: {
          phone: '',
          code: '',
          pwd: '',
          pwd2: ''
        }
      }
    },
    created(){

    },
    computed: {

    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
          	this.loading = true
            localStorage.setItem('token','');
            this.$post('students',{
            	name:this.form.name,
            	sex:parseInt(this.form.sex),
            	birthday:this.form.birthday,
            	grade:this.form.grade,
            	phone:this.form.phone,
            	city:this.form.city
            }).then((res) => {
			      	if(res.code === 0){
		          	this.$alert('注册成功，请找教师拿登录密码！', '提示', {
				          confirmButtonText: '确定',
				          callback: action => {
				            this.$router.push('/Login');
				          }
				        })
			      	}else{
			      		this.$message.error(res.msg);
			      	}
			      	this.loading = false
			      }).catch(() => {this.loading = false})
          } else {
            return false;
          }
        });
      },
      getCode(){
      	var re = /^(((13[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1})|(198)|(199)|(166)|(165)|(146)|(148))+\d{8})$/;
      	if(!re.test(this.form.phone)) {
          this.$message('手机号格式不正确');
        }else{
          console.log("通过")
        }
      }
    }
  }
</script>
