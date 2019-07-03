<template>
    <div class="list">
        <nav class="nav">
            <span v-for='(item,index) in navList' 
                :key="index" 
                :class='index===idx ? "active" : ""'
                @click="()=>navTab(item.id)">{{item.name}}</span>
        </nav>
        <div class="content">
            <SignList :options="signList"></SignList>
        </div>
    </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import SignList from "@/components/signList.vue";
export default {
    data(){
        return {
            navList: [
                {id: 0, name: '未开始'},
                {id: 1, name: '已打卡'},
                {id: 2, name: '已放弃'},
                {id: 3, name: '全部'}
            ],
            idx: 0
        }
    },
    components:{
        SignList
    },
    computed:{
        ...mapState({
            signList: state => state.signList.signList
        })
    },
    methods: {
        ...mapActions({
            getList: 'signList/getList'
        }), 
        navTab(index){
            this.idx = index;
            if(index === 3){
                this.getList()
            }else{
                this.getList({status:index-1})
            }
        },     
    },
    onShow(){
        this.getList({status:-1})  
    }
}
</script>

<style scoped>
    .list{
        width:100%;
        height:100%;
        display: flex;
        flex-direction: column;
        overflow: hidden;
    }
    .nav{
        display: flex;
        justify-content: space-around;
        height: 88rpx;
        line-height: 88rpx;
        border-top:3rpx solid #eee;
    }
    .content{
        flex:1;
        overflow-y: auto;      
    }
    .active{
        color:#197dbf;
        font-weight:500;
        border-bottom:3rpx solid #197dbf;
    }
</style>
