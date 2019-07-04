<template>
  <div class="home">
    <div class="map">
      <QQMap></QQMap>
      <cover-view class="icon-btn">       
        <cover-image src="/static/images/location.png" alt="" class="img-btn"></cover-image>
        <cover-image src="/static/images/my.png" alt="" class="img-btn myBtn" @click="goMyFn"></cover-image>
      </cover-view>
    </div>   
    <button @click="addSign" class="btn">添加面试</button>
    <button open-type="getUserInfo" @getuserinfo="getUserInfo" v-if="userInfoFlag" class="userBtn">获取用户信息</button>
  </div>
</template>

<script>
import QQMap from "@/components/qqMap.vue";
export default {
  data () {
    return {
      userInfoFlag: false
    }
  },

  components: {
    QQMap
  },

  methods: {
    addSign(){
      wx.navigateTo({
        url: '/pages/add/main'
      }) 
    },
    goMyFn(){
      wx.navigateTo({
        url: '/pages/my/main'
      })
    },
    getUserInfo(e){
      let that = this;
      console.log('info...e...',e);
      if(e.target.errMsg != "getUserInfo:fail auth deny"){
        that.userInfoFlag = false;
         wx.showToast({
          title: '获取信息成功', 
        });
      }else{
        wx.showModal({
          title: '亲爱的用户', //提示的标题,
          content: '同意我们的授权，让我们为你提供更加优质的服务', //提示的内容,
          showCancel: false, //是否显示取消按钮,
          confirmText: '去设置', //确定按钮的文字，默认为取消，最多 4 个字符,
          confirmColor: '#3CC51F',   //确定按钮的文字颜色
          success: res => {
            wx.openSetting({
              success:()=>{
                that.getSetting();
              }
            });            
          }
        })
      }
    },
    // 判断是否有用户信息 userLocation
    getSetting(){
      let that = this;
      wx.getSetting({
        success: res => {
          console.log('res....',res);
          if (res.authSetting['scope.userInfo']) {
            that.userInfoFlag = false;
          } else {
            that.userInfoFlag = true;
          }
          if (!res.authSetting['scope.userLocation']) {
            
            wx.authorize({
                scope: 'scope.userLocation',
                success() {
                  console.log('success')
                },
                fail: (err) => {
                  console.log("err***",err)
                   wx.showModal({
                    title: '亲爱的用户', //提示的标题,
                    content: '同意我们的授权，让我们为你提供更加优质的服务', //提示的内容,
                    showCancel: false, //是否显示取消按钮,
                    confirmText: '去设置', //确定按钮的文字，默认为取消，最多 4 个字符,
                    confirmColor: '#3CC51F',   //确定按钮的文字颜色
                    success: res => {
                      wx.openSetting({
                        success:()=>{
                          that.getSetting();
                        }
                      });            
                    }
                  })
                }
            })
          }
        },  
        
      })
    }
  },
  created(){
    this.getSetting();
  }
}
</script>

<style scoped>
page{
  width:100%;
  height:100%;
}
.home{
  width:100%;
  height:100%;
  display: flex;
  flex-direction: column;  
}
.map{
  width:100%;
  flex:1;
  position: relative;
}
.btn{
  width:100%;
  height:100rpx;
  background:#000;
  color:#fff;
  font-weight:500;
  font-size:40rpx;
  border-radius: 0;
}
.icon-btn{
  width: 100%;
  height: 80rpx;
  position: absolute;
  bottom: 50rpx;
  left:0;
  display: flex;
  justify-content: space-between;
  padding:0 20rpx;
  box-sizing: border-box;
  z-index: 99;
}
.icon-btn .img-btn{
  width:80rpx;
  height:80rpx;
}
.myBtn{
  background: #000;
  border-radius:50%;
}
.userBtn{
  position: fixed;
  top:0;
  left:0;
  width:100%;
  height:100%;
  z-index: 999;
  opacity: 0;
}
</style>
