<template>
    <d2-container>
        <div class="Aone-page" style="overflow: auto">
            <p class="" style="color:gray;cursor: pointer;">机构评测 > <span @click="goback2()"> 我的机构 </span> > <span
                    @click="goback()"> 我的评测</span> > <span style="color:black">开始评测</span> </p>
            <br />
            <br />
            <div class="heads">
                <p>
                <h1 class="size20_weights ">
                    两个事件
                </h1>
                </p>


                <br />
                <br />

                <p style="color:gray">
                    试卷说明：本次测评共一类大题，{{ total_count }}个小题。
                </p>

            </div>
            <br />
            <br />
            <br />
            <div class="body-lefts">
                <div v-for="(item2, level2) in all_sbu">
                    <p class="size20_weights"> <span class="dabiaoti">{{ level2 + 1 }}</span> - {{ item2.name }}</p>
                    <div v-for="(item3, level3) in item2.sub">
                        <p class="size20_weights padding_left20">{{ level2 + 1 }}-{{ level3 + 1 }}、 {{ item3.name }}</p>

                        <div v-for="(item4, level4) in item3.sub">

                            <p class="size20_weights padding_left40">{{ level2 + 1 }}-{{ level3 + 1 }}-{{ level4 + 1 }}、 {{ item4.name
                            }}
                            </p>
                            <div v-for="(item5, level5) in item4.sub">

                                <div v-if="item5.is_select">
                                    <!-- 这里是单选题 -->
                                    <el-radio class="new_radio2" v-model="item4.point" :label="item5.score"> {{
                                            item5.name
                                    }}
                                        （{{ item5.score }}分 ）</el-radio>
                                </div>
                                <div v-if="!item5.is_select" class="flex_center_around">
                                    <!-- 这里是输入题 -->
                                    <p class="size16_weights width60 flex_center_starts2" style="margin-left: 30px">
                                        <span style="margin-right: 20px" class="jiaobiao"> {{ level5 + 1 }}</span> {{
                                                item5.name
                                        }} ({{
                                                    item5.score
                                            }}分)
                                    </p>
                                    <el-input :disabled="sta == 'cha'" style="width:30%" v-model="item5.point"
                                        onkeyup="value=value.replace(/[^\d]/g,'') " @change="change" @blur="change2"
                                        onbeforepaste="clipboardData.setData('text',clipboardData.getData('text').replace(/[^\d]/g,''))"
                                        ID="Text2" NAME="Text2" max="10"
                                        :placeholder="'最大输入分数为' + `${item5.score}` + '分'"></el-input>
                                </div>


                            </div>
                        </div>



                    </div>
                </div>

                <br />
                <br />
                <br />
            </div>
            <div class="body-rights">
                <div class="dati">
                    <p class="flex_center_starts2">
                        <img src="/image/AOne/dao.png" alt="">
                        <span v-if="sta == 'cha'">评测用时</span>
                        <span v-else>计时</span>
                    </p>
                    <br />
                    <br />
                    <span class="times" v-if="sta == 'cha' && seconds">
                        {{ formatSeconds(seconds) }}
                    </span>

                    <span v-else class="times">
                        {{ one }}<span>:</span>
                        {{ two }}<span>:</span>
                        {{ three }}
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

                    <div v-for="(item2, index2) in all_sbu">
                        <!-- 1 -->
                        <div v-for="(item3, index3) in item2.sub">
                            <!-- 3 -->
                            <div v-for="(item4, index4) in item3.sub">
                                <p class="size20_weights" style="text-align:left">
                                    {{ index2 + 1 }}-{{ index3 + 1 }}-{{ index4 + 1 }}. {{ item4.name }}
                                    <!-- <span class="ends">（共{{item4.sub.length}}题）</span>  -->
                                </p>

                                <div v-show="item4.is_select">
                                    <span style="margin-left:20px"> <span
                                            :class="setClass(item4.point) ? 'done' : 'doing'">1</span></span>
                                </div>


                                <div v-show="!item4.is_select" class="flex_center_starts2">
                                    <span v-for="(item_test, tests) in item4.sub">
                                        <span style="margin-left:20px"></span> <span
                                            :class="setClass(item_test.point) ? 'done' : 'doing'">{{ tests + 1 }}</span>
                                    </span>
                                </div>

                            </div>
                        </div>
                    </div>

                    <br />

                    <p style="width:100%;border:1px solid #E8E8E8"></p>

                    <p class="flex_center_starts2" style="text-align:left;margin-top: 20px;width: 60%;">
                        <span class="tuli"></span>
                        <span class=" tuli2">已答</span>
                        <span class="tuli" style="background:white;  border: 1px solid #E8E8E8;"></span>
                        <span class="tuli2">未做</span>
                    </p>

                    <br />
                    <br />
                    <p class="flex_center_center" style="text-align:center">
                        <el-button @click="go_points()" v-if="sta != 'cha'" type="primary_test">提交试卷</el-button>
                        <el-button @click="go_points2()" v-if="sta == 'cha'" type="primary_test">重新评测</el-button>

                    </p>
                </div>

            </div>
        </div>
    </d2-container>
