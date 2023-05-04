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

              <!-- <i @click="editRow(scope.row)" class="m_spans_table_normal">编辑</i
              ><el-divider direction="vertical"></el-divider>
              <i @click="deleteRow(scope.row)" class="m_spans_table_normal">删除</i
              ><el-divider direction="vertical"></el-divider>
              <i @click="viewRow(scope.row)" class="m_spans_table_normal">查看</i> -->
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
              <el-button type="primary" icon="" @click="doExport()">导出文件</el-button>
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
    };
  },
  created() {
    this.getFormwork_list();
    //     axios
    //       .post('http://123.57.210.116:89/api/getexcel', {})
    //       .then((response) => {
    //         const reader = new FileReader();
    //         reader.readAsText(response.data, 'utf-8');
    //         reader.onload = function () {
    //         console.log(reader.result)
    //         // const t = JSON.parse(reader.result as string);  // 这里就得到了json
    // }

    //         // console.log(JSON.parse(response.data),'44444444444' );
    //       let a   =  response.arrayBuffer()
    //         // let a = new arrayBuffer(response.data);
    //         console.log(a, '22222222');
    //         let workbook = XLSX.read(a, { type: 'array' });
    //         console.log(workbook, '3333');

    //         //获取第一个工作表
    //         let firstSheetName = workbook.SheetNames[0];
    //         const worksheet = workbook.Sheets[firstSheetName];

    //         const datas = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

    //         this.datas = datas;
    //         console.log(datas, 'datas');
    //         console.log(this.datas, 'datas2');
    //         // console.log(JSON.parse(response.data));

    //         // let reader = new FileReader();
    //         // console.log(reader, 'reader');
    //         // // reader.readAsDataURL(response.data);
    //         // // console.log(reader.readAsDataURL(response.data)

    //         // reader.readAsDataURL(response.data);
    //         // reader.onload = function () {
    //         //   console.log(reader.result);
    //         // };

    //         //  let blobs = new Blob(response.data)
    //       })
    //       // reader.readAsArrayBuffer(response.data);
    //       //   reader.readAsArrayBuffer(blobs);
    //       //   console.log(reader.readAsArrayBuffer(blobs)
    //       //   )
    //       //   const excelBuffer = response.data.blob();
    //       //   console.log(excelBuffer, 'excelBuffer');

    //       .catch(function (error) {
    //         console.log(error);
    //       });

    //   fetch('http://123.57.210.116:89/api/getexcel').then(res=>{
    //   console.log(res,'22222222')
    // //  let workbook = XLSX.read(a,{  type: 'array' });
    //  console.log(workbook,'3333')

    // //     console.log(res,'22222222')
    // //     console.log(res.blob(),'11111')
    // //     var str2 = String.fromCharCode(res);
    // //     console.log(str2,'str2')

    // //     let bb = res.blob()
    // //     console.log(bb,'555')
    // //  reader.readAsArrayBuffer(bb);

    // //   const excelBuffer =   res.arrayBuffer();

    //   })

    // axios.post
    // /api/getexcel/
    //     getexcel().then((res) => {
    //       console.log(res, '00000000000000000000res');
    //   const excelBuffer =   res.arrayBuffer();
    //  console.log(excelBuffer,'excelBuffer')
    //     });
    this.getssss();
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
      var fd = new FormData();
      //   fd.append('id', '234');
      //   fd.append('id2', '111');
      //   fd.append('id3', '222');
      let new_blobs = sessionStorage.getItem('final_blob');
      let new_blobs2 = localStorage.getItem('final_blob');
      console.log(new_blobs, 'new_blobs');
      console.log(new_blobs2, 'new_blobs2');

      //    const blob = new Blob([data], {
      //     type: 'application/vnd.ms-excel;charset=utf-8'
      // })
      // console.log(blob, "导出成功！blob")
      // final_blob = blob
      // console.log(final_blob, "导出成功！final_blob")
      // console.log(axios, 'ssssaxiossssssssssssssssssssssss');

      // return

      //   fd.append('file', new_blobs);
      //   fd.append = ('file', new_blobs2 );
      //   console.log(fd, 'df');
      // return
      //   fd =  new_blobs2

      //       var payload = { file: fd };

      //       axios({
      //     url: 'http://localhost:8080/api/addFormwork',
      //     method: 'post',
      //     headers: {
      //         'Content-Type': 'multipart/form-data'
      //     },
      //     data: payload
      // }).then(res=>{
      //     console.log(res)
      // })

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

    async getssss() {
      const all = await axios({
        method: 'post',
        url: 'http://123.57.210.116:89/api/getexcel',
        responseType: 'arraybuffer',
      });
      console.log(all, 'aaaaaaaaaaaaaa');
      console.log(all.data, 'cccccccccc');
      this.new_all = all.data;
      console.log(this.new_all, 'nbbbbbbbbbbbbbbbb');

      const excelBlob = all.data;
      var blob = new Blob([excelBlob], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });
      console.log(excelBlob, '====excelBlob====');
      console.log(blob, '====blob====');

      const file = new window.File(
        [blob], // blob
        'Filename.xlsx',
        { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }
      );
      console.log('====file====', file);
      this.file = file;

      //   fetch('http://123.57.210.116:89/api/getexcel', {
      //     method: 'post',
      //     headers: {
      //       'Content-Type': 'application/json',
      //     },
      //   }).then(res=>{
      //     console.log(res,'777777777777777777777777')
      //   })

      //   let blob = new Blob([all.data], {type: "application/vnd.ms-excel"});
      //                 let a = document.createElement('a');

      //                let objectUrl = URL.createObjectURL(blob);
      //                a.setAttribute("href",objectUrl);
      //                a.setAttribute("download", 'test.xls');
      //                a.click();

      //   const excelBuffer = await excelBlob.arrayBuffer();
      //   this.excelBuffer = excelBuffer;

      //   let workbook = XLSX.read(all_buffer, { type: 'string' });
      //         console.log(workbook, '3333');

      //         //获取第一个工作表
      //         let firstSheetName = workbook.SheetNames[0];
      //         const worksheet = workbook.Sheets[firstSheetName];

      //         const datas = XLSX.utils.sheet_to_json(worksheet,   { header: 1 });
      //         // const datas = XLSX.utils.sheet_to_csv(worksheet,   { header: 1 });
      //         // const datas = XLSX.utils.sheet_to_txt(worksheet,   { header: 1 });
      //         // const datas = XLSX.utils.sheet_to_html(worksheet,   { header: 1 });

      //         this.datas = datas;
      //         console.log(datas, 'datas');
      //         console.log(this.datas, 'datas2');
      // console.log(JSON.parse(response.data));
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
      this.flag = 0;
      this.new_visible = true;
      this.options.data = this.set_options;
      //   this.options.data = [{ data: this.datas  ,name:"第一个" }];
      //   this.options.data = this.datas;
      //   this.uploadExcel1(this.file);
      this.demoHandler2(this.file);
      // this.uploadExcel1(this.file)

      // 初始化表格
      //   setTimeout(() => {
      //     // luckysheet.create(this.options);
      //     luckysheet.create({
      //         container: 'luckysheet',
      //     });
      //     console.log(luckysheet.getluckysheetfile());
      //   }, 100);
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
      this.formInline3.name = '';
      this.formInline3.equipment_name = [];
      this.formInline3.is_file = '';
      this.new_visible = true;
      this.new_set();
      this.options.data = this.set_options;
      console.log(this.set_options, 'setoptions');
      console.log(this.options, 'options');
      //   this.options.data[0].data = [];
      //   this.options.data[0].config.merge = {};
      //   this.options.data[0].celldata = [];
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

      exportSheetExcel_final_blob(luckysheet, `${new_file_name}`);
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
    demoHandler2(x) {
      console.log(x, '文件099999');
      // //   console.log(x.target.files, '文件11111');
      //   let upload = document.getElementById('Luckyexcel-demo-file');
      //   console.log(upload, 'upload');

      //   let selectADemo = document.getElementById('Luckyexcel-select-demo');
      //   let downlodDemo = document.getElementById('Luckyexcel-downlod-file');
      //   let mask = document.getElementById('lucky-mask-demo');
      //   if (upload) {
      // upload.addEventListener('change', function (evt) {
      var files = x;
      //   var files = evt.target.files;
      console.log(files, 'wenjian');
      //   if (files == null || files.length == 0) {
      //     alert('No files wait for import');
      //     return;
      //   }

      //   let name = files.name;
      //   let suffixArr = name.split('.'),
      //     suffix = suffixArr[suffixArr.length - 1];
      //   if (suffix != 'xlsx') {
      //     alert('Currently only supports the import of xlsx files');
      //     return;
      //   }
      LuckyExcel.transformExcelToLucky(files, function (exportJson, luckysheetfile) {
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
    addRow() {
      this.visit = 1;
      this.dialogInfo2.title = '添加试卷';
      this.dialogInfo2.visible = true;
      this.initForm();
      this.isDisabled = false;
    },
    editRow(row) {
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
        console.log(this.formInline3, '9090909');
        var new_options = this.options;
        var new_formwork = JSON.parse(res.data[0].formwork);
        console.log(new_formwork, '99999');
        // if(new_formwork.length==1){
        // new_options.data =  [new_formwork] ;
        // }else{
        // new_options.data =   new_formwork  ;

        // }
        new_options.data = new_formwork;
        console.log(new_options);
        // 初始化表格
        setTimeout(() => {
          luckysheet.create(new_options);
          console.log(luckysheet.getluckysheetfile());
        }, 100);
      });
      //   var new_options = this.options;
      //   var new_formwork = JSON.parse(row.formwork);
      //   var new_arrs = new_formwork.celldata;
      //   console.log(new_arrs, 'celdat');
    },
    editRow2(row) {
      this.new_visible = true;
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
        this.times = res.data[0].create_date;

        var arrs = [];
        arrs = res.data[0].equipment_list;
        this.formInline3.equipment_name = [];

        arrs.map((e) => {
          this.formInline3.equipment_name.push(e.equipment_name);
        });
        console.log(this.formInline3, '9090909');
        var new_options = this.options;
        var new_formwork = JSON.parse(res.data[0].formwork);
        console.log(new_formwork, '99999');
        // if(new_formwork.length==1){
        // new_options.data =  [new_formwork] ;
        // }else{
        // new_options.data =   new_formwork  ;

        // }
        new_options.data = new_formwork;
        console.log(new_options);
        // 初始化表格
        setTimeout(() => {
          luckysheet.create(new_options);
          console.log(luckysheet.getluckysheetfile());
        }, 100);
      });
      //   var new_options = this.options;
      //   var new_formwork = JSON.parse(row.formwork);
      //   var new_arrs = new_formwork.celldata;
      //   console.log(new_arrs, 'celdat');
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
      console.log('新增模板');
      console.log(this.formInline3);
      console.log(luckysheet.getAllSheets());
      this.formInline3.formwork = luckysheet.getAllSheets();
      this.formInline3.id = '';

      this.$refs[formName].validate((valid) => {
        if (valid) {
          addFormwork(this.formInline3).then((res) => {
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
    },
    submitRow2(formName) {
      console.log('模板导入');
      exportSheetExcel_final_blob(luckysheet, `模板的名称lds`);
      console.log(sessionStorage.getItem('final_blob'), 'final_blob');
      console.log(localStorage.getItem('final_blob'), 'final_bloblocalStorage');
      let new_blobs = sessionStorage.getItem('final_blob');
      console.log(new_blobs, 'new_blobs');
      console.log(this.new_all, 'new_all');

      this.formInline3.formwork = new_blobs;
      this.formInline3.formwork2 = this.new_all;
      this.set_axios();
      return;
      //   this.sendBlobData()
      //   return
      //   this.formInline3.formwork = luckysheet.getAllSheets();

      this.$refs[formName].validate((valid) => {
        if (valid) {
          // /api/addFormwork
          addFormwork(this.formInline3).then((res) => {
            console.log(res, '0000000000');
            if (res.code == 200) {
              this.$message.success(res.msg);
              luckysheet.destroy();
              this.new_visible = false;
              this.fetch();
            } else {
              this.$message.warning(res.msg);
            }
          });
        }
      });
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
.lds {
  width: 100% !important;
  border: 1px solid red !important;
  td {
    border: 1px solid red !important;
    padding: 2px !important;
  }
}
</style>
