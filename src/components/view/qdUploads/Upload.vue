<template>
  <div style="margin-left: 30px">
    <el-upload
      :action="uploadUrl"
      :limit="limitNum"
      :auto-upload="false"
      accept=".tar"
      :before-upload="beforeUploadFile"
      :on-change="fileChange"
      :on-exceed="exceedFile"
      :on-success="uploadSuccess"
      :on-error="uploadError"
      :file-list="fileList"
      class="uploadClass"
    >
      <el-button type="small" class="el-icon-plus avatar-uploader-icon">选择文件</el-button>
    </el-upload>
    <el-button style="margin-left: 10px;" size="small" type="primary" @click="uploadFile">上传</el-button>
    <el-button size="small">取消</el-button>
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%"
      :close-on-press-escape="false"
      :close-on-click-modal="false"
      center
      :show-close="false"
    >
      <div class="uploadText">
        <div v-if="!cancelShow" style="margin-bottom: 10px">数据正在处理中</div>
        <div>
          <el-progress :text-inside="true" :stroke-width="50" :percentage="percent" status="success"></el-progress>
        </div>
        <div>
          <a v-for="(item) in percentList" style="margin-bottom: 20px">{{ item }}<br/></ a>
        </div>
        <div>
          <a v-if="cancelShow">处理结果文件已下载，请注意查看！</ a>
        </div>
      </div>
      <span slot="footer" class="dialog-footer" v-if="cancelShow">
          <el-button @click="dialogVisible = false" size="small" type="primary">关闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>

export default {
  name: "Upload",
  data() {
    return {
      limitNum: 1,
      fileList: [],
      dialogVisible: false,
      percent: 0,
      percentList: [],
      cancelShow: false
    }
  },
  methods: {
    // 文件超出限制钩子
    exceedFile: function (files, fileList) {
      this.$message.warning(`只能选择${this.limitNum}个文件，当前已经选择了${files.length + fileList.length}个`)
    },
    // 文件状态改变时钩子
    fileChange: function (file, fileList) {
      this.fileList.push(file.raw)
    },
    // 上传文件前钩子
    beforeUploadFile: function (file) {
      let extension = file.name.substring(file.name.lastIndexOf(".") + 1);
      console.log(extension)
      let size = file.size / 1024 / 1024;
      if (extension !== "tar"  ) {
        this.$message.warning("只能上传tar文件")
      }
      if (size > 10) {
        this.$message.warning("文件大小不得超过10M")
      }
    },
    uploadUrl: function () {
      return ""
    },
    // 文件上传成功钩子
    uploadSuccess: function (res, file, fileList) {
      this.fileList = [];
      this.$message.success("文件上传成功")
    },
    // 文件上传失败钩子
    uploadError: function (res, file, fileList) {
      this.$message.error("文件上传失败")
    },
    uploadFile: function () {
      if (this.fileList.length === 0) {
        this.$message.warning("请选择文件")
      } else {
        let form = new FormData();
        form.append("file", this.fileList[0]);
        // this.dialogVisible = true;
        // let uploadUrl = "http://172.16.12.176:9003/api/upload/3/";
         let uploadUrl = 'http://172.16.12.176:9003/api/knowledge/upload/'
        // 
        this.$axios.post(uploadUrl, form, {headers: {token: sessionStorage.getItem("token")}}).then((res) => {
          // code: 536c63d2-0f0a-426c-bdf7-452a2a837121
          this.dialogVisible = true;
          let that = this;
          that.socket = this.$sockets("process");
          that.socket.emit("BatchDeal", {code: res.data.data.code, type: 1, token: sessionStorage.getItem("token")});
          that.socket.on(`BatchDealResponse`, function (res) {
            if (res.data.code === 200) {
              that.percent = res.data.percent;
              that.percentList.push(res.data.msg)
              if (res.data.data !== "") {
                // let downloadUrl = `http://127.0.0.1:5001/api/download/?file_name={res.data.data}&type=1`
                // that.downloadExcel(downloadUrl, "处理结果.xlsx")
                that.cancelShow = true
              }
            } else {
              that.$message.error(res.data.msg)
              return false
            }
          });
        }).catch(() => {
          this.uploadError()
        }).finally(() => {
          this.fileList = [];
        })
      }
    }
  }
}
</script>

<style scoped>
.uploadClass {
  display: inline-block !important;
  line-height: normal;
}

.uploadText {
  margin: 0 auto;
  text-align: center;
  font-size: 16px;
}
</style>