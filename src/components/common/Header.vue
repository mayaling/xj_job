<template>
    <div class="header">
    		<div class="logo"><img src="../../assets/logo.png"/><span>随手花</span></div>
        <!-- 折叠按钮 -->
        <div class="collapse-btn" @click="collapseChage">
            <i class="el-icon-menu"></i>
        </div>
        <div class="header-right">
            <div class="header-user-con">
                <!-- 用户名下拉菜单 -->
                <el-dropdown class="user-name" trigger="click" @command="handleCommand">
                    <span class="el-dropdown-link">
                        {{username}} <i class="el-icon-caret-bottom"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <!--<el-dropdown-item command="edituser">编辑资料</el-dropdown-item>-->
                        <el-dropdown-item command="editpsw">修改密码</el-dropdown-item>
                        <el-dropdown-item divided command="loginout">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
        </div>
    </div>
</template>
<script>
    import bus from '../common/bus';
    export default {
        data() {
            return {
                collapse: false,
                fullscreen: false,
                username: '',
                message: 0
            }
        },
        created() {
            this.username = localStorage.getItem('ms_username');
        },
        computed: {

        },
        methods: {
            // 用户名下拉菜单选择事件
            handleCommand(command) {
                if (command == 'loginout') {
                    localStorage.setItem('ms_userid', '');
                    localStorage.setItem('ms_username', '');
                    localStorage.setItem('token', '');
                    localStorage.setItem('phone', '');
                    localStorage.setItem('role', '');
                    this.$router.push('/login');
                } else if (command == 'edituser') {
                    this.$router.push('/edituser');
                } else if (command == 'editpsw') {
                    this.$router.push('/editpsw')
                }
            },
            // 侧边栏折叠
            collapseChage() {
                this.collapse = !this.collapse;
                bus.$emit('collapse', this.collapse);
            }
        },
        mounted() {
            if (document.body.clientWidth < 1500) {
                this.collapseChage();
            }
        }
    }
</script>
<style scoped>
    .header {
        position: relative;
        box-sizing: border-box;
        width: 100%;
        height: 70px;
        color: #fff;
    }
    
    .header .logo {
        float: left;
        width: 285px;
        line-height: 70px;
        font-size: 20px;
    }
    
    .header .logo img {
        height: 40px;
        margin: 15px 15px 0 10px;
        float: left;
    }
    
    .collapse-btn {
        float: left;
        padding: 0 21px;
        cursor: pointer;
        line-height: 70px;
        font-size: 22px;
    }
    
    .header-right {
        float: right;
        padding-right: 50px;
        font-size: 22px;
    }
    
    .header-user-con {
        display: flex;
        height: 70px;
        align-items: center;
    }
    
    .btn-fullscreen {
        transform: rotate(45deg);
        margin-right: 5px;
        font-size: 24px;
    }
    
    .btn-bell,
    .btn-fullscreen {
        position: relative;
        width: 30px;
        height: 30px;
        text-align: center;
        border-radius: 15px;
        cursor: pointer;
    }
    
    .btn-bell-badge {
        position: absolute;
        right: 0;
        top: -2px;
        width: 8px;
        height: 8px;
        border-radius: 4px;
        background: #f56c6c;
        color: #fff;
    }
    
    .btn-bell .el-icon-bell {
        color: #fff;
        margin-top: 2px;
    }
    
    .user-name {
        margin-left: 10px;
    }
    
    .user-avator {
        margin-left: 20px;
    }
    
    .user-avator img {
        display: block;
        width: 40px;
        height: 40px;
        border-radius: 50%;
    }
    
    .el-dropdown-link {
        color: #fff;
        cursor: pointer;
    }
    
    .el-dropdown-menu__item {
        text-align: center;
    }
</style>