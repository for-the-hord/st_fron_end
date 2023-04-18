
<template>
  <div class="stepOut">
    <ul>
      <li :class="step >= index+1 ? 'stepItem activeStepItem':'stepItem'" v-for="(item, index) in stepList" :key="index">
        <!-- 步骤名称  -->
        <p class="stepStatus">{{item.nodeName}}</p>
        <!-- 模拟步骤条的节点，此处为圆圈 -->
        <div :class="step >= index+1 ? 'icon stepActive':'icon'">
            <p class="icon-num">{{index+1}}</p>
        </div>
        <!-- 模拟步骤条连接线，动态显示  -->
        <div :class="step >= index+2 ? 'line lineActive':'line'" v-show="index!==stepList.length-1"></div>
        <!-- 审批状态 -->
        <p :class="item.nodeState==2? 'status red-text':'status'">{{item.nodeStateDesc}}</p>
        <!-- 审批信息 -->
        <div class="approve-info" v-if="item.nodeState != 0 && index > 0">
            <div :class="item.nodeState==2? 'red-text':''">审批意见：{{item.comment}}</div>
            <div>操作人：{{item.commentUser}}</div>
            <div>{{item.commentTime}}</div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'steps',
  props: {
    // 传递步骤参数
    stepList: {
      type: Array,
      default: function () {
        return [
              {
                title: "企业",
                status: "提交"
              },
              {
                title: "散装水泥发展服务中心",
                status: "初审"  
              },
              {
                title: "市环境攻坚办",
                status: "复审"  
              },
              {
                title: "市交警支队",
                status: "终审"  
              }
          ]
      }
    }
  },
  data() {
    return {
      // step: 3
    }
  },
  computed: {
    step: function () {
      let index
      this.stepList.forEach((v,inx) => {
        if(v.isCurrentNode) index = inx+1;
      })
      return index;
    }
  },
  watch: {
    
  }
}
</script>

<style lang="scss" scoped>
.stepOut {
  width: 100%;
  min-height: 90px;
  display: flex;
  justify-content: center;
  padding-bottom: 20px;
}
.stepItem {
    width: 230px;
    min-height: 90px;
    float: left;
    font-family: SimSun;
    font-size: 16px;
    text-align: center;
    position: relative;
    padding: 0 5px;
}
.icon {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background: rgba(226, 226, 226, 1);
    margin: 0 auto;
    position: relative;
    z-index: 888;
}
.icon-num {
    position: absolute;
    width: 20px;
    height: 20px;
    background: #e2e2e2;
    border-radius: 50%;
    left: 2px;
    top: 2px;
    font-size: 12px;
    font-weight: bold;
    line-height: 20px;
}
.stepActive {
    background-color: var(--multipleColor);
}
.line {
    position: absolute;
    top: 47px;
    left: 50%;
    border-bottom: 2px dashed #AEB5C3;
    width: 240px;
    z-index: 111;
}
.lineActive {
    border-bottom: 2px solid var(--multipleColor);
}
.stepStatus {
    color: #AEB5C3;
    line-height: 36px;
}
.status {
    color: #AEB5C3;
    line-height: 28px;
}
.approve-info {
    font-size: 12px;
    color: #AEB5C3;
}
.activeStepItem .stepStatus,.activeStepItem .status,.activeStepItem .approve-info,.activeStepItem .icon{
    color: var(--multipleColor);
}
.stepItem .red-text {
  color: #ED1C24;
}
</style>