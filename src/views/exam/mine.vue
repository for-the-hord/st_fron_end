<template>
    <d2-container>
        <div class="Aone-page">
            <div style="width:1500px;overflow: auto;">
                <div class="mine-body flex_center_starts2">
                    <div class="company_add pointer" v-for="item in body_list">
                        <div class="company_head flex_center_around" @contextmenu.prevent="openMenu($event, item)">
                            {{ item.name }}
                            <!-- "state": 3 //考核状态：1-待考核，2-考核中，3-已完成
 -->
                            <span class="spans wait" v-if="item.state == 1">待开始</span>
                            <span class="spans ing" v-if="item.state == 2">进行中</span>
                            <span class="spans done" v-if="item.state == 3">已结束</span>
                        </div>

                        <div class="bodys">
                            <p class="info-p">
                                <span class="info-left"> 考试时间： </span>
                                <span class="info-right">
                                    {{ getTime(item.started) }}
                                </span>
                            </p>
                            <p class="info-p">
                                <span class="info-left"> 考试时长： </span>
                                <span class="info-right">
                                    {{ item.duration }} 分钟
                                </span>
                            </p>
                            <p class="info-p">
                                <span class="info-left"> 总分： </span>
                                <span class="info-right">
                                    {{ item.score }}
                                </span>
                            </p>

                        </div>
                        <div class="fots" style="margin-top: 40px">
                            <!-- "state": 1, //考核状态：1-待考核，2-考核中，3-已完成 -->
                            <el-button v-if="item.do_state == 1" @click="test_s(item)" type="primary_test">开始评测</el-button>
                            <el-button v-if="item.do_state == 2" @click="test_s(item)" type="primary_test2">继续评测</el-button>
                            <el-button v-if="item.do_state == 3" @click="test_s(item)" type="primary_test3">评测结果</el-button>
                        </div>
                    </div>
                </div>
                <div class="mine-body2">
                    <div class="rentou">用户名</div>
                    <p style="text-align: center; margin-bottom: 30px">宋主任</p>
                    <div class="flex_center_around" style="
              width: 90%;
              margin: 0 auto;
              border-top: 1px solid #e8e8e8;
              padding-top: 30px;
            ">
                        <div>
                            进行中的考试
                            <br />
                            <br />

                            <p style="
                  color: #ffc700;
                  text-align: center;
                  font-size: 18px;
                  font-weight: bold;
                ">
                                {{ doing_ }}

                            </p>
                        </div>
                        <div style="
                width: 1px;
                height: 50px;
                background: #e8e8e8;
                font-size: 18px;
                font-weight: bold;
              "></div>
                        <div>
                            考试记录
                            <br />
                            <br />
                            <p style="
                  color: #ffc700;
                  text-align: center;
                  font-size: 18px;
                  font-weight: bold;
                ">
                                {{ total_ }}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </d2-container>
</template>

