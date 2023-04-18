<template>
  <!-- 新版本 -->

  <div class="home_page">
    <!-- <div class="head_page"></div> -->
    <el-row :gutter="20" type="flex" class="row-bg gaodu" justify="space-between">
      <el-col :span="7" class="gaodu3">
        <div class="flex_center_between_c" style="background: #010c15db">
          <div class="part_1 part">
            <div class="part_head head1">
              <span> 机构评测</span>
            </div>
            <div class="part_body">
              /
              <div class="env_por flex_center_around">
                <div class="flexs flex_center_around" v-for="item in person_list">
                  <div class="perseon_img">
                    <img :src="item.src" alt="" />
                  </div>
                  <div class="person_div">
                    <p class="person_p">{{ item.name }}</p>
                    <p style="margin-top:5px">
                      <span class="nums"> {{ item.num }}</span> 个
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="part_1 part">
            <div class="part_head head1" style="margin-top: 0px">
              <span> 评测机构</span>
            </div>
            <div class="part_body">
              <table class="Atable">
                <thead>
                  <tr>
                    <th class="th_25">机构名称</th>
                    <th class="th_15">零信任</th>
                    <th class="th_15">零事故</th>
                    <th class="th_15">零隐患</th>
                    <th class="th_15">零损失</th>
                    <th class="th_15">韧性值</th>
                  </tr>
                </thead>
                <tbody  style="height:188px; ">
                  <tr v-for="item in table_list">
                    <td>
                      <span class="chaochu">{{ item.agency_name }}</span>
                    </td>
                    <td class="th_15"><el-progress :percentage="item.zero_trust_score" :format="format"></el-progress></td>
                    <td class="th_15"><el-progress :percentage="item.zero_fault_score" :format="format"></el-progress></td>
                    <td class="th_15"><el-progress :percentage="item.zero_peril_score" :format="format"></el-progress></td>
                    <td class="th_15"><el-progress :percentage="item.zero_loss_score" :format="format"></el-progress></td>
                    <td class="th_15"><el-progress :percentage="item.score" :format="format"></el-progress></td>
                  </tr>
                </tbody>
              </table>
              <div  class="flex_center_around" v-if="table_list.length==0" style="height:188px;color:white">
                   暂无数据
            </div>
            </div>
          </div>
          <div class="part_1 part">
            <div class="part_head head1" style="margin-top: 0px">
              <span> 评测机构评价</span>
            </div>
            <div class="part_body">
              <!-- <p class="newtop" style="text-align: center">
                <span class="zkd">{{top1}}</span>
              </p> -->
              <div class="leida">
                <qdLeida v-if="zhen" :activity="industry"></qdLeida>
                <div  class="flex_center_around" v-if="!zhen" style="height:300px;color:white">
                   暂无数据
            </div>
              </div>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="10">
        <div class="henan">
          <div class="henan_num flex_center_around">
            <div class="rencai">
              <p style="color: #e4f3ff">认证人才</p>
              <div class="rencai1">
                {{biaotou.user_num}}
              </div>
            </div>
            <div class="rencai">
              <p style="color: #e4f3ff">认证机构</p>
              <div class="rencai1">
                {{ biaotou.agency_num }}
              </div>
            </div>
            <div class="rencai">
              <p style="color: #e4f3ff">网络安全人才</p>
              <div class="rencai1">
                {{ biaotou.security_user_num }}
              </div>
            </div>
          </div>
          <br />
          <br />
          <br />
          <br />
          <HN2></HN2>
          <div class="  spans11">
            <span class="flexs_span flex_center_around">
                <span class="qi"></span>
                企业
            </span>
            <span class="flexs_span flex_center_around" >
                <span class="gao2"></span>
                高校
            </span>
            <span class="flexs_span flex_center_around">
                <span class="zheng"></span>
                政府
            </span>
            <span class="flexs_span flex_center_around">
                <span class="ke"></span>
                科研单位
            </span>

            <!-- {企业: "#009FF8", 高校: "#FFCA10", 政府: "#00F872", 科研单位: "#FF3D60"} -->

          </div>
        </div>
      </el-col>
      <el-col :span="7" class="gaodu3">
        <div class="flex_center_between_c" style="background: #010c15db">
          <div class="part_1 part">
            <div class="part_head head1">
              <span> 在线考试</span>
            </div>
            <div class="part_body">
              <p class="done_exam">
                <span style="margin-left: 100px">已完成考试</span>
                <span
                  ><span class="exam_done">{{ exam.done }}</span> 人</span
                >
              </p>
              <div class="env_por flex_center_around">
                <div class="kaoshi flex_center_around">
                  <div class="kaoshi1">
                    <div>
                      <img src="/image/AOne/kao1.png" alt="" />
                      <span class="kaoshi_span">{{ exam.undo }}</span>
                      <br />
                      <img src="/image/AOne/icon_bar.png" alt="" />
                      <br />
                      <span>待开考数量</span>
                    </div>
                  </div>
                  <div class="kaoshi1">
                    <img src="/image/AOne/kao2.png" alt="" />
                    <span class="kaoshi_span">{{ exam.doing }}</span>
                    <br />
                    <img src="/image/AOne/icon_bar.png" alt="" />
                    <br />
                    <span>进行中考试</span>
                  </div>
                  <div class="kaoshi1">
                    <img src="/image/AOne/kao3.png" alt="" />
                    <span class="kaoshi_span">{{ exam.question }}</span>
                    <br />
                    <img src="/image/AOne/icon_bar.png" alt="" />
                    <br />
                    <span>题目存量</span>
                  </div>
                </div>
              </div>
              <br />
            </div>
          </div>
          <div class="part_1 part">
            <div class="part_head head1" style="margin-top: 0px">
              <span> 在线考试信息</span>
            </div>

            <div class="part_body">
              <table class="Atable">
                <thead>
                  <tr>
                    <th class="th_25">考试名</th>
                    <th class="th_15">时间</th>
                    <th class="th_20">参与人数</th>
                    <th class="th_20">平均成绩</th>
                    <th class="th_15">难易度</th>
                  </tr>
                </thead>
                <tbody  style="height:188px;">
                  <tr v-for="item in table_list2">
                    <td>
                      <span class="chaochu">{{ item.name }}</span>
                    </td>
                    <td class="th_15">{{ getTime(item.begin_date) }}</td>
                    <td class="th_20">{{ item.total }}</td>
                    <td class="th_20">{{ item.average }}</td>
                    <td class="th_15">{{ getLevel(item.level) }}</td>
                  </tr>
                </tbody>
              </table>
              <div  class="flex_center_around"   v-if="table_list2.length==0" style="height:188px;color:white">
                   暂无数据
            </div>
            </div>
          </div>
          <div class="part_1 part">
            <div class="part_head head1" style="margin-top: 0px;">
              <span> 考试成绩分布 </span>
            </div>
            <div class="part_body" style="margin-top:5px">
              <div class="leida">
                <el-select v-model="sandian_value" @change="sandianChange" style="float:right; height: 10px;">
                  <el-option v-for="item in sandian_select" :key="item.id" :label="item.name" :value="item.id">
                  </el-option>
                </el-select>
                <br />
                <br />
                <qdSAN v-if="zhen2" :sandian="sandian_list" style="margin-top:5px"></qdSAN>
                <div  class="flex_center_around"  v-if="!zhen2" style="height:250px;color:white">
                   暂无数据
            </div>
              </div>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
  <!-- 新版本 -->
