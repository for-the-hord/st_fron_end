<template>
  <d2-container style="cursor: pointer" ref="">
    <!-- <template slot="header">这个页面会被 keep-alive</template>
    <p class="d2-mt-0">
      在下面的输入框输入任意字符后，切换到其它页面，再回到此页时输入框文字保留，证明被缓存
    </p>
    <el-input v-model="value" placeholder="input here"></el-input> -->
    <br />
    <qd-filter
      style="margin-left: 30px"
      :label_lds="true"
      :search_lds="true"
      :query.sync="queryData"
      :filter-list="filterFieldList"
      :list-type-info="listTypeInfo"
      @handleClick="handleClick"
    />

    <el-button class="tableHandleBtn" size="mini" icon="el-icon-plus" @click="addInfo()">添加用户</el-button>
    <el-button class="tableHandleBtn" size="mini" icon="el-icon-refresh" @click="refresh()">刷新</el-button>
    <br /><br />
    <br />
    <div class="tabletd_center">
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
          <span v-if="scope.row.revoked == 0" class="lds_tag lds_red" @click="setInfo(scope.row)">禁用</span>
          <span v-if="scope.row.revoked == 1" class="lds_tag" @click="setInfo2(scope.row)">启用</span>
        </template>
      </qd-table>
    </div>
    <qd-dialog
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
          <el-form-item label="用户账号：" prop="username">
            <el-input :disabled="usertype == 'add' ? false : true" v-model="ruleForm.username"></el-input>
          </el-form-item>
          <el-form-item label="登录密码：" prop="password">
            <el-input v-model="ruleForm.password" type="password"></el-input>
          </el-form-item>
          <el-form-item label="再次输入密码：" prop="password_again">
            <el-input v-model="ruleForm.password_again" type="password"></el-input>
          </el-form-item>
          <el-form-item label="用户姓名：" prop="real_name">
            <el-input v-model="ruleForm.real_name"></el-input>
          </el-form-item>
          <el-form-item label="分配角色：" prop="role_id">
            <el-select v-model="ruleForm.role_id" placeholder="请选择分配角色">
              <el-option v-for="item in juese" :key="item.value" :label="item.name" :value="item.value"></el-option>
              <!-- <el-option label="营运角色" value="2"></el-option> -->
            </el-select>
          </el-form-item>
        </el-form>
      </div>
    </qd-dialog>
  </d2-container>
</template>

<script>
// 更换请求地址拦截器
import {getUsers, addUsers, addUsers2, getSystemRole} from '@/common/login_system.js'
import {types} from '@/plugin/utils/user.js'

export default {
  name: 'lds_xitong_user',
  data() {
    var validateusername = (rule, value, callback) => {
      if (value == '') {
        callback(new Error('请输入用户名'))
      }
      if (value.length < 3) {
        callback(new Error('用户名的长度在3-12位'))
      }
      if (value.length > 12) {
        callback(new Error('用户名的长度在3-12位'))
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
      role_id_lds: '',
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
      ruleForm: {
        username: '',
        password: '',
        password_again: '',
        nick_name: '',
        role_id: '',
        real_name: '',
      },
      rules: {
        username: [{validator: validateusername, trigger: 'blur'}],
        password: [
          {
            validator: validatePass,
            trigger: 'change',
          },
        ],
        password_again: [{validator: validatePass2, trigger: 'change'}],
        nick_name: [{required: true, message: '请输入用户姓名', trigger: 'blur'}],
        role_id: [{required: true, message: '请选择分配角色', trigger: 'change'}],
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
        role_id: [{value: '', label: '全部'}],
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
          key: 'username',
          label: '账号',
          //   width: "220px",
        },
        {
          key: 'real_name',
          label: '真实姓名',
        },
        {
          key: 'add_time',
          label: '时间',
          type: 'slot',

          // width: "120px",
        },

        // {
        //   key: 'role_id',
        //   label: '角色',
        //   type: 'slot',
        // },
        {
          key: 'add_time',
          label: '创建时间',
          type: 'slot',
        },
        {
          key: 'add_time',
          label: '最后登录时间',
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
      getList: getUsers,
      userid: '',
    }
  },
  methods: {
    get_roleid() {
      return sessionStorage.getItem('role_id')
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
      if (this.role_id_lds != 1) {
        this.$message({
          type: 'warning',
          message: '当前用户无操作权限',
        })
        return
      }
      this.usertype = 'add'
      this.dialogInfo.visible = true
      this.dialogInfo.title = '新增'
    },
    setInfo(x) {
      if (this.role_id_lds != 1) {
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
          addUsers('', 'delete', x.id).then((res) => {
            // console.log(res, "res");
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
    setInfo2(x) {
      if (this.role_id_lds != 1) {
        this.$message({
          type: 'warning',
          message: '当前用户无操作权限',
        })
        return
      }
      this.usertype = 'delete'
      this.dialogInfo.title = '启用'
      //    open() {
      this.$confirm('此操作将启用, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true,
      })
        .then(() => {
          addUsers2(x.id).then((res) => {
            // console.log(res, "res");
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
    goInfo(x) {
      //console.log(x)
      this.userid = x.id
      if (this.role_id_lds != 1) {
        this.$message({
          type: 'warning',
          message: '当前用户无操作权限',
        })
        return
      }
      //   console.log(x);
      this.dialogInfo.title = '编辑'
      this.usertype = 'edit'
      this.dialogInfo.visible = true
      for (let key in this.ruleForm) {
        this.ruleForm[key] = x[key]
      }
      this.ruleForm.password = x.real_pwd
      this.ruleForm.real_name = x.real_name
      this.ruleForm.role_id = x.role_id.toString()
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          //   alert("submit!");
          //   console.log(this.ruleForm, "打印当前输出");
          addUsers(this.ruleForm, 'edit', this.userid).then((res) => {
            // console.log(res);
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
          //   console.log("error submit!!");
          return false
        }
      })
    },

    // formatDate(now) {
    //   var g = 1551334252272; //定义一个时间戳变量
    //   var d = new Date(g); //创建一个指定的日期对象
    //   console.log(d);
    //   console.log(formatDate(d));

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
  created() {
    this.role_id_lds = sessionStorage.getItem('role_id')
    getSystemRole().then((res) => {
      //   console.log(res, "getSystemRole");
      res.data.data.map((e) => {
        if (e.revoked == 0) {
          this.listTypeInfo.role_id.push({value: e.id, label: e.name})
        }
      })
      let newArr = this.listTypeInfo.role_id
      newArr.map((e) => {
        e.name = e.label
      })
      //   console.log(newArr,'this.juese = this.')
      this.juese = newArr
    })
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
    let that = this
    that.socket = this.$sockets('check')
    that.socket.emit('SecretCheck', {name: 'sgy', age: '11111'})
    that.socket.on(`SecretCheckResponse`, function (res) {
      //console.log(res)
    })
    // console.log(this.getLocalTime(1619141651));
    this.getLocalTime(1619141651)
    this.freshTableList()
    this.refresh()
  },
}
</script>
<style lang="scss" scoped>
@import 'bg.css';
// @import "./bg.css";

/* .el-tag {
} */
.qd-table thead,
.qd-table .el-pagination__jump {
  display: block !important;
}

.el-pagination__jump {
  display: block;
}
.lds_tag {
  margin-right: 10px;
}
.el-select {
  width: 100%;
}
.filterLabel {
  color: white !important;
}
.tableHandleBtn {
    background-image: linear-gradient(#F68A00, #99430E);
   color: white;
  margin-left: 30px;
    border: 1px solid #fff0;

}
</style>
