<template>
  <d2-container>
    <div class="Aone-page">
      <div class="jigou">
        <el-form :inline="true" :model="formInline" ref="formInline" class="demo-form-inline">
          <el-form-item label="搜索单位：" prop="unit_name">
            <el-input v-model="formInline.unit_name" clearable placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="fetch()" icon="el-icon-search">查询</el-button>
            <el-button type="primary_test" @click="resetForms('formInline')">重置</el-button>
            <el-button type="primary_test" @click="delRow()" icon="el-icon-folder-delete">批量删除</el-button>
            <el-button type="primary_test" @click="addData()" icon="el-icon-edit-outline">新增单位</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="qd-table" style="position: relative; margin: 0 auto">
        <el-table
          v-if="tableInfo.data"
          :data="tableInfo.data"
          style="width: 100%"
          stripe
          v-loading="loading"
          @cell-mouse-enter="hover_table_lds"
          @row-click="goDetail"
          :header-cell-style="header_style"
          :cell-style="body_style"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55"> </el-table-column>
          <el-table-column prop="name" label="单位名称" :cell-style="timeStyle">
            <template slot-scope="scope">
              <span style="cursor: pointer"> {{ scope.row.name }}</span>
            </template>
          </el-table-column>

          <el-table-column label="操作" width="500">
            <template slot-scope="scope">
              <el-button type="primary" @click="editRow(scope.row)" size="mini">编辑</el-button>
              <el-button type="danger" @click="deleteRow(scope.row)" size="mini">删除</el-button>
              <el-button type="primary" @click="viewRow(scope.row)" size="mini">复制</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <br />
      <div class="block qd-table">
        <el-pagination
          v-if="tableInfo.data.length > 0"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage_present"
          :page-size="10"
          layout="total, prev, pager, next, jumper"
          :total="tableInfo.total"
        >
        </el-pagination>
      </div>

      <div style="wdith: 100%; color: white; margin: 200px auto; text-align: center" v-if="tableInfo.data.length < 1">
        <br />
        <span class="zanwu" style="color: gray"> 暂无数据</span>
      </div>
    </div>
    <transition name="fade-scale">
      <div class="new_tan" v-show="new_visible">
        <div class="new_dio">
          <i class="el-icon-close new_close" @click="new_close"></i>

          <el-form
            :model="formInline3"
            :rules="rules"
            ref="formInline3"
            class="demo-form-inline lds_form"
            label-width="120px"
          >
            <el-form-item label="模板名称：" prop="name">
              <el-input v-model="formInline3.name" placeholder="请输入模板名称" style="width: 80%"></el-input>
            </el-form-item>
            <el-form-item label="装备名称：" prop="equipment_name">
              <el-input v-model="formInline3.equipment_name" placeholder="请输入模板名称" style="width: 80%"></el-input>
            </el-form-item>
            <el-form-item label="是否上传文件：" prop="is_file" v-if="flag == 1">
              <el-radio v-model="formInline3.is_file" label="1">是</el-radio>
              <el-radio v-model="formInline3.is_file" label="0">否</el-radio>
            </el-form-item>

            <el-form-item label="导入文件：" v-show="flag == 0">
              <!-- <el-button type="primary" icon="" @click="doExport()">导出文件</el-button> -->
              <input
                style="font-size: 16px"
                type="file"
                id="Luckyexcel-demo-file"
                class="Luckyexcel-demo-file"
                name="Luckyexcel-demo-file"
                @change="demoHandler"
                value="导入文件"
              />
            </el-form-item>

            <div id="luckysheet" class="luckysheet-content lucky_doudou" style="height: 400px"></div>
            <br />

            <el-form-item style="text-align: right !important" v-show="flag == 1">
              <el-button type="primary" @click="submitRow1('formInline3')">提交模板</el-button>

              <el-button type="primary_test" @click="resetForm_doudou('formInline3')">取消</el-button>
            </el-form-item>
            <el-form-item style="text-align: right !important" v-show="flag == 0">
              <el-button type="primary" @click="submitRow2('formInline3')">提交导入</el-button>

              <el-button type="primary_test" @click="reset('formInline3')">取消</el-button>
            </el-form-item>
            <el-form-item style="text-align: right !important" v-show="flag == 3">
              <el-button type="primary" @click="submitRow3('formInline3')">提交修改</el-button>

              <el-button type="primary_test" @click="reset('formInline3')">取消</el-button>
            </el-form-item>
            <el-form-item style="text-align: right !important" v-show="flag == 4">
              <el-button type="primary" icon="" @click="doExport()">导出模板</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </transition>
    <qd-dialog
      :title="dialogInfo2.title"
      :visible.sync="dialogInfo2.visible"
      :width="dialogInfo2.width"
      :bt-loading="dialogInfo2.btLoading"
      :nofooter="true"
    >
      <el-form
        :model="formInline4"
        :rules="rules4"
        ref="formInline4"
        class="demo-form-inline lds_form"
        label-width="120px"
      >
        <el-form-item label="单位名称：" prop="name">
          <el-input v-model="formInline4.name" placeholder="请输入单位名称" style="width: 80%"></el-input>
        </el-form-item>
        <el-form-item label="模板：" prop="template_ids">
          <el-checkbox-group v-model="formInline4.template_ids">
            <el-checkbox
              v-for="(item, key) in body_list"
              :key="item.id"
              :label="item.id"
              name="template_ids"
              :value="item.id"
            >
              {{ item.name }}
            </el-checkbox>
          </el-checkbox-group>
        </el-form-item>

        <el-form-item style="text-align: right !important" v-show="danwei == 1">
          <el-button type="primary" @click="submitRow3('formInline4')">新增单位</el-button>
          <el-button type="primary_test" @click="reset('formInline4')">取消</el-button>
        </el-form-item>

        <el-form-item style="text-align: right !important" v-show="danwei == 2">
          <el-button type="primary" @click="submitRow4('formInline4')">修改单位</el-button>
          <el-button type="primary_test" @click="reset('formInline4')">取消</el-button>
        </el-form-item>
      </el-form>
    </qd-dialog>
  </d2-container>
