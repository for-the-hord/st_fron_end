<template>
    <d2-container>
        <div class="Aone-page">
            <br />
            <br />
            <div>
                <div class="mine-head">
                    <div class="main">
                        <p>
                        <h1 class="scores weights">
                            {{ result.score }} <span class="normals">分</span>
                        </h1>
                        <p style="color:#000000;margin-top:20px">完成时间：{{ getTime(result.updated) }}</p>
                        </p>

                        <div class="main-body  flex_center_around">

                            <div class="lefts">
                                <p style="float:left" class="weights">评分详情</p>
                                <br />
                                <br />
                                <br />
                                <div class="lefts-div flex_center_around">
                                    <div class="divs">
                                        <p class="scores_div weights">
                                            {{ result.zero_trust_score }}
                                        </p>
                                        <p>零信任评分</p>
                                    </div>
                                    <div class="divs">
                                        <p class="scores_div weights">
                                            {{ result.zero_loss_score }}
                                        </p>
                                        <p>零损失评分</p>
                                    </div>
                                    <div class="divs">
                                        <p class="scores_div weights">
                                            {{ result.zero_fault_score }}
                                        </p>
                                        <p>零事故评分</p>
                                    </div>

                                    <div class="divs">
                                        <p class="scores_div weights">
                                            {{ result.zero_peril_score }}
                                        </p>
                                        <p>零隐患评分</p>
                                    </div>


                                </div>
                                <br />
                                <br />
                                <br />
                                <p style="float:left" class="weights">其他</p>
                                <br />
                                <br />
                                <br />
                                <div class="lefts-div flex_center_around">
                                    <div class="divs2 flex_center_around">
                                        <div>
                                            <img src="/image/AOne/pai.png" alt="">
                                        </div>
                                        <div class="">

                                            <p>当前排名</p>
                                            <br />

                                            <p class="  weights">
                                                {{ result.rank }}
                                            </p>
                                        </div>

                                    </div>
                                    <div class="divs2 flex_center_around pointer">
                                        <div>
                                            <img src="/image/AOne/xie.png" alt="">
                                        </div>
                                        <div @click="go_cha()" class="" style="text-align:left">

                                            <p>查看评测</p>
                                            <br />
                                            <p style="color:gray">
                                                查看作答记录
                                            </p>
                                        </div>

                                    </div>



                                </div>

                            </div>

                            <div class="rights">
                                <p class="weights" style="text-align:left">评测雷达图</p>
                                <div class="leida">

                                    <qdLeida2 v-if="zhen" :activity="result"></qdLeida2>
                                </div>

                            </div>

                        </div>

                        <el-button type="primary_test" @click="go_back()">
                            重新评测
                        </el-button>
                        <el-button @click="go_back2()">
                            返回
                        </el-button>
                    </div>
                </div>
            </div>
        </div>
    </d2-container>
</template>

<script>
import { score } from "./big.js";
export default {
    name: "mine",
    data() {
        return {
            result: {
                id: 1,
                agency_id: 1, //机构id
                target_id: 1, //评测id
                score: 77.5, //韧性得分(综合得分)
                zero_trust_score: 76, //零信任得分
                zero_fault_score: 68, //零事故得分
                zero_peril_score: 87, //零隐患得分
                zero_loss_score: 73, //零损失得分
                updated: 1667804793, //完成时间
                rank: 7, //排名
            },
            zhen: false,

            //   右键
            visible: false,
            top: 0,
            left: 0,
            //   右键
        };
    },
    created() {
        score({
            agency_id: this.$route.query.agency_id,
            target_id: this.$route.query.target_id,
        }).then((res) => {
            this.result.score = res.data.score;
            this.result.zero_fault_score = res.data.zero_fault_score;
            this.result.zero_loss_score = res.data.zero_loss_score;
            this.result.zero_peril_score = res.data.zero_peril_score;
            this.result.zero_trust_score = res.data.zero_trust_score;
            this.result.rank = res.data.rank;
            this.zhen = true;
        });
    },
    watch: {},
    methods: {
        go_cha() {
            if (this.$route.query.ti == 1) {
                this.$router.push({
                    path: "/agency/mine_manager_test",
                    query: {
                        agency_id: this.$route.query.agency_id,
                        target_id: this.$route.query.target_id,
                        sta: 'cha'
                    }
                });
            }
            if (this.$route.query.ti == 2) {
                this.$router.push({
                    path: "/agency/mine_manager_test2",
                    query: {
                        agency_id: this.$route.query.agency_id,
                        target_id: this.$route.query.target_id, 
                        sta: 'cha'
                    }
                });
            }

        },
        go_back() {
            if (this.$route.query.ti == 1) {
                this.$router.push({
                    path: "/agency/mine_manager_test",
                    query: {
                        agency_id: this.$route.query.agency_id,
                        target_id: this.$route.query.target_id,
                        sta: 's'
                    }
                })
            }
            if (this.$route.query.ti == 2) {
                this.$router.push({
                    path: "/agency/mine_manager_test2",
                    query: {
                        agency_id: this.$route.query.agency_id,
                        target_id: this.$route.query.target_id,
                        sta: 's'
                    }
                })
            }
        },

        go_back2() {
            this.$router.push({
                path: "/agency/mine_manager",
                query: { id: this.$route.query.agency_id }
            });
        },
        getTime(nS) {
            var date = new Date(parseInt(nS) * 1000);
            var year = date.getFullYear();
            var mon = date.getMonth() + 1;
            var day = date.getDate();
            if (mon.toString().length == 1) {
                mon = "0" + mon;
            } else {
                mon = mon;
            }
            if (day.toString().length == 1) {
                day = "0" + day;
            } else {
                day = day;
            }
            return year + "-" + mon + "-" + day + " ";
        },
        test_s(x) {
            this.$router.push({
                path: "/agency/mine_manager",
                query: { send: x },
            });
        },
        go_any() {
            this.$router.push({
                path: "/agency/mine/add",
            });
        },
        //右击
        openMenu(e, item) {
            var x = e.pageX; //这个应该是相对于整个浏览器页面的x坐标，左上角为坐标原点（0,0）
            var y = e.pageY; //这个应该是相对于整个浏览器页面的y坐标，左上角为坐标原点（0,0）
            this.top = y;
            this.left = x;
            this.visible = true; //显示菜单
        },
        //关闭菜单
        closeMenu() {
            this.visible = false; //关闭菜单
        },
    },
};
</script>

