<template>
  <d2-container>
    <div class="Aone-page">
      <div class="jigou">
        <el-form :inline="true" :model="formInline" :rules="rules" ref="formInline" class="demo-form-inline">
          <el-form-item label="试卷名称：" prop="content">
            <el-input v-model="formInline.name" clearable placeholder="请输入试卷名称"></el-input>
          </el-form-item>
          <el-form-item label="试卷等级：">
            <el-select v-model="formInline.state" prop="degree" clearable placeholder="请选择试卷状态">
              <el-option label="全部" value="0"></el-option>
              <el-option label="低" value="1"></el-option>
              <el-option label="中" value="2"></el-option>
              <el-option label="高" value="3"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="fetch()" icon="el-icon-search">查询</el-button>
            <el-button type="primary_test" @click="resetForm('formInline')">重置</el-button>
            <el-button type="primary_test" @click="addRow()" icon="el-icon-plus">添加试卷</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="qd-table" style="position: relative; margin: 0 auto">
        <el-table v-if="tableInfo.data" :data="tableInfo.data" style="width: 100%; color: white" v-loading="loading"
                  @cell-mouse-enter="hover_table_lds" @row-click="goDetail" :header-cell-style="header_style"
                  :cell-style="body_style" @selection-change="handleSelectionChange">
          <!-- <el-table-column type="selection" width="55"> </el-table-column> -->
          <el-table-column prop="name" label="试卷名称" :cell-style="timeStyle">
            <template slot-scope="scope">
              <span style="cursor: pointer; color: white" class="chaohcu"> {{ scope.row.name }}</span>
            </template>
          </el-table-column>
          <!-- <el-table-column prop="score" label="试卷总分"></el-table-column> -->
          <el-table-column prop="score" label="试卷等级">
            <template slot-scope="scope">
              <!-- // "type": 1, //题目类型：0-未知，1-单选，2-多选，3-判断 -->
              <span style="cursor: pointer" v-if="scope.row.level == 0">---</span>
              <span style="cursor: pointer" v-if="scope.row.level == 1">低</span>
              <span style="cursor: pointer" v-if="scope.row.level == 2">中</span>
              <span style="cursor: pointer" v-if="scope.row.level == 3">高</span>
            </template>
          </el-table-column>
          <el-table-column prop="revoked" label="试卷状态" :cell-style="timeStyle">
            <template slot-scope="scope">
              <el-tag type="success" v-if="scope.row.revoked == 0" @click="revokeRow(scope.row, 1)">启用</el-tag>
              <el-tag type="danger"  v-else @click="revokeRow(scope.row, 0)">禁用</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="begin_date" label="考核时间">
            <template slot-scope="scope">
              {{ getTime(scope.row.begin_date) }}
            </template>
          </el-table-column>
          <el-table-column prop="duration" label="考核时长">
            <template slot-scope="scope">
              {{ scope.row.duration }} min
            </template>
          </el-table-column>
          <el-table-column prop="state" label="考核状态" :cell-style="timeStyle">
            <template slot-scope="scope">
              <!-- // "type": 1, //题目类型：0-未知，1-单选，2-多选，3-判断 -->
              <span style="cursor: pointer" v-if="scope.row.state == 1"> 待考核</span>
              <span style="cursor: pointer" v-if="scope.row.state == 2"> 考核中</span>
              <span style="cursor: pointer" v-if="scope.row.state == 3"> 已完成</span>
            </template>
          </el-table-column>
          <el-table-column label="试卷题目" width="200">
            <template slot-scope="scope">
              <el-button @click="updateRow(scope.row)" icon="el-icon-edit" round size="mini" type="warning" plain>操作</el-button>
              <el-button @click="updateRow2(scope.row)" size="mini" round icon="el-icon-view" plain type="primary">查看</el-button>
              </template>
          </el-table-column>
          <el-table-column prop="add_user" label="修改人"></el-table-column>
          <el-table-column label="操作" width="200">
            <template slot-scope="scope">
              <i @click="editRow(scope.row)" class="m_spans_table_normal">编辑</i><el-divider direction="vertical"></el-divider>
              <i @click="deleteRow(scope.row)" class="m_spans_table_normal">删除</i><el-divider direction="vertical"></el-divider>
              <i @click="viewRow(scope.row)" class="m_spans_table_normal">查看</i>
            </template>
          </el-table-column>

        </el-table>
      </div>
      <br/>
      <div class="block qd-table">
        <el-pagination v-if="tableInfo.data.length > 1" @size-change="handleSizeChange"
                       @current-change="handleCurrentChange" :current-page.sync="currentPage_present" :page-size="10"
                       layout="prev, pager, next, jumper" :total="tableInfo.total">
        </el-pagination>

      </div>
      <div style="wdith: 100%; color: white; margin: 200px auto; text-align: center" v-if="tableInfo.data.length < 1">
        <br/>
        <span class="zanwu" style="color: gray"> 暂无数据</span>
      </div>
    </div>
    <qd-dialog
      :title="dialogInfo2.title"
      :visible.sync="dialogInfo2.visible"
      :width="dialogInfo2.width"
      :bt-loading="dialogInfo2.btLoading"
      :nofooter="true"
    >
      <el-form :model="formInline2" :rules="rules" ref="formInline2" class="demo-form-inline lds_form"
               label-width="120px">
        <el-form-item label="试卷名称：">
          <el-input v-model="formInline2.name" placeholder="请输入试卷名称" style="width: 80%" :disabled="isDisabled"></el-input>
        </el-form-item>
        <el-form-item label="试卷总分：">
          <el-input v-model="formInline2.score" placeholder="请输入试卷总分" type="numer" min="0" max="100"
                    style="width: 80%" :disabled="isDisabled"></el-input>
        </el-form-item>
        <el-form-item label="考核时长：">
          <el-input v-model="formInline2.duration" placeholder="请输入试考核时长（单位：分）" type="numer" min="0" style="width: 80%" :disabled="isDisabled">
          </el-input>
        </el-form-item>
        <el-form-item label="考核时间：">
          <el-date-picker
            v-model="paperBegin"
            type="datetime"
            @change="beginChange"
            :value-format="valueFormat"
            placeholder="开始时间"
            format="yyyy-MM-dd HH:mm"
            :disabled="isDisabled"
            >
          </el-date-picker>
          <span style="color:black; margin-left:10px; margin-right:10px">至</span>
          <el-date-picker
            v-model="paperEnd"
            type="datetime"
            @change="endChange"
            :value-format="valueFormat"
            placeholder="截止时间"
            format="yyyy-MM-dd HH:mm"
            :disabled="isDisabled"
            >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="试卷备注：" prop="content">
          <el-input v-model="formInline2.remark" :rows="4" type="textarea" clearable placeholder="请输入试卷名称"
                    style="width: 80%" :disabled="isDisabled"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitRow('formInline2')" v-if="visit < 3">提交</el-button>
          <el-button type="primary_test" @click="resetForm('formInline2')">取消</el-button>
        </el-form-item>
      </el-form>
    </qd-dialog>
  </d2-container>
