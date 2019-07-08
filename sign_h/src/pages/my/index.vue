<template>
    <div class="my">
        <div class="header">
            <div class="avator">
                <img src="/static/images/my.png" alt="">
            </div>
            <h4 class="title">{{formatPhone}}</h4>
        </div>
        <ul class="my-list">
            <li @click="goListFn" class="top">
                <icon
                    class="tip"
                    type="waiting"
                    color="#10AEFF"
                    size="18">
                </icon>
                <span>我的面试</span>
                <image src="/static/images/arrow.svg" alt=""></image>
            </li>
            <li>
                <button open-type="contact" class="concat">
                    <icon type="info" size="18px" class="tip"/>
                    <span>客服中心</span>
                    <image src="/static/images/arrow.svg"></image>
                </button>
            </li>
        </ul>
        <div class="phone" v-if="showPhoneDialog" >
            <p>为了更好的使用我们的服务，我们需要获取你的手机号码</p>
            <button open-type="getPhoneNumber" @getphonenumber="getPhoneNumber">同意</button>
        </div>
        <!-- <button open-type="getPhoneNumber" v-if="!hasPhone" @getphonenumber="getPhoneNumber">获取手机号</button> -->
        <!-- <button open-type="openSetting" v-if="showSetting">打开授权设置页</button> -->
    </div>
</template>

<script>
import { encryptData } from "@/api";
export default {
    data(){
        return {
            showSetting: false,
            hasPhone: false,
            phoneNumber: '***********',
            showPhoneDialog: true
        }
    },
    computed: {
        formatPhone(){
            let phone = this.phoneNumber;
            if (phone){
                return phone.slice(0,3)+'****'+phone.slice(7,11)
            }else{
                return '***********'
            }
        }
    },
    methods: {
        goListFn(){
            wx.navigateTo({
                url: '/pages/list/main'
            })  
        },
        async getPhoneNumber(e){
            console.log('ee...',e)
            if(e.target.errMsg != "getPhoneNumber:fail user deny"){
                let data = await encryptData({
                    encryptedData: e.target.encryptedData,
                    iv: e.target.iv
                })
                this.phoneNumber = data.data.phoneNumber;
                console.log('getPhoneNumber...',data);
                this.showPhoneDialog = false;
                if (data.data.phoneNumber){
                    wx.showToast({
                    title: '绑定手机号成功', 
                    });
                }else{
                    wx.showToast({
                    title: '绑定手机号失败',
                    });
                }
            }else{
                this.showSetting = true;
            }
        }
    },
    created(){
        let that = this;
        wx.getSetting({
            success(res){
                console.log('auth....',res.authSetting)
                if(res.authSetting['scope.userInfo']){
                    wx.getUserInfo({
                        withCredentials: true,
                        success(res){
                            that.hasPhone = true;
                        }
                    })
                }else{
                    that.hasPhone = false;
                }
            }
        })
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
        height: 100rpx;
        display:flex;
        align-items:center;
        justify-content:space-between;
        box-sizing:border-box;
        padding:0 40rpx;
        border-bottom:1rpx solid #eee;
    }
    .my-list li button{
        width:100%;
        height: 100%;
        display:flex;
        align-items:center;
        justify-content:space-between;
        box-sizing:border-box;
        background: #fff;
        border:0;
        padding:0;
        outline: 0;
        text-align: left;
        font-size: 18px;
    }
    .my-list li button::after {
        border: none
    }
    .my-list li image{
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
    .phone{
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0, .3);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;       
    }
    .phone p{
        border-top-left-radius: 20rpx;
        border-top-right-radius: 20rpx;
        width:70%;
        background:#fff;
        padding:20rpx 15rpx;
        line-height: 1.5;
        font-size:34rpx;
        box-sizing:border-box;
    }
    .phone button{
        width: 70%;
        background: #197DBF;
        color: #fff;
        border-bottom-left-radius: 20rpx;
        border-bottom-right-radius: 20rpx;
    }
</style>
