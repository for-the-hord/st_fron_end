<template>
  <div class="upload_lds" style="margin-left: 30px; text-align: left">
    <el-upload
      :http-request="uploadCommit"
      :limit="limitNum"
      :auto-upload="true"
      accept=".tar"
      :headers="headers2"
      :name="image"
      :before-upload="beforeUploadFile"
      :on-change="fileChange"
      :on-exceed="exceedFile"
      :on-success="uploadSuccess"
      :on-error="uploadError"
      :file-list="fileList"
      :show-file-list="false"
      class="uploadClass"
      :disabled="loadVisible"

    >
      <!-- <span>请选择要导入的文件：</span> -->
      <el-button
        :loading="loadVisible"
        :disabled="loadVisible"
         type="small"
        style="background: #0cb1cd; border: none; color: white"
        class="el-icon-plus avatar-uploader-icon"
        >{{loadButton}}</el-button
      >
    </el-upload>
    <!-- <br />
    <br />
    <el-button
      style="margin-left: 10px"
      size="small"
      type="primary"
      @click="uploadFile"
      >上传</el-button
    > -->
    <!-- <el-button size="small">取消</el-button> -->
    <!-- <el-dialog
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
          <el-progress
            :text-inside="true"
            :stroke-width="50"
            :percentage="percent"
            status="success"
          ></el-progress>
        </div>
        <div>
          <a v-for="item in percentList" style="margin-bottom: 20px"
            >{{ item }}<br />
          </a>
        </div>
        <div>
          <a v-if="cancelShow">处理结果文件已下载，请注意查看！</a>
        </div>
      </div>
      <span slot="footer" class="dialog-footer" v-if="cancelShow">
        <el-button @click="dialogVisible = false" size="small" type="primary"
          >关闭</el-button
        >
      </span>
    </el-dialog> -->

    <qd-dialog
      :label_lds="true"
      :title="dialogInfo4.title"
      :visible.sync="dialogInfo4.visible"
      :width="dialogInfo4.width"
      :bt-loading="dialogInfo4.btLoading"
      @handleOk="submitForm4('')"
      @quxiao="quxiao()"
      :nofooter="true"
      :isOk="isok"
    >
      <div class="uploadText" style="text-align: left">
        <div
          v-if="percent != 100"
          style="margin-bottom: 10px; color: #7aebfc; float: left"
        >
          数据正在处理中
        </div>
        <div
          v-if="percent == 100"
          style="margin-bottom: 10px; color: #7aebfc; float: left"
        >
          处理成功，处理结果文件已下载，请注意查看！
        </div>
        <a v-for="item in percentList" style="margin-bottom: 20px; float: right"
          >{{ item }}
        </a>

        <div>
          <el-progress
            :text-inside="true"
            :percentage="percent"
            :stroke-width="50"
            :color="setColor"
          ></el-progress>
        </div>
        <div></div>
        <div style="margin-top: 20px">
          <a v-if="cancelShow">处理结果文件已下载，请注意查看！</a>
        </div>
      </div>
    </qd-dialog>
  </div>
</template>

