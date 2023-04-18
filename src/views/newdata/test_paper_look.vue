<template>
    <d2-container>
        <div class="Aone-page" style="overflow: auto">
            <p class="" style="color:gray;cursor: pointer;">等级考试 > <span @click="goback2()"> {{lastTitle}} </span> >
                <span style="color:black">评测详情</span>
            </p>
            <br />
            <br />
            <div class="heads">
                <p>
                <h1 class="size20_weights ">
                    {{ name }}
                </h1>
                <br/>
                </p>
                <p style="color:gray">
                    试卷说明：
                    该考试单选题{{ single_num }}个共{{ single_num }}分，多选题{{ multi_num }}个共{{ multi_score }}分，判断题{{ judge_num
                    }}个共{{ judge_score }}分，总分为{{score}}分。
                </p>

            </div>
            <br />
            <br />
            <br />
            <div class="body-lefts">
                <div v-for="(item, index) in all_question">
                    <p class="size18_weights"> <span class="dabiaoti">{{ index + 1 }}. {{ item.question.content
                    }}</span>
                    </p>
                    <!-- <div v-if="item.type == 1"> -->
                    <div v-for="(item2, index2) in item.question.options">
                        <div v-if="item.question.type == 1">
                            <el-radio class="new_radio2" v-model="item.record.answer[0]" :label="item2.option" disabled>{{
                                  item2.option+'.'+     item2.content
                            }}
                            </el-radio>
                        </div>
                        <div v-if="item.question.type == 2">
                            <el-checkbox class="new_radio2" v-model="item.record.answer" :label="item2.option" disabled>{{
                                   item2.option+'.'+    item2.content
                            }}
                            </el-checkbox>
                        </div>
                        <div v-if="item.question.type == 3">
                            <el-radio class="new_radio2" v-model="item.record.answer[0]" :label="(item2)" disabled>  
                            </el-radio>
                        </div>
                    </div>
                    <div v-if="(item.question.type == 1 &&  item.record.is_right==0)">
                        <span class="wrongs">
                            答错了
                        </span>
                        <p class="rights_p">
                            题目答案为：<span class="">{{item.question.answer[0]}}</span>
                        </p>
                    </div>
                    <div v-if="(item.question.type == 2 &&  item.record.is_right==0)">
                        <span class="wrongs">
                            答错了
                        </span>
                        <p class="rights_p">
                            题目答案为：<span v-for="item2 in item.question.answer" class="">{{item2}}</span>
                        </p>
                    </div>
                    <div v-if="(item.question.type == 3 &&  item.record.is_right==0)">
                        <span class="wrongs">
                            答错了
                        </span>
                        <p class="rights_p">
                            题目答案为：<span class="" v-if=" item.question.answer[0]=='True'">正确</span>
                            <span class="" v-if=" item.question.answer[0]=='False'">错误</span>
                        </p>
                    </div>
                  <el-divider></el-divider >
                </div>
            </div>
            <div class="body-rights">
                <div class="dati">
                    <p class="flex_center_starts2">
                        <img src="/image/AOne/dao.png" alt="">
                        <span  >评测用时</span>
                     </p>
                    <br />
                    <br />
                    <span class="times"  >
                        {{ used_time }}
                    </span>





                </div>
                <br />
                <br />
                <br />
                <div class="dati">
                    <p class="flex_center_starts2">
                        <img src="/image/AOne/tests.png" alt="">
                        <span>答题卡</span>
                    </p>
                    <br />
                    <br />
                    <div>
                        <span v-for="(item, index) in all_question" style="margin-left:20px"> <span
                                :class="setClass(item.record.is_right==1) ? 'done' : 'doing'" style="width:30px">{{ index + 1
                                }}</span></span>

                    </div>


                    <br />

                    <p style="width:100%;border:1px solid #E8E8E8"></p>

                    <p class="flex_center_starts2" style="text-align:left;margin-top: 20px;width: 60%;">
                        <span class="tuli"></span>
                        <span class=" tuli2">正确</span>
                        <span class="tuli" style="background:red;  border: 1px solid #E8E8E8;"></span>
                        <span class="tuli2">错误</span>
                    </p>

                    <br />
                    <br />
                    <p class="flex_center_center" style="text-align:center">
                        <el-button @click="go_left()"  type="primary_test">返回</el-button>

                    </p>
                </div>

            </div>
        </div>
    </d2-container>
</template>

