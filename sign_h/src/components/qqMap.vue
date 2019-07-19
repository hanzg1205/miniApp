<template>
<div class="map">
    <map 
        id="map" 
        :longitude="location.longitude"
        :latitude="location.latitude"
        subkey="X7RBZ-MMOKR-UQEWJ-WSCXC-IVXVK-IFFLL"
        show-location
        show-compass
        :circles="circle"
        :include-points="points"
        :markers="markers"
        @markertap="markertap"
        @regionchange="regionChange"     
        style="width: 100%; height: 100%;">
    </map>

    <cover-view class="icon-btn">
        <cover-image src="/static/images/location.png" alt="" class="img-btn"  @click="goCurrent"></cover-image>
    </cover-view>
</div>
    
</template>

<script>
// import QQMapWX from "@/utils/qqmap-wx-jssdk.min";
import { mapState, mapActions } from 'vuex';
import {getLocation,getAuth} from '@/utils/index.js'
import getDistance from '@/utils/distance.js';

export default {
    data(){
        return {
            // 用户当前位置
            location: {
                latitude: 40.03298,
                longitude: 116.29891
            },
            distance: 0  
        }
    },
     watch: {
        reLocation(){
            // 检测重新定位当前位置
            this.goCurrent();
        }
    },
    props: {
        markers: {
            type: Array,
            default: []
        },
        markertap: {
            type: Function,
            default: ()=>{}
        },
        reginonChange: {
            type: Function,
            default: ()=>{}
        },
        reLocation: {
            type: Boolean,
            default: false
        },
        updateDistance: {
            type: Function,
            default: ()=>{}
        }
    },
    computed: {
        // ...mapState({
        //     longitude: state => state.index.longitude,
        //     latitude: state => state.index.latitude 
        // }),
        points(){
            return [this.location, ...this.markers]
        },
        circle(){
            if (!this.markers.length){
                return []
            }else{
                return [{
                    ...this.markers[0],
                    color:  this.distance>100?'#C9394A': '#c30',
                    fillColor: 'rgba(255,255,255,0)',
                    radius: 100,
                    strokeWidth: 1 
                }]
            }
        }
    },
    methods: {
        // ...mapActions({
        //     getLocation: 'index/getLocation'
        // }),
        goCurrent(){
            getAuth('scope.userLocation', async ()=>{
                let location = await getLocation();
                this.location = location;

                console.log('scope.userLocation...', this.location, this.markers[0]);
                // 重新计算距离
                if (this.updateDistance){
                    this.distance = getDistance(this.location.latitude, this.location.longitude, this.markers[0].latitude, this.markers[0].longitude)
                    this.updateDistance(this.distance)
                }
            })
        }
    },
    created(){
        // this.getLocation();
    },
    mounted() {
        this.goCurrent();
        console.log('circle',this.circle)
    },
}
</script>

<style scoped>
    .map{
        width:100%;
        height:100%;
    }
    .icon-btn{
        width:80rpx;
        height:80rpx;
        position: absolute;
        bottom: 50rpx;
        left:20rpx;
        z-index: 99;
    }
    .img-btn{
        width:80rpx;
        height:80rpx;
    }
</style>
