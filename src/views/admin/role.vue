<template>
  <d2-container style="cursor: pointer" ref="">
    <div class="tabs_system">
      <el-tabs v-model="activeName" @tab-click="handleClicks">
        <el-tab-pane label="角色管理" name="first">
          <div>
            <br />
            <br />
            <el-button class="tableHandleBtn" size="mini" icon="el-icon-plus" @click="addInfo()">添加角色 </el-button>
            <el-button class="tableHandleBtn" size="mini" icon="el-icon-refresh" @click="refresh()">刷新 </el-button>
            <br /><br />
            <br />
            <div class="tabletd_center" style="margin: 0px  0px !important;">
              <qd-table
                ref="table"
                style="margin-top: -10px"
                :refresh="tableInfo.refresh"
                :init-curpage="tableInfo.initCurpage"
                :data.sync="tableInfo.data"
                :query.sync="queryData"
                :field-list="tableFieldList"
                :pager="true"
                :tabIndex="true"
                :api="getList"
                @handleClick="handleClick"
                @handleEvent="handleEvent"
              >
                <template slot="col-add_time" slot-scope="scope">
                  {{ getLocalTime(scope.row.add_time) }}
                </template>
                <template slot="col-role_id" slot-scope="scope">
                  {{ get_role(scope.row.role_id) }}
                </template>
                <template slot="col-businessState" slot-scope="scope">
                  <!-- {{scope.row.businessState}} -->
                  <!-- <span>456</span> -->
                  <span v-if="scope.row.businessState == 0">正常</span>
                  <span v-if="scope.row.businessState == 1">终止 </span>
                  <span v-if="scope.row.businessState == 2">删除</span>
                </template>
                <template slot="col-revoked" slot-scope="scope">
                  <!-- {{ revoked(scope.row.revoked) }} -->
                  <el-tag v-if="scope.row.revoked == 0" type="success">已启用</el-tag>
                  <el-tag v-if="scope.row.revoked == 1" type="danger">已禁用</el-tag>
                </template>

                <template slot="col-action" slot-scope="scope">
                  <span class="lds_tag lds_blue" @click="goInfo(scope.row)">编辑</span>
                  <span class="lds_tag lds_blue" @click="orderInfo(scope.row)">权限</span>
                  <span v-if="scope.row.revoked == 0" class="lds_tag lds_red" @click="setInfo(scope.row)">禁用</span>
                  <span v-if="scope.row.revoked == 1" class="lds_tag" @click="setInfo2(scope.row)">启用</span>
                </template>
              </qd-table>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane v-if="tabs_lds" label="权限管理" name="second">
            <div class="wangpengs">
          <div class="qd-table ">
            <div class="">
              <el-table
                :data="tableData"
                style="width: 100%; margin-bottom: 20px; text-align: center"
                row-key="id"
                border
                center
                class="qd-table-cell10"
                default-expand-all
                :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
              >
                <el-table-column prop="title" label="功能模块" sortable width="180"> </el-table-column>
                <el-table-column prop="path" label="模块路径"></el-table-column>
                <el-table-column prop="mod_order" label="模块排序" align="center"></el-table-column>
                <el-table-column prop="mod_value" label="模块值" align="center"> </el-table-column>
                <el-table-column prop="permits" label="已有权限">
                  <template slot-scope="scope">
                    <span class="have_list" style="color:white" v-for="item in scope.row.permits">
                      {{ set_tage(item) }}
                    </span>
                  </template>
                </el-table-column>

                <el-table-column label="操作" align="center">
                  <template slot-scope="scope">
                    <el-button v-if="scope.row.is_power != 1" size="mini" type="prmary" @click="handleEdit2(scope.$index, scope.row)">授权 </el-button>
                    <el-button v-if="scope.row.is_power == 1" size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">禁用 </el-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
    <qd-dialog
      :label_lds="true"
      :title="dialogInfo.title"
      :visible.sync="dialogInfo.visible"
      :width="dialogInfo.width"
      :bt-loading="dialogInfo.btLoading"
      @handleOk="submitForm('ruleForm')"
      @quxiao="quxiao()"
      :isOk="isok"
    >
      <div class="lds_dialog_form">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
          <el-form-item label="角色名称" prop="name">
            <el-input :disabled="usertype == 'add' ? false : true" v-model="ruleForm.name"></el-input>
          </el-form-item>
          <el-form-item label="角色描述" prop="desc">
            <el-input v-model="ruleForm.desc" type=""></el-input>
          </el-form-item>
        </el-form>
      </div>
    </qd-dialog>
    <qd-dialog
      :label_lds="true"
      :title="dialogInfo2.title"
      :visible.sync="dialogInfo2.visible"
      :width="dialogInfo2.width"
      :bt-loading="dialogInfo2.btLoading"
      @handleOk="submitForm2('ruleForm')"
      @quxiao="quxiao()"
      :isOk="isok"
    >
      <div class="lds_dialog_form">
        <el-checkbox-group v-model="checkList">
          <el-checkbox label="添加"></el-checkbox>
          <el-checkbox label="删除"></el-checkbox>
          <el-checkbox label="修改"></el-checkbox>
          <el-checkbox label="查看"></el-checkbox>
        </el-checkbox-group>
      </div>
    </qd-dialog>
  </d2-container>
