<template>
  <d2-container>
    <div class="Aone-page">
      <div class="jigou">
        <el-form :inline="true" :model="formInline" ref="formInline" class="demo-form-inline">
          <el-form-item label="搜索内容：" prop="data_info">
            <el-input v-model="formInline.data_info" clearable placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="选择单位：">
            <el-select
              multiple
              @change="setChange"
              v-model="formInline.unit_name"
              prop="unit_name"
              clearable
              placeholder="请选择单位"
            >
              <el-option v-for="item in options_unit_name" :key="item.id" :label="item.name" :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="选择模板：">
            <el-select
              multiple
              v-model="formInline.formwork_name"
              prop="formwork_name"
              clearable
              placeholder="请选择模板"
            >
              <el-option v-for="item in options_formwork_name" :key="item.id" :label="item.name" :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="选择装备：">
            <el-select
              multiple
              v-model="formInline.equipment_name"
              prop="equipment_name"
              clearable
              placeholder="请选择装备"
            >
              <el-option v-for="item in options_equipment_name" :key="item.id" :label="item.name" :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="fetch()" icon="el-icon-search">查询</el-button>
            <el-button type="primary_test" @click="resetForm('formInline')">重置</el-button>
            <el-button type="primary_test" @click="addForm()" icon="el-icon-plus">数据导入</el-button>
            <el-button type="primary_test" @click="delRow()" icon="el-icon-folder-delete">批量删除</el-button>
            <el-button type="primary_test" @click="addData()" icon="el-icon-edit-outline">数据填报</el-button>
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
          <el-table-column prop="name" label="数据信息" :cell-style="timeStyle">
            <template slot-scope="scope">
              <span style="cursor: pointer"> {{ scope.row.name }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="name" label="数据概况" :cell-style="timeStyle">
            <template slot-scope="scope">
              <span style="cursor: pointer">
                {{ scope.row.unit_name }} - {{ scope.row.user_name }} - {{ scope.row.formwork_name }}</span
              >
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
      <div class="new_tan" v-show="new_visible">
        <div class="new_dio">
          <i class="el-icon-close new_close" @click="new_close"></i>

          <el-form :model="formInline3" ref="formInline3" class="demo-form-inline lds_form" label-width="120px">
            <el-form-item label="模板名称：" prop="name">
              <el-input v-model="formInline3.name" placeholder="请输入模板名称" style="width: 80%"></el-input>
            </el-form-item>
            <el-form-item label="装备名称：" prop="equipment_name">
              <el-input v-model="formInline3.equipment_name" placeholder="请输入模板名称" style="width: 80%"></el-input>
            </el-form-item>
            <el-form-item label="单位名称：" prop="unit_name">
              <el-input v-model="formInline3.unit_name" placeholder="请输入模板名称" style="width: 80%"></el-input>
            </el-form-item>
            <el-form-item label="是否上传文件：" prop="is_file" v-if="flag == 1">
              <el-radio v-model="formInline3.is_file" label="1">是</el-radio>
              <el-radio v-model="formInline3.is_file" label="0">否</el-radio>
            </el-form-item>

            <el-form-item label="上传文件：" v-show="flag == 0">
              <!-- <el-button type="primary" icon="" @click="doExport()">导出文件</el-button> -->
              <input
                style="font-size: 16px"
                type="file"
                id="Luckyexcel-demo-file"
                class="Luckyexcel-demo-file"
                name="Luckyexcel-demo-file"
                @change="demoHandler"
                value="上传文件"
              />
            </el-form-item>

            <div id="luckysheet" class="luckysheet-content lucky_doudou" style="height: 400px"></div>
            <br />
            <!-- <el-button type="primary" icon="" @click="doExport()">导出文件</el-button> -->

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
    <transition name="fade-scale">
      <div class="new_tan" v-if="new_visible2">
        <div class="new_dio">
          <i class="el-icon-close new_close" @click="new_close"></i>

          <el-form
            :model="formInline4"
            :rules="rules4"
            ref="formInline4"
            class="demo-form-inline lds_form"
            label-width="120px"
          >
            <el-form-item label="数据名称：" prop="name">
              <el-input
                :disabled="realdisabled"
                v-model="formInline4.name"
                placeholder="请输入数据名称"
                style="width: 80%"
              ></el-input>
            </el-form-item>
            <el-form-item label="装备名称：" prop="equipment_name">
              <el-select
                :disabled="realdisabled"
                v-model="formInline4.equipment_name"
                prop="equipment_name"
                clearable
                placeholder="请选择装备"
              >
                <el-option v-for="item in options_equipment_name" :key="item.id" :label="item.name" :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="单位名称：" prop="unit_name">
              <el-select
                :disabled="realdisabled"
                @change="setChange"
                v-model="formInline4.unit_name"
                prop="unit_name"
                clearable
                placeholder="请选择单位"
              >
                <el-option v-for="item in options_unit_name" :key="item.id" :label="item.name" :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="是否上传文件：" prop="is_file" v-if="flag == 1">
              <el-radio v-model="formInline4.is_file" label="1">是</el-radio>
              <el-radio v-model="formInline4.is_file" label="0">否</el-radio>
            </el-form-item>

            <el-form-item label="上传文件：" v-show="flag == 0">
              <el-upload
                class="upload-demo"
                :action="env_url"
                :on-change="handleChange"
                :on-success="handleAvatarSuccess"
                :file-list="fileList"
                :before-upload="beforeAvatarUpload"
              >
                <el-button size="small" type="primary">点击上传</el-button>
                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
              </el-upload>
              <!-- <el-button type="primary" icon="" @click="doExport()">导出文件</el-button> -->
            </el-form-item>
            <el-form-item style="text-align: right !important">
              <el-button v-show="!realdisabled" type="primary" @click="nexts('formInline4')">下一步</el-button>
            </el-form-item>

            <div id="luckysheet2" class="luckysheet-content lucky_doudou" style="height: 400px"></div>
            <br />

            <el-form-item style="text-align: right !important" v-show="realdisabled">
              <el-button type="primary" @click="submitRow5('formInline4')">提交数据</el-button>

              <el-button type="primary_test" @click="reset2('formInline4')">取消</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </transition>
    <transition name="fade-scale">
      <div class="new_tan" v-if="new_visible3">
        <div class="new_dio">
          <i class="el-icon-close new_close" @click="new_close"></i>

          <el-form
            :model="formInline5"
            :rules="rules4"
            ref="formInline5"
            class="demo-form-inline lds_form"
            label-width="120px"
          >
            <el-form-item label="数据名称：" prop="name">
              <el-input
                :disabled="realdisabled"
                v-model="formInline5.name"
                placeholder="请输入数据名称"
                style="width: 80%"
              ></el-input>
            </el-form-item>
            <el-form-item label="装备名称：" prop="equipment_name">
              <el-select
                :disabled="realdisabled"
                v-model="formInline5.equipment_name"
                prop="equipment_name"
                clearable
                placeholder="请选择装备"
              >
                <el-option v-for="item in options_equipment_name" :key="item.id" :label="item.name" :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="单位名称：" prop="unit_name">
              <el-select
                :disabled="realdisabled"
                @change="setChange"
                v-model="formInline5.unit_name"
                prop="unit_name"
                clearable
                placeholder="请选择单位"
              >
                <el-option v-for="item in options_unit_name" :key="item.id" :label="item.name" :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="是否上传文件：" prop="is_file" v-if="flag == 1">
              <el-radio v-model="formInline5.is_file" label="1">是</el-radio>
              <el-radio v-model="formInline5.is_file" label="0">否</el-radio>
            </el-form-item>

            <el-form-item label="上传文件：" v-show="flag == 0">
              <el-upload
                class="upload-demo"
                :action="env_url"
                :on-change="handleChange"
                :on-success="handleAvatarSuccess"
                :file-list="fileList"
                :before-upload="beforeAvatarUpload"
              >
                <el-button size="small" type="primary">点击上传</el-button>
                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
              </el-upload>
              <!-- <el-button type="primary" icon="" @click="doExport()">导出文件</el-button> -->
            </el-form-item>
            <el-form-item style="text-align: right !important">
              <el-button v-show="!realdisabled" type="primary" @click="nexts2('formInline5')">下一步</el-button>
            </el-form-item>

            <div id="luckysheet2" class="luckysheet-content lucky_doudou" style="height: 400px"></div>
            <br />

            <el-form-item style="text-align: right !important" v-show="realdisabled">
              <el-button type="primary" @click="submitRow5s('formInline5')">提交修改</el-button>

              <el-button type="primary_test" @click="reset2s('formInline5')">取消</el-button>
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
      <p style="font-size: 20px; font-weight: bold; color: black">请选择要使用的模板</p>
      <div class="mine-body flex_center_starts2">
        <div class="company_add pointer" v-for="item in body_list">
          <div class="company_head flex_center_around" @contextmenu.prevent="openMenu($event, item)">
            <span class="chaochu">{{ item.name }} </span>
          </div>

          <div class="fots" style="margin-top: 40px">
            <!-- "state": 1, //考核状态：1-待考核，2-考核中，3-已完成 -->
            <el-button @click="test_s(item)" type="primary_test">选择模板</el-button>
          </div>
        </div>
      </div>
    </qd-dialog>
  </d2-container>
</template>
<script>
import {
  getDataInfo,
  getUnitSearch,
  getFormworkSearch,
  getEquipmentSearch,
  addDataInfo,
  putDataInfo,
  getDataInfoItem,
  getFormwork,
  addFormwork,
  delFormwork,
  putFormworkItem,
  paperEdit,
  paperCreate,
  paperRevoke,
} from './big';
import util from '@/plugin/libs/util.js';

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
      env_url: '',
      new_show: true,
      realdisabled: false,
      fileList: [],
      options: {
        container: 'luckysheet', // 设定DOM容器的id
        title: '数据填报系统表格', // 设定表格名称
        lang: 'zh', // 设定表格语言
        showtoolbarConfig: true,
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

      options2: {
        container: 'luckysheet2', // 设定DOM容器的id
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
          {
            name: '系统配置', //工作表名称
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
      options3_view: {
        container: 'luckysheet', // 设定DOM容器的id
        title: '数据填报系统表格', // 设定表格名称
        lang: 'zh', // 设定表格语言
        showtoolbarConfig: false,
        data: [],

        // 更多其他设置...
      },

      options_unit_name: [],
      options_formwork_name: [],
      options_equipment_name: [],
      select_arr: [],
      loading: false,
      flag: 0,
      new_visible: false,
      new_visible2: false,
      new_visible3: false,
      tableInfo: {
        data: [],
        total: 0,
      },
      formInline3: {
        name: '',
        equipment_name: '',
        unit_name: '',
        is_file: '',
      },
      formInline4: {
        name: '',
        equipment_name: '',
        unit_name: '',
        is_file: '',
      },
      formInline5: {
        name: '',
        equipment_name: '',
        unit_name: '',
        is_file: '',
      },
      formInline: {
        data_info: '',
        unit_name: [],
        formwork_name: [],
        equipment_name: [],
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
        equipment_name: [{ required: true, message: '请输入', trigger: 'blur' }],
        unit_name: [{ required: true, message: '请输入', trigger: 'blur' }],
        is_file: [{ required: true, message: '请选择', trigger: 'blur' }],
      },
      rules4: {
        name: [{ required: true, message: '请输入', trigger: 'blur' }],
        equipment_name: [{ required: true, message: '请输入', trigger: 'blur' }],
        unit_name: [{ required: true, message: '请输入', trigger: 'blur' }],
        is_file: [{ required: true, message: '请选择', trigger: 'blur' }],
      },
      body_list: [],
      form_id: '',
      unit_id: '',
      equipment_id: '',
      viewData: null,
    };
  },
  created() {
    // let baseURL = process.env.VUE_APP_API;
    //
    // this.env_url = process.env.VUE_APP_API+'/file/upload';
    this.env_url = 'http://localhost:8080/file/upload';
    // http://localhost:8080/
    this.getDataInfo_list();
    this.getU();
    // getFormwork().then((res) => {
    //   this.body_list = res.data.records;
    // });
    getEquipmentSearch({}).then((res) => {
      console.log(res, '9999');
      this.options_equipment_name = res.data;
    });
    getFormworkSearch({}).then((res) => {
      console.log(res, '89809980');
      this.options_formwork_name = res.data;
      this.body_list = res.data;
    });
  },
  methods: {
    nexts(formName) {
      this.new_show = false;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.realdisabled = true;
          this.options2.data[1].celldata = [
            {
              r: 0,
              c: 0,
              v: {
                m: `${this.form_id}`,
                ct: {
                  fa: 'General',
                  t: 'g',
                },
                v: `${this.form_id}`,
              },
            },
            {
              r: 0,
              c: 1,
              v: {
                m: `${this.formInline4.unit_name}`,
                ct: {
                  fa: 'General',
                  t: 'g',
                },
                v: `${this.formInline4.unit_name}`,
              },
            },
            {
              r: 0,
              c: 2,
              v: {
                m: `${this.formInline4.equipment_name}`,
                ct: {
                  fa: 'General',
                  t: 'g',
                },
                v: `${this.formInline4.equipment_name}`,
              },
            },
          ];
        //   this.options2.data[1].data =[]
          setTimeout(() => {
            luckysheet.create(this.options2);
            console.log(luckysheet.getluckysheetfile());
          }, 100);
        } else {
          this.$message.warning('请提交完整信息');
        }
      });
    },
    nexts2(formName) {
      this.new_show = false;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.realdisabled = true;
          this.options2.data = this.viewData
          setTimeout(() => {
            luckysheet.create(this.options2);
            console.log(luckysheet.getluckysheetfile());
          }, 100);
        } else {
          this.$message.warning('请提交完整信息');
        }
      });
    },
    handleChange(x) {
      console.log(x, '09xxxxxx');
    },
    handleAvatarSuccess(x, y, z) {},
    beforeAvatarUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
    },
    submitRow5() {
      console.log('新增数据', this.formInline4);
      let new_ids = util.cookies.get('user_id');

      let dataall = luckysheet.getluckysheetfile();
      console.log(dataall, 'dataall');
      let new_data = {
        name: this.formInline4.name,
        formwork_id: this.form_id,
        data_info: dataall,
        user_id: new_ids,
        unit_id: this.formInline4.unit_name,
        equipment_id: this.formInline4.equipment_name,
        files: [],
      };

      addDataInfo(new_data).then((res) => {
        console.log(res, '0000000000');
        if (res.code == 200) {
          this.$message.success(res.msg);
          this.new_visible2 = false;
        } else {
          this.$message.warning(res.msg);
        }
      });
    },
    submitRow5s() {
      console.log('修改数据', this.formInline5);
      let new_ids = util.cookies.get('user_id');

      let dataall = luckysheet.getluckysheetfile();
      console.log(dataall, 'dataall');
      let new_data = {
        name: this.formInline5.name,
        formwork_id: this.form_id,
        data_info: dataall,
        user_id: new_ids,
        unit_id: this.formInline5.unit_name,
        equipment_id: this.formInline5.equipment_name,
        files: [],
      };

      putDataInfo(new_data).then((res) => {
        console.log(res, '0000000000');
        if (res.code == 200) {
          this.$message.success(res.msg);
          this.new_visible2 = false;
        } else {
          this.$message.warning(res.msg);
        }
      });
    },
    test_s(x) {
      this.formInline4 = {
        name: '',
        equipment_name: '',
        unit_name: '',
        is_file: '',
      };
      console.log(x, '999999999999999');
      this.form_id = x.id;
      this.new_visible2 = true;
      this.dialogInfo2.visible = false;
      this.options2.data[0].data = [];

      this.options2.data[0].config.merge = {};
    },
    getU() {
      getUnitSearch().then((res) => {
        console.log(res);
        this.options_unit_name = res.data;
      });
    },

    addData() {
      this.dialogInfo2.visible = true;
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
            this.getDataInfo_list();
            this.$message.success(res.msg);
          }
        });
      }
    },
    handleCurrentChange(val) {
      this.queryData.page_index = val;

      this.getDataInfo_list2();
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
      this.new_visible2 = false;
      this.new_visible3 = false;
      this.realdisabled =false
      this.$refs['formInline4'].resetFields();
    },
    timeStyle() {
      return 'text-align:center !important';
    },
    fetch() {
      this.getDataInfo_list();
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
    getDataInfo_list() {
      this.loading = true;
      this.queryData.page_index = 1;
      //   this.queryData.condition = { formwork_name: this.formInline.name || '',unit_name: this.formInline.unit_name|| '', equipment_name:this.formInline.equipment_name|| '', };
      this.queryData.condition = {
        data_info: this.formInline.data_info || '',
        formwork_id: this.formInline.formwork_name,
        equipment_id: this.formInline.equipment_name,
        unit_id: this.formInline.unit_name,
      };
      this.currentPage_present = 1;
      getDataInfo(this.queryData).then((res) => {
        this.loading = false;
        console.log(res.data);
        this.tableInfo.data = res.data.records;
        this.tableInfo.total = res.data.total;
      });
    },
    getDataInfo_list2() {
      this.loading = true;
      this.queryData.condition = { formwork_name: this.formInline.name || '' };

      getDataInfo(this.queryData).then((res) => {
        console.log(res.data);
        this.loading = false;

        this.tableInfo.data = res.data.records;
        this.tableInfo.total = res.data.total;
      });
    },
    reset(formName) {
      this.new_visible = false;
      this.realdisabled=false

      this.$refs[formName].resetFields();
    },
    reset2(formName) {
      this.new_visible2 = false;
      this.realdisabled=false

      this.$refs[formName].resetFields();
    },
    reset2s(formName) {
      this.new_visible3 = false;
      this.realdisabled=false
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
      this.formInline.data_info = '';
      this.formInline.unit_name = [];
      this.formInline.formwork_name = [];
      this.formInline.equipment_name = [];
      this.fetch();
    },

    editRow(row) {
      this.flag = 3;
      console.log(row, '111');
      this.new_visible3 = true;
      this.formInline5.name = row.name;
      this.formInline5.equipment_name = row.equipment_name;
      getDataInfoItem({ id: row.id }).then((res) => {
        console.log(res, '89089089');
        this.formInline5.name = res.data.name;
        this.formInline5.equipment_name = res.data.equipment_name;
        this.formInline5.unit_name = res.data.unit_name;
        this.viewData = JSON.parse(res.data.data_info);
        console.log(this.viewData, 'viewData');
 
      });
  
      //   var new_options = this.options;
      //   var new_formwork = JSON.parse(row.formwork);
      //   var new_arrs = new_formwork.celldata;
      //   console.log(new_arrs, 'celdat');

      //   new_options.data[0].celldata = new_arrs;
      //   console.log(new_options);
      //   // 初始化表格
      //   setTimeout(() => {
      //     luckysheet.create(new_options);
      //     console.log(luckysheet.getluckysheetfile());
      //   }, 100);
    },

    viewRow(row) {
      this.new_visible = true;
      this.flag = 4;
      getDataInfoItem({ id: row.id }).then((res) => {
        console.log(res, '89089089');
        this.formInline3.name = res.data.name;
        this.formInline3.equipment_name = res.data.equipment_name;
        this.formInline3.unit_name = res.data.unit_name;
        this.viewData = JSON.parse(res.data.data_info);
        console.log(this.viewData, 'viewData');

        // this.options3_view.data = this.viewData
        this.options3_view.data[0] = this.viewData[0];
        let new_data_red = this.viewData[1].data[0];
        console.log(new_data_red, 'new_data_red');
        this.options3_view.data[1] = {
          name: '系统配置',
          color: '',
          index: 'Sheet_f00i1Mloe4bk_1681698517950',
          status: 1,
          order: 0,
          hide: 0,
          row: 36,
          column: 18,
          defaultRowHeight: 19,
          defaultColWidth: 73,

          config: {
            merge: {
              '1_0': {
                r: 1,
                c: 0,
                rs: 2,
                cs: 3,
              },
            },
            rowlen: {},
            columnlen: {},
            rowhidden: {},
            colhidden: {},
            borderInfo: {},
            authority: {},
          },
          scrollLeft: 0,
          scrollTop: 0,
          luckysheet_select_save: [
            {
              left: 0,
              width: 221,
              top: 19,
              height: 40,
              left_move: 0,
              width_move: 221,
              top_move: 20,
              height_move: 39,
              row: [1, 2],
              column: [0, 2],
              row_focus: 1,
              column_focus: 0,
            },
          ],
          calcChain: [],
          isPivotTable: false,
          pivotTable: {},
          filter_select: {},
          filter: null,
          luckysheet_alternateformat_save: [],
          luckysheet_alternateformat_save_modelCustom: [],
          luckysheet_conditionformat_save: {},
          frozen: {},
          chart: [],
          zoomRatio: 1,
          image: [],
          showGridLines: 1,
          dataVerification: {},
          data: [
            new_data_red,
            [
              {
                mc: {
                  r: 1,
                  c: 0,
                  rs: 2,
                  cs: 3,
                },
                m: '请注意，当前表格页数据不可删除！',
                ct: {
                  fa: 'General',
                  t: 'g',
                },
                v: '请注意，当前表格页数据不可删除！',
                fc: '#ff0000',
                bl: 1,
              },
              {
                mc: {
                  r: 1,
                  c: 0,
                },
                fc: '#ff0000',
                bl: 1,
              },
              {
                mc: {
                  r: 1,
                  c: 0,
                },
                fc: '#ff0000',
                bl: 1,
              },
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
            ],
            [
              {
                mc: {
                  r: 1,
                  c: 0,
                },
                fc: '#ff0000',
                bl: 1,
              },
              {
                mc: {
                  r: 1,
                  c: 0,
                },
                fc: '#ff0000',
                bl: 1,
              },
              {
                mc: {
                  r: 1,
                  c: 0,
                },
                fc: '#ff0000',
                bl: 1,
              },
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
            ],
            [
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
            ],
            [
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
            ],
            [
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
            ],
            [
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
            ],
            [
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
            ],
            [
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
            ],
            [
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
            ],
            [
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
            ],
            [
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
            ],
            [
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
            ],
            [
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
            ],
            [
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
            ],
            [
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
            ],
            [
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
            ],
            [
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
            ],
            [
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
            ],
            [
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
            ],
            [
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
            ],
            [
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
            ],
            [
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
            ],
            [
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
            ],
            [
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
            ],
            [
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
            ],
            [
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
            ],
            [
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
            ],
            [
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
            ],
            [
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
            ],
            [
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
            ],
            [
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
            ],
            [
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
            ],
            [
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
            ],
            [
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
            ],
            [
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
            ],
          ],
          load: '1',
          freezen: null,
          jfgird_select_save: [],
          visibledatarow: [
            20, 40, 60, 80, 100, 120, 140, 160, 180, 200, 220, 240, 260, 280, 300, 320, 340, 360, 380, 400, 420, 440,
            460, 480, 500, 520, 540, 560, 580, 600, 620, 640, 660, 680, 700, 720,
          ],
          visibledatacolumn: [
            74, 148, 222, 296, 370, 444, 518, 592, 666, 740, 814, 888, 962, 1036, 1110, 1184, 1258, 1332,
          ],
          ch_width: 1452,
          rh_height: 800,
          luckysheet_selection_range: [],
        };

        setTimeout(() => {
          luckysheet.create(this.options3_view);
          console.log(luckysheet.getluckysheetfile());
        }, 100);
      });
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
          delFormwork(ids).then((res) => {
            if (res.code == 200) {
              this.$message.success('操作成功');
              this.getDataInfo_list();
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
  margin: 10px;
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
