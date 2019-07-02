<template>
  <button open-type="getUserInfo">韩志刚</button>
</template>

<script>
import {login} from "./api";
import { mapMutations } from "vuex";
export default {
  created () {
    // 调用API从本地缓存中获取数据
    /*
     * 平台 api 差异的处理方式:  api 方法统一挂载到 mpvue 名称空间, 平台判断通过 mpvuePlatform 特征字符串
     * 微信：mpvue === wx, mpvuePlatform === 'wx'
     * 头条：mpvue === tt, mpvuePlatform === 'tt'
     * 百度：mpvue === swan, mpvuePlatform === 'swan'
     * 支付宝(蚂蚁)：mpvue === my, mpvuePlatform === 'my'
     */

    // 登录
    wx.login({
      success: async res => {
        const {data}=await login(res);
        console.log('openid...',data);
        this.updateState(data);        
        wx.setStorageSync('openId',data.openid)
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    wx.getSetting({
      success: res => {
        console.log('res....',res)
        // 如果已授权
        if (res.authSetting['scope.userLocation']) {
          wx.getUserInfo();
        } else {
          wx.getSetting({
            success: res => {
              if (!res.authSetting['scope.userLocation']){
                wx.authorize({
                  scope: 'scope.userLocation',
                  success() {
                    wx.getUserInfo();
                  },
                  fail: () => {
                    wx.showModal({
                      title: '亲爱的用户', //提示的标题,
                      content: '同意我们的授权，让我们为你提供更加优质的服务', //提示的内容,
                      showCancel: false, //是否显示取消按钮,
                      confirmText: '去设置', //确定按钮的文字，默认为取消，最多 4 个字符,
                      confirmColor: '#3CC51F',   //确定按钮的文字颜色
                      success: res => {
                        wx.openSetting();
                      }
                    })
                  }
                })
              }
            }
          })        
        }
      }
    })
  },
  methods:{
    ...mapMutations({
      updateState: 'updateState'
    })
  }

}
</script>

<style>
.container {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 200rpx 0;
  box-sizing: border-box;
}
/* this rule will be remove */
* {
  transition: width 2s;
  -moz-transition: width 2s;
  -webkit-transition: width 2s;
  -o-transition: width 2s;
}
page{
  width:100%;
  height:100%;
}
</style>
