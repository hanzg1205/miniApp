<template>
    <div class="list">
        <nav class="nav">
            <span v-for='(item,index) in navList' 
                :key="index" 
                :class='index===idx ? "active" : ""'
                @click="()=>navTab(index)">{{item.name}}</span>
        </nav>
        <div class="content">
            <ul class="list">
                <li @click="goDetail">
                    <p class="top">
                        <span class="title">北京八维研究学院</span>
                        <span class="tag3">已放弃</span>
                    </p>
                    <p class="center">北京市海淀区上地</p>
                    <p class="btm">
                        <span class="time">面试时间: 2019-06-17 13:00</span>
                        <span class="tag1">未提醒</span>
                    </p>
                </li>
                <li @click="goDetail">
                    <p class="top">
                        <span class="title">北京八维研究学院</span>
                        <span class="tag3">已放弃</span>
                    </p>
                    <p class="center">北京市海淀区上地</p>
                    <p class="btm">
                        <span class="time">面试时间: 2019-06-17 13:00</span>
                        <span class="tag1">未提醒</span>
                    </p>
                </li>
                <li @click="goDetail">
                    <p class="top">
                        <span class="title">北京八维研究学院</span>
                        <span class="tag3">已放弃</span>
                    </p>
                    <p class="center">北京市海淀区上地</p>
                    <p class="btm">
                        <span class="time">面试时间: 2019-06-17 13:00</span>
                        <span class="tag1">未提醒</span>
                    </p>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            navList: [
                {id: 0, name: '未开始'},
                {id: 1, name: '已打卡'},
                {id: 2, name: '已放弃'},
                {id: 3, name: '全部'}
            ],
            idx: 0
        }
    },
    methods: {
        navTab(index){
            this.idx = index;
        },
        goDetail(){
             wx.navigateTo({
                url: '/pages/detail/main'
            })
        }
    }
}
</script>

<style scoped>
    .nav{
        display: flex;
        justify-content: space-around;
        height: 88rpx;
        line-height: 88rpx;
        border-top:3rpx solid #eee;
    }
    .active{
        color:#197dbf;
        font-weight:500;
        border-bottom:3rpx solid #197dbf;
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
    .tag3{
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
    .tag1{
        background-color:hsla(220,4%,58%,.1);
        border-color:hsla(220,4%,58%,.2);
        color:#909399;
        padding:5rpx 10rpx;
    }
</style>
