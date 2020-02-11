<template>
        <div class="tabberWarp" >
            <div class="warptab">
                <Item :txt='item.txt' :page='item.page' @change='getVal' v-for='item in tabbarDes':sel='selected'>
                    <img :src="item.normalImg" slot='normalImg'>
                    <img :src="item.activeImg" slot='activeImg'>
                </Item>
            </div>
        </div>
    </template>
<script type="text/javascript">
    import Item from './Item.vue'
    export default {
        components: {
            Item
        },
        data: function() {
            return {
                selected: 'index',
                tabbarDes: [{
                    txt: '首页',
                    page: 'index',
                    normalImg: require('../../../static/img/shouye@3x.png'),
                    activeImg: require('../../../static/img/shouye_l@3x.png')

                }, {
                    txt: '贷款',
                    page: 'daikuan',
                    normalImg: require('../../../static/img/daichao@3x.png'),
                    activeImg: require('../../../static/img/daichao_l@3x.png')
                }, {
                    txt: '我的',
                    page: 'mine',
                    normalImg: require('../../../static/img/wode@3x.png'),
                    activeImg: require('../../../static/img/wode_l@3x.png')
                }]
            }
        },
        mounted() {
            if(sessionStorage.getItem("selected")== null){
                this.selected= "index";
            }else{
                this.selected = sessionStorage.getItem("selected");
                
            }
                
         },
        methods: {
            getVal: function(res) {
                this.selected = res;
                sessionStorage.setItem("selected", this.selected);
            }
        }
    }
</script>
<style scoped>
    .warptab {
        width: 100%;
        height: 3.38rem;
        background: #FFFFFF;
        box-shadow: inset 0 1px 0 0 #ECECEC;
        display: flex;
        align-items: center;
        justify-content: space-around;
        font-size: 0;
    }
    
    .warptab img {
        width: 1.31rem;
        height: 1.25rem;
    }
    
    .tabberWarp img {
        margin-top: 10px;
        margin-bottom: 5px;
    }
    
    .tabberWarp {
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        padding-bottom: 5px;
        background: #fff;
        z-index: 9999;
    }
    
    .item txt {
        color: yellow;
    }
</style>