<script>
import { getpapermine} from './big.js';
export default {
    name: 'mine',
    data () {
        var check_user = (rule, value, callback) => {
            if (value) {
                if (value.length < 2) {
                    callback(new Error('请确保长度在2-8位'));
                }
                //   chineseandstring: /^[a-zA-Z0-9\u4e00-\u9fa5]*[\u4e00-\u9fa5][a-zA-Z0-9]*$/,

                if (!/^[a-zA-Z0-9\u4e00-\u9fa5]*[\u4e00-\u9fa5][a-zA-Z0-9]*$/.test(value)) {
                    callback(new Error('请确保不能为纯数字或者特殊字符'));
                } else {
                    callback();
                }
            } else {
                callback();
            }
        };

        var check_user2 = (rule, value, callback) => {
            if (value) {
                // if (value.length < 2) {
                //   callback(new Error('请确保长度在2-8位'));
                // }
                //   chineseandstring: /^[a-zA-Z0-9\u4e00-\u9fa5]*[\u4e00-\u9fa5][a-zA-Z0-9]*$/,

                if (!/^[a-zA-Z0-9\u4e00-\u9fa5]*[\u4e00-\u9fa5][a-zA-Z0-9]*$/.test(value)) {
                    callback(new Error('请确保不能为纯数字或者特殊字符'));
                } else {
                    callback();
                }
            } else {
                callback();
            }
        };
        return {
            doing_: "",
            total_: "",
            next: true,
          points: '',
          body_list:  [],
        };
    },
    created () {
      this.get_exam();
    },
    watch: {
        //   监听属性对象，newValue为新的值，也就是改变后的值
        visible (newValue, oldValue) {
            if (newValue) {
                //菜单显示的时候
                // document.body.addEventListener，document.body.removeEventListener它们都接受3个参数
                // ("事件名" , "事件处理函数" , "布尔值");
                // 在body上添加事件处理程序
                document.body.addEventListener('click', this.closeMenu);
            } else {
                //菜单隐藏的时候
                // 移除body上添加的事件处理程序
                document.body.removeEventListener('click', this.closeMenu);
            }
        },
    },
    methods: {
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
        get_exam () {
            getpapermine().then((res) => {
              this.body_list = res.data.data;
              this.doing_ = res.data.doing;
              this.total_ = res.data.total;
            });
        },
        test_s (x) {
          if (x.do_state == 1) {
            let nowDate = new Date();
            let nowUnix = parseInt((nowDate.getTime() / 1000).toFixed());
            if (x.begin_date > nowUnix) {
              this.$message.warning("评测考试未开始，请等待！")
              return
            };
            if (nowUnix > x.end_date) {
              this.$message.warning("评测考试已结束！")
              return
            }
            {
              this.$router.push({
                path: "/exam/mine/test_paper",
                query: { id: x.paper_id, state: 1, exam_id: x.id, title: "我的考试" },
              });
            }
          }
          if (x.do_state == 2) {
            let nowDate = new Date();
            let nowUnix = parseInt((nowDate.getTime() / 1000).toFixed());
            if (x.begin_date > nowUnix) {
              this.$message.warning("评测考试未开始，请等待！")
              return
            };
            if (nowUnix > x.end_date) {
              this.$message.warning("评测考试已结束")
              return
            }
            {
              this.$router.push({
                path: "/exam/mine/test_paper",
                query: { state: 2, exam_id: x.id, paper_id: x.paper_id, title: "我的考试" },
              });
            }
          }
          if (x.do_state == 3) {
            {
              this.$router.push({
                path: "/exam/mine/end",
                query: { state: 3, exam_id: x.id, paper_id: x.paper_id, title: "我的考试" },
              });
            }
          }
        },
    },
};
</script>

<style lang="scss" scoped>
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
    width: 1240px;
    height: 140px;
    margin: 30px auto;
    background: #fff;
    border: 1px solid #e8e8e8;
}

.mine-body {
    width: 1200px;
    overflow: auto;
    margin: 0 auto;
    //   margin: 0 auto;
    float: left;
    //   max-height: 1500px;
    flex-wrap: wrap;
    padding-bottom: 20px;
}

.mine-body2 {
    width: 300px;
    overflow: auto;
    height: 300px;
    border-radius: 4px;
    background: #fff;
    margin-top: 20px;
    margin-left: -60px;
    border: 1px solid #E8E8E8;
    //   margin: 0 auto;
    float: left;
    //   max-height: 1500px;
    flex-wrap: wrap;
    padding-bottom: 20px;
    background: url('/image/AOne/geren.png') no-repeat top;

}

.company_add {
    width: 260px;
    height: 320px;
    text-align: center;
    background: #fff;
    border-radius: 4px;
    margin-top: 20px;
    margin-left: 15px;
    border-radius: 4px;
    //   margin: 20px 20px 20px 0px;
}

.company_add:nth-child(4n) {
    margin-right: 0px !important;
}

.company_head {
    background: url('/image/AOne/test2.png') no-repeat center;
    font-size: 20px;
    font-weight: bold;
    color: #fff;
    height: 120px;
    position: relative;
    border-radius: 4px;

    .spans {
        position: absolute;
        right: 0;
        top: 0;
        display: inline-block;
        padding: 6px 10px 6px 10px;
        color: white;
        font-size: 14px;
        font-weight: normal;
        border-radius: 0 4px 0 4px;
    }

    .wait {
        background: red;

        .ing {
            background: #FFC700;
        }

        .done {
            background: #8F8F8F;
        }
    }
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
    background: url('/image/AOne/pointer_fenshu.png') no-repeat;
    width: 47px;
    height: 47px;
    color: #7f4215;
    font-weight: bold;
    font-size: 14px;
    text-align: center;
    line-height: 43px;
}

.new_renzheng {
    width: 90%;
    margin: 0 auto;

    span {
        color: black;
    }
}

.pointer i {
    color: black !important;
}

.rentou {
    height: 100px;
    width: 100px;
    margin: 50px auto 10px;
    color: #fff;
    border-radius: 50px;
    border: 1px solid gray;
    text-align: center;
    line-height: 100px;
    //  vertical-align: middle;
}
</style>
