<template>
  <div class="container">
    <div class="zhong" v-for="(item, index) in ValueArr" :key="index">
      <div class="title-top">
        <!-- 0生产中 1待状料 2装料中 3运输中 4已送达 5已签收 6已拒收 7已终止 -->
        <p :class="[{ back1: item.currentState != -1 }]">
          <template v-if="index == 5 && state == 6"> 已拒收 </template>
          <template v-if="index == 5 && state == 7"> 已终止 </template>
          <template v-if="index == 5 && state != 6 && state != 7">
            {{ title[index] }}
          </template>
          <template v-if="index !== 5">
            {{ title[index] }}
          </template>
        </p>
      </div>
      <div class="img">
        <div
          class="cicle"
          :class="[
            {
              green1: (item.currentState != -1 && index <= state) || state == 5,
            }, //单个状态已完成
            { gray1: item.currentState === -1 && index > state }, //未审批到的步骤
            { yellow1: index === state && state !== 5 }, //单个状态进行中
            { red1: (state === 6 || state == 7) && index === 5 }, //已拒收,已终止
          ]"
        >
          <p
            class="iconfontnew iconjian logo"
            :class="[
              { iconwrong: (state === 6 || state == 7) && index === 5 }, //已拒收
              {
                iconduihao:
                  (item.currentState != -1 && index < state) || state == 5,
              }, //已完成
              {
                iconjinhangzhong: index >= state && state !== 5,
              }, //审批中以及未进行到步骤
            ]"
          ></p>
        </div>
      </div>
      <div class="bottom">
        <template v-if="(index == 0 || index == 1) && item.nickname != ''">
          <p>操作人：{{ item.nickname }}</p>
          <p>时间：{{ item.startTime }}</p>
        </template>
        <template
          v-if="(index == 2 || index == 3 || index == 4) && item.nickname != ''"
        >
          <p>司机：{{ item.nickname }}</p>
          <p>
            时间：{{ item.startTime }}
            <span
              ><span v-if="index == 3 || index == 4"
                >( 耗时：{{ item.duration }}分钟)</span
              ></span
            >
          </p>
        </template>
        <template v-if="index == 5 && item.nickname != ''">
          <p>
            {{ state == 5 ? "签收人" : state == 6 ? "拒收人" : "操作人" }}：{{
              item.nickname
            }}
          </p>
          <p>
            时间：{{ item.startTime }}
            <span
              ><span v-if="state == 5"
                >( 耗时：{{ item.duration }}分钟)</span
              ></span
            >
          </p>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: [
        "已安排车辆",
        "生产处理",
        "到达装料口",
        "已完成装料，开始运输",
        "到达目的地",
        "已签收",
      ],
    };
  },
  props: {
    // 后台数据数组
    ValueArr: {
      type: Array,
    },
    //到达第几步得标识
    state: {
      type: Number,
    },
  },
  mounted() {
    console.log(this.state);
    console.log(this.ValueArr);
  },
};
</script>
<style lang="scss" scoped>
.container {
  width: 100%;
  height: 150px;
  position: relative;
  display: flex;
  justify-content: space-between;
  &::after {
    content: "";
    position: absolute;
    width: 84%;
    height: 50px;
    left: 50%;
    transform: translate(-50%, 0);
    top: 0;
    border-bottom: 1px dashed rgba(0, 0, 0, 0.4);
  }
  .zhong {
    position: relative;
    width: 20%;
    height: 94%;
    // border: 1px solid red;
    padding: 0 5px;
    font-size: 13px;
    .title-top {
      text-align: center;
    }
    .img {
      width: 25px;
      height: 25px;
      position: absolute;
      left: 50%;
      top: 25%;
      transform: translate(-49%, 0);
      z-index: 2;
      .cicle {
        width: 100%;
        height: 100%;
        background-color: #a3a3a3;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 50%;
        .logo {
          font-size: 12px;
          color: white;
        }
      }
    }
    .bottom {
      position: absolute;
      top: 80px;
      padding-left: 30%;
      p {
        padding-bottom: 8px;
      }
    }
  }
}
.green1 {
  background-color: #53da41 !important;
}
.yellow1 {
  background-color: #ecaf34 !important;
}
.red1 {
  background-color: #e03035 !important;
}
.back1 {
  color: black;
}
p {
  color: gray;
}
</style>