</template>
<script>
import vline from './vline';
import maps from './map';
import vpie from './vpie';
import vbar from './vbar';
import { agency, agency2, agency3, exam1, exam2, selects, selects2, new_map} from './big.js';

export default {
  components: {
    vline,
    maps,
    vpie,
    vbar,
  },
  data() {
    return {
      biaotou:{},
      table_list: [],
      table_list2: [],
      zhenbuzhen: true,
      sandian_select: [],
      sandian_value: "",
      sandian_list: [],
      zhen: false,
      zhen2: false,
      zhen3: false,
      exam: {},
      top1: "",
      industry: {},
      person_list: [
        {
          name: '助理工程师',
          num: '',
          src: 'image/AOne/1.png',
        },
        {
          name: ' 中级工程师',
          num: '',
          src: 'image/AOne/2.png',
        },
        {
          name: '副高级工程师',
          num: '',
          src: 'image/AOne/3.png',
        },
        {
          name: ' 正高级工程师',
          num: '',
          src: 'image/AOne/4.png',
        },
      ],
      around_list2: [
        {
          name: '卫星制造',
          num: '',
          src: 'image/AOne/BB1.png',
        },
        {
          name: '轨道计算',
          num: '',
          src: 'image/AOne/BB2.png',
        },
        {
          name: '卫星测控',
          num: '',
          src: 'image/AOne/BB3.png',
        },
      ],
      around_list3: [
        {
          name: '物流',
          num: '',
          src: 'image/AOne/CC1.png',
        },
        {
          name: '海洋渔业',
          num: '',
          src: 'image/AOne/CC2.png',
        },
        {
          name: '卫星通讯',
          num: '',
          src: 'image/AOne/CC3.png',
        },
      ],
    };
  },
  computed: {
    defaultOption() {
      return {
        step: 0.6, // 数值越大速度滚动越快
        limitMoveNum: 2, // 开始无缝滚动的数据量 this.dataList.length
        hoverStop: true, // 是否开启鼠标悬停stop
        direction: 1, // 0向下 1向上 2向左 3向右
        openWatch: true, // 开启数据实时监控刷新dom
        singleHeight: 0, // 单步运动停止的高度(默认值0是无缝不停止的滚动) direction => 0/1
        singleWidth: 0, // 单步运动停止的宽度(默认值0是无缝不停止的滚动) direction => 2/3
        waitTime: 1000, // 单步运动停止的时间(默认值1000ms)
      };
    },
  },
  created() {
    new_map().then(res=>{
        this.biaotou.agency_num = res.data.agency_num
        this.biaotou.security_user_num = res.data.security_user_num
        this.biaotou.user_num = res.data.user_num
    })
    // 机构评测
    agency().then((res) => {
      this.person_list.map((e, index1) => {
        res.data.map((ee, index2) => {
          if (index1 == index2) {
            e.num = ee.value;
          }
        });
      });
    });
    // 机构评测
    agency2().then((res) => {
      this.table_list = res.data.slice(0, 5);
    });
    agency3().then((res) => {
      this.industry = res.data;
      this.top1 = res.data.top1.name;
      if(res.data){
      this.zhen = true;
      }else{
      this.zhen = false;

      }
    });
    exam1().then((res) => {
      this.exam = res.data;
    });
    exam2().then((res) => {
      this.table_list2 = res.data;
    });
    selects().then((res) => {
      if (res.data.length > 0) {
        this.sandian_value = res.data[0].id;
        this.sandian();
      }
      this.sandian_select = res.data;
    });
  },
  methods: {
    sandian() {
      selects2(this.sandian_value).then((res) => {
        this.sandian_list = res.data;
         if(res.data){
            this.zhen2= true
        }else{
            this.zhen2= false

        }
      });
    },
    sandianChange(value) {
      this.sandian_value = value;
      this.sandian();
    },
    format(percentage) {
      if (percentage > 80) {
        return "A"
      } else if (percentage > 60) {
        return "B"
      } else if (percentage > 30) {
        return "C"
      } else {
        return "D"
      }
    },
    getLevel(level) {
      if (level === 1) {
          return "低"
      } else if (level === 2) {
          return "中"
      } else {
        return "高"
      }
    },
    getTime(nS) {
      var date = new Date(parseInt(nS) * 1000);
      var year = date.getFullYear();
      var mon = date.getMonth() + 1;
      var day = date.getDate();
      if (mon.toString().length == 1) {
        mon = '0' + mon;
      } else {
        mon = mon;
      }
      if (day.toString().length == 1) {
        day = '0' + day;
      } else {
        day = day;
      }
      return mon + '-' + day + ' ';
    },
    getUrl() {
      return './image/theme/d2/logo/13.png';
    },
    seT(x) {
      this.shows = x;
    },
    getSearch() {
      this.$router.push({ path: '/log2' });
    },
    go_test_monitor() {
      this.$router.push({
        path: '/monitor/index',
      });
    },
  },
  beforeDestroy() {
    clearInterval(this.timer);
    this.timer = null;
  },
  //  演示效果
};
</script>

