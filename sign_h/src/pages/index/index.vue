<template>
  <div class="home">
    <div class="map">
      <QQMap></QQMap>
      <div class="icon-btn">
        <img src="/static/images/location.png" alt="">
        <img src="/static/images/my.png" alt="" class="myBtn" @click="goMyFn">
      </div>
    </div>   
    <button @click="addSign" class="btn">添加面试</button>
  </div>
</template>

<script>
import QQMap from "@/components/qqMap.vue";
export default {
  data () {
    return {
     
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
    }
  },

  created () {
    // let app = getApp()
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
  z-index: 999;
}
.icon-btn img{
  width:80rpx;
  height:80rpx;
}
.myBtn{
  background: #000;
  border-radius:50%;
}
</style>
