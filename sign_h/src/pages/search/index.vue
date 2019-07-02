<template>
    <div class="search">
        <header class="header">
            <span>北京</span>
            <input type="text" placeholder="面试地址" v-model="address">
        </header>
        <ul class="search-list">
            <li v-for="(item,index) in signList" :key="index" @click="select(index)">
                <cover-image src="/static/images/location.svg" alt="" class="img"></cover-image>
                <div class="cont">
                    <p class="top">{{item.title}}</p>
                    <p class="bottom">{{item.address}}</p>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
import { mapMutations } from "vuex";
export default {
    data(){
        return {
            address: '',
            signList: []
        }
    },
    watch: {
        address(val, oldVal){
            this.search(val);
        }
    },
    created(){
        let that = this;
        this.search = function(val){
            console.log('val...',val)
            this.$map.search({
                keyword: val,
                region: '北京',
                success: function(res){
                    console.log(res);
                    that.signList = res.data;
                }
            })  
        }       
    },
    methods: {
        ...mapMutations({
            initAddInfo: 'addSign/initAddInfo'
        }),
        select(index){
            this.initAddInfo({
                address: this.signList[index]
            });
            // 返回上一页
            wx.navigateBack();
        }
    }
}
</script>

<style scoped>
    .header{
        display:flex;
        align-items:center;
        border-top:2rpx solid #eee;
        border-bottom:2rpx solid #eee;
        height:88rpx;
    }
    .header span{
        width:26%;
        text-align:center;
        box-sizing:border-box;
        border-right:2rpx solid #eee
    }
    .header input{
        padding:0 20rpx;
    }
    .search-list li{
        height:100rpx;
        padding:10rpx 0 10rpx 60rpx;
        box-sizing:border-box;
        border-bottom:2rpx solid #eee;
        display:flex;
        align-items:center;
        flex-direction:row;
    }
    .search-list li .img{
        width:44rpx;
        height:44rpx;
    }
    .cont{
        flex:1;
        margin-left:30rpx;
        display:flex;
        flex-direction:column;
        justify-content:space-around;
    }
    .cont .top{
        font-size:34rpx;
    }
    .cont .bottom{
        font-size:24rpx;
        color:silver;
    }
</style>
