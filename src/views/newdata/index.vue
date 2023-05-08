<template>
  <d2-container>
    <div class="Aone-page">
      <div class="jigou">
        <el-form :inline="true" :model="formInline" ref="formInline" class="demo-form-inline">
          <el-form-item label="搜索内容：" prop="content">
            <el-input v-model="formInline.name" clearable placeholder="请输入"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="fetch()" icon="el-icon-search">查询</el-button>
            <el-button type="primary_test" @click="resetForm('formInline')">重置</el-button>
            <el-button type="primary_test" @click="addForm()" icon="el-icon-plus">模板导入</el-button>
            <el-button type="primary_test" @click="delRow()" icon="el-icon-folder-delete">批量删除</el-button>
            <el-button type="primary_test" @click="addFromwork()" icon="el-icon-edit-outline">新建模板</el-button>
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
          <el-table-column prop="name" label="模板名称" :cell-style="timeStyle">
            <template slot-scope="scope">
              <span style="cursor: pointer"> {{ scope.row.name }}</span>
            </template>
          </el-table-column>

          <el-table-column label="操作" width="500">
            <template slot-scope="scope">
              <el-button type="primary" @click="editRow(scope.row)" size="mini">编辑</el-button>
              <el-button type="danger" @click="deleteRow(scope.row)" size="mini">删除</el-button>
              <el-button type="primary" @click="viewRow(scope.row)" size="mini">查看</el-button>

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
      <div class="new_tan" v-if="new_visible">
        <div class="new_dio">
          <i class="el-icon-close new_close" @click="new_close"></i>

          <el-form
            :model="formInline3"
            :rules="rules"
            ref="formInline3"
            class="demo-form-inline lds_form"
            label-width="150px"
          >
            <el-form-item label="模板名称：" prop="name">
              <el-input v-model="formInline3.name" placeholder="请输入模板名称" style="width: 80%"></el-input>
            </el-form-item>
            <el-form-item label="装备名称：" prop="equipment_name">
              <!-- <el-input v-model="formInline3.equipment_name" placeholder="请输入自定义装备名称" style="width: 80%"></el-input> -->
              <el-select
                v-model="formInline3.equipment_name"
                multiple
                filterable
                allow-create
                default-first-option
                placeholder="请输入装备"
              >
                <el-option
                  v-for="item in options_equipment_name"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="是否上传文件：" prop="is_file" v-if="flag == 1 || 3">
              <el-radio v-model="formInline3.is_file" label="1">是</el-radio>
              <el-radio v-model="formInline3.is_file" label="0">否</el-radio>
            </el-form-item>

            <el-form-item label="导入模板：" v-show="flag == 0">
              <!-- <el-button type="primary" icon="" @click="doExport()">导出文件</el-button> -->
              <input
                style="font-size: 16px"
                type="file"
                id="Luckyexcel-demo-file"
                class="Luckyexcel-demo-file"
                name="Luckyexcel-demo-file"
                @change="demoHandler"
                value="导入模板"
              />
            </el-form-item>

            <div v-if="new_visible" id="luckysheet" class="luckysheet-content lucky_doudou" style="height: 400px"></div>
            <br />
            <!-- <table class="lds" v-html="datas"></table> -->

            <el-form-item style="text-align: right !important" v-show="flag == 1">
              <el-button type="primary" @click="submitRow1('formInline3')">提交模板</el-button>

              <el-button type="primary_test" @click="reset('formInline3')">取消</el-button>
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
    <!-- <qd-dialog
        :title="dialogInfo2.title"
        :visible.sync="dialogInfo2.visible"
        :width="dialogInfo2.width"
        :bt-loading="dialogInfo2.btLoading"
        :nofooter="true"
      >
        <el-form
          :model="formInline2"
          :rules="rules"
          ref="formInline2"
          class="demo-form-inline lds_form"
          label-width="120px"
        >
          <el-form-item label="模板名称：">
            <el-input
              v-model="formInline2.name"
              placeholder="请输入模板名称"
              style="width: 80%"
              :disabled="isDisabled"
            ></el-input>
          </el-form-item>
          <el-form-item label="装备名称：">
            <el-input
              v-model="formInline2.name"
              placeholder="请输入模板名称"
              style="width: 80%"
              :disabled="isDisabled"
            ></el-input>
          </el-form-item>
          <div id="luckysheet" class="luckysheet-content lucky_doudou" style="height: 400px"></div>
  
          <br />
          <el-form-item style="text-align: right !important">
            <el-button type="primary" @click="submitRow('formInline2')">提交</el-button>
  
            <el-button type="primary_test" @click="resetForm_doudou('formInline2')">取消</el-button>
          </el-form-item>
        </el-form>
      </qd-dialog> -->
  </d2-container>
</template>
<script>
import {
  getFormwork,
  getFormworkItem,
  addFormwork,
  delFormwork,
  putFormworkItem,
  getexcel,
  paperEdit,
  paperCreate,
  paperRevoke,
} from './big';
import * as XLSX from 'xlsx';
// import XLSX from 'xlsx';

