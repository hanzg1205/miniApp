<template>
    <div class="add">
        <form @submit="submit" report-submit="true">
            <h5 class="title">面试信息</h5>
            <ul class="content">
                <li>
                    <span>公司名称</span>
                    <input type="text" placeholder="请输入公司名称" v-model="addInfo.company">
                </li>
                <li>
                    <span>公司电话</span>
                    <input type="text" placeholder="请输入面试人联系电话" v-model="addInfo.phone">
                </li>
                <li>
                    <span>面试时间</span>
                    <picker 
                        mode="multiSelector" 
                        :range="dateRange"
                        :value="info.date" 
                        @change="bindDateChange"
                        @columnchange="columnChange"
                    >
                        {{dateShow}}
                    </picker>
                    <icon
                        @click="showToast"
                        class="tip"
                        type="warn"
                        color="#197DBF"
                        size="20">
                    </icon>
                </li>
                <li @click="goSearch">
                    <span>面试地址</span>
                    <input type="text" disabled placeholder="请选择面试地址" v-model="addInfo.address.address">
                </li>
            </ul>           
            <h5 class="title">备注信息</h5>
            <textarea class="textarea" placeholder="备注信息(可选，100个字以内)"></textarea>
            <button :class="btnEnable?'': 'disable'" form-type="submit">确认</button>
        </form>
    </div>
</template>

<script>
import moment from "moment";
import { mapState, mapActions, mapMutations } from 'vuex';

const range = [
    [0,1,2,3,4,5,6,7,8,9],
    [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23],
    ['00分','10分','20分','30分','40分','50分']
];
export default {
    data(){
        return {
            info: {
                date: [0,0,0],
            },
            btnFlag: false
        }
    },
    created(){
        // 如果当前时间是十一点之后，过滤掉今天
        if (moment().hour() == 23){
            this.info.date = [1,0,0];
        }
    },
    methods: {
        ...mapActions({
            submitAddInfo: 'addSign/submit'
        }),
        ...mapMutations({
            initAddInfo: 'addSign/initAddInfo'
        }),
        showToast(){
            wx.showToast({
                title: '在面试前一个小时我们会通知你哦',
                icon: 'none',
                duration: 2000
            })
        },
        // 去添加地址页
        goSearch(){
            wx.navigateTo({
                url: '/pages/search/main'
            })
        },
        // bindDateChange: function(e) {
        //     console.log(e.target);
        //     this.info.date = e.target.value;
        // },
        // 监听多列选择器每列变化
        columnChange(e){
            let {column, value} = e.target;       
            let date = [...this.info.date];
            date[column] = value;
            this.info.date = date;
        },
        // 提交信息
        async submit(e){     
            // 判断是否在提交状态(防止一直点提交)
            if (this.submiting){
                return false;
            }     
            // 判断公司名称是否为空
            if(!this.addInfo.company){
                wx.showToast({
                    title: '请输入公司名称',
                    icon: 'none',
                });
                return false;
            }
            // 判断手机号是否符合规范
            if (!/^1(3|4|5|7|8)\d{9}$/.test(this.addInfo.phone) || !/^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/.test(this.addInfo.phone)){
                wx.showToast({
                    title: '请输入正确的手机号或座机号',
                    icon: 'none',
                });
                return false;
            }
            // 判断面试地址
            if(!this.addInfo.address.address){
                wx.showToast({
                    title: '请选择公司地址',
                    icon: 'none',
                });
                return false;
            }
            // 添加时间戳
            this.addInfo.start_time = moment(this.dateShow).unix()*1000;
            console.log('addInfo...',this.addInfo);
            // 获取form_id
            this.addInfo.form_id = e.target.formId;
            this.submiting = true;
            let data = await this.submitAddInfo(this.addInfo);
            this.submiting = false;
            console.log('data...',data);
            // 处理添加结果
            if (data.code == 0){
                wx.showModal({
                    title: '温馨提示', //提示的标题,
                    content: data.msg, //提示的内容,
                    showCancel: false,
                    confirmText: '确定', //确定按钮的文字，默认为取消，最多 4 个字符,
                    confirmColor: '#197DBF', //确定按钮的文字颜色,
                    success: res => {
                        if (res.confirm) {
                            this.initAddInfo({
                                company: '', // 公司名称
                                phone: '', // 电话
                                start_time: '', // 时间
                                address: '', // 地址
                                description: '' // 备注
                            });
                            wx.navigateTo({ url: '/pages/list/main' });
                        }
                    }
                });
            }else{
                wx.showToast({
                    title: data.msg, //提示的内容,
                    icon: 'fail'//图标,
                });
            }
        }
    },
    computed: {
        ...mapState({
            addInfo: state => state.addSign.addInfo
        }),
        // 处理面试日期
        dateRange(){
            let dateRange = [...range];
            // 如果时间是今天，过滤掉现在之前的小时
            if (!this.info.date[0]){
                dateRange[1] = dateRange[1].filter(item=>{
                return item>moment().hour();
                })
            }
            // 格式化小时
            dateRange[1] = dateRange[1].map(item=>{
                return item + '点'
            })
            // 计算当前日期之后的十天
            dateRange[0] = dateRange[0].map(item=>{
                return moment().add(item, 'days').date() + '号'
            })
            return dateRange;
        },
        // 显示的日期
        dateShow(){
            return moment()
            .add(moment().hour()==23?this.info.date[0]-1:this.info.date[0], 'd')
            .add(this.info.date[0] ? this.info.date[1] - moment().hour() : this.info.date[1]+1, 'h')
            .minute(this.info.date[2]*10)
            .format('YYYY-MM-DD HH:mm');
        },

        btnEnable(){
            // console.log('addInfo...',this.addInfo);
            // 判断公司名称是否为空
            if(!this.addInfo.company){
                return false;
            }
            // 判断手机号是否符合规范
            if (!/^1(3|4|5|7|8)\d{9}$/.test(this.addInfo.phone) || !/^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/.test(this.addInfo.phone)){
                return false;
            }
            // 判断面试地址
            if(!this.addInfo.address){
                return false;
            }
            return true;
        }
    }
}
</script>

<style>
    .title{
        font-size:34rpx;
        padding:15rpx 0 15rpx 30rpx;
        background:#f6f6f6;
    }
    .content{
        background: #fff;
        border-top:1rpx solid #eee;
        border-bottom:1rpx solid #eee;
    }
    .content li{
        width:720rpx;
        height:88rpx;
        margin-left:30rpx;
        border-bottom:1rpx solid #eee;
        display:flex;
        align-items:center;
        justify-content:space-between;

    }
    .content li:last-child{
        border-bottom: 0;
    }
    .content li span{
        color:#666;
        width:170rpx;
        font-size:30rpx;
    }
    .content li input,.content li picker{
        flex:1;
        font-size:30rpx;
        color:#333;
        height:88rpx;
        overflow:hidden;
        white-space:nowrap;
        text-overflow:ellipsis;
        padding-right:30rpx;
        line-height:88rpx;
    }
    .content li .tip{
        margin-right:20rpx;
    }
    .textarea{
        font-size:30rpx;
        color:#333;
        width:690rpx;
        height:200rpx;
        margin:30rpx;
        box-sizing:border-box;
        padding:10rpx;
        border:1rpx solid silver;
        border-radius:5rpx;
    }
    button{
        width:100%;
        height:100rpx;
        background:#999;
        color:#fff;
        font-weight:500;
        font-size:40rpx;
        border-radius: 0;
        margin-top:50rpx;
        background: #197DBF;
    }
    button.disable{
        background: #999;
    }
</style>
