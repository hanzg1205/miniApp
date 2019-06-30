<template>
    <div class="search">
        <header class="header">
            <span>北京</span>
            <input type="text" placeholder="面试地址">
        </header>
        <ul class="search-list">
            <li>
                <cover-image src="/static/images/location.svg" alt="" class="img"></cover-image>
                <div class="cont">
                    <p class="top">北京八维教育学院</p>
                    <p class="bottom">北京市海淀区唐家岭路57号(近上地西街)</p>
                </div>
            </li>
            <li>
                <cover-image src="/static/images/location.svg" alt="" class="img"></cover-image>
                <div class="cont">
                    <p class="top">北京八维教育学院</p>
                    <p class="bottom">北京市海淀区唐家岭路57号(近上地西街)</p>
                </div>
            </li>
            <li>
                <cover-image src="/static/images/location.svg" alt="" class="img"></cover-image>
                <div class="cont">
                    <p class="top">北京八维教育学院</p>
                    <p class="bottom">北京市海淀区唐家岭路57号(近上地西街)</p>
                </div>
            </li>
            <li>
                <cover-image src="/static/images/location.svg" alt="" class="img"></cover-image>
                <div class="cont">
                    <p class="top">北京八维教育学院</p>
                    <p class="bottom">北京市海淀区唐家岭路57号(近上地西街)</p>
                </div>
            </li>
            <li>
                <cover-image src="/static/images/location.svg" alt="" class="img"></cover-image>
                <div class="cont">
                    <p class="top">北京八维教育学院</p>
                    <p class="bottom">北京市海淀区唐家岭路57号(近上地西街)</p>
                </div>
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
