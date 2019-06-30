<template>
    <div class="detail">
        <ul class="detail-list">
            <li>
                <label for="true">面试地址：</label>
                <span>北京八维教育学院</span>
            </li>
            <li>
                <label for="true">面试时间：</label>
                <span>2019-6-30 14:30</span>
            </li>
            <li>
                <label for="true">联系方式：</label>
                <span>15934567149</span>
            </li>
            <li>
                <label for="true">是否提醒</label>
                <span>已提醒</span>
            </li>
            <li>
                <label for="true">面试状态：</label>
                <span>已放弃</span>
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
        
    }
}
</script>

<style scoped>
    .detail-list{
        border-top:1rpx solid #eee;
        border-bottom:1rpx solid #eee;
        background:#fff;
    }
    .detail-list li{
        width:720rpx;
        min-height:88rpx;
        margin-left:30rpx;
        border-bottom:1rpx solid #eee;
        display:flex;
        align-items:center;
        justify-content:space-between;
    }
    .detail-list li:last-child{
        border:0;
    }
    .detail-list li label{
        color:#666;
        width:170rpx;
        font-size:30rpx;
    }
    .detail-list li span{
        flex:1;
        font-size:30rpx;
        color:#333;
        padding-right:30rpx;
        box-sizing:border-box;
    }
</style>
