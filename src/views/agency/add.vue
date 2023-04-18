<template>
  <d2-container>
    <div class="Aone-page-renzheng">
      <p class="" style="color: gray; cursor: pointer">
        机构评测 > <span @click="goback()"> 我的机构 </span> > <span style="color: black"> 机构添加</span>
      </p>

      <div class="renzheng2">
        <h1 class="weights" style="margin-left: 70px; font-size: 20px">机构认证</h1>
        <br />
        <div class="new_renzheng">
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="机构名称：" prop="name">
              <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
            <el-form-item label="社会统一信用代码：" prop="code">
              <el-input v-model="ruleForm.code"></el-input>
            </el-form-item>

            <el-form-item label="详细地址：" prop="address">
              <el-input v-model="ruleForm.address"></el-input>
            </el-form-item>

            <el-form-item label="省份" prop="pro">
              <el-select @change="get_city" v-model="ruleForm.pro" placeholder="请选择省份">
                <el-option v-for="item in pro_list" :label="item.name" :code="item.code" :value="item.code"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="地市" prop="city">
              <el-select @change="get_xian" v-model="ruleForm.city" placeholder="请选择地市">
                <el-option v-for="item in city_list" :label="item.name" :value="item.code"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="县区" prop="xian">
              <el-select v-model="ruleForm.xian" placeholder="请选择县区">
                <el-option v-for="item in xian_list" :label="item.name" :value="item.code"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="机构人数：" prop="total_user">
              <el-input v-model="ruleForm.total_user"></el-input>
            </el-form-item>
            <el-form-item label="机构职称信息录入：">
              <p class="thead flex_center_around" style="width: 55%">
                <span> 职称名称 </span>
                <span> 人数 </span>
              </p>
              <div style="width: 100%; height: 40px; margin-top: 10px" v-for="(item, index) in work_list">
                <div style="width: 35%; float: left">
                  <el-select v-model="item.type" placeholder="请选择">
                    <el-option v-for="items in options" :key="items.value" :label="items.label" :value="items.value">
                    </el-option>
                  </el-select>
                </div>
                <div style="width: 15%; float: left">
                  <el-input type="number" v-model="item.value"></el-input>
                </div>
                <div class="pointer" style="width: 15%; margin-left: 20px; float: left">
                  <i @click="add_item()" v-if="index == work_list.length - 1" class="el-icon-plus"></i>
                  <i @click="del_item(index)" style="margin-left: 10px" v-if="index != 0" class="el-icon-minus"></i>
                </div>
              </div>
            </el-form-item>
            <!-- 职称信息 录入： -->

            <el-form-item>
              <el-button style="float: right" @click="resetForm('ruleForm')">取消</el-button>

              <el-button style="float: right; margin-right: 10px" type="primary_test" @click="submitForm('ruleForm')"
                >提交认证</el-button
              >
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </d2-container>
</template>

<script>
import { new_agency, new_area, new_area2 } from './big.js';
export default {
  name: 'mine',
  data() {
    var check_user = (rule, value, callback) => {
      if (value) {
        if (value.length < 2) {
          callback(new Error('请确保长度在2-8位'));
        }
        //   chineseandstring: /^[a-zA-Z0-9\u4e00-\u9fa5]*[\u4e00-\u9fa5][a-zA-Z0-9]*$/,

        if (!/^[a-zA-Z0-9\u4e00-\u9fa5]*[\u4e00-\u9fa5][a-zA-Z0-9]*$/.test(value)) {
          callback(new Error('请确保不能为纯数字或者特殊字符'));
        } else {
          callback();
        }
      } else {
        callback();
      }
    };

    var check_user2 = (rule, value, callback) => {
      if (value) {
        // if (value.length < 2) {
        //   callback(new Error('请确保长度在2-8位'));
        // }
        //   chineseandstring: /^[a-zA-Z0-9\u4e00-\u9fa5]*[\u4e00-\u9fa5][a-zA-Z0-9]*$/,

        if (!/^[a-zA-Z0-9\u4e00-\u9fa5]*[\u4e00-\u9fa5][a-zA-Z0-9]*$/.test(value)) {
          callback(new Error('请确保不能为纯数字或者特殊字符'));
        } else {
          callback();
        }
      } else {
        callback();
      }
    };
    return {
      pro_list: [],
      city_list: [],
      xian_list: [],
      next: true,
      work_list: [
        {
          type: '',
          value: '',
        },
      ],
      options: [
        {
          label: '助理级',
          value: '1',
        },
        {
          label: '中级',
          value: '2',
        },
        {
          label: '副高级',
          value: '3',
        },
        {
          label: '正高级',
          value: '4',
        },
      ],
      points: '',
      ruleForm: {
        name: '', //机构名称
        code: '', //统一社会标识
        description: '', //机构描述
        area_id: '', //地域编号
        address: '', //机构详细地址
        type: 1, //机构类型
        total_user: '', //机构人数
        title: [],
        pro: '',
        city: '',
        xian: '',
      },
      rules: {
        name: [
          {
            validator: check_user,
            trigger: 'blur',
          },
        ],
        address: [
          {
            validator: check_user2,
            trigger: 'blur',
          },
        ],
        code: [{ required: true, message: '请输入', trigger: 'blur' }],
        description: [{ required: true, message: '请输入', trigger: 'blur' }],
         type: [{ required: true, message: '请输入', trigger: 'blur' }],
        total_user: [{ required: true, message: '请输入', trigger: 'blur' }],
      },

      //   右键
    };
  },
  created() {
    new_area().then((res) => {
      console.log(res, 'area');
      this.pro_list = res.data;
    });
  },
  watch: {
    //   监听属性对象，newValue为新的值，也就是改变后的值
    visible(newValue, oldValue) {
      if (newValue) {
        //菜单显示的时候
        // document.body.addEventListener，document.body.removeEventListener它们都接受3个参数
        // ("事件名" , "事件处理函数" , "布尔值");
        // 在body上添加事件处理程序
        document.body.addEventListener('click', this.closeMenu);
      } else {
        //菜单隐藏的时候
        // 移除body上添加的事件处理程序
        document.body.removeEventListener('click', this.closeMenu);
      }
    },
  },
  methods: {
    goback() {
      this.$router.go(-1);
    },
    goback2() {
      this.$router.go(-2);
    },
    add_item() {
      this.work_list.push({ type: '', value: '' });
    },
    del_item(x) {
      this.work_list.splice(x, 1);
    },
    get_city(x) {
      new_area2(x).then((res) => {
        this.city_list = res.data;
      });
    },
    get_xian(x) {
      new_area2(x).then((res) => {
        this.xian_list = res.data;
      });
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          //   alert('submit!');
          if (!this.ruleForm.pro) {
            this.$message.warning('请至少选择省份');
            return false;
          }
          this.ruleForm.title = this.work_list;

          if (this.ruleForm.xian) {
            this.ruleForm.area_id = this.ruleForm.xian;
          }
          if (!this.ruleForm.xian && this.ruleForm.city) {
            this.ruleForm.area_id = this.ruleForm.city;
          }
          if (this.ruleForm.pro && !this.ruleForm.xian && !this.ruleForm.city) {
            this.ruleForm.area_id = this.ruleForm.pro;
          }

          this.ruleForm.title.map((e) => {
            e.type = parseInt(e.type);
            e.value = parseInt(e.value);
          });

          new_agency(this.ruleForm).then((res) => {
            this.$router.push({
                path:"/agency/mine"
            })
          });
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.$router.push({
        path: '/agency/mine',
      });
    },
    //右击
    openMenu(e, item) {
      var x = e.pageX; //这个应该是相对于整个浏览器页面的x坐标，左上角为坐标原点（0,0）
      var y = e.pageY; //这个应该是相对于整个浏览器页面的y坐标，左上角为坐标原点（0,0）
      this.top = y;
      this.left = x;
      this.visible = true; //显示菜单
      //   this.reallyId = item.id;
      //   this.reallyState = item.state;
    },
    //关闭菜单
    closeMenu() {
      this.visible = false; //关闭菜单
    },
  },
};
</script>

