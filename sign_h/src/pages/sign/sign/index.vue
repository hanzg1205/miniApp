<template>
    <div class="home">
        <div class="map">
            <QQMap></QQMap> 
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
        
        }
    },

    components: {
        QQMap
    },
    computed: {
        ...mapState({
            info: state => state.signList.signDetail
        })
    },
    methods: {
        ...mapActions({
            updateDetail: 'signList/updateDetail'
        }),
        async goSign(){
            let result = await this.updateDetail({
                id: this.info.id,
                params: {
                    status: 0,
                    sign_time: +new Date()
                }
            })
            console.log('result...',result)
            if(result.code === 0){
                wx.showToast({
                    title: '打卡成功', 
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