<style lang="scss" scoped>
@import './page.css';

.henan_num {
  position: absolute;
  left: 10%;
  width: 80%;
  top: 20px;
  margin-top: 20px;
}
.rencai {
  text-align: center;
}
.rencai1 {
  width: 130px;
  height: 40px;
  background: url('/image/AOne/databg.png') no-repeat center;
  background-size: contain;
  margin-top: 10px;
  color:#00F8F4;
  line-height: 40px;
  font-size: 20px;
  font-weight: bold;
}
.bg_around {
  //   background: url("/image/AOne/data4.png") no-repeat center;
  width: 100%;
  //   height: 50px;
  background: #24211b;
  border: 1px solid #2f2d25;
  position: relative;
  text-align: center;
  color: white;
  margin: 10px auto;
  padding: 4px;

  .b_name {
    position: absolute;
    bottom: -20px;
    left: 50%;
    margin-left: -40px;
    color: #fff;
    font-size: 14px;
  }

  .c_num {
    // margin-top: 40px;
    font-weight: bold;
    color: #fff;
  }
}

.env_por2 {
  flex-wrap: wrap;
  //   margin-top: 10px;
  //   height: 260px;
  margin-bottom: 20px;
  //   margin-top: 20px;
}

.env_por {
  color: white;
  //   padding: 10px;
  flex-wrap: wrap;
  //   height: 80px;
  //   border-bottom: 1px solid #072442;
}