<script>
import {
    get_look,
    postpaper,
} from "./big.js";
export default {
    name: "mine",
    inject: ["routerRefresh"],

    data () {
        return {
            data_id: "",
            paperId: "",
            lastTitle: "",
            total_count: "",
            warings: false,
            flag: null,
            one: "00", // 时
            two: "00", // 分
            three: "00", // 秒
            abc: 0, // 秒的计数
            cde: 0, // 分的计数
            efg: 0, // 时的计数
            new_time: "",
            all_sbu: [],
            ins: {},
            next: true,
            body_list: [],
            miao: 0,
            //   右键
            visible: false,
            top: 0,
            left: 0,
            //   右键
            shangwei: false,
            sta: "",
            seconds: "",

            name: "",
            details: "",
            score: 0,
          single_num: 0,
          single_score: 0,
          multi_num: 0,
          multi_score: 0,
          judge_num: 0,
          judge_score: 0,
            all_question: [],
            used_time:""
        };
    },
    created () {
      this.startHandler();
      this.sta = this.$route.query.sta;
      this.lastTitle = this.$route.query.title;
      this.getPaperQuestion();
    },

    methods: {
        // danduluokkh
        go_left(){
         this.$router.go(-1)
        },
        getPaperQuestion () {
            this.paperId = this.$route.query.exam_id;
            get_look(this.paperId).then((res) => {
                console.log(res, "22");
                if (res.code == 200) {
                  this.details = res.data.details;
                  this.name = res.data.name;
                  this.used_time = res.data.used_time;
                  this.single_num = res.data.single_num;
                  this.single_score = res.data.single_score;
                  this.multi_num = res.data.multi_num;
                  this.multi_score = res.data.multi_score;
                  this.judge_num = res.data.judge_num;
                  this.judge_score = res.data.judge_score;
                  this.score = res.data.paper_score;
                    var abc = res.data.details;
                    abc.map((e) => {
                        if (e.question.type == 1) {
                            e.point = [];
                        }
                        if (e.question.type == 2) {
                            e.point = [];
                        }
                        if (e.question.type == 3) {
                            e.point = [];
                            e.question.options = ["正确", "错误"];
                            if (e.record.answer[0] == "True") {
                                e.record.answer[0] = "正确";
                            }
                            if (e.record.answer[0] == "False") {
                                e.record.answer[0] = "错误";
                            }
                        }
                    });

                    this.all_question = abc;
                    console.log(this.all_question, "all_question");

                    //  bject.keys(dataList).forEach(item => {
                    //      console.log(item) // 索引
                    //      dataList[item].editable = false
                    // })
                } else {
                    this.$message.error("系统异常");
                }
            });
        },
        //  秒数转化为时分秒
        formatSeconds (value) {
            //  秒
            let second = parseInt(value);
            //  分
            let minute = 0;
            //  小时
            let hour = 0;
            //  天
            //  let day = 0
            //  如果秒数大于60，将秒数转换成整数
            if (second > 60) {
                //  获取分钟，除以60取整数，得到整数分钟
                minute = parseInt(second / 60);
                //  获取秒数，秒数取佘，得到整数秒数
                second = parseInt(second % 60);
                //  如果分钟大于60，将分钟转换成小时
                if (minute > 60) {
                    //  获取小时，获取分钟除以60，得到整数小时
                    hour = parseInt(minute / 60);
                    //  获取小时后取佘的分，获取分钟除以60取佘的分
                    minute = parseInt(minute % 60);
                    //  如果小时大于24，将小时转换成天
                    //  if (hour > 23) {
                    //    //  获取天数，获取小时除以24，得到整天数
                    //    day = parseInt(hour / 24)
                    //    //  获取天数后取余的小时，获取小时除以24取余的小时
                    //    hour = parseInt(hour % 24)
                    //  }
                }
            }

            let result = "" + parseInt(second) + " 秒 ";
            if (minute > 0) {
                result = "" + parseInt(minute) + " 分 " + result;
            }
            if (hour > 0) {
                result = "" + parseInt(hour) + " 小时 " + result;
            }
            return result;
        },
        goback2 () {
            this.$router.go(-1);
        },
        startHandler () {
            this.flag = setInterval(() => {
                let count = 0;
                count = count + 1;
                this.miao += 1;

                if (this.three === 60 || this.three === "60") {
                    this.three = "00";
                    this.abc = 0;
                    if (this.two === 60 || this.two === "60") {
                        this.two = "00";
                        this.cde = 0;
                        if (this.efg + 1 <= 9) {
                            this.efg++;
                            this.one = "0" + this.efg;
                        } else {
                            this.efg++;
                            this.one = this.efg;
                        }
                    } else {
                        if (this.cde + 1 <= 9) {
                            this.cde++;
                            this.two = "0" + this.cde;
                        } else {
                            this.cde++;
                            this.two = this.cde;
                        }
                    }
                } else {
                    if (this.abc + 1 <= 9) {
                        this.abc++;
                        this.three = "0" + this.abc;
                    } else {
                        this.abc++;
                        this.three = this.abc;
                    }
                }
            }, 1000);
        },
        // 暂停计时
        endHandler () {
            this.flag = clearInterval(this.flag);
        },
        go_points () {
            this.endHandler();
            this.new_time = this.miao;
            console.log(this.all_question, "90");
            // if (this.all_question.some((item) => item.ponit.length == 0)) {
            //     this.$message.warning("尚未完成全部评测题目！");

            // }
            let records = [];
            this.all_question.map((e) => {
                if (e.point) {
                    records.push({ question_id: e.question.id, answer: [e.point] });
                }
            });
            records.map((e) => {
                e.answer = e.answer.flat();
            });
            console.log(records);
            console.log(records);
            if (!this.bianli(records)) {
                this.$message.warning("尚未完成全部评测题目！3秒后请重新作答");
                setTimeout(() => {
                    // this.$router.go(0)
                }, 3000);
            } else {
                postpaper(this.data_id, { records: records }).then((res) => {
                    if (res.code == 200) {
                        this.$message.success(res.message);
                        this.$router.push({
                            path: "/exam/mine/end",
                            query: {
                                exam_id: this.data_id,
                                paper_id: this.paperId,
                            },
                        });
                    } else {
                        this.$message.warning(res.message);
                    }
                });
            }
        },

        bianli (x) {
            x.some((item) => {
                item.answer.length == 0;
            });
        },
        setClass (x) {
            if (x != "") {
                return true;
            } else {
                return false;
            }
        },

        getTime (nS) {
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
    },
    watch: {
        $route (to, from) {
            this.routerRefresh();
        },
    },
};
</script>

<style lang="scss" scoped>
.heads {
    width: 93%;
    background: #fff;
    padding: 36px;
    border-radius: 4px;
    border: 1px solid #e8e8e8;
}

.times {
    color: #00b2b0;
    font-weight: bold;
    font-size: 24px;
    display: inline-block;
    margin: 0 auto;
}

.dati {
    background: #fff;
    padding: 20px;
    border-radius: 4px;
    border: 1px solid #e8e8e8;
    text-align: center;
}

.done {
    display: inline-block;
    padding: 6px 9px 6px 9px;
    color: #fff;
    background: #FFCC54;
    margin: 10px;
}

.doing {
    display: inline-block;
    padding: 6px 9px 6px 9px;
    color: white;
    background:  red;
    margin: 10px;
    border: 1px solid #e8e8e8;
}

.jiaobiao {
    display: inline-block;
    padding: 6px 9px 6px 9px;
    color: white;
    background: #009bb6;
}

.fots {
    margin-top: 10px;
}

.leida {
    width: 100%;
    height: 200px;
}

.renzheng {
    width: 80%;
    text-align: center;
    margin: 100px auto;
}

.rights-tt {
    color: #101010;
    font-size: 16px;
    margin: 20px auto;
}

.rights-cc {
    color: #8f90a6;
    font-size: 16px;
    margin: 15px auto;
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
    margin: 10px auto;
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
}

.mine-head {
    width: 80%;
    height: 140px;
    margin: 30px auto;
    background: #fff;
    border: 1px solid #e8e8e8;
}

.body-lefts {
    width: 65%;
    overflow: hidden;
    margin: 0 auto;
    float: left;
    background: #fff;
    border: 1px solid #e8e8e8;
    border-radius: 4px;
    padding: 20px;
}

.body-rights {
    float: left;
    width: 25%;
    margin-left: 5%;
    //   background: #fff;
    border-radius: 4px;

    .rights-info {
        padding: 20px;
        background: #fff;
    }

    //   padding: 20px;
}

.mine-body {
    width: 100%;
    overflow: hidden;
    margin: 0 auto;
}

.company_add {
    width: 280px;
    height: 280px;
    text-align: center;
    background: #fff;
    border-radius: 4px;
}

.company_head {
    background: url("/image/AOne/test.png") no-repeat center;
    font-size: 20px;
    font-weight: bold;
    color: #fff;
    height: 120px;
    position: relative;
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
    font-size: 16px;
    text-align: center;
    line-height: 43px;
}

.status_add {
    position: absolute;
    width: 70px;
    height: 28px;
    text-align: center;
    line-height: 28px;
    color: white;
    border-radius: 0 0 0 4px;
    right: 0;
    top: 0;
    font-size: 14px;
}

.s1 {
    background: red;
}

.s2 {
    background: #00b2b0;
}

.s3 {
    background: #8f8f8f;
}

.width60 {
    width: 60%;
}

input[type="number"] {
    appearance: textfield;
}

input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
    appearance: none;
    margin: 0;
}

.ends {
    color: gray;
    font-size: 13px;
}

.ends {
    color: gray;
    font-size: 13px;
}

.tuli {
    width: 14px;
    height: 14px;
    display: inline-block;
    background: #FFCC54;
}

.tuli2 {
    color: black;
    font-size: 16px;
    margin-right: 10px;
}

.padding_left20 {
    padding-left: 10px;
}

.padding_left40 {
    padding-left: 30px;
}

.new_radio2 {
    width: 100%;
    margin: 10px;
    font-weight: bold;
    font-size: 14px;
    margin-left: 40px;
    word-break: break-all;
    word-wrap: break-word;
}
.wrongs{
    padding: 8px 6px 8px 6px ;
    background: red;
    color: white;
    display: inline-block;
    margin: 20px;
}
.rights_p{
    background: #F1F1F1;
    padding: 8px;
    // margin: 10px;
    margin-bottom: -10px;
}
.el-radio__input.is-checked+.el-radio__label{
  color: red !important;
}
</style>

