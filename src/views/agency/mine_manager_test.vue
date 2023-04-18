<template>
    <d2-container>
        <div class="Aone-page" style="overflow: auto">
            <p class="" style="color:gray;cursor: pointer;">机构评测 > <span @click="goback2()"> 我的机构 </span> > <span
                    @click="goback()"> 我的评测</span> > <span v-if="sta != 'cha'" style="color:black">开始评测</span> <span
                    v-if="sta == 'cha'" style="color:black">查看评测</span> </p>
            <br />
            <br />
            <div class="heads">
                <p>
                <h1 class="size20_weights ">
                    一个事件
                </h1>
                </p>


                <br />
                <br />

                <p style="color:gray">
                    试卷说明：本次测评共一类大题，40个小题。
                </p>

            </div>
            <br />
            <br />
            <br />
            <div class="body-lefts">
                <div v-for="item in all_sbu">
                    <p class="size20_weights">一. {{ item.name }}</p>
                    <br />
                    <div v-for="(items, index) in item.sub">
                        <p class="size20_weights" style="padding-left:20px">{{ index + 1 }}. {{ items.name }}</p>
                        <div class="flex_center_starts2" v-for="(item_test, tests) in items.sub" style="width: 100%">
                            <p class="size16_weights width60 flex_center_starts2" style="margin-left: 30px">
                                <span style="margin-right: 20px" class="jiaobiao">{{ tests + 1 }}</span> {{
                                        item_test.name
                                }} ({{
                                    item_test.score
                                         }}分)
                            </p>
                            <p>
                                <el-input :disabled="sta=='cha'" v-model="item_test.point" onkeyup="value=value.replace(/[^\d]/g,'') "
                                    @change="change" @blur="change2"
                                    onbeforepaste="clipboardData.setData('text',clipboardData.getData('text').replace(/[^\d]/g,''))"
                                    ID="Text2" NAME="Text2" max="10" placeholder="最大输入分数为10分"></el-input>
                            </p>
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
                    <p>
                    <p v-for="item in all_sbu">
                        <span v-for="(items, index) in item.sub">
                            <p class="size20_weights" style="text-align:left">{{ index + 1 }}. {{ items.name }} <span
                                    class="ends">（共4题，合计40分）</span> </p>

                            <span v-for="(item_test, tests) in items.sub">
                                <span style="margin-left:20px"></span> <span
                                    :class="setClass(item_test.point) ? 'done' : 'doing'">{{ tests + 1 }}</span>
                            </span>
                        </span>
                    </p>
                    </p>
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
    data() {
        return {
            seconds: "",
            warings: false,
            flag: null,
            one: "00", // 时
            two: "00", // 分
            three: "00", // 秒
            abc: 0, // 秒的计数
            cde: 0, // 分的计数
            efg: 0, // 时的计数
            new_time: "",
            all_sbu: [
                {
                    name: "安全事件分析能力",
                    level: 2,
                    sub: [
                        {
                            name: "历史事件溯源能力",
                            level: 3,
                            sub: [
                                {
                                    name: "完成公司、子公司级历史事件溯源机制构建",
                                    level: 4,
                                    id: 13,
                                    score: 10,
                                    points: "",
                                    real_score: 7,
                                },
                                {
                                    name: "完成公司、子公司级历史事件溯源效能考核体系建设",
                                    level: 4,
                                    id: 23,
                                    score: 10,
                                    points: "",
                                },
                                {
                                    name: "完成公司、子公司级历史事件溯源防御韧性建设",
                                    level: 4,
                                    id: 33,
                                    score: 10,
                                    points: "",
                                },
                                {
                                    name: "完成公司、子公司级历史事件溯源业务覆盖程度",
                                    level: 4,
                                    id: 43,
                                    score: 10,
                                    points: "",
                                },
                            ],
                        },
                        {
                            name: "境外服务能力",
                            level: 3,
                            sub: [
                                {
                                    name: "完成公司、子公司级境外服务机制构建",
                                    level: 4,
                                    id: 14,
                                    score: 10,
                                    real_score: 3,
                                    points: "",
                                },
                                {
                                    name: "完成公司、子公司级境外服务效能考核体系建设",
                                    level: 4,
                                    id: 24,
                                    score: 10,
                                    points: "",
                                },
                                {
                                    name: "完成公司、子公司级境外服务防御韧性建设",
                                    level: 4,
                                    id: 34,
                                    score: 10,
                                    points: "",
                                },
                                {
                                    name: "完成公司、子公司级境外服务业务覆盖程度",
                                    level: 4,
                                    id: 44,
                                    score: 10,
                                    points: "",
                                },
                            ],
                        },
                        {
                            name: "省域安全建设能力",
                            level: 3,
                            sub: [
                                {
                                    name: "完成公司、子公司级省域安全建设机制构建",
                                    level: 4,
                                    id: 15,
                                    score: 10,
                                    real_score: 4,
                                    points: "",
                                },
                                {
                                    name: "完成公司、子公司级省域安全建设效能考核体系建设",
                                    level: 4,
                                    id: 25,
                                    score: 10,
                                    points: "",
                                },
                                {
                                    name: "完成公司、子公司级省域安全建设防御韧性建设",
                                    level: 4,
                                    id: 35,
                                    score: 10,
                                    points: "",
                                },
                                {
                                    name: "完成公司、子公司级省域安全建设业务覆盖程度",
                                    level: 4,
                                    id: 45,
                                    score: 10,
                                    points: "",
                                },
                            ],
                        },
                        {
                            name: "热点事件跟踪能力",
                            level: 3,
                            sub: [
                                {
                                    name: "完成公司、子公司级热点事件跟踪机制构建",
                                    level: 4,
                                    id: 16,
                                    score: 10,
                                    real_score: 5,
                                    points: "",
                                },
                                {
                                    name: "完成公司、子公司级热点事件跟踪效能考核体系建设",
                                    level: 4,
                                    id: 26,
                                    score: 10,
                                    points: "",
                                },
                                {
                                    name: "完成公司、子公司级热点事件跟踪防御韧性建设",
                                    level: 4,
                                    id: 36,
                                    score: 10,
                                    points: "",
                                },
                                {
                                    name: "完成公司、子公司级热点事件跟踪业务覆盖程度",
                                    level: 4,
                                    id: 46,
                                    score: 10,
                                    points: "",
                                },
                            ],
                        },
                        {
                            name: "未来趋势研判能力",
                            level: 3,
                            sub: [
                                {
                                    name: "完成公司、子公司级未来趋势研判机制构建",
                                    level: 4,
                                    id: 17,
                                    score: 10,
                                    real_score: 10,
                                    points: "",
                                },
                                {
                                    name: "完成公司、子公司级未来趋势研判效能考核体系建设",
                                    level: 4,
                                    id: 27,
                                    score: 10,
                                    points: "",
                                },
                                {
                                    name: "完成公司、子公司级未来趋势研判防御韧性建设",
                                    level: 4,
                                    id: 37,
                                    score: 10,
                                    points: "",
                                },
                                {
                                    name: "完成公司、子公司级未来趋势研判业务覆盖程度",
                                    level: 4,
                                    id: 47,
                                    score: 10,
                                    points: "",
                                },
                            ],
                        },
                        {
                            name: "高级理念构建能力",
                            level: 3,
                            sub: [
                                {
                                    name: "完成公司、子公司级高级理念迭代机制构建",
                                    level: 4,
                                    id: 18,
                                    score: 10,
                                    points: "",
                                    real_score: 8,
                                },
                                {
                                    name: "完成公司、子公司级高级理念迭代效能考核体系建设",
                                    level: 4,
                                    id: 28,
                                    points: "",
                                    score: 10,
                                },
                                {
                                    name: "完成公司、子公司级高级理念迭代防御韧性建设",
                                    level: 4,
                                    id: 38,
                                    points: "",
                                    score: 10,
                                },
                                {
                                    name: "完成公司、子公司级高级理念迭代业务覆盖程度",
                                    level: 4,
                                    id: 48,
                                    points: "",
                                    score: 10,
                                },
                            ],
                        },
                        {
                            name: "关键人物理论挖掘、追溯能力",
                            level: 3,
                            sub: [
                                {
                                    name: "完成公司、子公司关键人物理论挖掘、追溯机制构建",
                                    level: 4,
                                    id: 19,
                                    score: 10,
                                    points: "",
                                    real_score: 7,
                                },
                                {
                                    name: "完成公司、子公司关键人物理论挖掘、追溯效能考核体系建设",
                                    level: 4,
                                    id: 29,
                                    points: "",
                                    score: 10,
                                },
                                {
                                    name: "完成公司、子公司关键人物理论挖掘、追溯防御韧性建设",
                                    level: 4,
                                    id: 39,
                                    points: "",
                                    score: 10,
                                },
                                {
                                    name: "完成公司、子公司关键人物理论挖掘、追溯业务覆盖程度",
                                    level: 4,
                                    id: 49,
                                    points: "",
                                    score: 10,
                                },
                            ],
                        },
                        {
                            name: "其他行业辐射影响力",
                            level: 3,
                            sub: [
                                {
                                    name: "完成公司、子公司跨行业辐射影响力机制构建",
                                    level: 4,
                                    id: 20,
                                    score: 10,
                                    points: "",
                                    real_score: 6,
                                },
                                {
                                    name: "完成公司、子公司跨行业辐射影响力效能考核体系建设",
                                    level: 4,
                                    id: 30,
                                    points: "",
                                    score: 10,
                                },
                                {
                                    name: "完成公司、子公司跨行业辐射影响力防御韧性建设",
                                    level: 4,
                                    id: 40,
                                    points: "",
                                    score: 10,
                                },
                                {
                                    name: "完成公司、子公司跨行业辐射影响力业务覆盖程度",
                                    level: 4,
                                    id: 50,
                                    points: "",
                                    score: 10,
                                },
                            ],
                        },
                        {
                            name: "重点企业辐射影响力",
                            level: 3,
                            sub: [
                                {
                                    name: "完成公司、子公司重点企业辐射影响力机制构建",
                                    level: 4,
                                    id: 21,
                                    score: 10,
                                    points: "",
                                    real_score: 9,
                                },
                                {
                                    name: "完成公司、子公司重点企业辐射影响力效能考核体系建设",
                                    level: 4,
                                    id: 31,
                                    points: "",
                                    score: 10,
                                },
                                {
                                    name: "完成公司、子公司重点企业辐射影响力防御韧性建设",
                                    level: 4,
                                    id: 41,
                                    points: "",
                                    score: 10,
                                },
                                {
                                    name: "完成公司、子公司重点企业辐射影响力业务覆盖程度",
                                    level: 4,
                                    id: 51,
                                    points: "",
                                    score: 10,
                                },
                            ],
                        },
                        {
                            name: "基于事件的技术迭代能力",
                            level: 3,
                            sub: [
                                {
                                    name: "完成公司、子公司基于事件的技术迭代机制构建",
                                    level: 4,
                                    id: 22,
                                    score: 10,
                                    points: "",
                                    real_score: 2,
                                },
                                {
                                    name: "完成公司、子公司基于事件的技术迭代效能考核体系建设",
                                    level: 4,
                                    id: 32,
                                    points: "",
                                    score: 10,
                                },
                                {
                                    name: "完成公司、子公司基于事件的技术迭代防御韧性建设",
                                    level: 4,
                                    id: 42,
                                    points: "",
                                    score: 10,
                                },
                                {
                                    name: "完成公司、子公司基于事件的技术迭代业务覆盖程度",
                                    level: 4,
                                    id: 52,
                                    points: "",
                                    score: 10,
                                },
                            ],
                        },
                    ],
                },
            ],
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
            sta: ""
        };
    },
    created() {
        this.startHandler();
        this.sta = this.$route.query.sta
        let send = {
            agency_id: this.$route.query.agency_id,
            target_id: this.$route.query.target_id,
        };
        if (this.sta == 'cha') {
            target(send).then((res) => {
                this.seconds = res.data.use_time
                this.all_sbu = res.data.target_info.sub;
                this.all_sbu.map(e => {
                    e.sub.map(ee => {
                        ee.sub.map(eee => {
                            eee.point = eee.real_score
                        })
                    })
                })
            });
        } else {
            target(send).then((res) => {
                this.all_sbu = res.data.target_info.sub;
            });
        }
    },

    methods: {
        goback() {
            this.$router.push({
                path: '/agency/mine_manager', 
                query: { id: this.$route.query.agency_id }
            })
        },
        goback2() {
            this.$router.go(-2);
        },
        //  秒数转化为时分秒
        formatSeconds(value) {
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
        startHandler() {
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
        endHandler() {
            this.flag = clearInterval(this.flag);
        },
        go_points() {
            this.endHandler();
            this.new_time = this.miao;
            let new_list = this.all_sbu[0].sub;
            let new_list2 = [];
            new_list.map((e) => {
                if (e.sub.length > 0) {
                    e.sub.map((ee) => {
                        new_list2.push({ target_id: ee.id, score: ee.point });
                    });
                }
            });
            new_list2.map((e) => {
                e.score = parseInt(e.score);
            });
            let abc = {
                agency_id: this.$route.query.agency_id,
                use_time: this.new_time,
                target_list: new_list2,
                target_id: this.$route.query.target_id,
                ti :"1"
                
            };
            this.bianli(abc.target_list);
            if (this.shangwei) {
                this.$message.warning("尚未完成全部评测题目！");
            } else {
                target2(abc).then((res) => {
                    if (res.code == 200) {
                        this.$message.success(res.message);
                        this.$router.push({
                            path: "/agency/end",
                            query: {
                                agency_id: this.$route.query.agency_id,
                                target_id: this.$route.query.target_id,
                                ti:1
                            },
                        });
                    } else {
                        this.$message.warning(res.message);
                    }
                });
            }
        },
        go_points2() {
            this.$router.push({
                path: "/agency/mine_manager_test",
                query: {
                    agency_id: this.$route.query.agency_id,
                    target_id: this.$route.query.target_id,
                    sta: 's'
                },
            });
        },
        bianli(x) {
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
        setClass(x) {
            if (x != "") {
                return true;
            } else {
                return false;
            }
        },
        change(x) {
            if (x > 10) {
                this.$message.warning("最多10分");
                x = "";
            }
        },
        change2(x) {
            if (x > 10) {
                this.$message.warning("最多10分");
                x = "";
            }
        },
        onlyNumber(obj) {
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
            //   this.reallyId = item.id;
            //   this.reallyState = item.state;
        },
        //关闭菜单
        closeMenu() {
            this.visible = false; //关闭菜单
        },
    },
  
    watch: {
        //   监听属性对象，newValue为新的值，也就是改变后的值
        warings(newValue, oldValue) {
            if (newValue) {
                this.$message.waring("请完整答题！");
                return false;
            } else {
                // 移除body上添加的事件处理程序
            }
        },
        $route(to, from) {
    //   this.queryInfo = to.query;
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

.tuli {
    width: 14px;
    height: 14px;
    display: inline-block;
    background: #00B2B0;
}

.tuli2 {
    color: black;
    font-size: 16px;
    margin-right: 10px;
}
</style>
