<template>
    <qd-dialog
        :title="dialogInfo.title"
        :visible.sync="dialogInfo.visible.show"
        :width="dialogInfo.width"
        className="dialog"
        :bt-loading="dialogInfo.btLoading"
        :nofooter="dialogInfo.footer"
        @handleOk="submitForm"
    >
        <div style="display:flex;width:90%;justify-content: center;margin: 0 auto;flex-wrap: wrap;">
            <!-- 查看 -->
            <div v-if="lookOrChange === 0" class="top">
                <p>出发地：{{ detailItem.start }}</p>
                <p>目的地: {{ detailItem.end }}</p>
            </div>
            <!-- 修改 -->
            <div v-else class="top" style="width:90%;">
                <div class="left ">
                    <p>出发地：</p>
                    <el-input v-model="detailItem.start"></el-input>
                </div>
                <div class="left">
                    <p>目的地：</p>
                    <el-input v-model="detailItem.end"></el-input>
                </div>
            </div>
            <div v-if="lookOrChange === 0" class="top" style="width:80%;justify-content: left;">
                <p style="margin-right:40px">路线名称：{{ detailItem.routename }}</p>
                <p>路线里程(km)：{{ detailItem.route }}</p>
            </div>
            <div v-else>
                <div style="display:flex; align-items: center;margin:0 20px 10px 0">
                    <p>路线名称：</p>
                    <el-input style="width:210px;margin-right:10px" v-model="detailItem.routename"></el-input>
                    <el-button type="primary" size="small" style="margin-right:20px">自动生成</el-button>
                    <p>路线里程(km)：{{ detailItem.route }}</p>
                </div>
            </div>
            <p class="title" v-if="lookOrChange === 1">提示：此里程数据由高德地图提供，存在一定误差，仅供参考。</p>
        </div>
        <slot></slot>
    </qd-dialog>
</template>

<script>
// import drawArea from "../../../../affairs/component/drawArea";
export default {
    // components: {
    //     drawArea,
    // },
    props: {
        dialogInfo: {
            type: Object,
        },
        value: {
            type: Object,
        },
        lookOrChange: {
            type: Number,
            default: 0,
        },
    },
    data() {
        return {
            detailItem: {
                route: "123",
                routename: "123",
                start: "123",
                end: "123",
            },
        };
    },
    mounted() {},
    methods: {
        submitForm() {
            this.dialogInfo.visible.show = false;
            console.log(123);
        },
    },
};
</script>

<style lang="scss">
.top {
    display: flex;
    width: 70%;
    justify-content: space-between;
    margin-bottom: 15px;
    align-items: center;
    .left {
        display: flex;
        align-items: center;
        p {
            white-space: nowrap;
        }
    }
}
.title {
    width: 100%;
    text-align: right;
    margin-top: -5px;
    color: #999999;
}
</style>
