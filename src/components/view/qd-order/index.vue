<template>
  <div class="container">
    <div class="zhong" v-for="(item, index) in ValueArr" :key="index">
      <!-- 状态值 0待审核 1计划安排中 2实验室配比中 3调度中 4已完成 5已关闭-->
      <div class="title-top">
        <!-- 未执行的步骤字体为灰色 -->
        <p :class="[{ back1: item.currentState != -1 || state == 4 }]">
          {{ title[index].text }}
        </p>
      </div>
      <div class="img">
        <div
          class="cicle"
          :class="[
            {
              green1: (item.currentState != -1 && index <= state) || state == 4,
            }, //单个状态已完成
            { gray1: item.currentState === -1 && index > state && state != 4 }, //未审批到的步骤
            { yellow1: index === state && state != 4 }, //单个状态进行中
          ]"
        >
          <p
            class="iconfontnew iconjian logo"
            :class="[
              {
                iconduihao:
                  (item.currentState != -1 && index != state) || state == 4,
              }, //
              {
                iconjinhangzhong:
                  (index === state || item.currentState === -1) && state != 4,
              }, //审批中以及未进行到步骤
            ]"
          ></p>
        </div>
      </div>
      <!-- {{ index }} -->
      <div class="bottom">
        <!-- 待审核 -->
        <template
          v-if="index == 0 && item.nickname != '' && item.nickname != null"
        >
          <p>审核人：{{ item.nickname }}</p>
          <p>时间：{{ item.startTime }}</p>
        </template>
        <!-- 调度中 -->
        <template v-if="index == 3 && taskCount != 0">
          <p>共有{{ taskCount }}条运输任务</p>
        </template>
        <!-- 其它状态 -->
        <template
          v-if="
            index != 0 &&
            index != 3 &&
            item.nickname != '' &&
            item.nickname != null
          "
        >
          <p>操作人：{{ item.nickname }}</p>
          <p>时间：{{ item.startTime }}</p>
        </template>
        <!-- 订单完成时，最后一个状态操作人信息 -->
        <template
          v-if="
            index == 4 &&
            ValueArr[3].nickname != '' &&
            ValueArr[3].nickname != null &&
            state == 4
          "
        >
          <p>操作人：{{ ValueArr[3].nickname }}</p>
          <p>时间：{{ ValueArr[3].startTime }}</p>
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
        { text: "订单审核" },
        { text: "计划安排" },
        { text: "实验室配比" },
        { text: "调度中" },
        { text: "已完成" },
      ],
    };
  },
  watch: {
    arr: {
      deep: true,
      handler: function (newValue, oldValue) {
        console.log(newValue);
      },
    },
  },
  props: {
    ValueArr: {
      type: Array,
    },
    taskCount: {
      type: Number,
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
    width: 80%;
    height: 50px;
    left: 50%;
    transform: translate(-50%, 0);
    top: 0;
    border-bottom: 1px dashed rgba(0, 0, 0, 0.4);
  }
  .zhong {
    position: relative;
    width: 30%;
    height: 94%;
    // border: 1px solid red;
    // padding: 0 10px;
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
      padding-left: 35%;
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
.gray1 {
  background-color: gray !important;
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