<style lang="scss" scoped>
.leida {
    width: 100%;
    height: 300px;
}

.divs2 {
    width: 180px;
    height: 66px;
    background: #fff;
    border-radius: 4px;
    padding: 20px;
}

.lefts {
    width: 60%;
}

.rights {
    width: 40%;
}

.scores_div {
    color: #00b2b0;
    font-size: 32px;
    margin-bottom: 20px;
    text-align: center;
}

.divs {
    text-align: center;
}

.main-body {
    width: 100%;
    background: #f6f7fb;
    // border: 1px solid gray;
    border-radius: 4px;
    margin: 40px auto;
    padding: 20px;
}

.main {
    width: 80%;
    margin: 20px auto;
    text-align: center;
}

.scores {
    font-size: 42px;
    color: red;
}

.normals {
    font-size: 14px;
    font-weight: normal;
}

.renzheng {
    width: 80%;
    text-align: center;
    margin: 100px auto;
}

.contextmenu {
    margin: 0;
    background: #fff;
    z-index: 3000;
    position: fixed; //关键样式设置固定定位
    list-style-type: none;
    padding: 5px 0;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 400;
    color: #333;
    box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.3);
}

.contextmenu li {
    margin: 0;
    padding: 7px 16px;
    cursor: pointer;
}

.contextmenu li:hover {
    background: #eee;
}

.context_li i {
    margin-right: 4px;
}

.context_li {
    width: 50px;
    text-align: center;
}

.info-p {
    height: 30px;
    line-height: 30px;
    padding: 0 10px 0 10px;
}

.info-left {
    float: left;
}

.info-right {
    float: right;
    color: #8f90a6;
}

.yihe {
    display: inline-block;
    padding: 4px;
    border: 1px solid #00b2b0;
    color: #00b2b0;
    background: #e2ffff;
    font-size: 13px;
}

.yice {
    display: inline-block;
    padding: 4px;
    border: 1px solid #0080ff;
    color: #0080ff;
    background: #e5f0ff;
    font-size: 13px;
}

.heing {
    display: inline-block;
    padding: 4px;
    border: 1px solid #daab04;
    color: #daab04;
    background: #fff9c8;
    font-size: 13px;
}

.heerror {
    display: inline-block;
    padding: 4px;
    border: 1px solid #ff3d00;
    color: #ff3d00;
    background: #ffe8e0;
    font-size: 13px;
}

.test {
    height: 40px;
    position: relative;
    padding: 0 10px 0 10px;
}

.mine-head {
    width: 80%;
    height: 700px;
    margin: 30px auto;
    background: #fff;
    border: 1px solid #e8e8e8;
}

.company_add {
    width: 280px;
    height: 360px;
    text-align: center;
    background: #fff;
    border-radius: 4px;
}

.company_head {
    background: url("/image/AOne/company.png") no-repeat center;
    font-size: 20px;
    font-weight: bold;
    color: #fff;
    height: 120px;
}

.item-head {
    width: 200px;
    height: 84px;
    // border: 1px solid gray;
    border-radius: 4px;
    background: #f5f7fa;
}

.names {
    color: #909399;
    font-size: 14px;
}

.nums {
    font-size: 20px;
    font-weight: bold;
    color: black;
    margin-top: 5px;
}

.imgs {
    position: absolute;
    right: 20px;
    top: -20px;
    background: url("/image/AOne/pointer_fenshu.png") no-repeat;
    width: 47px;
    height: 47px;
    color: #7f4215;
    font-weight: bold;
    font-size: 14px;
    text-align: center;
    line-height: 43px;
}
</style>