import axios from 'axios';

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
      turn_blob: null,
      new_all: null,
      datas: null,
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
      set_options: [
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
        name: '',
        level: 0,
        page: 1,
        limit: 10,
        code: 1,
      },
      dialogInfo2: {
        title: '',
        visible: false,
        width: '50%',
        btLoading: false,
      },
      formInline3: {
        id: '',
        name: '',
        equipment_name: [],
        is_file: '',
        formwork: null,
      },
      options_equipment_name: [
        {
          label: '请输入模板名称',
          value: '请输入模板名称',
        },
      ],
      queryData: {
        condition: {},
        page_size: 10,
        page_index: 1,
      },

      rules: {
        name: [{ required: true, message: '请输入', trigger: 'blur' }],
        equipment_name: [{ required: true, message: '请输入', trigger: 'blur' }],
        is_file: [{ required: true, message: '请选择', trigger: 'blur' }],
      },
      times: '',
      excelBuffer: null,
      file: null,
      send_file: null,
      turn_file: null,
      really_file: null,
    };
  },
  created() {
    this.getFormwork_list();

    this.getssss();
    //  getexcel 获取模板的流数据
  },
  methods: {
    // axios({
    //       method: 'get',
    //       url: process.env.VUE_APP_BASE_API + '/data-source-file/exportExcel/' + this.search.month,
    //       responseType: 'arraybuffer',
    //     }).then(res => {
    //       const data = res.data
    //       var blob = new Blob([data], {
    //         type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    //       });
    //       console.log("====blob====", blob)
    //       const file = new window.File(
    //         [blob], // blob
    //         'Filename.xlsx',
    //         { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }
    //       );
    //       console.log("====file====", file)
    //       this.uploadExcel1(file)
    //     }),
    async set_axios() {
      let new_blobs = sessionStorage.getItem('final_blob');
      let new_blobs2 = localStorage.getItem('final_blob');
      console.log(new_blobs, 'new_blobs');
      console.log(new_blobs2, 'new_blobs2');

      //要是用new window.FormData();不然会报错
      var formData = new window.FormData();
      // var file = this.$refs.getAddFile.files[0];
      // var myreg=/^[1][3,4,5,7,8][0-9]{9}$/;
      // if (file != undefined) {
      formData.append('file', this.file, 'test.xlsx');
      formData.append('id', '郭哥');
      formData.append('name', this.formInline3);
      formData.append('work', 'lds');
      // }
      axios.post('http://localhost:8080/api/addFormwork', formData, {}).then(function (dat) {
        console.info(dat.data, 'dddddddddddddd');
        // 操作成功弹出框
      });

      //       const all = await axios.post('http://localhost:8080/api/addFormwork',fd, {headers: {
      //  'Content-Type': `multipart/form-data;  `,
      //  },}  );
      //   console.log(all, 'bbbbbbbbbbbbbbbbbbbbb');
    },

    //     import request from 'utils/request';
    //    export const uploadFileRequest = ({ file }) => {
    //  const data = new FormData();
    //  data.append('file', file, file.name);
    //    return request.post(`/files`, data, {
    //  headers: {
    //  'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
    //  },
    //  timeout: 30000,
    //  });
    //  };

    // async sendBlobData(blob) { const formData = new FormData(); formData.append('file', blob, 'example.xlsx'); const response = await fetch('/your_upload_endpoint', { method: 'POST', body: formData, }); if (response.ok) { console.log('Blob data successfully sent to backend'); } else { console.error('Failed to send Blob data to backend'); } },
    async sendBlobData() {
      let new_blobs = sessionStorage.getItem('final_blob');
      let new_blobs2 = localStorage.getItem('final_blob');
      console.log(new_blobs, 'new_blobs');
      console.log(new_blobs2, 'new_blobs2');
      const formData = new FormData();
      formData.append('file', new_blobs2);
      const response = await axios.post('http://123.57.210.116:89/api/addFormwork', {
        headers: { 'Content-Type': 'multipart/form-data' },
        body: formData,
      });
      console.log(response, 'response');
    },
   async  get_excel(id) {
        let baseURL = process.env.VUE_APP_API;
      //lds   获取流数据转成 luckysheet 可以直接加载的表格
      const all = await axios({
        method: 'post',
        url: `http://localhost:8084/api/getexcel`,
        data: { id: id},
        responseType: 'blob',
      });
      console.log(all, 'aaaaaaaaaaaaaa');
      console.log(all.data, 'cccccccccc');
    //   this.new_all = all.data;
    //   console.log(this.new_all, 'nbbbbbbbbbbbbbbbb');
    //   var blob = new Blob([all.data], {
    //     type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    //   });
    //   this.turn_blob = blob;
      const file = new window.File(
        [all.data], // blob
        'Filename.xlsx',
        { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }
      );
      console.log('====file====', file);
      this.file = file; //this.file 就是二进制 binary了
      console.log('====file2====', this.file);
     this.demoHandler2(this.file)

    },

    async getssss() {
      let baseURL = process.env.VUE_APP_API;
      //lds   获取流数据转成 luckysheet 可以直接加载的表格
      const all = await axios({
        method: 'post',
        url: `http://localhost:8081/api/getexcel`,
        data: { id: '46901962dd9011ed8aee00163e0072c3' },
        responseType: 'blob',
      });
      console.log(all, 'aaaaaaaaaaaaaa');
      console.log(all.data, 'cccccccccc');
      this.new_all = all.data;
      console.log(this.new_all, 'nbbbbbbbbbbbbbbbb');
      var blob = new Blob([all.data], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });
      this.turn_blob = blob;
      const file = new window.File(
        [all.data], // blob
        'Filename.xlsx',
        { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }
      );
      console.log('====file====', file);
      this.file = file; //this.file 就是二进制 binary了
      console.log('====file2====', this.file);
      //lds   获取流数据转成 luckysheet 可以直接加载的表格
    },
    uploadExcel1(files) {
      // In some cases, you need to use $nextTick
      // this.$nextTick(() => {})
      LuckyExcel.transformExcelToLucky(files, function (exportJson, luckysheetfile) {
        console.log('transformExcelToLucky', files, exportJson);
        if (exportJson.sheets == null || exportJson.sheets.length == 0) {
          alert('Failed to read the content of the excel file, currently does not support xls files!');
          return;
        }
        luckysheet.destroy();
        luckysheet.create({
          container: 'luckysheet', //luckysheet is the container id
          showinfobar: false,
          data: exportJson.sheets,
          title: exportJson.info.name,
          userInfo: exportJson.info.name.creator,
          lang: 'zh', // 设定表格语言
          showinfobar: false, //是否显示顶部信息栏
          showtoolbar: false, //是否显示工具栏
          // showsheetbar: false,//是否显示底部sheet页按钮
          enableAddRow: false, //允许添加行
          // 自定义配置底部sheet页按钮
          showsheetbarConfig: {
            add: false,
            menu: false,
          },
          //自定义底部sheet页右击菜单
          sheetRightClickConfig: {
            delete: false, // 删除
            copy: false, // 复制
            rename: false, //重命名
            color: false, //更改颜色
            hide: false, //隐藏，取消隐藏
            move: false, //向左移，向右移
          },
          //自定义单元格右键菜单
          cellRightClickConfig: {
            copy: false, // 复制
            copyAs: false, // 复制为
            paste: false, // 粘贴
            insertRow: false, // 插入行
            insertColumn: false, // 插入列
            deleteRow: false, // 删除选中行
            deleteColumn: false, // 删除选中列
            deleteCell: false, // 删除单元格
            hideRow: false, // 隐藏选中行和显示选中行
            hideColumn: false, // 隐藏选中列和显示选中列
            rowHeight: false, // 行高
            columnWidth: false, // 列宽
            clear: false, // 清除内容
            matrix: false, // 矩阵操作选区
            sort: false, // 排序选区
            filter: false, // 筛选选区
            chart: false, // 图表生成
            image: false, // 插入图片
            link: false, // 插入链接
            data: false, // 数据验证
            cellFormat: false, // 设置单元格格式
          },
        });
      });
    },

    set_form() {
      this.formInline3.name = '';
      this.formInline3.equipment_name = [];
      this.formInline3.is_file = '';
      this.formInline3.formwork = null;
    },
    addForm() {
      this.set_form();
      this.new_set()
      this.flag = 0;
      this.new_visible = true;
      this.options.data = this.set_options;
    //   this.demoHandler2(this.file); lds通过获取的数据流加载数据
      setTimeout(() => {
          luckysheet.create(this.options);
          console.log(luckysheet.getluckysheetfile());
        }, 100);
    },
    new_set() {
      this.set_options = [
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
      ];
    },
    addFromwork() {
      this.flag = 1;
    
      this.new_visible = true;
      this.new_set();
      this.set_form();

      this.options.data = this.set_options;
      console.log(this.set_options, 'setoptions');
      console.log(this.options, 'options');
      // 初始化表格
      setTimeout(() => {
        luckysheet.create(this.options);
        console.log(luckysheet.getluckysheetfile());
      }, 100);
    },
    setKey() {
      if (this.formInline3.name) {
        this.queryData.condition = { formwork_name: this.formInline3.name };
      } else {
        this.queryData.condition = {};
      }
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
        delFormwork(del_arr).then((res) => {
          console.log(res);
          if (res.code == 200) {
            this.getFormwork_list();
            this.$message.success(res.msg);
          }
        });
      }
    },
    handleCurrentChange(val) {
      this.queryData.page_index = val;
      this.getFormwork_list2();
    },

    doExport() {
      console.log(luckysheet.getAllSheets());
      console.log(this.formInline3, '当前数据');
      let equipment_name_str = this.formInline3.equipment_name.toString();
      let new_file_name = `${this.formInline3.name}`;
      //   return
      //   exportSheetExcel_final_blob_vue(luckysheet, `${new_file_name}`);
      exportSheetExcel(luckysheet, `${new_file_name}`);
    },
    demoHandler(x) {
      console.log(x, '文件099999');
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
    // lds 将流数据处理成luckysheet 可以加载的文件格式
    demoHandler2(x) {
      console.log(x, '文件099999');
      var files = x;
      console.log(files, 'wenjian');
      LuckyExcel.transformExcelToLucky(files, function (exportJson, luckysheetfile) {
        if (exportJson.sheets == null || exportJson.sheets.length == 0) {
          alert('Failed to read the content of the excel file, currently does not support xls files!');
          return;
        }
        console.log(exportJson, luckysheetfile);

        luckysheet.destroy();

        luckysheet.create({
          container: 'luckysheet', //luckysheet is the container id
          showinfobar: false,
          data: exportJson.sheets,
          title: exportJson.info.name,
          userInfo: exportJson.info.name.creator,
          lang: 'zh', // 设定表格语言
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
      this.getFormwork_list();
    },

    getFormwork_list() {
      this.loading = true;
      this.queryData.page_index = 1;
      this.queryData.condition = { formwork_name: this.formInline.name || '' };
      this.currentPage_present = 1;
      getFormwork(this.queryData).then((res) => {
        this.loading = false;

        if (res.code == 200) {
          this.loading = false;
          console.log(res.data);
          this.tableInfo.data = res.data.records || [];
          this.tableInfo.total = res.data.total;
        } else {
          this.loading = false;
        }
      });
    },
    getFormwork_list2() {
      this.loading = true;
      this.queryData.condition = { formwork_name: this.formInline.name || '' };

      getFormwork(this.queryData).then((res) => {
        this.loading = false;

        if (res.code == 200) {
          this.loading = false;
          console.log(res.data);
          this.tableInfo.data = res.data.records;
          this.tableInfo.total = res.data.total;
        } else {
          this.loading = false;
        }
      });
    },
    reset(formName) {
      this.new_visible = false;
      this.$refs[formName].resetFields();
    },
    resetForm_doudou(formName) {
      this.new_visible = false;
      this.$refs[formName].resetFields();
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
    resetForm(formName) {
      console.log(formName);
      this.dialogInfo2.visible = false;
    },
    
  
  async  editRow(row) {
      this.flag = 3;
      console.log(row, '111');
      this.new_visible = true;
      this.formInline3.name = row.name;
      this.formInline3.id = row.id;
      getFormworkItem({ id: row.id }).then((res) => {
        console.log(res.data, '9090909');
        this.formInline3.is_file = `${res.data[0].is_file}`;
        var arrs = [];
        arrs = res.data[0].equipment_list;
        this.formInline3.equipment_name = [];

        arrs.map((e) => {
          this.formInline3.equipment_name.push(e.equipment_name);
        });
      });

     this.get_excel(row.id)
 
 
    },
  
    viewRow(row) {
      this.new_visible = true;
      this.flag = 4;
      this.new_visible = true;
      this.formInline3.name = row.name;
      this.formInline3.id = row.id;
      getFormworkItem({ id: row.id }).then((res) => {
        console.log(res.data, '9090909');
        this.formInline3.is_file = `${res.data[0].is_file}`;
        var arrs = [];
        arrs = res.data[0].equipment_list;
        this.formInline3.equipment_name = [];
        arrs.map((e) => {
          this.formInline3.equipment_name.push(e.equipment_name);
        });
      });

     this.get_excel(row.id)
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
          delFormwork(ids).then((res) => {
            if (res.code == 200) {
              this.$message.success('操作成功');
              this.getFormwork_list();
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
      this.really_file = null;
       this.exportSheetExcel_final_blob_vue(luckysheet, `模板的名称lds`);
       console.log(luckysheet.getAllSheets())
       setTimeout(() => {   
        console.log( this.really_file,'really_file');
        this.$refs[formName].validate((valid) => {
        if (valid) {
          var blob = new Blob([this.really_file], { type: 'text/plain;charset=utf-8' });
          console.log(blob, '====blob====');
          var formData = new window.FormData();
          formData.append('file', blob);
          formData.append('name', this.formInline3.name);
          formData.append('equipment_name', this.formInline3.equipment_name);
          formData.append('is_file', this.formInline3.is_file);
            addFormwork( formData).then((res) => {
              console.log(res, '0000000000');
              if (res.code == 200) {
                this.$message.success(res.msg);
                luckysheet.destroy();
                this.new_visible = false;
                this.fetch();
                this.$refs['formInline3'].resetFields();
              }
            });
        }
      });
       }, 300); 
 

        //  获取表格的数据 转成数据流
      
    },
    submitRow2(formName) {
      this.really_file = null;
      this.exportSheetExcel_final_blob_vue(luckysheet, `模板的名称lds`);
      setTimeout(() => {   

        //  获取表格的数据 转成数据流
      this.$refs[formName].validate((valid) => {
        if (valid) {
          var blob = new Blob([this.really_file], { type: 'text/plain;charset=utf-8' });
          console.log(blob, '====blob====');
          var formData = new window.FormData();
          formData.append('file', blob);
          formData.append('name', this.formInline3.name);
          formData.append('equipment_name', this.formInline3.equipment_name);
          formData.append('is_file', this.formInline3.is_file);
            addFormwork( formData).then((res) => {
              console.log(res, '0000000000');
              if (res.code == 200) {
                this.$message.success(res.msg);
                luckysheet.destroy();
                this.new_visible = false;
                this.fetch();
                this.$refs['formInline3'].resetFields();
              }
            });
        }
      });
    }, 300); 


      return;
      
    },
    submitRow3(formName) {
      console.log('新增修改');
      this.formInline3.formwork = luckysheet.getAllSheets();
      console.log(this.formInline3, '0000000000');
      this.$refs[formName].validate((valid) => {
        if (valid) {
          putFormworkItem(this.formInline3).then((res) => {
            console.log(res, '0000000000');
            if (res.code == 200) {
              this.$message.success(res.msg);
              luckysheet.destroy();
              this.new_visible = false;
              this.$refs['formInline3'].resetFields();
            } else {
              this.$message.warning(res.msg);
            }
          });
        }
      });
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

    //lds 这里是用来转换数据的
  async  exportSheetExcel_final_blob_vue(luckysheet, name) {
      // 参数为luckysheet.getluckysheetfile()获取的对象
      // 1.创建工作簿，可以为工作簿添加属性
      const workbook = new ExcelJS.Workbook();
      // 2.创建表格，第二个参数可以配置创建什么样的工作表
      // 2.创建表格，第二个参数可以配置创建什么样的工作表
      /*if (Object.prototype.toString.call(luckysheet) === '[object Object]') {
        luckysheet = [luckysheet]
    }*/
      var tableArr = luckysheet.getAllSheets();
      tableArr.forEach(function (table) {
        if (table.data.length === 0) return true;
        // ws.getCell('B2').fill = fills.
        const worksheet = workbook.addWorksheet(table.name);
        setStyleAndValue(table.data, worksheet);
        setMerge(table.config.merge, worksheet);
        setBorder(table, worksheet);
        setImages(table, worksheet, workbook);
        return true;
      });

      // return
      // 4.写入 buffer
      const buffer = workbook.xlsx.writeBuffer().then((data) => {
         // console.log('data', data)
         const blob = new Blob([data], {
          type: 'application/vnd.ms-excel;charset=utf-8',
        });
        console.log(blob, '导出成功！');
        this.really_file = blob;

        // setTimeout(() => {
        // }, 100);
        // saveFile(blob, name)
        var saveFile = function (buf, name) {
          let blob = new Blob([buf], {
            type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8',
          });
          const downloadElement = document.createElement('a');
          let href = window.URL.createObjectURL(blob);
          downloadElement.href = href;
          downloadElement.download = name + '.xlsx'; // 文件名字
          document.body.appendChild(downloadElement);
          downloadElement.click();
          document.body.removeChild(downloadElement); // 下载完成移除元素
          window.URL.revokeObjectURL(href); // 释放掉blob对象
        };

        var setMerge = function (luckyMerge = {}, worksheet) {
          const mergearr = Object.values(luckyMerge);
          mergearr.forEach(function (elem) {
            // elem格式：{r: 0, c: 0, rs: 1, cs: 2}
            // 按开始行，开始列，结束行，结束列合并（相当于 K10:M12）
            worksheet.mergeCells(elem.r + 1, elem.c + 1, elem.r + elem.rs, elem.c + elem.cs);
          });
        };

        //获取图片在单元格的位置
        var getImagePosition = function (num, arr) {
          let index = 0;
          let minIndex;
          let maxIndex;
          for (let i = 0; i < arr.length; i++) {
            if (num < arr[i]) {
              index = i;
              break;
            }
          }

          if (index == 0) {
            minIndex = 0;
            maxIndex = 1;
          } else if (index == arr.length - 1) {
            minIndex = arr.length - 2;
            maxIndex = arr.length - 1;
          } else {
            minIndex = index - 1;
            maxIndex = index;
          }
          let min = arr[minIndex];
          let max = arr[maxIndex];
          let radio = Math.abs((num - min) / (max - min)) + index;
          return radio;
        };

        var setImages = function (table, worksheet, workbook) {
          let {
            images,
            visibledatacolumn, //所有行的位置
            visibledatarow, //所有列的位置
          } = { ...table };
          if (typeof images != 'object') return;
          for (let key in images) {
            // 通过 base64  将图像添加到工作簿
            const myBase64Image = images[key].src;
            //开始行 开始列 结束行 结束列
            const item = images[key];
            const imageId = workbook.addImage({
              base64: myBase64Image,
              extension: 'png',
            });

            const col_st = getImagePosition(item.default.left, visibledatacolumn);
            const row_st = getImagePosition(item.default.top, visibledatarow);

            //模式1，图片左侧与luckysheet位置一样，像素比例保持不变，但是，右侧位置可能与原图所在单元格不一致
            worksheet.addImage(imageId, {
              tl: { col: col_st, row: row_st },
              ext: { width: item.default.width, height: item.default.height },
            });
            //模式2,图片四个角位置没有变动，但是图片像素比例可能和原图不一样
            // const w_ed = item.default.left+item.default.width;
            // const h_ed = item.default.top+item.default.height;
            // const col_ed = getImagePosition(w_ed,visibledatacolumn);
            // const row_ed = getImagePosition(h_ed,visibledatarow);
            // worksheet.addImage(imageId, {
            //   tl: { col: col_st, row: row_st},
            //   br: { col: col_ed, row: row_ed},
            // });
          }
        };

        var setBorder = function (lucksheetfile, worksheet) {
          if (!lucksheetfile) return;
          const luckyToExcel = {
            style: {
              0: 'none',
              1: 'thin',
              2: 'hair',
              3: 'dotted',
              4: 'dashDot', // 'Dashed',
              5: 'dashDot',
              6: 'dashDotDot',
              7: 'double',
              8: 'medium',
              9: 'mediumDashed',
              10: 'mediumDashDot',
              11: 'mediumDashDotDot',
              12: 'slantDashDot',
              13: 'thick',
            },
          };
          //获取所有的单元格边框的信息
          const borderInfoCompute = getBorderInfo(lucksheetfile);
          for (let x in borderInfoCompute) {
            let border = {};
            let info = borderInfoCompute[x];
            let row = parseInt(x.substr(0, x.indexOf('_')));
            let column = parseInt(x.substr(x.indexOf('_') + 1));
            if (info.t != undefined) {
              const tcolor = info.t.color.indexOf('rgb') > -1 ? rgb2hex(info.t.color) : info.t.color;
              border['top'] = { style: luckyToExcel.style[info.t.style], color: { argb: tcolor.replace('#', '') } };
            }
            if (info.r != undefined) {
              const rcolor = info.r.color.indexOf('rgb') > -1 ? rgb2hex(info.r.color) : info.r.color;
              border['right'] = { style: luckyToExcel.style[info.r.style], color: { argb: rcolor.replace('#', '') } };
            }
            if (info.b != undefined) {
              const bcolor = info.b.color.indexOf('rgb') > -1 ? rgb2hex(info.b.color) : info.b.color;
              border['bottom'] = { style: luckyToExcel.style[info.b.style], color: { argb: bcolor.replace('#', '') } };
            }
            if (info.l != undefined) {
              const lcolor = info.l.color.indexOf('rgb') > -1 ? rgb2hex(info.l.color) : info.l.color;
              border['left'] = { style: luckyToExcel.style[info.l.style], color: { argb: lcolor.replace('#', '') } };
            }
            worksheet.getCell(row + 1, column + 1).border = border;
          }
        };

        var getBorderInfo = function (luckysheetfile) {
          let borderInfoCompute = {};
          let cfg = luckysheetfile.config;
          let data = luckysheetfile.data;
          let borderInfo = cfg['borderInfo'];
          //设置需要计算边框的区域
          let dataset_row_st = 0,
            dataset_row_ed = data.length,
            dataset_col_st = 0,
            dataset_col_ed = data[0].length;
          if (borderInfo != null && borderInfo.length > 0) {
            for (let i = 0; i < borderInfo.length; i++) {
              let rangeType = borderInfo[i].rangeType;

              if (rangeType == 'range') {
                let borderType = borderInfo[i].borderType;
                let borderColor = borderInfo[i].color;
                let borderStyle = borderInfo[i].style;

                let borderRange = borderInfo[i].range;

                for (let j = 0; j < borderRange.length; j++) {
                  let bd_r1 = borderRange[j].row[0],
                    bd_r2 = borderRange[j].row[1];
                  let bd_c1 = borderRange[j].column[0],
                    bd_c2 = borderRange[j].column[1];

                  if (bd_r1 < dataset_row_st) {
                    bd_r1 = dataset_row_st;
                  }

                  if (bd_r2 > dataset_row_ed) {
                    bd_r2 = dataset_row_ed;
                  }

                  if (bd_c1 < dataset_col_st) {
                    bd_c1 = dataset_col_st;
                  }

                  if (bd_c2 > dataset_col_ed) {
                    bd_c2 = dataset_col_ed;
                  }

                  if (borderType == 'border-left') {
                    for (let bd_r = bd_r1; bd_r <= bd_r2; bd_r++) {
                      if (cfg['rowhidden'] != null && cfg['rowhidden'][bd_r] != null) {
                        continue;
                      }

                      if (borderInfoCompute[bd_r + '_' + bd_c1] == null) {
                        borderInfoCompute[bd_r + '_' + bd_c1] = {};
                      }

                      borderInfoCompute[bd_r + '_' + bd_c1].l = { color: borderColor, style: borderStyle };

                      let bd_c_left = bd_c1 - 1;

                      if (bd_c_left >= 0 && borderInfoCompute[bd_r + '_' + bd_c_left]) {
                        if (
                          data[bd_r] != null &&
                          getObjType(data[bd_r][bd_c_left]) == 'object' &&
                          data[bd_r][bd_c_left].mc != null
                        ) {
                          let cell_left = data[bd_r][bd_c_left];

                          let mc = cfg['merge'][cell_left.mc.r + '_' + cell_left.mc.c];

                          if (mc.c + mc.cs - 1 == bd_c_left) {
                            borderInfoCompute[bd_r + '_' + bd_c_left].r = { color: borderColor, style: borderStyle };
                          }
                        } else {
                          borderInfoCompute[bd_r + '_' + bd_c_left].r = { color: borderColor, style: borderStyle };
                        }
                      }

                      let mc = cfg['merge'] || {};
                      for (const key in mc) {
                        let { c, r, cs, rs } = mc[key];
                        if (bd_c1 <= c + cs - 1 && bd_c1 > c && bd_r >= r && bd_r <= r + rs - 1) {
                          borderInfoCompute[bd_r + '_' + bd_c1].l = null;
                        }
                      }
                    }
                  } else if (borderType == 'border-right') {
                    for (let bd_r = bd_r1; bd_r <= bd_r2; bd_r++) {
                      if (cfg['rowhidden'] != null && cfg['rowhidden'][bd_r] != null) {
                        continue;
                      }

                      if (borderInfoCompute[bd_r + '_' + bd_c2] == null) {
                        borderInfoCompute[bd_r + '_' + bd_c2] = {};
                      }

                      borderInfoCompute[bd_r + '_' + bd_c2].r = { color: borderColor, style: borderStyle };

                      let bd_c_right = bd_c2 + 1;

                      if (bd_c_right < data[0].length && borderInfoCompute[bd_r + '_' + bd_c_right]) {
                        if (
                          data[bd_r] != null &&
                          getObjType(data[bd_r][bd_c_right]) == 'object' &&
                          data[bd_r][bd_c_right].mc != null
                        ) {
                          let cell_right = data[bd_r][bd_c_right];

                          let mc = cfg['merge'][cell_right.mc.r + '_' + cell_right.mc.c];

                          if (mc.c == bd_c_right) {
                            borderInfoCompute[bd_r + '_' + bd_c_right].l = { color: borderColor, style: borderStyle };
                          }
                        } else {
                          borderInfoCompute[bd_r + '_' + bd_c_right].l = { color: borderColor, style: borderStyle };
                        }
                      }
                      let mc = cfg['merge'] || {};
                      for (const key in mc) {
                        let { c, r, cs, rs } = mc[key];
                        if (bd_c2 < c + cs - 1 && bd_c2 >= c && bd_r >= r && bd_r <= r + rs - 1) {
                          borderInfoCompute[bd_r + '_' + bd_c2].r = null;
                        }
                      }
                    }
                  } else if (borderType == 'border-top') {
                    if (cfg['rowhidden'] != null && cfg['rowhidden'][bd_r1] != null) {
                      continue;
                    }

                    for (let bd_c = bd_c1; bd_c <= bd_c2; bd_c++) {
                      if (borderInfoCompute[bd_r1 + '_' + bd_c] == null) {
                        borderInfoCompute[bd_r1 + '_' + bd_c] = {};
                      }

                      borderInfoCompute[bd_r1 + '_' + bd_c].t = { color: borderColor, style: borderStyle };

                      let bd_r_top = bd_r1 - 1;

                      if (bd_r_top >= 0 && borderInfoCompute[bd_r_top + '_' + bd_c]) {
                        if (
                          data[bd_r_top] != null &&
                          getObjType(data[bd_r_top][bd_c]) == 'object' &&
                          data[bd_r_top][bd_c].mc != null
                        ) {
                          let cell_top = data[bd_r_top][bd_c];

                          let mc = cfg['merge'][cell_top.mc.r + '_' + cell_top.mc.c];

                          if (mc.r + mc.rs - 1 == bd_r_top) {
                            borderInfoCompute[bd_r_top + '_' + bd_c].b = { color: borderColor, style: borderStyle };
                          }
                        } else {
                          borderInfoCompute[bd_r_top + '_' + bd_c].b = { color: borderColor, style: borderStyle };
                        }
                      }

                      let mc = cfg['merge'] || {};
                      for (const key in mc) {
                        let { c, r, cs, rs } = mc[key];
                        if (bd_r1 <= r + rs - 1 && bd_r1 > r && bd_c >= c && bd_c <= c + cs - 1) {
                          borderInfoCompute[bd_r1 + '_' + bd_c].t = null;
                        }
                      }
                    }
                  } else if (borderType == 'border-bottom') {
                    if (cfg['rowhidden'] != null && cfg['rowhidden'][bd_r2] != null) {
                      continue;
                    }

                    for (let bd_c = bd_c1; bd_c <= bd_c2; bd_c++) {
                      if (borderInfoCompute[bd_r2 + '_' + bd_c] == null) {
                        borderInfoCompute[bd_r2 + '_' + bd_c] = {};
                      }

                      borderInfoCompute[bd_r2 + '_' + bd_c].b = { color: borderColor, style: borderStyle };

                      let bd_r_bottom = bd_r2 + 1;

                      if (bd_r_bottom < data.length && borderInfoCompute[bd_r_bottom + '_' + bd_c]) {
                        if (
                          data[bd_r_bottom] != null &&
                          getObjType(data[bd_r_bottom][bd_c]) == 'object' &&
                          data[bd_r_bottom][bd_c].mc != null
                        ) {
                          let cell_bottom = data[bd_r_bottom][bd_c];

                          let mc = cfg['merge'][cell_bottom.mc.r + '_' + cell_bottom.mc.c];

                          if (mc.r == bd_r_bottom) {
                            borderInfoCompute[bd_r_bottom + '_' + bd_c].t = { color: borderColor, style: borderStyle };
                          }
                        } else {
                          borderInfoCompute[bd_r_bottom + '_' + bd_c].t = { color: borderColor, style: borderStyle };
                        }
                      }

                      let mc = cfg['merge'] || {};
                      for (const key in mc) {
                        let { c, r, cs, rs } = mc[key];
                        if (bd_r2 < r + rs - 1 && bd_r2 >= r && bd_c >= c && bd_c <= c + cs - 1) {
                          borderInfoCompute[bd_r2 + '_' + bd_c].b = null;
                        }
                      }
                    }
                  } else if (borderType == 'border-all') {
                    for (let bd_r = bd_r1; bd_r <= bd_r2; bd_r++) {
                      if (cfg['rowhidden'] != null && cfg['rowhidden'][bd_r] != null) {
                        continue;
                      }

                      for (let bd_c = bd_c1; bd_c <= bd_c2; bd_c++) {
                        if (
                          data[bd_r] != null &&
                          getObjType(data[bd_r][bd_c]) == 'object' &&
                          data[bd_r][bd_c].mc != null
                        ) {
                          let cell = data[bd_r][bd_c];

                          let mc = cfg['merge'][cell.mc.r + '_' + cell.mc.c];
                          if (mc == undefined || mc == null) {
                            continue;
                          }
                          if (mc.r == bd_r) {
                            if (borderInfoCompute[bd_r + '_' + bd_c] == null) {
                              borderInfoCompute[bd_r + '_' + bd_c] = {};
                            }

                            borderInfoCompute[bd_r + '_' + bd_c].t = { color: borderColor, style: borderStyle };
                          }

                          if (mc.r + mc.rs - 1 == bd_r) {
                            if (borderInfoCompute[bd_r + '_' + bd_c] == null) {
                              borderInfoCompute[bd_r + '_' + bd_c] = {};
                            }

                            borderInfoCompute[bd_r + '_' + bd_c].b = { color: borderColor, style: borderStyle };
                          }

                          if (mc.c == bd_c) {
                            if (borderInfoCompute[bd_r + '_' + bd_c] == null) {
                              borderInfoCompute[bd_r + '_' + bd_c] = {};
                            }

                            borderInfoCompute[bd_r + '_' + bd_c].l = { color: borderColor, style: borderStyle };
                          }

                          if (mc.c + mc.cs - 1 == bd_c) {
                            if (borderInfoCompute[bd_r + '_' + bd_c] == null) {
                              borderInfoCompute[bd_r + '_' + bd_c] = {};
                            }

                            borderInfoCompute[bd_r + '_' + bd_c].r = { color: borderColor, style: borderStyle };
                          }
                        } else {
                          if (borderInfoCompute[bd_r + '_' + bd_c] == null) {
                            borderInfoCompute[bd_r + '_' + bd_c] = {};
                          }

                          borderInfoCompute[bd_r + '_' + bd_c].l = { color: borderColor, style: borderStyle };
                          borderInfoCompute[bd_r + '_' + bd_c].r = { color: borderColor, style: borderStyle };
                          borderInfoCompute[bd_r + '_' + bd_c].t = { color: borderColor, style: borderStyle };
                          borderInfoCompute[bd_r + '_' + bd_c].b = { color: borderColor, style: borderStyle };
                        }

                        if (bd_r == bd_r1) {
                          let bd_r_top = bd_r1 - 1;

                          if (bd_r_top >= 0 && borderInfoCompute[bd_r_top + '_' + bd_c]) {
                            if (
                              data[bd_r_top] != null &&
                              getObjType(data[bd_r_top][bd_c]) == 'object' &&
                              data[bd_r_top][bd_c].mc != null
                            ) {
                              let cell_top = data[bd_r_top][bd_c];

                              let mc = cfg['merge'][cell_top.mc.r + '_' + cell_top.mc.c];

                              if (mc.r + mc.rs - 1 == bd_r_top) {
                                borderInfoCompute[bd_r_top + '_' + bd_c].b = { color: borderColor, style: borderStyle };
                              }
                            } else {
                              borderInfoCompute[bd_r_top + '_' + bd_c].b = { color: borderColor, style: borderStyle };
                            }
                          }
                        }

                        if (bd_r == bd_r2) {
                          let bd_r_bottom = bd_r2 + 1;

                          if (bd_r_bottom < data.length && borderInfoCompute[bd_r_bottom + '_' + bd_c]) {
                            if (
                              data[bd_r_bottom] != null &&
                              getObjType(data[bd_r_bottom][bd_c]) == 'object' &&
                              data[bd_r_bottom][bd_c].mc != null
                            ) {
                              let cell_bottom = data[bd_r_bottom][bd_c];

                              let mc = cfg['merge'][cell_bottom.mc.r + '_' + cell_bottom.mc.c];

                              if (mc.r == bd_r_bottom) {
                                borderInfoCompute[bd_r_bottom + '_' + bd_c].t = {
                                  color: borderColor,
                                  style: borderStyle,
                                };
                              }
                            } else {
                              borderInfoCompute[bd_r_bottom + '_' + bd_c].t = {
                                color: borderColor,
                                style: borderStyle,
                              };
                            }
                          }
                        }

                        if (bd_c == bd_c1) {
                          let bd_c_left = bd_c1 - 1;

                          if (bd_c_left >= 0 && borderInfoCompute[bd_r + '_' + bd_c_left]) {
                            if (
                              data[bd_r] != null &&
                              getObjType(data[bd_r][bd_c_left]) == 'object' &&
                              data[bd_r][bd_c_left].mc != null
                            ) {
                              let cell_left = data[bd_r][bd_c_left];

                              let mc = cfg['merge'][cell_left.mc.r + '_' + cell_left.mc.c];

                              if (mc.c + mc.cs - 1 == bd_c_left) {
                                borderInfoCompute[bd_r + '_' + bd_c_left].r = {
                                  color: borderColor,
                                  style: borderStyle,
                                };
                              }
                            } else {
                              borderInfoCompute[bd_r + '_' + bd_c_left].r = { color: borderColor, style: borderStyle };
                            }
                          }
                        }

                        if (bd_c == bd_c2) {
                          let bd_c_right = bd_c2 + 1;

                          if (bd_c_right < data[0].length && borderInfoCompute[bd_r + '_' + bd_c_right]) {
                            if (
                              data[bd_r] != null &&
                              getObjType(data[bd_r][bd_c_right]) == 'object' &&
                              data[bd_r][bd_c_right].mc != null
                            ) {
                              let cell_right = data[bd_r][bd_c_right];

                              let mc = cfg['merge'][cell_right.mc.r + '_' + cell_right.mc.c];

                              if (mc.c == bd_c_right) {
                                borderInfoCompute[bd_r + '_' + bd_c_right].l = {
                                  color: borderColor,
                                  style: borderStyle,
                                };
                              }
                            } else {
                              borderInfoCompute[bd_r + '_' + bd_c_right].l = { color: borderColor, style: borderStyle };
                            }
                          }
                        }
                      }
                    }
                  } else if (borderType == 'border-outside') {
                    for (let bd_r = bd_r1; bd_r <= bd_r2; bd_r++) {
                      if (cfg['rowhidden'] != null && cfg['rowhidden'][bd_r] != null) {
                        continue;
                      }

                      for (let bd_c = bd_c1; bd_c <= bd_c2; bd_c++) {
                        if (!(bd_r == bd_r1 || bd_r == bd_r2 || bd_c == bd_c1 || bd_c == bd_c2)) {
                          continue;
                        }

                        if (bd_r == bd_r1) {
                          if (borderInfoCompute[bd_r + '_' + bd_c] == null) {
                            borderInfoCompute[bd_r + '_' + bd_c] = {};
                          }

                          borderInfoCompute[bd_r + '_' + bd_c].t = { color: borderColor, style: borderStyle };

                          let bd_r_top = bd_r1 - 1;

                          if (bd_r_top >= 0 && borderInfoCompute[bd_r_top + '_' + bd_c]) {
                            if (
                              data[bd_r_top] != null &&
                              getObjType(data[bd_r_top][bd_c]) == 'object' &&
                              data[bd_r_top][bd_c].mc != null
                            ) {
                              let cell_top = data[bd_r_top][bd_c];

                              let mc = cfg['merge'][cell_top.mc.r + '_' + cell_top.mc.c];

                              if (mc.r + mc.rs - 1 == bd_r_top) {
                                borderInfoCompute[bd_r_top + '_' + bd_c].b = { color: borderColor, style: borderStyle };
                              }
                            } else {
                              borderInfoCompute[bd_r_top + '_' + bd_c].b = { color: borderColor, style: borderStyle };
                            }
                          }
                        }

                        if (bd_r == bd_r2) {
                          if (borderInfoCompute[bd_r + '_' + bd_c] == null) {
                            borderInfoCompute[bd_r + '_' + bd_c] = {};
                          }

                          borderInfoCompute[bd_r + '_' + bd_c].b = { color: borderColor, style: borderStyle };

                          let bd_r_bottom = bd_r2 + 1;

                          if (bd_r_bottom < data.length && borderInfoCompute[bd_r_bottom + '_' + bd_c]) {
                            if (
                              data[bd_r_bottom] != null &&
                              getObjType(data[bd_r_bottom][bd_c]) == 'object' &&
                              data[bd_r_bottom][bd_c].mc != null
                            ) {
                              let cell_bottom = data[bd_r_bottom][bd_c];

                              let mc = cfg['merge'][cell_bottom.mc.r + '_' + cell_bottom.mc.c];

                              if (mc.r == bd_r_bottom) {
                                borderInfoCompute[bd_r_bottom + '_' + bd_c].t = {
                                  color: borderColor,
                                  style: borderStyle,
                                };
                              }
                            } else {
                              borderInfoCompute[bd_r_bottom + '_' + bd_c].t = {
                                color: borderColor,
                                style: borderStyle,
                              };
                            }
                          }
                        }

                        if (bd_c == bd_c1) {
                          if (borderInfoCompute[bd_r + '_' + bd_c] == null) {
                            borderInfoCompute[bd_r + '_' + bd_c] = {};
                          }

                          borderInfoCompute[bd_r + '_' + bd_c].l = { color: borderColor, style: borderStyle };

                          let bd_c_left = bd_c1 - 1;

                          if (bd_c_left >= 0 && borderInfoCompute[bd_r + '_' + bd_c_left]) {
                            if (
                              data[bd_r] != null &&
                              getObjType(data[bd_r][bd_c_left]) == 'object' &&
                              data[bd_r][bd_c_left].mc != null
                            ) {
                              let cell_left = data[bd_r][bd_c_left];

                              let mc = cfg['merge'][cell_left.mc.r + '_' + cell_left.mc.c];

                              if (mc.c + mc.cs - 1 == bd_c_left) {
                                borderInfoCompute[bd_r + '_' + bd_c_left].r = {
                                  color: borderColor,
                                  style: borderStyle,
                                };
                              }
                            } else {
                              borderInfoCompute[bd_r + '_' + bd_c_left].r = { color: borderColor, style: borderStyle };
                            }
                          }
                        }

                        if (bd_c == bd_c2) {
                          if (borderInfoCompute[bd_r + '_' + bd_c] == null) {
                            borderInfoCompute[bd_r + '_' + bd_c] = {};
                          }

                          borderInfoCompute[bd_r + '_' + bd_c].r = { color: borderColor, style: borderStyle };

                          let bd_c_right = bd_c2 + 1;

                          if (bd_c_right < data[0].length && borderInfoCompute[bd_r + '_' + bd_c_right]) {
                            if (
                              data[bd_r] != null &&
                              getObjType(data[bd_r][bd_c_right]) == 'object' &&
                              data[bd_r][bd_c_right].mc != null
                            ) {
                              let cell_right = data[bd_r][bd_c_right];

                              let mc = cfg['merge'][cell_right.mc.r + '_' + cell_right.mc.c];

                              if (mc.c == bd_c_right) {
                                borderInfoCompute[bd_r + '_' + bd_c_right].l = {
                                  color: borderColor,
                                  style: borderStyle,
                                };
                              }
                            } else {
                              borderInfoCompute[bd_r + '_' + bd_c_right].l = { color: borderColor, style: borderStyle };
                            }
                          }
                        }
                      }
                    }
                  } else if (borderType == 'border-inside') {
                    for (let bd_r = bd_r1; bd_r <= bd_r2; bd_r++) {
                      if (cfg['rowhidden'] != null && cfg['rowhidden'][bd_r] != null) {
                        continue;
                      }

                      for (let bd_c = bd_c1; bd_c <= bd_c2; bd_c++) {
                        if (bd_r == bd_r1 && bd_c == bd_c1) {
                          if (
                            data[bd_r] != null &&
                            getObjType(data[bd_r][bd_c]) == 'object' &&
                            data[bd_r][bd_c].mc != null
                          ) {
                          } else {
                            if (borderInfoCompute[bd_r + '_' + bd_c] == null) {
                              borderInfoCompute[bd_r + '_' + bd_c] = {};
                            }

                            borderInfoCompute[bd_r + '_' + bd_c].r = { color: borderColor, style: borderStyle };
                            borderInfoCompute[bd_r + '_' + bd_c].b = { color: borderColor, style: borderStyle };
                          }
                        } else if (bd_r == bd_r2 && bd_c == bd_c1) {
                          if (
                            data[bd_r] != null &&
                            getObjType(data[bd_r][bd_c]) == 'object' &&
                            data[bd_r][bd_c].mc != null
                          ) {
                          } else {
                            if (borderInfoCompute[bd_r + '_' + bd_c] == null) {
                              borderInfoCompute[bd_r + '_' + bd_c] = {};
                            }

                            borderInfoCompute[bd_r + '_' + bd_c].r = { color: borderColor, style: borderStyle };
                            borderInfoCompute[bd_r + '_' + bd_c].t = { color: borderColor, style: borderStyle };
                          }
                        } else if (bd_r == bd_r1 && bd_c == bd_c2) {
                          if (
                            data[bd_r] != null &&
                            getObjType(data[bd_r][bd_c]) == 'object' &&
                            data[bd_r][bd_c].mc != null
                          ) {
                          } else {
                            if (borderInfoCompute[bd_r + '_' + bd_c] == null) {
                              borderInfoCompute[bd_r + '_' + bd_c] = {};
                            }

                            borderInfoCompute[bd_r + '_' + bd_c].l = { color: borderColor, style: borderStyle };
                            borderInfoCompute[bd_r + '_' + bd_c].b = { color: borderColor, style: borderStyle };
                          }
                        } else if (bd_r == bd_r2 && bd_c == bd_c2) {
                          if (
                            data[bd_r] != null &&
                            getObjType(data[bd_r][bd_c]) == 'object' &&
                            data[bd_r][bd_c].mc != null
                          ) {
                          } else {
                            if (borderInfoCompute[bd_r + '_' + bd_c] == null) {
                              borderInfoCompute[bd_r + '_' + bd_c] = {};
                            }

                            borderInfoCompute[bd_r + '_' + bd_c].l = { color: borderColor, style: borderStyle };
                            borderInfoCompute[bd_r + '_' + bd_c].t = { color: borderColor, style: borderStyle };
                          }
                        } else if (bd_r == bd_r1) {
                          if (
                            data[bd_r] != null &&
                            getObjType(data[bd_r][bd_c]) == 'object' &&
                            data[bd_r][bd_c].mc != null
                          ) {
                            let cell = data[bd_r][bd_c];

                            let mc = cfg['merge'][cell.mc.r + '_' + cell.mc.c];

                            if (mc.c == bd_c) {
                              if (borderInfoCompute[bd_r + '_' + bd_c] == null) {
                                borderInfoCompute[bd_r + '_' + bd_c] = {};
                              }

                              borderInfoCompute[bd_r + '_' + bd_c].l = { color: borderColor, style: borderStyle };
                            } else if (mc.c + mc.cs - 1 == bd_c) {
                              if (borderInfoCompute[bd_r + '_' + bd_c] == null) {
                                borderInfoCompute[bd_r + '_' + bd_c] = {};
                              }

                              borderInfoCompute[bd_r + '_' + bd_c].r = { color: borderColor, style: borderStyle };
                            }
                          } else {
                            if (borderInfoCompute[bd_r + '_' + bd_c] == null) {
                              borderInfoCompute[bd_r + '_' + bd_c] = {};
                            }

                            borderInfoCompute[bd_r + '_' + bd_c].l = { color: borderColor, style: borderStyle };
                            borderInfoCompute[bd_r + '_' + bd_c].r = { color: borderColor, style: borderStyle };
                            borderInfoCompute[bd_r + '_' + bd_c].b = { color: borderColor, style: borderStyle };
                          }
                        } else if (bd_r == bd_r2) {
                          if (
                            data[bd_r] != null &&
                            getObjType(data[bd_r][bd_c]) == 'object' &&
                            data[bd_r][bd_c].mc != null
                          ) {
                            let cell = data[bd_r][bd_c];

                            let mc = cfg['merge'][cell.mc.r + '_' + cell.mc.c];

                            if (mc.c == bd_c) {
                              if (borderInfoCompute[bd_r + '_' + bd_c] == null) {
                                borderInfoCompute[bd_r + '_' + bd_c] = {};
                              }

                              borderInfoCompute[bd_r + '_' + bd_c].l = { color: borderColor, style: borderStyle };
                            } else if (mc.c + mc.cs - 1 == bd_c) {
                              if (borderInfoCompute[bd_r + '_' + bd_c] == null) {
                                borderInfoCompute[bd_r + '_' + bd_c] = {};
                              }

                              borderInfoCompute[bd_r + '_' + bd_c].r = { color: borderColor, style: borderStyle };
                            }
                          } else {
                            if (borderInfoCompute[bd_r + '_' + bd_c] == null) {
                              borderInfoCompute[bd_r + '_' + bd_c] = {};
                            }

                            borderInfoCompute[bd_r + '_' + bd_c].l = { color: borderColor, style: borderStyle };
                            borderInfoCompute[bd_r + '_' + bd_c].r = { color: borderColor, style: borderStyle };
                            borderInfoCompute[bd_r + '_' + bd_c].t = { color: borderColor, style: borderStyle };
                          }
                        } else if (bd_c == bd_c1) {
                          if (
                            data[bd_r] != null &&
                            getObjType(data[bd_r][bd_c]) == 'object' &&
                            data[bd_r][bd_c].mc != null
                          ) {
                            let cell = data[bd_r][bd_c];

                            let mc = cfg['merge'][cell.mc.r + '_' + cell.mc.c];

                            if (mc.r == bd_r) {
                              if (borderInfoCompute[bd_r + '_' + bd_c] == null) {
                                borderInfoCompute[bd_r + '_' + bd_c] = {};
                              }

                              borderInfoCompute[bd_r + '_' + bd_c].t = { color: borderColor, style: borderStyle };
                            } else if (mc.r + mc.rs - 1 == bd_r) {
                              if (borderInfoCompute[bd_r + '_' + bd_c] == null) {
                                borderInfoCompute[bd_r + '_' + bd_c] = {};
                              }

                              borderInfoCompute[bd_r + '_' + bd_c].b = { color: borderColor, style: borderStyle };
                            }
                          } else {
                            if (borderInfoCompute[bd_r + '_' + bd_c] == null) {
                              borderInfoCompute[bd_r + '_' + bd_c] = {};
                            }

                            borderInfoCompute[bd_r + '_' + bd_c].r = { color: borderColor, style: borderStyle };
                            borderInfoCompute[bd_r + '_' + bd_c].t = { color: borderColor, style: borderStyle };
                            borderInfoCompute[bd_r + '_' + bd_c].b = { color: borderColor, style: borderStyle };
                          }
                        } else if (bd_c == bd_c2) {
                          if (
                            data[bd_r] != null &&
                            getObjType(data[bd_r][bd_c]) == 'object' &&
                            data[bd_r][bd_c].mc != null
                          ) {
                            let cell = data[bd_r][bd_c];

                            let mc = cfg['merge'][cell.mc.r + '_' + cell.mc.c];

                            if (mc.r == bd_r) {
                              if (borderInfoCompute[bd_r + '_' + bd_c] == null) {
                                borderInfoCompute[bd_r + '_' + bd_c] = {};
                              }

                              borderInfoCompute[bd_r + '_' + bd_c].t = { color: borderColor, style: borderStyle };
                            } else if (mc.r + mc.rs - 1 == bd_r) {
                              if (borderInfoCompute[bd_r + '_' + bd_c] == null) {
                                borderInfoCompute[bd_r + '_' + bd_c] = {};
                              }

                              borderInfoCompute[bd_r + '_' + bd_c].b = { color: borderColor, style: borderStyle };
                            }
                          } else {
                            if (borderInfoCompute[bd_r + '_' + bd_c] == null) {
                              borderInfoCompute[bd_r + '_' + bd_c] = {};
                            }

                            borderInfoCompute[bd_r + '_' + bd_c].l = { color: borderColor, style: borderStyle };
                            borderInfoCompute[bd_r + '_' + bd_c].t = { color: borderColor, style: borderStyle };
                            borderInfoCompute[bd_r + '_' + bd_c].b = { color: borderColor, style: borderStyle };
                          }
                        } else {
                          if (
                            data[bd_r] != null &&
                            getObjType(data[bd_r][bd_c]) == 'object' &&
                            data[bd_r][bd_c].mc != null
                          ) {
                            let cell = data[bd_r][bd_c];

                            let mc = cfg['merge'][cell.mc.r + '_' + cell.mc.c];

                            if (mc.r == bd_r) {
                              if (borderInfoCompute[bd_r + '_' + bd_c] == null) {
                                borderInfoCompute[bd_r + '_' + bd_c] = {};
                              }

                              borderInfoCompute[bd_r + '_' + bd_c].t = { color: borderColor, style: borderStyle };
                            } else if (mc.r + mc.rs - 1 == bd_r) {
                              if (borderInfoCompute[bd_r + '_' + bd_c] == null) {
                                borderInfoCompute[bd_r + '_' + bd_c] = {};
                              }

                              borderInfoCompute[bd_r + '_' + bd_c].b = { color: borderColor, style: borderStyle };
                            }

                            if (mc.c == bd_c) {
                              if (borderInfoCompute[bd_r + '_' + bd_c] == null) {
                                borderInfoCompute[bd_r + '_' + bd_c] = {};
                              }

                              borderInfoCompute[bd_r + '_' + bd_c].l = { color: borderColor, style: borderStyle };
                            } else if (mc.c + mc.cs - 1 == bd_c) {
                              if (borderInfoCompute[bd_r + '_' + bd_c] == null) {
                                borderInfoCompute[bd_r + '_' + bd_c] = {};
                              }

                              borderInfoCompute[bd_r + '_' + bd_c].r = { color: borderColor, style: borderStyle };
                            }
                          } else {
                            if (borderInfoCompute[bd_r + '_' + bd_c] == null) {
                              borderInfoCompute[bd_r + '_' + bd_c] = {};
                            }

                            borderInfoCompute[bd_r + '_' + bd_c].l = { color: borderColor, style: borderStyle };
                            borderInfoCompute[bd_r + '_' + bd_c].r = { color: borderColor, style: borderStyle };
                            borderInfoCompute[bd_r + '_' + bd_c].t = { color: borderColor, style: borderStyle };
                            borderInfoCompute[bd_r + '_' + bd_c].b = { color: borderColor, style: borderStyle };
                          }
                        }
                      }
                    }
                  } else if (borderType == 'border-horizontal') {
                    for (let bd_r = bd_r1; bd_r <= bd_r2; bd_r++) {
                      if (cfg['rowhidden'] != null && cfg['rowhidden'][bd_r] != null) {
                        continue;
                      }

                      for (let bd_c = bd_c1; bd_c <= bd_c2; bd_c++) {
                        if (bd_r == bd_r1) {
                          if (
                            data[bd_r] != null &&
                            getObjType(data[bd_r][bd_c]) == 'object' &&
                            data[bd_r][bd_c].mc != null
                          ) {
                          } else {
                            if (borderInfoCompute[bd_r + '_' + bd_c] == null) {
                              borderInfoCompute[bd_r + '_' + bd_c] = {};
                            }

                            borderInfoCompute[bd_r + '_' + bd_c].b = { color: borderColor, style: borderStyle };
                          }
                        } else if (bd_r == bd_r2) {
                          if (
                            data[bd_r] != null &&
                            getObjType(data[bd_r][bd_c]) == 'object' &&
                            data[bd_r][bd_c].mc != null
                          ) {
                          } else {
                            if (borderInfoCompute[bd_r + '_' + bd_c] == null) {
                              borderInfoCompute[bd_r + '_' + bd_c] = {};
                            }

                            borderInfoCompute[bd_r + '_' + bd_c].t = { color: borderColor, style: borderStyle };
                          }
                        } else {
                          if (
                            data[bd_r] != null &&
                            getObjType(data[bd_r][bd_c]) == 'object' &&
                            data[bd_r][bd_c].mc != null
                          ) {
                            let cell = data[bd_r][bd_c];

                            let mc = cfg['merge'][cell.mc.r + '_' + cell.mc.c];

                            if (mc.r == bd_r) {
                              if (borderInfoCompute[bd_r + '_' + bd_c] == null) {
                                borderInfoCompute[bd_r + '_' + bd_c] = {};
                              }

                              borderInfoCompute[bd_r + '_' + bd_c].t = { color: borderColor, style: borderStyle };
                            } else if (mc.r + mc.rs - 1 == bd_r) {
                              if (borderInfoCompute[bd_r + '_' + bd_c] == null) {
                                borderInfoCompute[bd_r + '_' + bd_c] = {};
                              }

                              borderInfoCompute[bd_r + '_' + bd_c].b = { color: borderColor, style: borderStyle };
                            }
                          } else {
                            if (borderInfoCompute[bd_r + '_' + bd_c] == null) {
                              borderInfoCompute[bd_r + '_' + bd_c] = {};
                            }

                            borderInfoCompute[bd_r + '_' + bd_c].t = { color: borderColor, style: borderStyle };
                            borderInfoCompute[bd_r + '_' + bd_c].b = { color: borderColor, style: borderStyle };
                          }
                        }
                      }
                    }
                  } else if (borderType == 'border-vertical') {
                    for (let bd_r = bd_r1; bd_r <= bd_r2; bd_r++) {
                      if (cfg['rowhidden'] != null && cfg['rowhidden'][bd_r] != null) {
                        continue;
                      }

                      for (let bd_c = bd_c1; bd_c <= bd_c2; bd_c++) {
                        if (bd_c == bd_c1) {
                          if (
                            data[bd_r] != null &&
                            getObjType(data[bd_r][bd_c]) == 'object' &&
                            data[bd_r][bd_c].mc != null
                          ) {
                          } else {
                            if (borderInfoCompute[bd_r + '_' + bd_c] == null) {
                              borderInfoCompute[bd_r + '_' + bd_c] = {};
                            }

                            borderInfoCompute[bd_r + '_' + bd_c].r = { color: borderColor, style: borderStyle };
                          }
                        } else if (bd_c == bd_c2) {
                          if (
                            data[bd_r] != null &&
                            getObjType(data[bd_r][bd_c]) == 'object' &&
                            data[bd_r][bd_c].mc != null
                          ) {
                          } else {
                            if (borderInfoCompute[bd_r + '_' + bd_c] == null) {
                              borderInfoCompute[bd_r + '_' + bd_c] = {};
                            }

                            borderInfoCompute[bd_r + '_' + bd_c].l = { color: borderColor, style: borderStyle };
                          }
                        } else {
                          if (
                            data[bd_r] != null &&
                            getObjType(data[bd_r][bd_c]) == 'object' &&
                            data[bd_r][bd_c].mc != null
                          ) {
                            let cell = data[bd_r][bd_c];

                            let mc = cfg['merge'][cell.mc.r + '_' + cell.mc.c] || {};

                            if (mc.c == bd_c) {
                              if (borderInfoCompute[bd_r + '_' + bd_c] == null) {
                                borderInfoCompute[bd_r + '_' + bd_c] = {};
                              }

                              borderInfoCompute[bd_r + '_' + bd_c].l = { color: borderColor, style: borderStyle };
                            } else if (mc.c + mc.cs - 1 == bd_c) {
                              if (borderInfoCompute[bd_r + '_' + bd_c] == null) {
                                borderInfoCompute[bd_r + '_' + bd_c] = {};
                              }

                              borderInfoCompute[bd_r + '_' + bd_c].r = { color: borderColor, style: borderStyle };
                            }
                          } else {
                            if (borderInfoCompute[bd_r + '_' + bd_c] == null) {
                              borderInfoCompute[bd_r + '_' + bd_c] = {};
                            }

                            borderInfoCompute[bd_r + '_' + bd_c].l = { color: borderColor, style: borderStyle };
                            borderInfoCompute[bd_r + '_' + bd_c].r = { color: borderColor, style: borderStyle };
                          }
                        }
                      }
                    }
                  } else if (borderType == 'border-none') {
                    for (let bd_r = bd_r1; bd_r <= bd_r2; bd_r++) {
                      if (cfg['rowhidden'] != null && cfg['rowhidden'][bd_r] != null) {
                        continue;
                      }

                      for (let bd_c = bd_c1; bd_c <= bd_c2; bd_c++) {
                        if (borderInfoCompute[bd_r + '_' + bd_c] != null) {
                          delete borderInfoCompute[bd_r + '_' + bd_c];
                        }

                        if (bd_r == bd_r1) {
                          let bd_r_top = bd_r1 - 1;

                          if (bd_r_top >= 0 && borderInfoCompute[bd_r_top + '_' + bd_c]) {
                            delete borderInfoCompute[bd_r_top + '_' + bd_c].b;
                          }
                        }

                        if (bd_r == bd_r2) {
                          let bd_r_bottom = bd_r2 + 1;

                          if (bd_r_bottom < data.length && borderInfoCompute[bd_r_bottom + '_' + bd_c]) {
                            delete borderInfoCompute[bd_r_bottom + '_' + bd_c].t;
                          }
                        }

                        if (bd_c == bd_c1) {
                          let bd_c_left = bd_c1 - 1;

                          if (bd_c_left >= 0 && borderInfoCompute[bd_r + '_' + bd_c_left]) {
                            delete borderInfoCompute[bd_r + '_' + bd_c_left].r;
                          }
                        }

                        if (bd_c == bd_c2) {
                          let bd_c_right = bd_c2 + 1;

                          if (bd_c_right < data[0].length && borderInfoCompute[bd_r + '_' + bd_c_right]) {
                            delete borderInfoCompute[bd_r + '_' + bd_c_right].l;
                          }
                        }
                      }
                    }
                  }
                }
              } else if (rangeType == 'cell') {
                let value = borderInfo[i].value;

                let bd_r = value.row_index,
                  bd_c = value.col_index;

                if (bd_r < dataset_row_st || bd_r > dataset_row_ed || bd_c < dataset_col_st || bd_c > dataset_col_ed) {
                  continue;
                }

                if (cfg['rowhidden'] != null && cfg['rowhidden'][bd_r] != null) {
                  continue;
                }

                if (value.l != null || value.r != null || value.t != null || value.b != null) {
                  if (borderInfoCompute[bd_r + '_' + bd_c] == null) {
                    borderInfoCompute[bd_r + '_' + bd_c] = {};
                  }

                  if (data[bd_r] != null && getObjType(data[bd_r][bd_c]) == 'object' && data[bd_r][bd_c].mc != null) {
                    let cell = data[bd_r][bd_c];
                    let mc = cfg['merge'][cell.mc.r + '_' + cell.mc.c] || {};

                    if (value.l != null && bd_c == mc.c) {
                      //左边框
                      borderInfoCompute[bd_r + '_' + bd_c].l = { color: value.l.color, style: value.l.style };

                      let bd_c_left = bd_c - 1;

                      if (bd_c_left >= 0 && borderInfoCompute[bd_r + '_' + bd_c_left]) {
                        if (
                          data[bd_r] != null &&
                          getObjType(data[bd_r][bd_c_left]) == 'object' &&
                          data[bd_r][bd_c_left].mc != null
                        ) {
                          let cell_left = data[bd_r][bd_c_left];

                          let mc_l = cfg['merge'][cell_left.mc.r + '_' + cell_left.mc.c];

                          if (mc_l.c + mc_l.cs - 1 == bd_c_left) {
                            borderInfoCompute[bd_r + '_' + bd_c_left].r = {
                              color: value.l.color,
                              style: value.l.style,
                            };
                          }
                        } else {
                          borderInfoCompute[bd_r + '_' + bd_c_left].r = { color: value.l.color, style: value.l.style };
                        }
                      }
                    } else {
                      borderInfoCompute[bd_r + '_' + bd_c].l = null;
                    }

                    if (value.r != null && bd_c == mc.c + mc.cs - 1) {
                      //右边框
                      borderInfoCompute[bd_r + '_' + bd_c].r = { color: value.r.color, style: value.r.style };

                      let bd_c_right = bd_c + 1;

                      if (bd_c_right < data[0].length && borderInfoCompute[bd_r + '_' + bd_c_right]) {
                        if (
                          data[bd_r] != null &&
                          getObjType(data[bd_r][bd_c_right]) == 'object' &&
                          data[bd_r][bd_c_right].mc != null
                        ) {
                          let cell_right = data[bd_r][bd_c_right];

                          let mc_r = cfg['merge'][cell_right.mc.r + '_' + cell_right.mc.c];

                          if (mc_r.c == bd_c_right) {
                            borderInfoCompute[bd_r + '_' + bd_c_right].l = {
                              color: value.r.color,
                              style: value.r.style,
                            };
                          }
                        } else {
                          borderInfoCompute[bd_r + '_' + bd_c_right].l = { color: value.r.color, style: value.r.style };
                        }
                      }
                    } else {
                      borderInfoCompute[bd_r + '_' + bd_c].r = null;
                    }

                    if (value.t != null && bd_r == mc.r) {
                      //上边框
                      borderInfoCompute[bd_r + '_' + bd_c].t = { color: value.t.color, style: value.t.style };

                      let bd_r_top = bd_r - 1;

                      if (bd_r_top >= 0 && borderInfoCompute[bd_r_top + '_' + bd_c]) {
                        if (
                          data[bd_r_top] != null &&
                          getObjType(data[bd_r_top][bd_c]) == 'object' &&
                          data[bd_r_top][bd_c].mc != null
                        ) {
                          let cell_top = data[bd_r_top][bd_c];

                          let mc_t = cfg['merge'][cell_top.mc.r + '_' + cell_top.mc.c];

                          if (mc_t.r + mc_t.rs - 1 == bd_r_top) {
                            borderInfoCompute[bd_r_top + '_' + bd_c].b = { color: value.t.color, style: value.t.style };
                          }
                        } else {
                          borderInfoCompute[bd_r_top + '_' + bd_c].b = { color: value.t.color, style: value.t.style };
                        }
                      }
                    } else {
                      borderInfoCompute[bd_r + '_' + bd_c].t = null;
                    }

                    if (value.b != null && bd_r == mc.r + mc.rs - 1) {
                      //下边框
                      borderInfoCompute[bd_r + '_' + bd_c].b = { color: value.b.color, style: value.b.style };

                      let bd_r_bottom = bd_r + 1;

                      if (bd_r_bottom < data.length && borderInfoCompute[bd_r_bottom + '_' + bd_c]) {
                        if (
                          data[bd_r_bottom] != null &&
                          getObjType(data[bd_r_bottom][bd_c]) == 'object' &&
                          data[bd_r_bottom][bd_c].mc != null
                        ) {
                          let cell_bottom = data[bd_r_bottom][bd_c];

                          let mc_b = cfg['merge'][cell_bottom.mc.r + '_' + cell_bottom.mc.c];

                          if (mc_b.r == bd_r_bottom) {
                            borderInfoCompute[bd_r_bottom + '_' + bd_c].t = {
                              color: value.b.color,
                              style: value.b.style,
                            };
                          }
                        } else {
                          borderInfoCompute[bd_r_bottom + '_' + bd_c].t = {
                            color: value.b.color,
                            style: value.b.style,
                          };
                        }
                      }
                    } else {
                      borderInfoCompute[bd_r + '_' + bd_c].b = null;
                    }
                  } else {
                    if (value.l != null) {
                      //左边框
                      borderInfoCompute[bd_r + '_' + bd_c].l = { color: value.l.color, style: value.l.style };

                      let bd_c_left = bd_c - 1;

                      if (bd_c_left >= 0 && borderInfoCompute[bd_r + '_' + bd_c_left]) {
                        if (
                          data[bd_r] != null &&
                          getObjType(data[bd_r][bd_c_left]) == 'object' &&
                          data[bd_r][bd_c_left].mc != null
                        ) {
                          let cell_left = data[bd_r][bd_c_left];

                          let mc_l = cfg['merge'][cell_left.mc.r + '_' + cell_left.mc.c];

                          if (mc_l.c + mc_l.cs - 1 == bd_c_left) {
                            borderInfoCompute[bd_r + '_' + bd_c_left].r = {
                              color: value.l.color,
                              style: value.l.style,
                            };
                          }
                        } else {
                          borderInfoCompute[bd_r + '_' + bd_c_left].r = { color: value.l.color, style: value.l.style };
                        }
                      }
                    } else {
                      borderInfoCompute[bd_r + '_' + bd_c].l = null;
                    }

                    if (value.r != null) {
                      //右边框
                      borderInfoCompute[bd_r + '_' + bd_c].r = { color: value.r.color, style: value.r.style };

                      let bd_c_right = bd_c + 1;

                      if (bd_c_right < data[0].length && borderInfoCompute[bd_r + '_' + bd_c_right]) {
                        if (
                          data[bd_r] != null &&
                          getObjType(data[bd_r][bd_c_right]) == 'object' &&
                          data[bd_r][bd_c_right].mc != null
                        ) {
                          let cell_right = data[bd_r][bd_c_right];

                          let mc_r = cfg['merge'][cell_right.mc.r + '_' + cell_right.mc.c];

                          if (mc_r.c == bd_c_right) {
                            borderInfoCompute[bd_r + '_' + bd_c_right].l = {
                              color: value.r.color,
                              style: value.r.style,
                            };
                          }
                        } else {
                          borderInfoCompute[bd_r + '_' + bd_c_right].l = { color: value.r.color, style: value.r.style };
                        }
                      }
                    } else {
                      borderInfoCompute[bd_r + '_' + bd_c].r = null;
                    }

                    if (value.t != null) {
                      //上边框
                      borderInfoCompute[bd_r + '_' + bd_c].t = { color: value.t.color, style: value.t.style };

                      let bd_r_top = bd_r - 1;

                      if (bd_r_top >= 0 && borderInfoCompute[bd_r_top + '_' + bd_c]) {
                        if (
                          data[bd_r_top] != null &&
                          getObjType(data[bd_r_top][bd_c]) == 'object' &&
                          data[bd_r_top][bd_c].mc != null
                        ) {
                          let cell_top = data[bd_r_top][bd_c];

                          let mc_t = cfg['merge'][cell_top.mc.r + '_' + cell_top.mc.c];

                          if (mc_t.r + mc_t.rs - 1 == bd_r_top) {
                            borderInfoCompute[bd_r_top + '_' + bd_c].b = { color: value.t.color, style: value.t.style };
                          }
                        } else {
                          borderInfoCompute[bd_r_top + '_' + bd_c].b = { color: value.t.color, style: value.t.style };
                        }
                      }
                    } else {
                      borderInfoCompute[bd_r + '_' + bd_c].t = null;
                    }

                    if (value.b != null) {
                      //下边框
                      borderInfoCompute[bd_r + '_' + bd_c].b = { color: value.b.color, style: value.b.style };

                      let bd_r_bottom = bd_r + 1;

                      if (bd_r_bottom < data.length && borderInfoCompute[bd_r_bottom + '_' + bd_c]) {
                        if (
                          data[bd_r_bottom] != null &&
                          getObjType(data[bd_r_bottom][bd_c]) == 'object' &&
                          data[bd_r_bottom][bd_c].mc != null
                        ) {
                          let cell_bottom = data[bd_r_bottom][bd_c];

                          let mc_b = cfg['merge'][cell_bottom.mc.r + '_' + cell_bottom.mc.c];

                          if (mc_b.r == bd_r_bottom) {
                            borderInfoCompute[bd_r_bottom + '_' + bd_c].t = {
                              color: value.b.color,
                              style: value.b.style,
                            };
                          }
                        } else {
                          borderInfoCompute[bd_r_bottom + '_' + bd_c].t = {
                            color: value.b.color,
                            style: value.b.style,
                          };
                        }
                      }
                    } else {
                      borderInfoCompute[bd_r + '_' + bd_c].b = null;
                    }
                  }
                } else {
                  delete borderInfoCompute[bd_r + '_' + bd_c];
                }
              }
            }
          }
          return borderInfoCompute;
        };

        //获取数据类型
        var getObjType = function (obj) {
          let toString = Object.prototype.toString;

          let map = {
            '[object Boolean]': 'boolean',
            '[object Number]': 'number',
            '[object String]': 'string',
            '[object Function]': 'function',
            '[object Array]': 'array',
            '[object Date]': 'date',
            '[object RegExp]': 'regExp',
            '[object Undefined]': 'undefined',
            '[object Null]': 'null',
            '[object Object]': 'object',
          };
          return map[toString.call(obj)];
        };

        var setStyleAndValue = function (cellArr, worksheet) {
          if (!Array.isArray(cellArr)) return;

          cellArr.forEach(function (row, rowid) {
            const dbrow = worksheet.getRow(rowid + 1);
            //设置单元格行高,默认乘以1.2倍
            dbrow.height = luckysheet.getRowHeight([rowid])[rowid] * 1.2;
            row.every(function (cell, columnid) {
              if (!cell) return true;
              if (rowid == 0) {
                const dobCol = worksheet.getColumn(columnid + 1);
                //设置单元格列宽除以8
                dobCol.width = luckysheet.getColumnWidth([columnid])[columnid] / 8;
              }
              let fill = fillConvert(cell.bg);
              let font = fontConvert(cell.ff, cell.fc, cell.bl, cell.it, cell.fs, cell.cl, cell.ul);
              let alignment = alignmentConvert(cell.vt, cell.ht, cell.tb, cell.tr);
              let value;

              var v = '';
              if (cell.ct && cell.ct.t == 'inlineStr') {
                var s = cell.ct.s;
                s.forEach(function (val, num) {
                  v += val.v;
                });
              } else {
                v = cell.v;
              }
              if (cell.f) {
                value = { formula: cell.f, result: v };
              } else {
                value = v;
              }
              let target = worksheet.getCell(rowid + 1, columnid + 1);
              target.fill = fill;
              target.font = font;
              target.alignment = alignment;
              target.value = value;
              return true;
            });
          });
        };

        //转换颜色
        var rgb2hex = function (rgb) {
          if (rgb.charAt(0) == '#') {
            return rgb;
          }

          var ds = rgb.split(/\D+/);
          var decimal = Number(ds[1]) * 65536 + Number(ds[2]) * 256 + Number(ds[3]);
          return '#' + zero_fill_hex(decimal, 6);

          function zero_fill_hex(num, digits) {
            var s = num.toString(16);
            while (s.length < digits) s = '0' + s;
            return s;
          }
        };

        var fillConvert = function (bg) {
          if (!bg) {
            return null;
            // return {
            // 	type: 'pattern',
            // 	pattern: 'solid',
            // 	fgColor:{argb:'#ffffff'.replace('#','')}
            // }
          }
          bg = bg.indexOf('rgb') > -1 ? rgb2hex(bg) : bg;
          let fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: bg.replace('#', '') },
          };
          return fill;
        };

        var fontConvert = function (ff = 0, fc = '#000000', bl = 0, it = 0, fs = 10, cl = 0, ul = 0) {
          // luckysheet：ff(样式), fc(颜色), bl(粗体), it(斜体), fs(大小), cl(删除线), ul(下划线)
          const luckyToExcel = {
            0: '微软雅黑',
            1: '宋体（Song）',
            2: '黑体（ST Heiti）',
            3: '楷体（ST Kaiti）',
            4: '仿宋（ST FangSong）',
            5: '新宋体（ST Song）',
            6: '华文新魏',
            7: '华文行楷',
            8: '华文隶书',
            9: 'Arial',
            10: 'Times New Roman ',
            11: 'Tahoma ',
            12: 'Verdana',
            num2bl: function (num) {
              return num === 0 ? false : true;
            },
          };

          let font = {
            name: ff,
            family: 1,
            size: fs,
            color: { argb: fc.replace('#', '') },
            bold: luckyToExcel.num2bl(bl),
            italic: luckyToExcel.num2bl(it),
            underline: luckyToExcel.num2bl(ul),
            strike: luckyToExcel.num2bl(cl),
          };

          return font;
        };

        var alignmentConvert = function (vt = 'default', ht = 'default', tb = 'default', tr = 'default') {
          // luckysheet:vt(垂直), ht(水平), tb(换行), tr(旋转)
          const luckyToExcel = {
            vertical: {
              0: 'middle',
              1: 'top',
              2: 'bottom',
              default: 'top',
            },
            horizontal: {
              0: 'center',
              1: 'left',
              2: 'right',
              default: 'left',
            },
            wrapText: {
              0: false,
              1: false,
              2: true,
              default: false,
            },
            textRotation: {
              0: 0,
              1: 45,
              2: -45,
              3: 'vertical',
              4: 90,
              5: -90,
              default: 0,
            },
          };

          let alignment = {
            vertical: luckyToExcel.vertical[vt],
            horizontal: luckyToExcel.horizontal[ht],
            wrapText: luckyToExcel.wrapText[tb],
            textRotation: luckyToExcel.textRotation[tr],
          };
          return alignment;
        };
       
      });
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
.lds {
  width: 100% !important;
  border: 1px solid red !important;
  td {
    border: 1px solid red !important;
    padding: 2px !important;
  }
}
</style>
