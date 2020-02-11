<template>
    <div class='tabbar'>
        <Item txt='首页' mark='index' :sel='selected' @change='getVal'>
            <img src=../../../static/img/shouye_l@3x.png' slot='activeImg'/>
            <img src='../../../static/img/shouye@3x.png' slot='normalImg'/>
        </Item>
        <Item txt='贷款' mark='daikuan' :sel='selected' @change='getVal'>
            <img src=../../../static/img/daichao_l@3x.png' slot='activeImg'/>
            <img src='../../../static/img/daichao@3x.png' slot='normalImg'/>
        </Item>
        <Item txt='订单' mark='mine' :sel='selected' @change='getVal'>
            <img src=../../../static/img/wode_l@3x.png' slot='activeImg'/>
            <img src='../../../static/img/wode@3x.png' slot='normalImg'/>
        </Item>
      
    </div>
</template>

<script>
import Item from './Item'

export default {
    props: ['active'],
    components: {
        Item
    },
    data: function(){
        return {
            selected: 'active'
        }
    },
    watch: {
        'active'(newVal,oldVal) {
            this.selected = newVal;
        }
    },
    methods: {
        getVal: function(val){
            this.selected = val;
        }
    }
}

</script>

<style>
    .tabbar{width: 100%; height: 2.8rem; border-top: 1px solid #ccc; position: fixed; left: 0; bottom: 0;background-color: white;}
</style>