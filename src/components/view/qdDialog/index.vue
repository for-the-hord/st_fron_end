<template>
  <el-dialog
    :title="title"
    :visible.sync="visible"
    :width="width"
    :before-close="handleClose"
    :append-to-body="appendToBody"
    :close-on-click-modal="false"
    :destroy-on-close="true"
    :closed="close_lds"
    class="qd-dialog"
    :class="className"
    :showClose="true"
  >
    <slot />
    <div v-if="!nofooter" slot="footer" class="dialog-footer">
      <el-button
        type="cancel"
        size="mini"
        style="
          margin-right: 16px;
          border: 1px solid #2caef2;
          color: #2caef2;
          border-radius: 4px;
          background: #023F4A; 
        "
        @click="handleClose"
        >{{ isBack === 0 ? "取消" : "否" }}</el-button
      >
      <el-button
        style="background: #008397; color: white"
        size="mini"
        :disabled="btLoading"
        :loading="btLoading"
        @click.stop="$emit('handleOk')"
        >{{ newname }}</el-button
      >
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: "qdDialog",
  props: {
    //确认按钮
    isOk: {
      type: Number,
      default: 0,
    },
    isBack: {
      type: Number,
      default: 0,
    },
    // 自定义类名
    className: {
      type: String,
    },
    // 弹窗标题
    title: {
      type: String,
      default: "提示",
    },
    // 弹窗是否显示
    visible: {
      type: Boolean,
      default: false,
    },
    // 弹窗宽度
    width: {
      type: String,
    },
    // 按钮加载
    btLoading: {
      type: Boolean,
    },
    // 插入到body
    appendToBody: {
      type: Boolean,
      default: true,
    },
    nofooter: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      isShow: false,
    };
  },
  computed: {
    newname() {
      switch (this.isOk) {
        case 0:
          return "确认";
          break;
        case 1:
          return "确认停用";
          break;
        case 2:
          return "确认恢复";
          break;
        case 3:
          return "确认变更";
          break;
        case 4:
          return "确认提交";
          break;
        case 5:
          return "提交";
          break;
        case 6:
          return "是";
          break;
        case 7:
          return "确认拒绝";
          break;
        default:
          break;
      }
    },
  },
  watch: {
    visible(val) {
      this.isShow = val;
      this.$emit("update:visible", val);
    },
    isShow(val) {
      this.$emit("update:visible", val);
    },
  },
  methods: {
    // 派发按钮点击事件
    handleClick(event, data) {
      this.$emit("handleOk");
    },
    // 关闭弹窗前的回调
    handleClose(done) {
      this.$emit("update:visible", false);
      this.$emit("quxiao");
    },
  },
};
</script>

<style lang="scss">
.qd-dialog {
  border-radius: 8px;
  .el-dialog {
    border-radius: 4px;
    top: 0%;
    background: #fff0 !important;
    .el-form-item__label {
      color: black !important;
      text-align: left;
      width: 120px !important;
    }
    .lds_form   .el-form-item__label {
        width: 100px !important;
        text-align: right;

    }
    .lds  .el-form-item__label{
      margin-left: -10px;
    }
    .el-form-item{
  margin-bottom: 10px !important;
    }
  }
  .el-dialog__header {
    height: 48px;
    line-height: 48px;
    padding: 0 16px;
    border-radius: 8px 8px 0 0;
    text-align: left !important;
    background-color: #f5f7fa !important;
    text-align: center;
    border-bottom: 1px solid #f5f7fa;
    color: black !important;
    .el-dialog__close {
      color: black !important;
    }
    .el-dialog__title {
      line-height: 40px;
      font-size: 15px;
      color: black!important;
    }
    .el-dialog__headerbtn {
      top: 12px;
      // display: none !important;
    }
  }
  .el-dialog__body {
    padding: 16px;
    overflow-y: auto;
    max-height: 65vh;
    text-align: center;
    background: #f5f7fa;
    color: white;
    border: 1px solid #04505E;
    // border-radius: 0 0 10px 10px;

    .el-form-item__content {
      text-align: left;
      margin-top: 12px;
      margin-left: 120px !important;
    }
    .lds_form  .el-form-item__content {
      text-align: left;
      margin-top: 12px;
      margin-left: 20px !important;
    }
    .lds  .el-form-item__content{
      width: 74%;
    }
   
    .lds{
    width: 100%;
    }
  }
  .el-dialog__footer {
    padding: 0 12px 20px 12px;
    text-align: right;
    background: #f5f7fa;

    &.right {
      text-align: right;
    }
    button {
      min-width: 70px;
      border-radius: 2px;
      border: 1px solid #009BB6 !important;
    }
  }
}
</style>