</template>
<script>
import {
  getUnit,
  addUnit,
  putUnitItem,
  delUnit,
  getDataInfo,
  getUnitSearch,
  getTemplateSearch,
  getFormwork,
  addFormwork,
  delFormwork,
  putFormworkItem,
  paperEdit,
  paperCreate,
  paperRevoke,
} from './big';

export default {
  name: 'Paper',
  props: {
    valueFormat: {
      type: String,
      default: 'timestamp', //默认timestamp时间戳，也可设置'yyyy-MM-dd'：2019-03-22
    },
  },
  data() {
    return {
      options: {
        container: 'luckysheet', // 设定DOM容器的id
        title: '数据填报系统表格', // 设定表格名称
        lang: 'zh', // 设定表格语言
        showtoolbarConfig: false,
        data: [
          {
            name: 'Cell', //工作表名称
            color: '', //工作表颜色
            index: 0, //工作表索引
            status: 1, //激活状态
            order: 0, //工作表的下标
            hide: 0, //是否隐藏
            row: 36, //行数
            column: 18, //列数
            defaultRowHeight: 19, //自定义行高
            defaultColWidth: 73, //自定义列宽
            celldata: [], //初始化使用的单元格数据
            config: {
              merge: {}, //合并单元格
              rowlen: {}, //表格行高
              columnlen: {}, //表格列宽
              rowhidden: {}, //隐藏行
              colhidden: {}, //隐藏列
              borderInfo: {}, //边框
              authority: {}, //工作表保护
            },
            scrollLeft: 0, //左右滚动条位置
            scrollTop: 315, //上下滚动条位置
            luckysheet_select_save: [], //选中的区域
            calcChain: [], //公式链
            isPivotTable: false, //是否数据透视表
            pivotTable: {}, //数据透视表设置
            filter_select: {}, //筛选范围
            filter: null, //筛选配置
            luckysheet_alternateformat_save: [], //交替颜色
            luckysheet_alternateformat_save_modelCustom: [], //自定义交替颜色
            luckysheet_conditionformat_save: {}, //条件格式
            frozen: {}, //冻结行列配置
            chart: [], //图表配置
            zoomRatio: 1, // 缩放比例
            image: [], //图片
            showGridLines: 1, //是否显示网格线
            dataVerification: {}, //数据验证配置
          },
        ],

        // 更多其他设置...
      },
      options_unit_name: [],
      options_formwork_name: [],
      select_arr: [],
      loading: false,
      flag: 0,
      new_visible: false,
      tableInfo: {
        data: [],
        total: 0,
      },
      formInline2: {
        name: '',
        level: 0,
        page: 1,
        limit: 10,
        code: 1,
      },
      formInline: {
        unit_name: '',
      },
      formInline4: {
        name: '',
        template_ids: [],
      },
      dialogInfo2: {
        title: '',
        visible: false,
        width: '70%',
        btLoading: false,
      },
      formInline3: {
        name: '',
        equipment_name: '',
        is_file: '',
        formwork: {},
      },
      queryData: {
        condition: {},
        page_size: 10,
        page_index: 1,
      },

      rules: {
        name: [{ required: true, message: '请输入', trigger: 'blur' }],
        name2: [{ required: true, message: '请输入', trigger: 'blur' }],
        is_file: [{ required: true, message: '请选择', trigger: 'blur' }],
      },
      rules4: {
        name: [{ required: true, message: '请输入', trigger: 'blur' }],

        template_ids: [{ required: true, message: '请选择', trigger: 'blur' }],
      },
      body_list: [],
      danwei: '',
      new_id:""
    };
  },
  created() {
    this.getUnit_list();
    // this.getU();
    let form_query = {
      condition: {},
      page_size: 0,
      page_index: 0,
    };
    getFormwork(form_query).then((res) => {
      this.body_list = res.data.records;
    });
  },
  methods: {
    getU() {
      getUnitSearch().then((res) => {
        console.log(res);
        this.options_unit_name = res.data;
      });
    },
    setChange(x) {
      console.log(x, '当前数据');
      if (x == '') {
        this.formInline.formwork_name = '';
      }
      getTemplateSearch({ unit_id: x }).then((res) => {
        console.log(res, '89809980');
        this.options_formwork_name = res.data;
      });
    },
    addData() {
      this.dialogInfo2.visible = true;
      this.danwei = 1;
    },
    handleSelectionChange(x) {
      console.log(x, '当前选中');
      let new_arr = [];
      x.map((e) => {
        new_arr.push(e.id);
      });
      this.select_arr = new_arr;
    },
    delRow() {
      if (this.select_arr.length < 1) {
        this.$message.warning('请选择数据');
      } else {
        var del_arr = { ids: this.select_arr };
        console.log(del_arr);
        delUnit(del_arr).then((res) => {
          console.log(res);
          if (res.code == 200) {
            this.getUnit_list();
            this.$message.success(res.msg);
          }
        });
      }
    },
    handleCurrentChange(val) {
      this.queryData.page_index = val;

      this.getUnit_list2();
    },
    addForm() {
      this.flag = 0;
      this.new_visible = true;

      // 初始化表格
      setTimeout(() => {
        luckysheet.create(this.options);
        console.log(luckysheet.getluckysheetfile());
      }, 100);
    },
    doExport() {
      console.log(luckysheet.getAllSheets());
      exportSheetExcel(luckysheet, 'file');
    },
    demoHandler(x) {
      console.log(x.target.files, '文件11111');
      let upload = document.getElementById('Luckyexcel-demo-file');
      console.log(upload, 'upload');

      let selectADemo = document.getElementById('Luckyexcel-select-demo');
      let downlodDemo = document.getElementById('Luckyexcel-downlod-file');
      let mask = document.getElementById('lucky-mask-demo');
      //   if (upload) {
      // upload.addEventListener('change', function (evt) {
      var files = x.target.files;
      //   var files = evt.target.files;
      console.log(files, 'wenjian');
      if (files == null || files.length == 0) {
        alert('No files wait for import');
        return;
      }

      let name = files[0].name;
      let suffixArr = name.split('.'),
        suffix = suffixArr[suffixArr.length - 1];
      if (suffix != 'xlsx') {
        alert('Currently only supports the import of xlsx files');
        return;
      }
      LuckyExcel.transformExcelToLucky(files[0], function (exportJson, luckysheetfile) {
        if (exportJson.sheets == null || exportJson.sheets.length == 0) {
          alert('Failed to read the content of the excel file, currently does not support xls files!');
          return;
        }
        console.log(exportJson, luckysheetfile);
        // window.luckysheet.destroy();

        // window.luckysheet.create({
        //   container: 'luckysheet', //luckysheet is the container id
        //   showinfobar: false,
        //   data: exportJson.sheets,
        //   title: exportJson.info.name,
        //   userInfo: exportJson.info.name.creator,
        // });
        luckysheet.destroy();

        luckysheet.create({
          container: 'luckysheet', //luckysheet is the container id
          showinfobar: false,
          data: exportJson.sheets,
          title: exportJson.info.name,
          userInfo: exportJson.info.name.creator,
        });
      });
      // });/

      selectADemo.addEventListener('change', function (evt) {
        var obj = selectADemo;
        var index = obj.selectedIndex;
        var value = obj.options[index].value;
        var name = obj.options[index].innerHTML;
        if (value == '') {
          return;
        }
        mask.style.display = 'flex';
        LuckyExcel.transformExcelToLuckyByUrl(value, name, function (exportJson, luckysheetfile) {
          if (exportJson.sheets == null || exportJson.sheets.length == 0) {
            alert('Failed to read the content of the excel file, currently does not support xls files!');
            return;
          }
          console.log(exportJson, luckysheetfile);
          mask.style.display = 'none';
          window.luckysheet.destroy();

          window.luckysheet.create({
            container: 'luckysheet', //luckysheet is the container id
            showinfobar: false,
            data: exportJson.sheets,
            title: exportJson.info.name,
            userInfo: exportJson.info.name.creator,
          });
        });
      });

      downlodDemo.addEventListener('click', function (evt) {
        var obj = selectADemo;
        var index = obj.selectedIndex;
        var value = obj.options[index].value;

        if (value.length == 0) {
          alert('Please select a demo file');
          return;
        }

        var elemIF = document.getElementById('Lucky-download-frame');
        if (elemIF == null) {
          elemIF = document.createElement('iframe');
          elemIF.style.display = 'none';
          elemIF.id = 'Lucky-download-frame';
          document.body.appendChild(elemIF);
        }
        elemIF.src = value;
      });
      //   }
    },
    new_close() {
      this.new_visible = false;
    },
    timeStyle() {
      return 'text-align:center !important';
    },
    fetch() {
      this.getUnit_list();
    },
    addFromwork() {
      this.flag = 1;
      this.new_visible = true;

      // 初始化表格
      setTimeout(() => {
        luckysheet.create(this.options);
        console.log(luckysheet.getluckysheetfile());
      }, 100);
    },
    getUnit_list() {
      this.loading = true;
      this.queryData.page_index = 1;

      //    this.queryData.condition = this.formInline.unit_name==" " ? {} :  this.formInline.unit_name != " " ? { unit_name: this.formInline.unit_name }
      if (!this.formInline.unit_name) {
        this.queryData.condition = {};
      } else {
        this.queryData.condition = { unit_name: this.formInline.unit_name };
      }
      this.currentPage_present = 1;
      getUnit(this.queryData).then((res) => {
        this.loading = false;
        console.log(res);
        if (res.code == 200) {
          this.tableInfo.data = res.data.records;
          this.tableInfo.total = res.data.total;
        } else {
        }
      });
    },
    getUnit_list2() {
      this.loading = true;
      if (!this.formInline.unit_name) {
        this.queryData.condition = {};
      } else {
        this.queryData.condition = { unit_name: this.formInline.unit_name };
      }
      getUnit(this.queryData).then((res) => {
        console.log(res.data);
        this.loading = false;

        this.tableInfo.data = res.data.records;
        this.tableInfo.total = res.data.total;
      });
    },
    reset() {
      this.new_visible = false;
    },
    resetForm_doudou() {
      this.new_visible = false;
    },
    revokeRow(row, revoked) {
      let nowDate = new Date();
      let nowUnix = parseInt((nowDate.getTime() / 1000).toFixed());
      if (nowUnix > row.begin_date) {
        this.$message.warning('评测已开始，暂不可操作！');
        return;
      }
      let content = revoked === 1 ? '禁用' : '启用';
      this.$confirm(`确定要${content}评测试卷 <span style="color: red">${row.name}</span> 吗?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        center: true,
        type: 'warning',
        dangerouslyUseHTMLString: true,
      })
        .then(() => {
          let params = { revoked: revoked };
          paperRevoke(row.id, params).then((res) => {
            if (res.code == 200) {
              this.$message.success('操作成功！');
              this.fetch();
            } else {
              this.$message.error('操作失败！');
            }
          });
        })
        .catch(() => {
          this.$message.info('操作已取消');
        });
    },
    resetForms(formName) {
      console.log(formName);
      this.$refs[formName].resetFields();
      this.getUnit_list();
    },
    addRow() {
      this.visit = 1;
      this.dialogInfo2.title = '添加试卷';
      this.dialogInfo2.visible = true;
      this.initForm();
      this.isDisabled = false;
    },
    editRow(row) {
      this.danwei = 2;
      this.new_id = row.id
      this.dialogInfo2.visible = true;
      console.log(row, '111');
      this.formInline4.name = row.name;
      let new_forms = row.formwork_list;
      let new_ids = [];
      if (row.formwork_list.length > 0) {
        new_forms.map((e) => {
          new_ids.push(e.formwork_id);
        });
      }
      this.formInline4.template_ids = new_ids;
    },

    viewRow(row) {
      //   this.new_visible = true;
      //   this.flag = 4;

      console.log(row, '111');
      let new_forms = row.formwork_list;
      let new_ids = [];
      if (row.formwork_list.length > 0) {
        new_forms.map((e) => {
          new_ids.push(e.formwork_id);
        });
      }

      let query = {
        name: row.name + '复制',
        template_ids: new_ids,
      };
      this.loading = true;

      addUnit(query).then((res) => {
        if (res.code == 200) {
          this.$message.success(res.msg);
          this.getUnit_list();
          this.loading = false;
        }
      });

      //   this.loading=true
      //   this.new_visible = true;
    },
    updateRow(row) {
      // 跳转试卷题目选择页
      let nowDate = new Date();
      let nowUnix = parseInt((nowDate.getTime() / 1000).toFixed());
      if (nowUnix > row.begin_date) {
        this.$message.warning('评测已开始，暂不可操作！');
        return;
      }
      if (row.exist) {
        this.$message.warning('试卷已完成，暂不可操作！');
        return;
      }
      this.$router.push({
        path: '/exam/paper/detail',
        query: { paperId: row.id },
      });
    },
    updateRow2(row) {
      if (!row.exist) {
        this.$message.warning('试卷未完成选题！');
        return;
      }
      this.$router.push({
        path: '/exam/paper/detail2',
        query: { paperId: row.id },
      });
    },
    deleteRow(row) {
      this.$confirm(`确定要删除<span style="color: red">${row.name}</span>吗？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        center: true,
        type: 'warning',
        dangerouslyUseHTMLString: true,
      })
        .then(() => {   
          let ids = { ids: [row.id] };
          delUnit(ids).then((res) => {
            if (res.code == 200) {
              this.$message.success('操作成功');
              this.getUnit_list();
            } else {
              this.$message.error('操作失败');
            }
          });
        })
        .catch(() => {
          this.$message.info('操作已取消');
        });
    },
    submitRow1(formName) {
      console.log('新增模板');
      console.log(this.formInline3);
      console.log(luckysheet.getAllSheets()[0]);
      this.formInline3.formwork = luckysheet.getAllSheets()[0];

      this.$refs[formName].validate((valid) => {
        if (valid) {
          addFormwork(this.formInline3).then((res) => {
            console.log(res, '0000000000');
            if (res.code == 200) {
              this.$message.success(res.msg);
              luckysheet.destroy();
              this.new_visible = false;
            } else {
              this.$message.warning(res.msg);
            }
          });
        }
      });
    },
    submitRow2(formName) {
      console.log('新增导入');
      this.formInline3.formwork = luckysheet.getAllSheets()[0];

      this.$refs[formName].validate((valid) => {
        if (valid) {
          addFormwork(this.formInline3).then((res) => {
            console.log(res, '0000000000');
            if (res.code == 200) {
              this.$message.success(res.msg);
              luckysheet.destroy();
              this.new_visible = false;
            } else {
              this.$message.warning(res.msg);
            }
          });
        }
      });
    },
    submitRow3(formName) {
      console.log('新增单位');

      this.$refs[formName].validate((valid) => {
        if (valid) {
          addUnit(this.formInline4).then((res) => {
            console.log(res, '0000000000');
            if (res.code == 200) {
              this.$message.success(res.msg);
              this.dialogInfo2.visible = false;
              this.$refs['formInline4'].resetFields();
              this.getUnit_list()
            }
          });
        }
      });
    },
    submitRow4(formName) {
      console.log('修改单位');
      let  query = {
        name:this.formInline4.name,
        template_ids:this.formInline4.template_ids,
        id:this.new_id
      }
      this.$refs[formName].validate((valid) => {
        if (valid) {
          putUnitItem(query).then((res) => {
            console.log(res, '0000000000');
            if (res.code == 200) {
              this.$message.success(res.msg);
              this.dialogInfo2.visible = false;
              this.$refs['formInline4'].resetFields();
              this.getUnit_list()

            }
          });
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
        name: '',
        score: '',
        duration: '',
        begin_date: '',
        end_date: '',
        remark: '',
      };
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
      return year + '-' + mon + '-' + day + ' ';
    },
  },
  mounted() {
    const options = {
      container: 'luckysheet', // 设定DOM容器的id
      title: '数据填报系统表格', // 设定表格名称
      lang: 'zh', // 设定表格语言

      // 更多其他设置...
    };
    // 初始化表格
    setTimeout(() => {
      luckysheet.create(options);
      console.log(luckysheet.getluckysheetfile());
    }, 1000);

    // this.demoHandler();
  },
};
</script>

<style scoped lang="scss">
.new_close {
  position: absolute;
  right: 10px;
  top: 10px;
  cursor: pointer;
}
// .new_visible_dio{
//     position: fixed;
//     width: 100%;
//     height:100vh;
//     background: #00000040;

// }
.lucky_doudou {
  opacity: 1;
}
/* .new_doudou{
          position: fixed;
          width: 90%;
          height: 600px;
          opacity: 0;
          left: 5%;
          top: 90px;
          border: 1px solid balck ;
          border-radius: 4px;
          padding: 20px;
          background: white;
       
      
       } */
.new_dio {
  position: fixed;
  width: 90%;
  height: 700px;
  background: white;
  border: 1px solid black;
  border-radius: 4px;
  top: 100px;
  left: 3%;
  overflow: auto;
  padding: 40px;
}
.lds_form {
  position: relative;
}
.new_button {
  position: absolute;
  top: 132px;
  z-index: 9999;
  right: 21px;
  background: white;
}
.Luckyexcel-demo-file {
  background: gray;
}
.luckysheet_info_detail {
  display: none !important;
}
.new_tan {
  position: fixed;
  width: 100%;
  height: calc(100% - 40px);
  background: #80808085;
  z-index: 9;
  top: 0;
}
.company_add {
  width: 150px;
  height: 200px;
  text-align: center;
  background: #fff;
  border-radius: 4px;
}
.company_head {
  background: url('/image/AOne/company.png') no-repeat center;
  font-size: 20px;
  font-weight: bold;
  color: #fff;
  height: 70px;
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
</style>
