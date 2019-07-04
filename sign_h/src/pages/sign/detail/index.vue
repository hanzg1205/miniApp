<template>
    <div class="detail">
        <ul class="detail-list">
            <li>
                <label for="true">面试地址：</label>
                <span>{{detailList.address&&detailList.address.address}}</span>
            </li>
            <li>
                <label for="true">面试时间：</label>
                <span>{{detailList.start_time}}</span>
            </li>
            <li>
                <label for="true">联系方式：</label>
                <span>{{detailList.phone}}</span>
            </li>
            <li>
                <label for="true">是否提醒</label>
                <span>{{detailList.remind ? '未提醒' : '已提醒'}}</span>
            </li>
            <li>
                <label for="true">面试状态：</label>
                <span>{{detailList.status ? detailList.status === -1 ? '未开始' : '已放弃' : '已打卡'}}</span>
            </li>
            <li v-if="detailList.status === -1">
                <label for="true">取消提醒：</label>
                <switch :checked="detailList.remind === 1" @change="cancelRemind" />
            </li>
        </ul>
        <section class="action" v-if="detailList.status === -1">
            <button @click="goSign">去打卡</button>
            <button @click="giveup">放弃面试</button>
        </section>
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
export default {
    data(){
        return {
            
        }
    },
    onLoad(options){
        // 获取id
        this.id = options.id;       
    },
    async onShow(){
        // 获取详情数据
        await this.getDetail(this.id)
    },
    methods: {
        ...mapActions({
            getDetail: 'signList/getDetail'
        }),
        ...mapActions({
            updateDetail: 'signList/updateDetail'
        }),
        cancelRemind(e){
            // 取消提醒
            this.updateDetail({
                id: this.id,
                params: { remind: e.target.value ? 1 : -1 }
            })
        },
        giveup(){
            // 放弃面试
            wx.showModal({
                title: '温馨提示', 
                content: '确定要放弃本次面试吗?',
                success: async res => {
                    if (res.confirm) {
                        await this.updateDetail({
                            id: this.id,
                            params: { status: 1 }
                        })
                    }
                }
            });
        },
        goSign(){
            // 跳打卡页面
            wx.navigateTo({
                url: '/pages/sign/sign/main'
            }) 
        }
    },
    computed: {
        ...mapState({
            detailList: state => state.signList.signDetail
        })
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
    .detail-list li span,.detail-list li switch{
        flex:1;
        font-size:30rpx;
        color:#333;
        padding-right:30rpx;
        box-sizing:border-box;
    }
    .action{
        display: flex;
        margin: 50rpx 15rpx;   
    }
    .action button{
        flex: 1;
        color: #fff;
        margin: 15rpx;
    }
    .action button:first-child{
        background: #197DBF;
    }
    .action button:last-child{
        background: #DC4E42;
    }
</style>
