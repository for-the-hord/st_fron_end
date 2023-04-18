<template>
  <d2-container style="cursor: pointer" ref="">
    <br />
    <br />
    <el-button
      class="tableHandleBtn"
      size="mini"
      icon="el-icon-plus"
      @click="addModule()"
      >添加模块
    </el-button>
    <el-button
      class="tableHandleBtn"
      size="mini"
      icon="el-icon-refresh"
      @click="refresh()"
      >刷新
    </el-button>
    <div class="wangpengs">
      <div class="tabletd_center qd-table">
        <el-table
          :data="moduleList"
          style="
            width: 100%;
            margin-bottom: 20px;
            margin-top: 10px;
            background: rgba(0, 16, 44, 1);
            border: none !important;
          "
          row-key="id"
          border
          center
          default-expand-all
          :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
        >
          <el-table-column
            type="index"
            label="序号"
            width="150"
            align="center"
          ></el-table-column>
          <el-table-column prop="title" label="模块名称"></el-table-column>
          <el-table-column
            prop="id"
            label="模块ID"
            width="150"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="path"
            label="模块路径"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="mod_order"
            label="模块排序"
            width="150"
            align="center"
          ></el-table-column>
          <el-table-column label="模块状态" width="150" align="center">
            <template slot-scope="scope">
              <el-tag
                type="success"
                v-if="scope.row.revoked == 0"
                @click="isRevoked(1, scope.row.title, scope.row.id)"
                >禁用
              </el-tag>
              <el-tag
                type="danger"
                v-else
                @click="isRevoked(0, scope.row.title, scope.row.id)"
                >启用</el-tag
              >
            </template>
          </el-table-column>
          <el-table-column label="操作" width="150" align="center">
            <template slot-scope="scope">
              <el-button
                type="text"
                icon="el-icon-edit"
                @click="editModule(scope.row)"
                >编辑</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <qd-dialog
      :label_lds="true"
      :title="moduleDialog.title"
      :visible.sync="moduleDialog.visible"
      :width="moduleDialog.width"
      :bt-loading="moduleDialog.btLoading"
      @handleOk="submitForm('ruleForm')"
      @quxiao="cancel()"
    >
      <div class="lds_dialog_form">
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="120px"
          class="demo-ruleForm"
        >
          <el-form-item label="模块名称" prop="title">
            <el-input v-model="ruleForm.title" type=""></el-input>
          </el-form-item>
          <el-form-item label="上级模块" prop="parent_id">
            <el-select
              v-model="ruleForm.parent_id"
              clearable
              placeholder="请选择"
            >
              <el-option
                v-for="item in moduleOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="模块路径" prop="path">
            <el-input v-model="ruleForm.path" type=""></el-input>
          </el-form-item>
          <el-form-item label="模块值" prop="mod_value">
            <el-input v-model="ruleForm.mod_value" type=""></el-input>
          </el-form-item>
          <el-form-item label="模块排序" prop="mod_order">
            <el-input v-model="ruleForm.mod_order" type=""></el-input>
          </el-form-item>
        </el-form>
      </div>
    </qd-dialog>
  </d2-container>
</template>

<script>
import {
  getModule,
  revokedModule,
  createEditModule,
} from "@/common/login_system.js";

export default {
  name: "module",
  data() {
    return {
      moduleId: 0,
      moduleList: [],
      moduleOptions: [],
      moduleDialog: {
        title: "",
        visible: false,
        width: 60,
        btLoading: false,
      },
      rules: {
        name: [{ required: true, validator: "", trigger: "blur" }],
        parent_id: [{ required: true, validator: "", trigger: "blur" }],
        path: [{ required: true, validator: "", trigger: "blur" }],
      },
      ruleForm: {
        title: "",
        parent_id: 0,
        path: "",
        mod_order: 0,
        mod_value: "",
      },
    };
  },
  methods: {
    addModule: function () {
      this.moduleDialog.title = "添加模块";
      this.moduleDialog.visible = true;
    },
    editModule: function (row) {
      this.moduleDialog.title = "编辑模块";
      this.moduleDialog.visible = true;
      this.ruleForm = { ...row };
      this.moduleId = row.id;
    },
    refresh: function () {
      this.freshTableList();
    },
    freshTableList: function () {
      getModule().then((res) => {
        let _data = res.data;
        this.moduleList = _data;
        this.moduleOptions = [{ value: 0, label: "无父级模块" }];
        _data.forEach((item) => {
          if (item.revoked === 0 && item.parent_id === 0) {
            this.moduleOptions.push({ value: item.id, label: item.title });
          }
        });
      });
    },
    isRevoked: function (value, title, moduleId) {
      let content = value === 0 ? "启用" : "禁用";
      this.$confirm(
        `确定要${content} <span style="color: red">${title}</span> 模块吗?`,
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
          center: true,
          dangerouslyUseHTMLString: true,
        }
      )
        .then(() => {
          revokedModule(moduleId, value)
            .then(() => {
              this.$message({
                type: "success",
                message: "操作成功",
              });
              this.refresh();
            })
            .catch(() => {
              this.$message({
                type: "error",
                message: "操作失败",
              });
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "操作已取消",
          });
        });
    },
    submitForm() {
      createEditModule(this.moduleId, this.ruleForm)
        .then(() => {
          this.$message({
            type: "success",
            message: "操作成功",
          });
          this.refresh();
        })
        .catch(() => {
          this.$message({
            type: "error",
            message: "操作失败",
          });
        })
        .finally(() => {
          this.cancel();
        });
      if (this.moduleId) {
      }
    },
    cancel: function () {
      this.ruleForm = {};
      this.moduleId = 0;
      this.moduleDialog.title = "";
      this.moduleDialog.visible = false;
    },
  },
  created() {
    this.freshTableList();
  },
};
</script>

<style scoped>
@import "bg.css";

.tableHandleBtn {
    background-image: linear-gradient(#F68A00, #99430E);
   color: white;
  margin-left: 30px;
    border: 1px solid #fff0;

}
</style>