.around2 {
  width: 40%;
  height: 80px;
  color: #dedee0;

  p {
    color: #dedee0;
  }

  .left_around2 {
    width: 25%;
    height: 100%;

    img {
      width: 100%;
    }
  }

  .right_around2 {
    width: 70%;
    color: white;
    height: 100%;
    text-align: center;
    vertical-align: middle;
  }
}

.d_name {
  margin-top: 17px;
}

.center_bg {
  width: 100%;
  height: 400px;
  text-align: center;
  position: relative;
  margin-top: 25px;

  .points {
    position: absolute;
    top: 34%;
    left: 50%;
    margin-left: -50px;
    color: white;
    font-size: 25px;
    font-weight: bold;
    width: 100px;
    text-align: center;
  }
}

.head_page {
  width: 100%;
  height: 62px;
  background: url('/image/AOne/top.png') no-repeat center;
}

.foot-span {
  text-align: center;
  display: inline-block;
}

.m-foots {
  // width: 100%;
  height: calc(100% - 64px);
  margin: 10px;
}

.m-clouds {
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: calc(100% - 64px);
  //   background: rebeccapurple;
  .m-clouds-left {
    background: url('/image/mmind/bg7.png') no-repeat center;
    background-size: 100%;
  }

  .saomiao {
    animation: rotate 3s linear infinite;
  }

  @keyframes rotate {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  .m-clouds-left,
  .m-clouds-right {
    width: 46%;
    height: 90%;
    // border: 1px solid red;
    display: flex;
    align-items: center;
    justify-content: space-around;
  }
}

.m-cloud {
  height: calc(60% - 84px);
  //   background: red;
  margin-top: 10px;

  .m-cloud-tt {
    background: url('/image/mmind/bg10.png') no-repeat;
    height: 44px;
    color: white;
  }
}

.m-news-tt3 {
  //   width: 100%;
  height: 30px;
  line-height: 30px;
  background: #025d6d;
  color: white;
  display: flex;
  margin: 10px;
  font-size: 14px;

  .tt3_span {
    text-align: center;
  }
}

.seamless-warp {
  height: 180px;
  overflow: hidden;
  color: white;
  margin-top: 0px;

  .title {
    color: white;
    text-align: center;
  }

  .date {
    text-align: center;
  }

  .item li {
    height: 30px;
    line-height: 30px;
    display: flex;
  }
}

.m-map {
  background: #0d1116;
  width: 100%;
  height: 100%;

  .m-map-tt {
    background: url('/image/mmind/bg9.png') no-repeat;
    height: 20px;
    color: white;
  }

  .m-maps {
    height: calc(100% - 20px);
    width: 100%;
    background: url('/image/mmind/bg_map.png') no-repeat center center;
    background-size: 100%;
    position: relative;
  }
}

.m-news {
  background: #060a0e;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: start;
  flex-direction: column;
  position: relative;

  .m-news-tt {
    background: url('/image/mmind/bg4.png') no-repeat;
    height: 44px;
    color: white;
    background-size: 100%;
  }

  .m-news-tt2 {
    background: url('/image/mmind/bg5.png') no-repeat;
    height: 20px;
    color: white;
    background-size: 100%;
  }

  .m-newss {
    height: 40%;
    width: 100%;
    // padding: 10px;
    // background: url("/image/mmind/bg_left.png") no-repeat,
    //   url("/image/mmind/bg_right.png") no-repeat;

    background-repeat: no-repeat, no-repeat;
    background-position: bottom left, bottom right;

    // background: url('/image/mmind/bg_map.png') no-repeat center center;
    position: relative;
  }
}

.shuju {
  //   position: absolute;
  width: 100%;
  height: 30px;
  color: white;
  text-align: left;
  background: url('/image/vmind/daun.png') no-repeat;
  background-position: bottom;
  background-size: contain;
  display: flex;
  align-items: center;
  justify-content: start;
}

.m-foot {
  width: 100%;
  height: 200px;
  //   background: bisque;
  margin-top: 10px;

  .m-foot-tt {
    background: url('/image/mmind/bg9.png') no-repeat;
    height: 20px;
    color: white;
    // background-size: 99%;
  }

  .m-foot-tt2 {
    background: #01325b;
    height: 20px;
    color: white;
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 8px;
  }
}

.upups {
  position: absolute;
  top: -28px;
  right: 0px;
  font-size: 12px;
  color: #42daf9ff;

  img {
    width: 8px;
  }
}

.span_tt_bodys {
  font-size: 12px;
  margin-right: 6px;
}

body {
  //   min-width: 1366px;
  background: RGBA(4, 29, 74, 1);
}

.gaodu {
  height: calc(100vh - 166px);
}

.gaodu3 {
  height: calc(100vh - 75px);
}

.gaodu2 {
  display: flex;
  //   flex-direction: column;
  //   justify-content: center;
  align-items: flex-start;
}

@keyframes turn {
  0% {
    -webkit-transform: rotateY(0deg);
  }
  25% {
    -webkit-transform: rotateY(90deg);
  }
  50% {
    -webkit-transform: rotateY(180deg);
  }
  75% {
    -webkit-transform: rotateY(270deg);
  }
  100% {
    -webkit-transform: rotateY(360deg);
  }
}

.home_page {
  padding: 0px 20px 20px 20px;
  // background: RGBA(6, 33, 80, 1);
  //   background: url("/image/vmind/vbg.png");
  background: url('/image/AOne/you.png') no-repeat center, url('/image/AOne/xia.png') no-repeat center,
    url('/image/AOne/zuo.png') no-repeat center;
  background-position: right, bottom, left;
  height: 95%;
  //   background-size: cover;
  //   padding: 20px;
  // width: 100%;
  // height/: 100%;
  //   background: #8bc34a;
  .span_tt {
    color: RGBA(255, 255, 255, 1);
    width: 100px;
    position: relative;

    .span_tt_body {
      color: RGBA(66, 218, 249, 1);
      font-size: 20px;
      font-weight: bold;
      margin-top: 20px;
      //   lds_type
      //   font-family: newfont
      //   font-family: mic;
    }
  }

  .img_tt {
    width: 80px;
    animation: turn 5s;
    animation-duration: 5s;
    -webkit-animation-duration: 5s;

    img {
      width: 100%;
    }
  }

  //   .title {
  //   display: flex;
  //   align-items: center;
  //   justify-content: space-around;
  //     height: 128px;
  //     background: yellow;
  //     // #072458
  //     background: linear-gradient(to left, rgba(71, 225, 255, 1), rgba(71, 225, 255, 1)) left top no-repeat,
  //       // rgba(71, 225, 255, 1)
  //       linear-gradient(to bottom, rgba(71, 225, 255, 1), rgba(71, 225, 255, 1)) left top no-repeat,
  //       linear-gradient(to left, rgba(71, 225, 255, 1), rgba(71, 225, 255, 1)) right top no-repeat,
  //       linear-gradient(to bottom, rgba(71, 225, 255, 1), rgba(71, 225, 255, 1)) right top no-repeat,
  //       linear-gradient(to left, rgba(71, 225, 255, 1), rgba(71, 225, 255, 1)) left bottom no-repeat,
  //       linear-gradient(to bottom, rgba(71, 225, 255, 1), rgba(71, 225, 255, 1)) left bottom no-repeat,
  //       linear-gradient(to left, rgba(71, 225, 255, 1), rgba(71, 225, 255, 1)) right bottom no-repeat,
  //       linear-gradient(to left, rgba(71, 225, 255, 1), rgba(71, 225, 255, 1)) right bottom no-repeat;
  //     /*设置大小*/
  //     background-size: 100% 100%;
  //     //   border: 1px solid #013D78;
  //     background-image: url('/image/nmind/shujubg.png');
  //   }
}

.span_tt_tt {
  margin-bottom: 10px;
}

.lds_bg {
  position: absolute;
  top: 10px;
  border-radius: 50%;
  opacity: 0.5;
}

.zhanluett {
  color: red;
  font-size: 29px;
  font-weight: bold;
  margin: 50px auto;
  text-align: center;
}

.sllowblue,
.el-input-group__append {
  background-color: #0bb3ff !important;
  border: 1px solid red !important;
}

.clicks {
  position: absolute;
  width: 84px;
  top: 0;
  height: 36px;
  //   border: 1px solid red;
  left: 0;
}

.active {
  background: #409eff;
  border-radius: 4px;
  transition: all 0.8s linear;
}

.allmark {
  width: 600px;
  display: flex;

  align-items: center;
  justify-content: space-around;
  margin: 10px auto;

  .marks {
    display: inline-block;
    cursor: pointer;
    padding: 4px;
  }

  .shows {
    background: red;
  }
}

.d2-page-cover {
  @extend %full;
  @extend %unable-select;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;

  .d2-page-cover__logo {
    img {
      width: 200px;
    }
  }

  .d2-page-cover__title {
    margin: 0px;
    margin-bottom: 20px;
    font-weight: bold;
    color: $color-text-main;
  }

  .d2-page-cover__sub-title {
    margin: 0px;
    margin-bottom: 5px;
    color: $color-text-normal;
  }

  .d2-page-cover__build-time {
    margin: 0px;
    margin-bottom: 10px;
    font-size: 12px;
    color: $color-text-placehoder;
  }
}

.marks:nth-child(4):hover .san2 {
  color: #42daf9 !important;
}

.marks:nth-child(4):hover .san {
  color: #42daf9 !important;
}

.item .over {
  text-align: center;
  display: inline-block;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  cursor: pointer;
  color: white;
}

.el-rate {
  margin-top: 4px !important;
}

.mbg {
  position: absolute;
  width: 200px;
  height: 150px;
  color: white;
  font-size: 12px;

  span {
    // transform: rotateY(360deg);
  }
}

.bm {
  left: 13%;
  top: 26%;
  //   transform: rotateY(180deg);
}

.nm {
  left: 20%;
  top: 60%;
  //   transform: rotateY(180deg);
}

.f {
  left: 40%;
  top: 40%;
  //   transform: rotateY(180deg);
}

.ou {
  left: 45%;
  top: 22%;
}

.ya {
  left: 64%;
  top: 30%;
}

.ao {
  left: 70%;
  top: 60%;
  //   transform: rotateY(180deg);
}

@media only screen and (max-width: 1700px) {
  .bm {
    left: 11%;
    top: 30%;
  }
}

@media only screen and (max-width: 1500px) {
  .bm {
    left: 9%;
    top: 31%;
  }
}

@media only screen and (max-width: 1400px) {
  .bm {
    left: 7%;
    top: 31%;
  }
}

@media only screen and (max-width: 1300px) {
  .bm {
    left: 6%;
    top: 32%;
  }
}

@media only screen and (max-width: 1200px) {
  .bm {
    left: 3%;
    top: 32%;
  }
}

@media only screen and (max-width: 1700px) {
  .nm {
    left: 17%;
    top: 60%;
  }
}

@media only screen and (max-width: 1500px) {
  .nm {
    left: 15%;
    top: 60%;
  }
}

@media only screen and (max-width: 1400px) {
  .nm {
    left: 13%;
    top: 57%;
  }
}

@media only screen and (max-width: 1300px) {
  .nm {
    left: 13%;
    top: 55%;
  }
}

@media only screen and (max-width: 1200px) {
  .nm {
    left: 10%;
    top: 50%;
  }
}

@media only screen and (max-width: 1700px) {
  .ou {
    left: 42%;
    top: 24%;
  }
}

@media only screen and (max-width: 1500px) {
  .ou {
    left: 39%;
    top: 26%;
  }
}

@media only screen and (max-width: 1400px) {
  .ou {
    left: 38%;
    top: 27%;
  }
}

@media only screen and (max-width: 1300px) {
  .ou {
    left: 37%;
    top: 28%;
  }
}

@media only screen and (max-width: 1200px) {
  .ou {
    left: 35%;
    top: 29%;
  }
}

@media only screen and (max-width: 1700px) {
  .f {
    left: 38%;
    top: 47%;
  }
}

@media only screen and (max-width: 1500px) {
  .f {
    left: 38%;
    top: 47%;
  }
}

@media only screen and (max-width: 1400px) {
  .f {
    left: 35%;
    top: 47%;
  }
}

@media only screen and (max-width: 1300px) {
  .f {
    left: 32%;
    top: 47%;
  }
}

@media only screen and (max-width: 1200px) {
  .f {
    left: 32%;
    top: 47%;
  }
}

@media only screen and (max-width: 1700px) {
  .ya {
    left: 61%;
    top: 31%;
  }
}

@media only screen and (max-width: 1500px) {
  .ya {
    left: 58%;
    top: 32%;
  }
}

@media only screen and (max-width: 1400px) {
  .ya {
    left: 57%;
    top: 33%;
  }
}

@media only screen and (max-width: 1300px) {
  .ya {
    left: 55%;
    top: 33%;
  }
}

@media only screen and (max-width: 1200px) {
  .ya {
    left: 54%;
    top: 33%;
  }
}

@media only screen and (max-width: 1700px) {
  .ao {
    left: 64%;
    top: 55%;
  }
}

@media only screen and (max-width: 1500px) {
  .ao {
    left: 63%;
    top: 54%;
  }
}

@media only screen and (max-width: 1400px) {
  .ao {
    left: 61%;
    top: 53%;
  }
}

@media only screen and (max-width: 1300px) {
  .ao {
    left: 59%;
    top: 53%;
  }
}

@media only screen and (max-width: 1200px) {
  .ao {
    left: 57%;
    top: 51%;
  }
}

.mh {
  background: url('/image/mmind/bghl.png') no-repeat;
}

.ml {
  background: url('/image/mmind/bgll.png') no-repeat;
}

.mm {
  background: url('/image/mmind/bgml.png') no-repeat;
}

.v-m-num {
  display: flex;
  width: 100%;
  height: 100%;
  background: #fff0;
  text-align: center;
  align-items: center;
  justify-content: space-between;
  color: #fff;
  border-radius: 4px;

  .num_s {
    width: 30%;
    height: 80%;
    background: #0f1113;
    border-radius: 4px;
    border: 1px solid #27292b;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: space-evenly;
    position: relative;
  }
}

.m-bg {
  background: #212a3c;
  border-radius: 4px;
  height: 80%;
}

.m-table {
  color: white;

  table {
    width: 100%;
    margin-top: 20px;

    td {
      border: 1px solid #2f3032;
      margin-bottom: 10px;
      padding: 10px;
    }
  }
}

.add_num {
  color: red;
  position: absolute;
  right: 10px;
  top: 10px;
}

.d_num {
  color: #fff !important;
  font-weight: bold;
}

.table_th {
  //   word-break:keep-all;
  text-align: center;
}

table {
  border-collapse: collapse;
  width: 100%;
}

table th,
td {
  //   border: 1px solid #83888d;
  padding: 10px 3px;
}

.id {
  display: inline-block;
  padding: 4px;
  //   border: 1px solid #6cd2cc;
  //   background: #002525;
  //   color: #6cd2cc;
  border: 1px solid #30a9ff;
  background: #000825;
  color: #30a9ff;
}

.zhong {
  display: inline-block;
  padding: 4px;

  border: 1px solid #6cd2cc;
  background: #002525;
  color: #6cd2cc;
}

.gao {
  display: inline-block;
  padding: 4px;

  border: 1px solid #f2c94c;
  background: #231a00;
  color: #f2c94c;
}

.wei {
  display: inline-block;
  padding: 4px;
  border: 1px solid #bd0a00;
  color: #bd0a00;
  background: #230300;
}

.dd {
  border-radius: 4px;
}

.patch_tag {
  display: inline-block;
  padding: 4px;
  border: 1px solid #f2c94c;
  background: #231a00;
  color: #f2c94c;
  border-radius: 4px;
  font-size: 12px;
}

.asset_tag {
  display: inline-block;
  padding: 4px;
  border: 1px solid #f2c94c;
  background: #231a00;
  color: #f2c94c;
  border-radius: 4px;
  font-size: 12px;
}

.jj:nth-child(2n) {
  background: #1b1e20;
}

.jj:nth-child(2n-1) {
  background: #060a0e;
}

.m-foot-tt2 {
  background: #fff0 !important;
  height: 20px;
  color: white;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 8px;
}

.count_points {
  padding: 6px;
  border: 1px solid #fff;
  color: #fff;
  position: absolute;
  bottom: 30%;
  width: 200px;
  left: 50%;
  margin-left: -100px;
  // margin:  -60px  auto;
  z-index: 999999999;
}

.new_table {
  border: 1px solid #83888d !important;
  color: #83888d;
}

.points_ge,
.points_ge2 {
  color: #83888d;
}

.points_ge {
  float: left;
}

.points_ge2 {
  float: right;
}

.shiyan {
  width: 200px;
  height: 100px;
  background: url('/image/AOne/n1.png') no-repeat center;
  background-size: contain;
  text-align: center;
  color: white;
  overflow: hidden;
  margin-left: 50px;

  .shiyan_P {
    margin-top: 30px;
    color: #b9d5ff;
  }
}

.row-bg {
//   padding-left: 40px;
//   padding-right: 40px;
  //   padding-top: 10px;
}

.head1 {
  //   background: url("/image/AOne/xiaobg.png"); // background: #143166;
  margin-top: -19px;
}

.head2 {
  //   background: url("/image/AOne/xiaobg.png"); // background: #143166;
}

.head3 {
  text-align: left;
  //   background: url("/image/AOne/spider3.png"); // background: #143166;
  background-size: cover !important;
}

.head4 {
  text-align: left;
  background: url('/image/AOne/shiyanxinxi.png'); // background: #143166;
  background-size: cover !important;
}

.head5 {
  text-align: left;
  background: url('/image/AOne/shiyanguance.png'); // background: #143166;
  background-size: cover !important;
}

.images {
  text-align: center;
  width: 30%;
}

.images2 {
  text-align: center;
  width: 45%;
}

.images_tit {
  background-image: linear-gradient(#00f8f4, #ffcc54);

  background-clip: text;

  -webkit-background-clip: text;

  color: transparent !important; /*需要文字透明*/
  // color: ;
  //     // #00F8F4
  // 100%
  // #FFCC54
  // 100%
}

.points_bg {
  text-align: center;

  img {
    width: 60%;
  }
}

.points_span {
  font-size: 16px;
  font-weight: bold;
  color: #fff;
  margin-top: -105px;
}

.sone-table {
  width: 90%;
  margin: 0px auto;
  overflow: hidden;
  color: white;
  font-size: 14px;

  th {
    background: #201409;
    padding: 4px !important;
    color: #00f8f4;
  }

  td {
    padding: 4px !important;
    text-align: center;
  }

  tr:nth-child(2n-1) {
    background: #1b1d24;
  }

  tr:nth-child(2n) {
    background: #0f101124;
  }
}

.p_floats {
  float: left;
  color: white;
  font-size: 14px;
}

.p_floats2 {
  float: right;
  color: #8d8d8d;
  font-size: 14px;
}

.top-items {
  color: white;
}

.item_item {
  height: 30px;
  background: url('/image/AOne/bglie.png');
  background-size: cover;
  margin-bottom: 4px;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.8);
}

.huang {
  color: wheat;
}

.hong {
  color: red;
}

.mores {
  color: white;
  width: 90%;
  margin: 0 auto;
  height: 100px;
  text-align: center;
  font-weight: bold;
  line-height: 100px;
  text-shadow: 0 0 3px #00f8f4;
  background: url('/image/AOne/more.png') no-repeat center;
}
.small {
  text-align: center;
  color: white;
  width: 80%;
  display: inline-block;
  height: 50px;
  background: url('/image/AOne/lds1.png') no-repeat center;
  margin: 0 auto;
  font-size: 14px;
  line-height: 50px;
}
.lili {
  width: 100%;
  height: 50px;
  line-height: 30px;
  text-align: left;
  margin: 4px auto;
  background: url('/image/AOne/top-bg.png') no-repeat;
  background-size: 100% 100%;
  display: flex;
  align-items: center;
}

.flexs {
  width: 45%;
  height: 66px;
  flex-wrap: wrap;
  .perseon_img {
    width: 30%;
  }
  .person_div {
    width: 50%;
  }
  .nums {
    font-size: 16px;
    font-weight: bold;
    color: #fff;
    margin-top: 5px;
  }
}
.person_p {
  color: #8fabbf;
  margin-bottom: 4px;
}
.Atable {
  margin-top: 10px;
  thead {
    border-bottom: 1px solid;
    background: #61778a;
    border-bottom: 1px solid #939ba2;
  }
  th {
    color: #94dcef;
  }
  td {
    color: #fff;
  }
  .th_25 {
    width: 30%;
  }
  .th_35 {
    width: 35%;
  }
  .th_20 {
    width: 20%;
    text-align: center;
  }
  .th_15 {
    width: 14%;
    text-align: center;
  }
}
.zkd {
  color: #00f8f4;
  font-size: 14px;
  font-weight: bold;
}
.newtop {
  background: url('/image/AOne/newtop1.png') center no-repeat;
  width: 80%;
  margin: 0 auto;
  height: 40px;
  background-size: cover;
  line-height: 40px;
}
.leida {
  width: 100%;
}
.done_exam {
  margin: 10px auto;
  color: white;
  line-height: 60px;
  width: 90%;
  height: 60px;
  background: url('/image/AOne/done.png') center no-repeat;
}

.kaoshi {
  width: 90%;
  margin: 0 auto;
  color: white;
}
.kaoshi_span {
  font-size: 24px;
  font-weight: bold;
  margin-left: 10px;
}
.exam_done {
  margin-left: 20px;
  color: #00f8f4;
  font-size: 20px;
  font-weight: bold;
}
.new_select {
  appearance: none;
  width: 260px;
  background: #fff0;
  border: none;
  color: #00f8f4;
  float: right;
}
.henan {
  width: 100%;
  height: 100%;
//   background: url('/image/AOne/cbd.png') center no-repeat;
  position: relative;
  background-size: 100%;
}
.flexs_span{
    display: inline-block;
    margin-right: 20px;
    margin-top: 10px;
    color: white;
}
.qi{
    display: inline-block;

    width: 10px;
    height: 10px;
    border-radius: 10px;
    background: #009FF8;
}
.gao2{
    display: inline-block;

    width: 10px;
    height: 10px;
    border-radius: 10px;
    background: #FFCA10;
}
.zheng{
    display: inline-block;

    width: 10px;
    height: 10px;
    border-radius: 10px;
    background: #00F872;
}
.ke{
    display: inline-block;

    width: 10px;
    height: 10px;
    border-radius: 10px;
    background: #FF3D60;
}   
.spans11{
    width: 100px;
    height: 100px;
    position: absolute;
    bottom: -60px;
    left:  0px;
    margin-top: 10px;
}
</style>