</template>

<script>
import {addRole, getRole, getOrder, permit, addRole2, setMenus, getMenu} from '@/common/login_system.js'
import {types} from '@/plugin/utils/user.js'
export default {
  name: 'lds_xitong_user',
  data() {
    var validateusername = (rule, value, callback) => {
      if (value == '') {
        callback(new Error('请输入用户名'))
      }
      if (value.length < 3) {
        callback(new Error('用户名的长度在3-9位'))
      }
      if (value.length > 9) {
        callback(new Error('用户名的长度在3-9位'))
      }
      callback()
    }

    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else if (value.length < 6) {
        callback(new Error('密码的长度在6-16位'))
      } else if (value.length > 16) {
        callback(new Error('密码的长度在6-16位'))
      } else {
        if (this.ruleForm.password_again !== '') {
          this.$refs.ruleForm.validateField('password_again')
        }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.ruleForm.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      allmenu: [],
      orderinfox: {},
      set_mod_id: '',
      set_mod_value: '',

      set_role_id: '',
      checkList: [],
      tabs_lds: false,
      activeName: 'first',

      role_id_lds: '',
      shouquanrole_id: '',
      tableData: [],
      tableData1: [
        {
          id: 1,
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
        },
        {
          id: 2,
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄',
        },
        {
          id: 3,
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄',
          hasChildren: true,
        },
        {
          id: 4,
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄',
        },
      ],
      juese: [
        {
          name: '管理用户',
          value: '1',
        },
        {
          name: '营运用户',
          value: '2',
        },
      ],
      value: '',
      // 搜索项
      queryData: {
        real_name: '',
        username: '',
        role_id: '',
      },
      dialogInfo: {
        title: '查看',
        visible: false,
        width: '600px',
      },
      dialogInfo2: {
        title: '查看',
        visible: false,
        width: '700px',
      },
      ruleForm: {
        name: '',
        desc: '',
        id: '',
      },
      rules: {
        name: [{required: true, validator: validateusername, trigger: 'blur'}],
      },
      filterFieldList: [
        {
          fieldType: 'text',
          key: 'real_name',
          value: '名称',
          label_lds: true,

          // list: "state",
        },
        {
          fieldType: 'text',
          key: 'username',
          value: '账号',
          label_lds: true,

          // list: "state",
        },
        {
          fieldType: 'select',
          key: 'role_id',
          value: '角色类型',
          list: 'role_id',
          label_lds: true,
        },
      ],
      //下拉框数据项配置
      listTypeInfo: {
        // 0调度中 1实验室处理中 2生产中 3待状料 4装料中 5运输中 6已送达 7已签收
        role_id: [
          {value: '', label: '全部'},
          {
            value: 1,
            label: '管理用户',
          },
          {
            value: 2,
            label: '运营用户',
          },
        ],
        siteName: [
          {
            value: 0,
            label: '中建八局人才公寓',
          },
          {
            value: 1,
            label: '中建七局明珠小区',
          },
          {
            value: 2,
            label: '其它项目',
          },
        ],
      },
      //表格表头数据项
      tableFieldList: [
        {
          key: 'name',
          label: '角色名称',
        },
        {
          key: 'desc',
          label: '角色描述',
        },
        {
          key: 'uses',
          label: '角色使用情况',
        },
        {
          key: 'add_time',
          label: '角色添加时间',
          type: 'slot',
        },
        {
          key: 'revoked',
          label: '当前状态',
          type: 'slot',
        },
        {
          key: 'action',
          label: '操作',
          type: 'slot',
          width: '300px',
          fixed: 'right',
        },
      ],
      getList: getRole,
    }
  },
  methods: {
    huoqucaidan() {
      let allmenu = this.allmenu
      var sidemenu = []
      var topmenu = []
      if (allmenu) {
        allmenu.map((e) => {
          if (e.children) {
            sidemenu = e.children
          }
          topmenu.push(e)
        })
        topmenu.map((e) => {
          if (e.children) {
            delete e.children
          }
        })
        let newmenu = [...new Set(topmenu)]
        // sessionStorage.setItem("newmenu", JSON.stringify(newmenu));
        localStorage.setItem('newmenu', JSON.stringify(newmenu))
        localStorage.setItem('sidemenu', JSON.stringify(sidemenu))
        // alert('开始执行')
        // 设置顶部导航栏
        this.$store.commit(
          'd2admin/menu/headerSet',
          //   newmenu
          JSON.parse(localStorage.getItem('newmenu'))
        )
        this.$store.commit(
          'd2admin/menu/asideSet',
          //   sidemenu
          JSON.parse(localStorage.getItem('sidemenu'))
        )
        // location.reloa/d()
      }
    },
    submitForm2() {
      ////console.log(this.checkList, 'chenk')
      let new_action = []
      this.checkList.map((e) => {
        if (e == '添加') {
          new_action.push('add')
        }
        if (e == '删除') {
          new_action.push('delete')
        }
        if (e == '修改') {
          new_action.push('edit')
        }
        if (e == '查看') {
          new_action.push('view')
        }
      })
      let send_can = {
        action: new_action,
        mod_id: this.set_mod_id,
        mod_value: this.set_mod_value,
        role_id: this.set_role_id,
      }
      //   action: ["add", "edit", "view"]
      // mod_id: 2
      // mod_value: "system_user"
      // role_id: 1
      this.dialogInfo2.visible = false
      setMenus(send_can).then((res) => {
        //console.log(res, 'res')
        if (res.code == 200) {
          this.$message.success('授权成功')
          getOrder(this.orderinfox).then((res) => {
            // //console.log(res, "授权列表");
            this.tableData = res.data
          })
        } else {
          this.$message.error('授权失败')
        }

        let ids = sessionStorage.getItem('role_id')
        getMenu(ids).then((res) => {
          let abc = res.data
          this.allmenu = []
          abc.map((e) => {
            // if (e.is_power == 1) {
            this.allmenu.push(e)
            // }
          })
          this.huoqucaidan()
        })
      })
    },
    set_tage(x) {
      if (x == 'add') {
        return '添加'
      }
      if (x == 'edit') {
        return '修改'
      }
      if (x == 'view') {
        return '查看'
      }
      if (x == 'delete') {
        return '删除'
      }
    },
    handleClicks(tab, event) {
      //   //console.log(tab, event)
      //console.log(tab.name, 'name')
      if (tab.name == 'first') {
        this.tabs_lds = false
      }
    },
    setInfo2(x) {
      if (this.role_id_lds != 7) {
        this.$message({
          type: 'warning',
          message: '当前用户无操作权限',
        })
        return
      }
      //   //console.log(x);
      this.dialogInfo.title = '启用'
      //    open() {
      this.$confirm('此操作将启用, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true,
      })
        .then(() => {
          addRole2(x.id).then((res) => {
            // //console.log(res, "res");
            this.freshTableList()
            this.$message({
              type: 'success',
              message: res.message,
            })
            this.freshTableList()
          })
        })
        .catch(() => {})
    },
    handleEdit2(x, y) {
      this.dialogInfo2.visible = true
      this.set_mod_id = y.id
      this.set_mod_value = y.mod_value

      //console.log(x, 'x')
      //console.log(y, 'y')
      this.checkList = []
      y.permits.map((e) => {
        if (e == 'add') {
          this.checkList.push('添加')
        }
        if (e == 'delete') {
          this.checkList.push('删除')
        }
        if (e == 'edit') {
          this.checkList.push('修改')
        }
        if (e == 'view') {
          this.checkList.push('查看')
        }
      })
      //   this.checkList = y.permits
      //console.log(this.checkList, 'checkList')
      //   this.checkList
    },
    handleEdit(x, y) {
      this.$confirm('确定要启用该模块吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true,
      })
        .then(() => {
          let data = {
            mod_id: y.id,
            role_id: this.shouquanrole_id,
            action: 1,
          }
          permit(data).then((res) => {
            if (res.code == 200) {
              this.$message({
                type: 'success',
                message: res.message,
              })
              this.dialogInfo2.visible = false
            } else {
              this.$message({
                message: res.message,
                type: 'warning',
              })
            }
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '操作已取消',
          })
        })
    },
    handleDelete(x, y) {
      this.$confirm('确定要禁用该模块吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true,
      })
        .then(() => {
          let data = {
            mod_id: y.id,
            role_id: this.shouquanrole_id,
            action: 0,
          }
          permit(data).then((res) => {
            if (res.code == 200) {
              this.$message({
                type: 'success',
                message: res.message,
              })
              this.dialogInfo2.visible = false
            } else {
              this.$message({
                message: res.message,
                type: 'warning',
              })
            }
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '操作已取消',
          })
        })
    },
    orderInfo(x) {
      //console.log(x, 'xxxx')
      this.orderinfox = x
      this.set_role_id = x.id
    //   if (this.role_id_lds != 7) {
    //     this.$message({
    //       type: 'warning',
    //       message: '当前用户无操作权限',
    //     })
    //     return
    //   }

      //   //console.log(x, "xxx");
      //   this.shouquanrole_id = x.id
      //   this.dialogInfo2.title = '授权'
      //   this.dialogInfo2.visible = true
      this.activeName = 'second'
      this.tabs_lds = true
      //console.log(this.activeName, 'activeName')
      getOrder(x).then((res) => {
        // //console.log(res, "授权列表");
        this.tableData = res.data
      })
    },
    setInfo(x) {
      if (this.role_id_lds != 7) {
        this.$message({
          type: 'warning',
          message: '当前用户无操作权限',
        })
        return
      }
      this.usertype = 'delete'
      this.dialogInfo.title = '禁用'
      //    open() {
      this.$confirm('此操作将永久禁用, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true,
      })
        .then(() => {
          addRole(x, this.usertype).then((res) => {
            // //console.log(res, "res");
            this.$message({
              type: 'success',
              message: res.message,
            })
            this.freshTableList()
          })
        })
        .catch(() => {
          //   this.$message({
          //     type: "info",
          //     message: "已取消禁用",
          //   });
        })
      //   }
    },
    refresh() {
      this.freshTableList()
    },
    quxiao() {
      for (let key in this.ruleForm) {
        this.ruleForm[key] = ''
      }
    },
    getLocalTime(nS) {
      return new Date(nS * 1000).toLocaleString().replace(/:\d{1,2}$/, ' ')
    },
    get_role(x) {
      return types[x]
    },
    addInfo() {
      if (this.role_id_lds != 7) {
        this.$message({
          type: 'warning',
          message: '当前用户无操作权限',
        })
        return
      }
      this.dialogInfo.title = '新增'
      this.usertype = 'add'
      this.dialogInfo.visible = true
      //   //console.log("i90");
    },
    goInfo(x) {
      if (this.role_id_lds != 7) {
        this.$message({
          type: 'warning',
          message: '当前用户无操作权限',
        })
        return
      }
      this.dialogInfo.title = '编辑'
      this.usertype = 'edit'
      //   //console.log(x);
      this.dialogInfo.visible = true
      for (let key in this.ruleForm) {
        this.ruleForm[key] = x[key]
      }
      //   this.ruleForm.password = x.real_pwd;
      //   this.ruleForm.real_name = x.real_name;
      //   this.ruleForm.role_id = x.role_id.toString();
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          //   alert("submit!");
          //   //console.log(this.ruleForm, "打印当前输出");
          addRole(this.ruleForm, this.usertype).then((res) => {
            // //console.log(res);
            if (res.code == 200) {
              this.$message({
                message: res.message,
                type: 'success',
              })
              this.dialogInfo.visible = false
              this.freshTableList()
            } else {
              this.$message({
                message: res.message,
                type: 'warning',
              })
            }
          })
          //
        } else {
          //   //console.log("error submit!!");
          return false
        }
      })
    },

    // formatDate(now) {
    //   var g = 1551334252272; //定义一个时间戳变量
    //   var d = new Date(g); //创建一个指定的日期对象
    //   //console.log(d);
    //   //console.log(formatDate(d));

    //   var year = now.getFullYear(); //取得4位数的年份
    //   var month = now.getMonth() + 1; //取得日期中的月份，其中0表示1月，11表示12月
    //   var date = now.getDate(); //返回日期月份中的天数（1到31）
    //   var hour = now.getHours(); //返回日期中的小时数（0到23）
    //   var minute = now.getMinutes(); //返回日期中的分钟数（0到59）
    //   var second = now.getSeconds(); //返回日期中的秒数（0到59）
    //   return (
    //     year +
    //     "-" +
    //     month +
    //     "-" +
    //     date +
    //     " " +
    //     hour +
    //     ":" +
    //     minute +
    //     ":" +
    //     second
    //   );
    // },
  },
  watch: {
    $route: {
      handler(newValue, oldValue) {
        //执行代码
        if (newValue.path.includes('/system')) {
          setTimeout(() => {
            this.freshTableList()
          }, 100)
        } else {
        }
      },
      immediate: true, //true就表示会立即执行
    },
  },
  mounted() {
    // //console.log(this.getLocalTime(1619141651));
    this.getLocalTime(1619141651)
    this.refresh()
  },
  created() {
    this.role_id_lds = sessionStorage.getItem('role_id')
    //  this.role_id_lds =2;
  },
}
</script>
<style lang="scss" scoped>
@import 'bg.css';

/* .el-tag {
} */
.lds_tag {
  margin-right: 10px;
}

.el-select {
  width: 100%;
}

.tableHandleBtn {
    background-image: linear-gradient(#F68A00, #99430E);
   color: white;
  margin-left: 30px;
    border: 1px solid #fff0;

}
.have_list {
  display: inline-block;
  padding: 4px;
  background: #4caf50;
  margin-right: 4px;
  border-radius: 4px;
  color: white !important;
}
.tabs_system{
    padding: 30px;
}
/* /deep/.el-table th > .cell {
  text-align: center;
}

/deep/.el-table .cell {
  text-align: center;
} */
</style>
