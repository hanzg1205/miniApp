<template>
    <map 
      id="map" 
      :longitude="longitude" 
      :latitude="latitude" 
      scale="14"  
      subkey="X7RBZ-MMOKR-UQEWJ-WSCXC-IVXVK-IFFLL"
      show-location 
      style="width: 100%; height: 100%;">
    </map>
</template>

<script>
import QQMapWX from "@/utils/qqmap-wx-jssdk.min";
import { mapState, mapActions } from 'vuex';

export default {
    // data(){
    //     return {
    //         longitude: 113.3245211,
    //         latitude: 23.10229 
    //     }
    // },
    computed: {
        ...mapState({
            longitude: state => state.index.longitude,
            latitude: state => state.index.latitude 
        })
    },
    methods: {
        ...mapActions({
            getLocation: 'index/getLocation'
        })
    },
    created(){
        let qqMapSdk = new QQMapWX({
            key: 'X7RBZ-MMOKR-UQEWJ-WSCXC-IVXVK-IFFLL'
        });
        // let that = this;
        // wx.getLocation({
        //     type: 'wgs84',
        //     success (res) {
        //         console.log('res...', res);
        //         that.latitude = res.latitude
        //         that.longitude = res.longitude
        //         const speed = res.speed
        //         const accuracy = res.accuracy
        //     }
        // })
        this.getLocation();
    }
}
</script>

<style>

</style>
