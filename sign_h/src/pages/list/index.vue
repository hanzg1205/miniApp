<template>
    <div class="list">
        <nav class="nav">
            <span v-for='(item,index) in navList' 
                :key="index" 
                :class='index===idx ? "active" : ""'
                @click="()=>navTab(index)">{{item.name}}</span>
        </nav>
        <div class="content">当前分类还没有面试</div>
    </div>
</template>

<script>
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
    methods: {
        navTab(index){
            console.log(index)
            this.idx = index;
        }
    }
}
</script>

<style scoped>
    .nav{
        display: flex;
        justify-content: space-around;
        height: 88rpx;
        line-height: 88rpx;
        border-top:3rpx solid #eee;
    }
    .active{
        color:#197dbf;
        font-weight:500;
        border-bottom:3rpx solid #197dbf;
    }
</style>
