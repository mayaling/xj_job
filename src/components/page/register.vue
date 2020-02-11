<template>
  <div class="reg-wrap" v-loading="loading" element-loading-text="数据提交中">
		<el-form :model="form" ref="form" label-width="100px">
			<div class="reg">
				<el-form-item label="手机号">
			    <el-input v-model="form.phone" placeholder="输入手机号"></el-input>
			  </el-form-item>
				<el-form-item label="家长姓名">
			    <el-input v-model="form.parent" placeholder="输入家长姓名"></el-input>
			  </el-form-item>
				<el-form-item label="学生姓名">
			    <el-input v-model="form.name" placeholder="输入学生姓名"></el-input>
			  </el-form-item>
			  <el-form-item label="所在地区">
			    <el-select v-model="form.region" placeholder="选择地区">
			      <el-option v-for="item in province" :key="item.id" :label="item.name" :value="item.name"></el-option>
			    </el-select>
			  </el-form-item>
			  <el-form-item label="就读学校">
			    <el-input v-model="form.school" placeholder="输入就读学校"></el-input>
			  </el-form-item>
			  <el-form-item label="当前年级">
			    <el-input v-model="form.grade" placeholder="输入就读学校"></el-input>
			  </el-form-item>
			</div>
			<div class="regBtn">
				<el-button type="primary" @click="submitForm('ruleForm')">注 册</el-button>
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
      	loading:true,
      	province:[],
        form: {
          phone: '',
          parent: '',
          name: '',
          region: '',
          school:'',
          grade:''
        }
      }
    },
    created(){
			this.$get('index.php/province/index?pageSize=100&order=asc').then((res)=>{
				if(res.code == 0){
					this.province = res.data.list
					this.loading = false
				}else{
					this.loading = false
				}
			}).catch(() => {this.loading = false})
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