</template>
  
<script>
import { target, target2 } from "./big.js";
export default {
    name: "mine",
    inject: ["routerRefresh"],

    data () {
        return {
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
            head_list: [
                { name: "认证机构总数", num: "", src: "/image/AOne/count.png" },
                { name: "已通过审核", num: "", src: "/image/AOne/ok.png" },
                { name: "审核中", num: "", src: "/image/AOne/ing.png" },
                { name: "审核未通过", num: "", src: "/image/AOne/rejucet.png" },
            ],
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
        };
    },
    created () {
        this.startHandler();
        this.sta = this.$route.query.sta;
        if (this.sta == "cha") {
            target({
                agency_id: this.$route.query.agency_id,
                target_id: this.$route.query.target_id,
            }).then((res) => {
                this.seconds = res.data.use_time;
                this.all_sbu = res.data.target_info.sub;
                this.total_count = res.data.total_count
                this.all_sbu.map((e) => {
                    e.sub.map((ee) => {
                        ee.sub.map((eee) => {
                            if (eee.is_select) {
                                eee.point = eee.real_score;
                            }
                            if (!eee.is_select) {
                                eee.sub.map((e4) => {
                                    e4.point = e4.real_score;
                                });
                            }
                        });
                    });
                });
            });
        } else {
            target({
                agency_id: this.$route.query.agency_id,
                target_id: this.$route.query.target_id,
            }).then((res) => {
                this.all_sbu = res.data.target_info.sub;
                this.total_count = res.data.total_count
            });
        }
    },

    methods: {
        //  秒数转化为时分秒
        formatSeconds (value) {
            //  秒
            let second = parseInt(value)
            //  分
            let minute = 0
            //  小时
            let hour = 0
            //  天
            //  let day = 0
            //  如果秒数大于60，将秒数转换成整数
            if (second > 60) {
                //  获取分钟，除以60取整数，得到整数分钟
                minute = parseInt(second / 60)
                //  获取秒数，秒数取佘，得到整数秒数
                second = parseInt(second % 60)
                //  如果分钟大于60，将分钟转换成小时
                if (minute > 60) {
                    //  获取小时，获取分钟除以60，得到整数小时
                    hour = parseInt(minute / 60)
                    //  获取小时后取佘的分，获取分钟除以60取佘的分
                    minute = parseInt(minute % 60)
                    //  如果小时大于24，将小时转换成天
                    //  if (hour > 23) {
                    //    //  获取天数，获取小时除以24，得到整天数
                    //    day = parseInt(hour / 24)
                    //    //  获取天数后取余的小时，获取小时除以24取余的小时
                    //    hour = parseInt(hour % 24)
                    //  }
                }
            }

            let result = '' + parseInt(second) + ' 秒 '
            if (minute > 0) {
                result = '' + parseInt(minute) + ' 分 ' + result
            }
            if (hour > 0) {
                result = '' + parseInt(hour) + ' 小时 ' + result
            }
            return result
        },
        goback () {
            this.$router.push({
                path: "/agency/mine_manager",
                query: { id: this.$route.query.agency_id },
            });
        },
        goback2 () {
            this.$router.go(-2);
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
            let new_list3 = [];
            this.all_sbu.map((e) => {
                e.sub.map((ee) => {
                    ee.sub.map((eee) => {
                        if (eee.is_select) {
                            new_list3.push({ target_id: eee.id, score: eee.point });
                        }
                        if (!eee.is_select) {
                            eee.sub.map((e4) => {
                                new_list3.push({
                                    target_id: e4.id,
                                    score: e4.point,
                                });
                            });
                        }
                    });
                });
            });
            new_list3.map((e) => {
                e.score = parseInt(e.score);
            });
            let abcd = {
                agency_id: this.$route.query.agency_id,
                use_time: this.new_time,
                target_list: new_list3,
                target_id: this.$route.query.target_id,
            };
            this.bianli(abcd.target_list);
            if (this.shangwei) {
                new_list3.map((e) => {
                    if (!e.score) {
                        e.score = "";
                    }
                });
                this.$message.warning("尚未完成全部评测题目！");
                return false;
            } else {
                target2(abcd).then((res) => {
                    if (res.code == 200) {
                        this.$message.success(res.message);
                        this.$router.push({
                            path: "/agency/end",
                            query: {
                                agency_id: this.$route.query.agency_id,
                                target_id: this.$route.query.target_id,
                                ti:2
                            },
                        });
                    } else {
                        this.$message.warning(res.message);
                    }
                });
            }
        },
        go_points2 () {
            this.$router.push({
                path: "/agency/mine_manager_test2",
                query: {
                    agency_id: this.$route.query.agency_id,
                    target_id: this.$route.query.target_id,
                },
            });
        },
        bianli (x) {
            x.map((e) => {
                if (!e.score) {
                    // this.$message.waring('请完整答题！')
                    this.shangwei = true;
                }
                if (e.score == NaN) {
                    // this.$message.waring('请完整答题！')
                    this.shangwei = true;
                }
                if (e.score) {
                    this.shangwei = false;
                }
            });
        },
        setClass (x) {
            if (x != "") {
                return true;
            } else {
                return false;
            }
        },
        change (x) {
            if (x > 10) {
                this.$message.warning("最多10分");
                x = "";
            }
        },
        change2 (x) {
            if (x > 10) {
                this.$message.warning("最多10分");
                x = "";
            }
        },
        onlyNumber (obj) {
            // 得到第一个字符是否为负号
            var t = obj.value.charAt(0);
            //先把非数字的都替换掉，除了数字和.
            obj.value = obj.value.replace(/[^\d\.]/g, "");
            //必须保证第一个为数字而不是.
            obj.value = obj.value.replace(/^\./g, "");
            //保证只有出现一个.而没有多个.
            obj.value = obj.value.replace(/\.{2,}/g, ".");
            //保证.只出现一次，而不能出现两次以上
            obj.value = obj.value
                .replace(".", "$#$")
                .replace(/\./g, "")
                .replace("$#$", ".");
            //如果第一位是负号，则允许添加
            if (t > 10) {
                alert("10");
            }
            if (t == "-") {
                obj.value = "-" + obj.value;
            }
        },
        starts (x) {
            let send = {
                agency_id: this.$route.query.agency_id,
                target_id: this.$route.query.target_id,
            };
            target(send).then((res) => {
                this.all_sbu = res.target_info.sub;
            });
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
        go_any () {
            this.$router.push({
                path: "/agency/mine/add",
            });
        },
        //右击
        openMenu (e, item) {
            var x = e.pageX; //这个应该是相对于整个浏览器页面的x坐标，左上角为坐标原点（0,0）
            var y = e.pageY; //这个应该是相对于整个浏览器页面的y坐标，左上角为坐标原点（0,0）
            this.top = y;
            this.left = x;
            this.visible = true; //显示菜单
        },
        //关闭菜单
        closeMenu () {
            this.visible = false; //关闭菜单
        },
    },
    watch: {
        //   监听属性对象，newValue为新的值，也就是改变后的值
        warings (newValue, oldValue) {
            if (newValue) {
                this.$message.waring("请完整答题！");
                return false;
            } else {
                // 移除body上添加的事件处理程序
            }
        },
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
    background: #00b2b0;
    margin: 10px;
}

.doing {
    display: inline-block;
    padding: 6px 9px 6px 9px;
    color: black;
    background: #fff;
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
    background: #00b2b0;
}

.tuli2 {
    color: black;
    font-size: 16px;
    margin-right: 10px;
}

.new_radio2 {
    width: 100%;
    margin: 20px;
    font-weight: bold;
    font-size: 20px;
    margin-left: 40px;
}
.padding_left20 {
    padding-left: 10px;
}

.padding_left40 {
    padding-left: 30px;
}
</style>

