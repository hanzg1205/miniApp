<template>
    <div class="home">
        <div class="map">
            <QQMap :markers="markers" :updateDistance="updateDistance"></QQMap> 
        </div>
        <button @click="goSign" class="btn">打卡</button>
    </div>
</template>

<script>
import QQMap from "@/components/qqMap.vue";
import { mapState, mapActions } from 'vuex';
export default {
    data () {
        return {
            distance: 0
        }
    },

    components: {
        QQMap
    },
    computed: {
        ...mapState({
            info: state => state.signList.signDetail
        }),
        markers(){
            if (this.info && Object.keys(this.info)){
                return [{
                    iconPath: '/static/images/job.png',
                    latitude: this.info.latitude,
                    longitude: this.info.longitude,
                    title: this.info.company,
                    width: 20,
                    height: 20
                }]
            }else{
                return []
            }
        }
    },
    methods: {
        ...mapActions({
            updateDetail: 'signList/updateDetail'
        }),
        updateDistance(distance){
            console.log('distance...', distance);
            this.distance = distance;
        },
        async goSign(){
            let distance = this.distance;
            if (this.distance < 100){
                let result = await this.updateDetail({
                    id: this.info.id,
                    params: {
                        status: 0,
                        sign_time: +new Date()
                    }
                })
                console.log('result...', result);
                wx.showToast({
                    title: '打卡成功', //提示的内容,
                    icon: 'none' //图标,
                });
            }else{
                if (this.distance > 1000){
                    distance = (this.distance/1000).toFixed(2)+'公里'
                }else{
                    distance = this.distance+'米'
                }
                console.log('distance...', distance, this.distance);
                wx.showToast({
                    title: `你距目的地还有${distance},暂时还不能打卡`, //提示的内容
                    icon: 'none'
                });
            }
        },
        
    },
    onShow(){
        // 修改标题
        wx.setNavigationBarTitle({ title: '打卡: '+ this.info.company });
    },
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

</style>
