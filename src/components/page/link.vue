<template>
        <div class="shangwu-page">
            <div class="shangwu-head">
                    <router-link :to="{path:'index'}">
                            <div class="shangwu-headimg">
                                <img src="../../../static/img/fanhui@3x.png" alt="">
                            </div>
                        </router-link>
                    <!-- <div class="shangwu-headimg" @click="prev()">
                        <img src="../../../static/img/fanhui@3x.png" alt="">
                    </div> -->
                <h5>{{name}}</h5>
            </div>
            <div></div>
            <div style="width:100%;">
                    <!-- <iframe :src="http://0.0.0.0:8080" id="mobsf" scrolling="no" frameborder="0" style="position:absolute;top:80px;left: 120px;"></iframe> -->
                    <!-- <iframe :src="url" frameborder="0" style="width:100%;" scrolling="no"></iframe> -->
                    <iframe :src="url" id="dialogFrame" frameborder="0" scrolling="no" style="background-color:transparent; position: absolute; z-index: -1; width: 100%; height: 100%; top: 2.75rem;left:0;"></iframe>
            </div>
        </div>
      </template>

<script>
    export default {
        data() {
            return {
                form: {
                    name: '',
                    email: '',
                    produce: ''
                },
                user_id:'',
                product_id:'',
                url:"",
                name:""
            }
        },
        created(){
            this.user_id = this.$route.query.user_id
            this.product_id = this.$route.query.product_id
            this.url = this.$route.query.url
            this.name = this.$route.query.name
            console.log(this.name);
            this.getlink();
        },
        mounted() {
            this.url = this.$route.query.url;
        },
        methods: {
            getlink(){
                this.$axios.post('api/apply',{user_id:this.user_id,product_id:this.product_id}).then((res) => {
                    console.log(res)
                }).catch(() => {
                    this.loading = false
                })
            },
            prev () {
                this.$router.go(-1)
            }
        },

    }
</script>


<style scoped>

</style>