</template>
<script>
import { paperList, paperDelete, paperEdit, paperCreate, paperRevoke} from "./big"

export default {
  name: "Paper",
  props:{
    valueFormat: {
        type: String,
        default: 'timestamp',//默认timestamp时间戳，也可设置'yyyy-MM-dd'：2019-03-22
      },
  },
  data() {
    return {
      tableInfo: {
        data: [],
        total: 0
      },
      formInline: {
        name: "",
        level: 0,
        page: 1,
        limit: 10,
        code: 1
      },
      dialogInfo2: {
        title: "",
        visible: false,
        width: "50%",
        btLoading: false
      },
      formInline2: {
        name: "",
        score: "",
        duration: "",
        begin_date: "",
        end_date: "",
        remark: ""
      },
      paperBegin: "",
      paperEnd: "",
      visit: 1,
      rules: {
        name: [{required: true, message: '请输入试卷名称', trigger: 'blur'}],
        score: [{required: true, message: '请输入试卷总分', trigger: 'blur'}],
        duration: [{required: true, message: '请输入考试时长', trigger: 'blur'}],
        paperDate: [{required: true, message: '请选择考核时间', trigger: 'blur'}]
      },
      isDisabled: false,
      paperId: 0
    }
  },
  created() {
    this.fetch();
  },
  methods: {
    fetch() {
      this.tableInfo.data = [];
      this.tableInfo.total = 0;
      paperList(this.formInline).then(res => {
        if (res.code == 200) {
          this.tableInfo = res.data
        } else {
          this.$message.error("系统异常")
        }
      })
    },
    revokeRow(row, revoked) {
      let nowDate = new Date();
      let nowUnix = parseInt((nowDate.getTime() / 1000).toFixed());
      if (nowUnix > row.begin_date) {
        this.$message.warning("评测已开始，暂不可操作！")
        return
      }
      let content = revoked === 1 ? "禁用" : "启用";
      this.$confirm(`确定要${content}评测试卷 <span style="color: red">${row.name}</span> 吗?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        center: true,
        type: 'warning',
        dangerouslyUseHTMLString: true
      }).then(() => {
        let params = { revoked: revoked }
        paperRevoke(row.id, params).then(res => {
          if (res.code == 200) {
            this.$message.success("操作成功！");
            this.fetch()
          } else {
            this.$message.error("操作失败！")
          }
        })
      }).catch(() => {
        this.$message.info("操作已取消")
      })
    },
    resetForm(formName) {
      console.log(formName);
      this.dialogInfo2.visible = false;
    },
    addRow() {
      this.visit = 1;
      this.dialogInfo2.title = "添加试卷";
      this.dialogInfo2.visible = true;
      this.initForm();
      this.isDisabled = false;
    },
    editRow(row) {
      let nowDate = new Date();
      let nowUnix = parseInt((nowDate.getTime() / 1000).toFixed());
      if (nowUnix > row.begin_date) {
        this.$message.warning("评测已开始，暂不可编辑！")
        return
      }
      this.visit = 2;
      this.paperId = row.id;
      this.dialogInfo2.title = "试卷编辑";
      this.dialogInfo2.visible = true;
      this.isDisabled = false;
      this.initForm();
      this.formInline2 = {...row};
      this.paperBegin = row.begin_date * 1000;
      this.paperEnd = row.end_date * 1000;
    },
    editRow2(row) {
      let nowDate = new Date();
      let nowUnix = parseInt((nowDate.getTime() / 1000).toFixed());
      if (nowUnix > row.begin_date) {
        this.$message.warning("评测已开始，暂不可编辑！")
        return
      }
      this.visit = 2;
      this.paperId = row.id;
      this.dialogInfo2.title = "试卷编辑";
      this.dialogInfo2.visible = true;
      this.isDisabled = false;
      this.initForm();
      this.formInline2 = {...row};
      this.paperBegin = row.begin_date * 1000;
      this.paperEnd = row.end_date * 1000;
    },
    viewRow(row){
      this.visit = 3;
      this.dialogInfo2.title = "试卷详情";
      this.dialogInfo2.visible = true;
      this.isDisabled = true;
      this.initForm();
      this.formInline2 = {...row};
      this.paperBegin = row.begin_date * 1000;
      this.paperEnd = row.end_date * 1000;
    },
    updateRow(row) {
       // 跳转试卷题目选择页
      let nowDate = new Date();
      let nowUnix = parseInt((nowDate.getTime() / 1000).toFixed());
      if (nowUnix > row.begin_date) {
        this.$message.warning("评测已开始，暂不可操作！")
        return
      }
      if (row.exist) {
        this.$message.warning("试卷已完成，暂不可操作！")
        return
      }
      this.$router.push({
        path: "/exam/paper/detail",
        query: {paperId: row.id}
       })
    },
    updateRow2(row) {
      if (!row.exist) {
        this.$message.warning("试卷未完成选题！")
        return
      }
      this.$router.push({
        path: "/exam/paper/detail2",
        query: {paperId: row.id}
       })
    },
    deleteRow(row) {
      let nowDate = new Date();
      let nowUnix = parseInt((nowDate.getTime() / 1000).toFixed());
      if (nowUnix > row.begin_date) {
        this.$message.warning("评测已开始，暂不可删除！")
        return
      }
      this.$confirm(`确定要删除<span style="color: red">${row.name}</span>吗？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        center: true,
        type: 'warning',
        dangerouslyUseHTMLString: true
      }).then(() => {
        paperDelete(row.id).then(res => {
          if (res.code == 200) {
            this.$message.success("操作成功")
          } else {
            this.$message.error("操作失败")
          }
        })
      }).catch(() => {
        this.$message.info("操作已取消")
      })
    },
    submitRow(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.visit == 1) {
            // 添加试卷
            paperCreate(this.formInline2).then(res => {
              if (res.code == 200) {
                this.$message.success("添加成功");
                this.fetch();
                this.dialogInfo2.visible = false;
              } else {
                this.$message.error("添加失败")
              }
            })
          } else if (this.visit == 2) {
            // 编辑试卷
            paperEdit(this.paperId, this.formInline2).then(res => {
              if (res.code == 200) {
                this.$message.success("编辑成功");
                this.dialogInfo2.visible = false;
              } else {
                this.$message.error("编辑失败")
              }
            })
          } else {
            this.$message.error("错误的操作")
          }
        }
      });

    },
    beginChange() {
      this.formInline2.begin_date = this.paperBegin / 1000 || 0;
    },
    endChange() {
      this.formInline2.end_date = this.paperEnd / 1000 || 0;
    },
    initForm() {
      this.formInline2 = {
        name: "",
        score: "",
        duration: "",
        begin_date: "",
        end_date: "",
        remark: ""
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
  }
}
</script>

<style scoped>

</style>