<style lang="scss" scoped>
.lds_table {
  width: 50%;
  border: 1px solid gray;
  td {
    border: 1px solid gray;
    text-align: center;
  }
}
.renzheng {
  width: 80%;
  text-align: center;
  margin: 100px auto;
}
.renzheng2 {
  width: 800px;
  //   border: 1px solid gray/;gray
  border-radius: 4px;
  margin: 50px auto;
  padding: 30px;
  box-shadow: -2px -2px 10px 10px #e6e7eb;
}
.contextmenu {
  margin: 0;
  background: #fff;
  z-index: 3000;
  position: fixed; //关键样式设置固定定位
  list-style-type: none;
  padding: 5px 0;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 400;
  color: #333;
  box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.3);
}

.contextmenu li {
  margin: 0;
  padding: 7px 16px;
  cursor: pointer;
}
.contextmenu li:hover {
  background: #eee;
}
.context_li i {
  margin-right: 4px;
}
.context_li {
  width: 50px;
  text-align: center;
}
.info-p {
  height: 30px;
  line-height: 30px;
  padding: 0 10px 0 10px;
}
.info-left {
  float: left;
}
.info-right {
  float: right;
  color: #8f90a6;
}
.yihe {
  display: inline-block;
  padding: 4px;
  border: 1px solid #00b2b0;
  color: #00b2b0;
  background: #e2ffff;
  font-size: 13px;
}

.yice {
  display: inline-block;
  padding: 4px;
  border: 1px solid #0080ff;
  color: #0080ff;
  background: #e5f0ff;
  font-size: 13px;
}

.heing {
  display: inline-block;
  padding: 4px;
  border: 1px solid #daab04;
  color: #daab04;
  background: #fff9c8;
  font-size: 13px;
}

.heerror {
  display: inline-block;
  padding: 4px;
  border: 1px solid #ff3d00;
  color: #ff3d00;
  background: #ffe8e0;
  font-size: 13px;
}
.test {
  height: 40px;
  position: relative;
}
.mine-head {
  width: 80%;
  height: 140px;
  margin: 30px auto;
  background: #fff;
  border: 1px solid #e8e8e8;
}
.mine-body {
  width: 80%;
  overflow: hidden;
  margin: 0 auto;
}
.company_add {
  width: 280px;
  height: 360px;
  text-align: center;
  background: #fff;
  border-radius: 4px;
}
.company_head {
  background: url('/image/AOne/company.png') no-repeat center;
  font-size: 20px;
  font-weight: bold;
  color: #fff;
  height: 120px;
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
.imgs {
  position: absolute;
  right: 20px;
  top: -20px;
  background: url('/image/AOne/pointer_fenshu.png') no-repeat;
  width: 47px;
  height: 47px;
  color: #7f4215;
  font-weight: bold;
  font-size: 16px;
  text-align: center;
  line-height: 43px;
}
</style>