<script>
export default {
  name: "Upload",
  props: {
    url_url: "",
  },
  data() {
    return {
      countsadd: 1,
      image: "image",
      headers2: { token: sessionStorage.getItem("token") },
      dialogInfo4: {
        title: "查看",
        visible: false,
        width: "600px",
      },
      limitNum: 1,
      fileList: [],
      dialogVisible: false,
      percent: 0,
      percentList: [],
      cancelShow: false,
      loadVisible: false,
      loadButton: "选择文件"
    };
  },
  methods: {
    uploadCommit(fileObj) {
      this.loadVisible = true; 
      this.loadButton = "正在上传";
      // 功能：镜像分段上传
      let file = fileObj.file;
      // 已上传文件大小
      let uploadSize = 0;
      // 待上传文件大小
      let nextUploadSize = 0;
      // 分段上传的次数
      let uploadIndex = 1;
      let fileSize = file.size;
      // 每次上传的文件大小
      let perUploadSize = 1024 * 1024 * 5;
      // 总共需要上传的次数
      let totalPieces = Math.ceil(fileSize / perUploadSize);
      while (uploadSize < fileSize) {
        nextUploadSize = uploadSize + perUploadSize;
        if (nextUploadSize > fileSize) {
          nextUploadSize = fileSize;
        }
        // 切割需要上传的文件
        let chunk = file.slice(uploadSize, nextUploadSize);
        let sliceIndex = `${file.name}_${uploadIndex}`;
        let formData = new FormData();
        formData.append("file", chunk);
        formData.append("index_name", sliceIndex);
        formData.append("uuid", file.uid);
        formData.append("file_name", file.name);
        formData.append("total", totalPieces);
        console.log(totalPieces, "totalPieces");
        // 添加上传请求
        let uploadUrl = this.url_url;
        this.$axios
          .post(uploadUrl, formData, {
            headers: { token: sessionStorage.getItem("token") },
          })
          .then((res) => {
            if(res.data.data){
              this.fileList = [];
              this.loadVisible = false;
              this.loadButton = "选择文件";
              this.$emit("child-event", res.data.data);
              this.$message.success("文件上传成功");
            }
          });

        // -----------
        uploadSize = nextUploadSize;
        uploadIndex++;
      }
    },
    setColor() {
      return "/image/mmind/tiaowen.png";
    },
    // 文件超出限制钩子
    exceedFile: function (files, fileList) {
      this.$message.warning(
        `只能选择${this.limitNum}个文件，当前已经选择了${
          files.length + fileList.length
        }个`
      );
    },
    // 文件状态改变时钩子
    fileChange: function (file, fileList) {
      console.log(file, "ssss");
      let extension = file.name.substring(file.name.lastIndexOf(".") + 1);
      console.log(extension);
      let size = file.size / 1024 / 1024;
      if (extension !== "tar") {
        this.$message.warning("只能选择tar类型文件");
        this.fileList = [];
        return false;
      }
      //   if (size > 100) {
      //     this.$message.warning("文件大小不得超过100M");
      //     this.fileList=[]

      //     return false
      //   }
      else {
        this.fileList.push(file.raw);
      }
    },
    // 上传文件前钩子
    beforeUploadFile: function (file) {
      console.log(file, "ssss");
      let extension = file.name.substring(file.name.lastIndexOf(".") + 1);
      console.log(extension);
      let size = file.size / 1024 / 1024;
      if (extension !== "tar") {
        this.$message.warning("只能选择tar类型文件");
        this.fileList = [];
        return false;
      }
      //   if (size > 100) {
      //     this.$message.warning("文件大小不得超过100M");
      //     this.fileList=[]

      //     return false
      //   }
      else {
        this.fileList.push(file.raw);
      }
    },
    // uploadUrl: function () {
    //   if (this.fileList.length === 0) {
    //     this.$message.warning("请选择文件");
    //   } else {
    //     let form = new FormData();
    //     form.append("image", this.fileList[0]);
    //     // this.dialogVisible = true;
    //     let uploadUrl = this.url_url;
    //     this.$axios
    //       .post(uploadUrl, form, {
    //         headers: { token: sessionStorage.getItem("token") },
    //       })
    //       .then((res) => {
    //         console.log(res, "sss");

    //         // code: 536c63d2-0f0a-426c-bdf7-452a2a837121
    //         // this.dialogInfo4.visible = true;
    //         // let that = this;
    //         // that.socket = this.$sockets("process");
    //         // that.socket.emit("BatchDeal", {
    //         //   code: res.data.data.code,
    //         //   type: 3,
    //         //   token: sessionStorage.getItem("token"),
    //         // });
    //         // that.socket.on(`BatchDealResponse`, function (res) {
    //         //   if (res.data.code === 200) {
    //         //     that.percentList = [];
    //         //     that.percent = res.data.percent;
    //         //     that.percentList.push(res.data.msg);
    //         //     if (res.data.data !== "") {
    //         //       // let downloadUrl = `http://127.0.0.1:5001/api/download/?file_name={res.data.data}&type=1`
    //         //       // that.downloadExcel(downloadUrl, "处理结果.xlsx")
    //         //       that.cancelShow = true;
    //         //     }
    //         //   } else {
    //         //     that.$message.error(res.data.msg);
    //         //     return false;
    //         //   }
    //         // });
    //       })
    //       .catch(() => {
    //         this.uploadError();
    //       })
    //       .finally(() => {
    //         this.fileList = [];
    //       });
    //   }
    // },
    // 文件上传成功钩子
    uploadSuccess: function (res, file, fileList) {
      this.fileList = [];
      this.$emit("child-event", res.data);

      this.$message.success("文件上传成功");
    },
    // 文件上传失败钩子
    uploadError: function (res, file, fileList) {
      this.$message.error("文件上传失败");
    },
    // uploadFile() {
    //   if (this.fileList.length === 0) {
    //     this.$message.warning("请选择文件");
    //   } else {
    //     let form = new FormData();
    //     form.append("image", this.fileList[0]);
    //     // this.dialogVisible = true;
    //     let uploadUrl = this.url_url;
    //     this.$axios
    //       .post(uploadUrl, form, {
    //         headers: { token: sessionStorage.getItem("token") },
    //       })
    //       .then((res) => {
    //         console.log(res, "sss");
    //         this.$emit("child-event", res.data);

    //         // code: 536c63d2-0f0a-426c-bdf7-452a2a837121
    //         // this.dialogInfo4.visible = true;
    //         // let that = this;
    //         // that.socket = this.$sockets("process");
    //         // that.socket.emit("BatchDeal", {
    //         //   code: res.data.data.code,
    //         //   type: 3,
    //         //   token: sessionStorage.getItem("token"),
    //         // });
    //         // that.socket.on(`BatchDealResponse`, function (res) {
    //         //   if (res.data.code === 200) {
    //         //     that.percentList = [];
    //         //     that.percent = res.data.percent;
    //         //     that.percentList.push(res.data.msg);
    //         //     if (res.data.data !== "") {
    //         //       // let downloadUrl = `http://127.0.0.1:5001/api/download/?file_name={res.data.data}&type=1`
    //         //       // that.downloadExcel(downloadUrl, "处理结果.xlsx")
    //         //       that.cancelShow = true;
    //         //     }
    //         //   } else {
    //         //     that.$message.error(res.data.msg);
    //         //     return false;
    //         //   }
    //         // });
    //       })
    //       .catch(() => {
    //         this.uploadError();
    //       })
    //       .finally(() => {
    //         this.fileList = [];
    //       });
    //   }
    // },
  },
};
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