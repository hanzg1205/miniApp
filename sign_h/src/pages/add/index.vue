<template>
    <div class="add">
        <form action="">
            <h5 class="title">面试信息</h5>
            <ul class="content">
                <li>
                    <span>公司名称</span>
                    <input type="text" placeholder="请输入公司名称">
                </li>
                <li>
                    <span>公司电话</span>
                    <input type="text" placeholder="请输入面试人联系电话">
                </li>
                <li>
                    <span>面试时间</span>
                    <picker mode="date">
                        {{time}}
                    </picker>
                    <icon
                        @click="showToast"
                        class="tip"
                        type="warn"
                        color="#197DBF"
                        size="20">
                    </icon>
                </li>
                <li @click="goSearch">
                    <span>面试地址</span>
                    <input type="text" placeholder="请选择面试地址">
                </li>
            </ul>           
            <h5 class="title">备注信息</h5>
            <textarea class="textarea" placeholder="备注信息(可选，100个字以内)"></textarea>
            <button type="submit" class="confirm">确认</button>
        </form>
    </div>
</template>

<script>
export default {
    data(){
        return {
            time: new Date().toLocaleString()
        }
    },
    methods: {
        showToast(){
            wx.showToast({
                title: '在面试前一个小时我们会通知你哦',
                icon: 'none',
                duration: 2000
            })
        },
        goSearch(){
            wx.navigateTo({
                url: '/pages/search/main'
            })
        }
    }
}
</script>

<style>
    .title{
        font-size:34rpx;
        padding:15rpx 0 15rpx 30rpx;
        background:#f6f6f6;
    }
    .content{
        background: #fff;
        border-top:1rpx solid #eee;
        border-bottom:1rpx solid #eee;
    }
    .content li{
        width:720rpx;
        height:88rpx;
        margin-left:30rpx;
        border-bottom:1rpx solid #eee;
        display:flex;
        align-items:center;
        justify-content:space-between;

    }
    .content li:last-child{
        border-bottom: 0;
    }
    .content li span{
        color:#666;
        width:170rpx;
        font-size:30rpx;
    }
    .content li input,.content li picker{
        flex:1;
        font-size:30rpx;
        color:#333;
        height:88rpx;
        overflow:hidden;
        white-space:nowrap;
        text-overflow:ellipsis;
        padding-right:30rpx;
        line-height:88rpx;
    }
    .content li .tip{
        margin-right:20rpx;
    }
    .textarea{
        font-size:30rpx;
        color:#333;
        width:690rpx;
        height:200rpx;
        margin:30rpx;
        box-sizing:border-box;
        padding:10rpx;
        border:1rpx solid silver;
        border-radius:5rpx;
    }
    .confirm{
        width:100%;
        height:100rpx;
        background:#999;
        color:#fff;
        font-weight:500;
        font-size:40rpx;
        border-radius: 0;
        margin-top:50rpx;
    }
</style>
