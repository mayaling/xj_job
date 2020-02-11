<template>
    <div class="tabsbars">
        <ul class="clearfix">
            <li>
              <a url="/pages/index/main">
                <img src="../../../static/img/shouye@3x.png" alt="">
                 <p style="color:#21D3B0;">首页</p>
              </a>
            </li>
            <li>
              <a  @click="mine">
                <img src="../../../static/img/daichao@3x.png" alt="">
                 <p>贷款</p>
              </a>
            </li>
            <li>
                <a  @click="mine">
                  <img src="../../../static/img/wode@3x.png" alt="">
                   <p>我的</p>
                </a>
              </li>
          </ul>
    </div>
  </template>

<script>
    export default {
        methods: {
            goBack() {
                this.$router.go(-1);
            }
        }
    }
</script>


<style scoped>
    .tabsbars {
        width: 100%;
        height: 3.38rem;
        background: #FFFFFF;
        position: fixed;
        bottom: 0;
        z-index: 30;
        box-shadow: inset 0 1px 0 0 #ECECEC;
        border-top: 1px solid #e1e1e1;
    }
    
    .tabsbars ul {
        width: 100%;
    }
    
    .tabsbars li {
        width: 33.3%;
        height: 3.38rem;
        float: left;
        text-align: center;
        padding: 50px 0;
    }
    
    .tabsbars li a {
        display: block;
        height: 100%;
        width: 100%;
        cursor: pointer;
    }
    
    .tabsbars li img {
        height: 1.25rem;
        width: 1.31rem;
        margin-top: 5px;
    }
    
    .tabsbars li p {
        display: block;
        line-height: 60px;
        height: 16px;
        width: 100%;
        text-align: center;
        font-family: PingFangSC-Regular;
        font-size: 10px;
        color: #9B9B9B;
        text-align: center;
    }
</style>