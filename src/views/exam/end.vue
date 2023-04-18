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
                        <p style="color:#000000;margin-top:20px">完成时间：{{ getTime(result.finished) }}</p>
                        </p>

                        <div class="main-body  flex_center_around">

                            <div class="lefts">
                                <p style="float:left" class="weights">得分详情</p>
                                <br />
                                <br />
                                <br />
                                <div class="lefts-div flex_center_around">
                                    <div class="divs">

                                        <p>识记评分： <span class="scores_div"> {{ result.memory }}</span></p>
                                        <br/>
                                        <p>领会评分： <span class="scores_div"> {{ result.grasp }}</span> </p>
                                    </div>
                                    <div class="divs">
                                        <p>运用评分： <span class="scores_div"> {{ result.apply }}</span></p>
                                        <br/>

                                        <p>分析评分： <span class="scores_div"> {{ result.analyse }}</span> </p>
                                    </div>
                                    <div class="divs">
                                        <p>综合评分： <span class="scores_div"> {{ result.evaluate }}</span></p>
                                        <br/>
                                        <p>评价评分： <span class="scores_div"> {{ result.synthesis }}</span> </p>
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
                                        <div class="pointer" @click="go_top()">

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
                                <p class="weights" style="text-align:left">考试雷达图</p>
                                <div class="leida">

                                    <qdLeida6 v-if="zhen" :activity="result"></qdLeida6>
                                </div>

                            </div>

                        </div>

                        <!-- <el-button type="primary_test" @click="go_back()">
                            重新评测
                        </el-button> -->
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
import { query } from "quill";
import { score, getresult } from "./big.js";
export default {
  name: "mine",
  data() {
    return {
      result: {
        id: "",
        exam_id: "",
        paper_id: "",
        score: "",
        rank: "",
        finished: "",
        memory: "",
        grasp: "",
        apply: "",
        analyse: "",
        evaluate: "",
        synthesis: "",
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
    console.log(this.$route.query.exam_id, "000");
    this.result.exam_id = this.$route.query.exam_id;
    this.result.paper_id = this.$route.query.paper_id;
    getresult(this.$route.query.exam_id).then((res) => {
      this.result.finished = res.data.score;
      this.result.rank = res.data.score;
      this.result.score = res.data.score;
      this.result.analyse = res.data.ability.analyse;
      this.result.apply = res.data.ability.apply;
      this.result.evaluate = res.data.ability.evaluate;
      this.result.grasp = res.data.ability.grasp;
      this.result.memory = res.data.ability.memory;
      this.result.synthesis = res.data.ability.synthesis;
      this.result.finished = res.data.finished;
      this.zhen = true;
    });
  },
  watch: {},
  methods: {
    go_top() {
      this.$router.push({
        path: "/exam/mine/top",
        query: { id: this.result.paper_id },
      });
    },
    go_cha() {
      this.$router.push({
        path: "/exam/mine/test_paper_look",
        query: {
          exam_id: this.result.exam_id,
          title: this.$route.query.title
        },
      });
    },
    go_back2() {
      this.$router.go(-1);
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
  font-size: 18px;
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
