<template>
    <div class="signList">
        <ul class="list" v-if="options.length">
            <li v-for="(item,index) in options" :key="index" @click="goDetail(item.id)">
                <p class="top">
                    <span class="title">{{item.company}}</span>
                    <span :class="'tag'+(item.status+1)">{{item.status ? item.status === -1 ? '未开始' : '已放弃' : '已打卡'}}</span>
                </p>
                <p class="center">{{item.address.address}}</p>
                <p class="btm">
                    <span class="time">面试时间: {{item.start_time}}</span>
                    <span :class="'tag'+(item.remind+1===2?0:item.remind+1===0?0:1)">{{item.remind ? '未提醒' : '已提醒'}}</span>
                </p>
            </li>
        </ul>
        <p v-else class="none">当前分类还没有面试！</p>
    </div>
</template>

<script>
export default {
    props: ['options'],
    methods:{
        goDetail(id){
             wx.navigateTo({
                url: '/pages/sign/detail/main?id='+id
            })
        }
    }
}
</script>

<style scoped>
    .list{
        border-top:2rpx solid #eee;
    }
    .list li{
        border-top:20rpx solid #eee;
        width:100%;
        padding:10rpx 30rpx;
        box-sizing:border-box;
    }
    .top{
        display:flex;
        line-height:1.5;
        margin:15rpx 0;
        align-items:center;
        justify-content:space-between;
    }
    .top .title{
        color:#000;
        font-size:44rpx;
        font-weight:500;      
    }
    .tag0{
        font-size:30rpx;
        background-color:hsla(220,4%,58%,.1);
        border-color:hsla(220,4%,58%,.2);
        color:#909399;
        padding:5rpx 10rpx;
    }
    .tag1{
        font-size:30rpx;
        padding:5rpx 10rpx;
        background-color:rgba(64,158,255,.1);
        color:#409eff;
        border:2rpx solid 409eff;
    }
    .tag2{
        font-size:30rpx;
        padding:5rpx 10rpx;
        background-color:hsla(0,87%,69%,.1);
        border-color:hsla(0,87%,69%,.2);
        color:#f56c6c
    }
  
    .center{
        font-size:32rpx;
        color:#999;
        line-height:1.2;
        overflow:hidden;
        text-overflow:ellipsis;
        display:-webkit-box;
        -webkit-line-clamp:3;
        -webkit-box-orient:vertical;
        margin:15rpx 0;
        align-items:center;
        justify-content:space-between;
    }
    .btm{
        display:flex;
        line-height:1.5;
        margin:15rpx 0;
        align-items:center;
        justify-content:space-between;
        font-size:34rpx;
        color:#666;
    }
   
    .none{
        width:100%;
        text-align: center;
        margin-top: 150rpx;
        font-size: 34rpx;
    }
</style>
