<template>
    <div class="my">
        <div class="header">
            <div class="avator">
                <img src="/static/images/my.png" alt="">
            </div>
            <h4 class="title">15934567149</h4>
        </div>
        <ul class="my-list">
            <li @click="goListFn">
                <icon
                    class="tip"
                    type="info"
                    color="#10AEFF"
                    size="18">
                </icon>
                <span>我的面试</span>
                <img src="/static/images/arrow.svg" alt="">
            </li>
            <li>
                <icon
                    class="tip"
                    type="waiting"
                    color="#10AEFF"
                    size="18">
                </icon>
                <span>客服中心</span>
                <img src="/static/images/arrow.svg" alt="">
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    data(){
        return {
            
        }
    },
    methods: {
        goListFn(){
            wx.navigateTo({
                url: '/pages/list/main'
            })  
        }
    }
}
</script>

<style scoped>
    .header{
        background:#f4f6f9;
        width:100%;
        height:350rpx;
        box-sizing:border-box;
        padding:50rpx 0;
        display:flex;
        flex-direction:column;
        align-items:center;
        justify-content:space-around;
    }
    .avator{
        width:100rpx;
        height:100rpx;
        background:#fff;
        text-align:center;
        padding:20rpx;
        border-radius:50%;
    }
    .avator img{
        width:90%;
        height:90%;
    }
    .my-list li{
        width:100%;
        display:flex;
        align-items:center;
        justify-content:space-between;
        box-sizing:border-box;
        padding:30rpx 40rpx;
        border-bottom:1rpx solid #eee;
    }
    .my-list li img{
        width:40rpx;
        height:40rpx;
    }
    .my-list li span{
        flex: 1;
        margin-left:30rpx;
    }
    .my-list li icon{
        width:40rpx;
        height:40rpx;
    }
</style>
