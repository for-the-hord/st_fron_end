<template>
  <d2-container>
    <div class="Aone-page2">
      <div class="mine-head flex_center_around"></div>
      <p
        class=""
        style="width: 100%; padding: 20px; color: gray; cursor: pointer"
      >
        人才评测 > <span @click="goback2()"> 在线考试 </span> >
        <span style="color: black">排行榜</span>
      </p>
      <div class="tops"></div>

      <div class="qd-table" style="position: relative; margin: 20px">
        <el-table
          v-if="tableInfo.data"
          :data="tableInfo.data"
          style="width: 100%; color: white"
          v-loading="loading"
          @cell-mouse-enter="hover_table_lds"
          @row-click="goDetail"
          :header-cell-style="header_style"
          :cell-style="body_style"
          @selection-change="handleSelectionChange"
        >
          <!-- <el-table-column type="selection" width="55"> </el-table-column> -->
          <!-- rank: 1
real_name: "管理员"
score: 2
started: 1669884470
used_time: 330
username: "18311111111_su" -->
          <el-table-column prop="rank" label="排名" :cell-style="timeStyle">
            <template slot-scope="scope">
              <span style="cursor: pointer"> {{ scope.row.rank }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="real_name"
            label="姓名"
            :cell-style="timeStyle"
          >
          </el-table-column>
          <el-table-column prop="username" label="账号" :cell-style="timeStyle">
          </el-table-column>
          <el-table-column
            prop="started"
            label="考试用时"
            :cell-style="timeStyle"
          >
            <template slot-scope="scope">
              <span style="cursor: pointer">
                {{ getTime(scope.row.started) }}</span
              >
            </template>
          </el-table-column>

          <el-table-column prop="name" label="得分" :cell-style="timeStyle">
            <template slot-scope="scope">
              <span style="cursor: pointer"> {{ scope.row.code }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="name" label="电子证书" :cell-style="timeStyle">
            <template slot-scope="scope">
              <!-- 审核状态：0-未审核，1-未通过，2-已审核 -->
              <span style="cursor: pointer" v-if="scope.row.state == 0">
                未审核
              </span>
              <span style="cursor: pointer" v-if="scope.row.state == 1">
                未通过
              </span>
              <span style="cursor: pointer" v-if="scope.row.state == 2">
                已审核
              </span>
            </template>
          </el-table-column>
          <el-table-column
            prop="certificate"
            label="机构证书"
            :cell-style="timeStyle"
          >
            <template slot-scope="scope">
              <!-- 审核状态：0-未审核，1-未通过，2-已审核 -->
              <span style="cursor: pointer" v-if="scope.row.certificate == 0">
                未生成
              </span>
              <span style="cursor: pointer" v-if="scope.row.certificate == 1">
                已生成
              </span>
            </template>
          </el-table-column>

        
        </el-table>
      </div>
      <br />
      <div class="block qd-table">
        <el-pagination
          v-if="tableInfo.data.length > 1"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage_present"
          :page-size="20"
          layout="prev, pager, next, jumper"
          :total="total"
        >
        </el-pagination>
      </div>
      <div
        style="
          wdith: 100%;
          color: white;
          margin: 200px auto;
          text-align: center;
        "
        v-if="tableInfo.data.length < 1"
      >
        <br />
        <span class="zanwu" style="color: gray"> 暂无数据</span>
      </div>
    </div>

    <qd-dialog
      :title="dialogInfo2.title"
      :visible.sync="dialogInfo2.visible"
      :width="dialogInfo2.width"
      :bt-loading="dialogInfo2.btLoading"
      @handleOk="submitFormhandle()"
      @quxiao="quxiao()"
      :isOk="isok"
      :nofooter="true"
    >
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="60px"
        style="padding: 20px; width: 80%; margin: 0 auto"
        class="demo-ruleForm"
      >
        <el-form-item label="机构名称：" prop="name">
          <el-input v-model="ruleForm.name" disabled></el-input>
        </el-form-item>
        <el-form-item label="机构描述：" prop="description">
          <el-input
            type="textarea"
            :rows="3"
            v-model="ruleForm.description"
            disabled
          ></el-input>
        </el-form-item>
        <el-form-item label="信用代码：" prop="code">
          <el-input v-model="ruleForm.code" disabled></el-input>
        </el-form-item>
        <el-form-item label="所在区域：" prop="pro">
          <el-select
            clearable
            @change="get_city"
            v-model="ruleForm.pro"
            placeholder="请选择一级区域"
            style="width: 30%; float: left; margin-right: 10px"
            disabled
          >
            <el-option
              v-for="item in pro_list"
              :label="item.name"
              :code="item.code"
              :value="item.code"
            >
            </el-option>
          </el-select>
          <el-select
            clearable
            v-if="if_city"
            @change="get_xian"
            v-model="ruleForm.city"
            placeholder="请选择二级区域"
            style="width: 30%; float: left; margin-right: 10px"
            disabled
          >
            <el-option
              v-for="item in city_list"
              :label="item.name"
              :value="item.code"
            ></el-option>
          </el-select>
          <el-select
            clearable
            v-if="if_xian"
            v-model="ruleForm.xian"
            placeholder="请选择三级区域"
            style="width: 30%; float: left; margin-right: 10px"
            disabled
          >
            <el-option
              v-for="item in xian_list"
              :label="item.name"
              :value="item.code"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="详细地址：" prop="address">
          <el-input v-model="ruleForm.address" disabled></el-input>
        </el-form-item>
        <el-form-item label="机构类型：" prop="type">
          <el-select
            v-model="ruleForm.type"
            placeholder="请选择机构类型"
            disabled
          >
            <el-option
              v-for="item in type_list"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="机构人数：" prop="total_user">
          <el-input v-model="ruleForm.total_user" disabled></el-input>
        </el-form-item>
        <el-form-item label="职称信息：">
          <p class="thead flex_center_around" style="width: 65%">
            <span style="color: black"> 职称类型 </span>
            <span style="color: black"> 职称人数 </span>
          </p>
          <div
            style="width: 100%; height: 40px; margin-top: 10px"
            v-for="(item, index) in work_list"
          >
            <div style="width: 35%; float: left">
              <el-select
                disabled
                v-model="item.title_type"
                placeholder="请选择职称类型"
              >
                <el-option
                  v-for="items in options"
                  :key="items.value"
                  :label="items.label"
                  :value="items.value"
                >
                </el-option>
              </el-select>
            </div>
            <div style="width: 25%; float: left; margin-left: 10px">
              <el-input
                type="number"
                disabled
                v-model="item.title_user"
              ></el-input>
            </div>
            <div
              class="pointer"
              style="width: 15%; margin-left: 20px; float: left"
            >
              <i
                @click="add_item()"
                v-if="index == work_list.length - 1"
                class="el-icon-plus"
              ></i>
              <i
                @click="del_item(index)"
                style="margin-left: 10px"
                v-if="index != 0"
                class="el-icon-minus"
              ></i>
            </div>
          </div>
        </el-form-item>
      </el-form>
      <el-form
        ref="form"
        style="padding: 20px; width: 80%; margin: 0 auto"
        :model="form"
        label-width="80px"
      >
        <el-form-item label="审核意见">
          <el-input
            type="textarea"
            :rows="3"
            v-model="form.state_remark"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary-test" @click="pass1">通过审核</el-button>
          <el-button type="danger" @click="pass2">拒绝审核</el-button>
        </el-form-item>
      </el-form>
    </qd-dialog>

    
  </d2-container>
</template>

<script>
 import {
  top_one,
  process2,
  process3,
  detail,
  new_area,
  new_area2,
} from "./big.js";
export default {
  name: "mine",
  data() {
    return {
      options: [
        {
          label: "助理级",
          value: 1,
        },
        {
          label: "中级",
          value: 2,
        },
        {
          label: "副高级",
          value: 3,
        },
        {
          label: "正高级",
          value: 4,
        },
      ],
      type_list: [
        {
          label: "企业",
          value: 1,
        },
        {
          label: "高校",
          value: 2,
        },
        {
          label: "政府",
          value: 3,
        },
        {
          label: "科研单位",
          value: 4,
        },
      ],
      new_id: {},
      form: {
        state_remark: "",
      },
      dialogInfo2: {
        title: "机构审核",
        visible: false,
        width: "50%",
      },
      dialogInfo3: {
        title: "机构查看",
        visible: false,
        width: "50%",
      },
      formInline: {
        name: "",
        type: "",
        state: "",
        is_cert: "",
      },
      rules: {
        name: [],
        type: [],
        state: [],
      },
      send_data: {
        name: "",
        type: "-1",
        state: "-1",
        is_cert: "-1",
      },
      tableInfo: {
        data: [],
      },
      limit: 10,
      page: 1,
      total: "",
      currentPage_present: 1,
      next: true,
      head_list: [
        { name: "认证机构总数", num: 0, src: "/image/AOne/count.png" },
        { name: "已通过审核", num: 0, src: "/image/AOne/ok.png" },
        { name: "审核中", num: 0, src: "/image/AOne/ing.png" },
        { name: "审核未通过", num: 0, src: "/image/AOne/rejucet.png" },
      ],
      body_list: [],
      //   右键
      visible: false,
      top: 0,
      left: 0,
      //   右键
      ruleForm: {
        name: "", //机构名称
        code: "", //统一社会标识
        description: "", //机构描述
        area_id: "", //地域编号
        address: "", //机构详细地址
        type: 1, //机构类型
        total_user: "", //机构人数
        title: [],
        pro: "",
        city: "",
        xian: "",
      },
      work_list: [],
      // 直辖市
      gentral: [110000, 120000, 310000, 500000],
      if_xian: false,
      if_city: false,
      pro_list: [],
      city_list: [],
      xian_list: [],
    };
  },
  created() {
    // this.getSearch();
    console.log(this.$route.query.id, "00000");

    top_one(this.$route.query.id).then((res) => {
      console.log(res.data.data.data , "00000");
      this.tableInfo.data = res.data.data.data  ;
      this.total = res.data.total;
    });
  },

  methods: {
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
    get_pro() {
      new_area().then((res) => {
        this.pro_list = res.data;
      });
    },
    get_city(x) {
      this.if_xian = false;
      this.if_city = false;
      this.ruleForm.city = "";
      this.ruleForm.xian = "";
      if (x) {
        new_area2(x).then((res) => {
          this.city_list = res.data;
          if (this.city_list.length > 0) {
            this.if_city = true;
          } else {
            this.if_city = false;
          }
        });
      }
    },
    get_xian(x) {
      this.if_xian = false;
      this.ruleForm.xian = "";
      if (x) {
        new_area2(x).then((res) => {
          this.xian_list = res.data;
          if (this.xian_list.length > 0) {
            this.if_xian = true;
          } else {
            this.if_xian = false;
          }
        });
      }
    },
    pass1() {
      // 通过审核
      let send = {
        list: `[${this.new_id.id}]`,
        state: 2,
        state_remark: this.form.state_remark,
      };
      process3(send).then((res) => {
        if (res.code == 200) {
          this.$message.success(res.message);
          this.getSearch();
          this.dialogInfo2.visible = false;
        } else {
          this.$message.warning(res.message);
        }
      });
    },
    pass2() {
      // 拒绝审核
      let send = {
        list: `[${this.new_id.id}]`,
        state: 1,
        state_remark: this.form.state_remark,
      };
      process3(send).then((res) => {
        if (res.code == 200) {
          this.$message.success(res.message);
          this.getSearch();
          this.dialogInfo2.visible = false;
        } else {
          this.$message.warning(res.message);
        }
      });
    },
    spider_put(x) {
      this.initForm();
      this.dialogInfo2.visible = true;
      this.new_id = x;
      detail(x.id).then((res) => {
        this.ruleForm = res.data;
        this.work_list = res.data.title;
        this.deal_area({
          city_code: res.data.city_code,
          country_code: res.data.country_code,
        });
      });
    },
    spider_put2(x) {
      this.initForm();
      this.dialogInfo3.visible = true;
      detail(x.id).then((res) => {
        this.ruleForm = res.data;
        this.work_list = res.data.title;
        this.deal_area({
          city_code: res.data.city_code,
          country_code: res.data.country_code,
        });
      });
    },
    timeStyle() {
      return "text-align:center !important";
    },
    resetForm(formName) {
      this.formInline.name = "";
      this.formInline.type = "";
      this.formInline.state = "";
      this.getSearch();
    },
    getSearch() {
      this.setKey();
      this.tableInfo.data = [];
      this.head_list[0].num = 0;
      this.head_list[1].num = 0;
      this.head_list[2].num = 0;
      this.head_list[3].num = 0;
      process2(this.send_data).then((res) => {
        if (res.data.list) {
          this.tableInfo.data = res.data.list;
        } else {
          this.tableInfo.data = [];
        }
        this.total = res.data.total_info.total;
        this.head_list[0].num = res.data.total_info.total;
        this.head_list[1].num = res.data.total_info.pass;
        this.head_list[2].num = res.data.total_info.hall;
        this.head_list[3].num = res.data.total_info.fail;
      });
    },
    setKey() {
      this.send_data.name = this.formInline.name;
      this.send_data.type = this.formInline.type || "-1";
      this.send_data.state = this.formInline.state || "-1";
      this.send_data.is_cert = this.formInline.is_cert || "-1";
    },
    handleCurrentChange(val) {
      this.send_data.page = val;
      this.getSearch();
    },
    test_s(x) {
      this.$router.push({
        path: "/agency/mine_manager",
        query: { send: x },
      });
    },
    go_any() {
      this.$router.push({
        path: "/agency/mine/add",
      });
    },
    //右击
    openMenu(e, item) {
      var x = e.pageX; //这个应该是相对于整个浏览器页面的x坐标，左上角为坐标原点（0,0）
      var y = e.pageY; //这个应该是相对于整个浏览器页面的y坐标，左上角为坐标原点（0,0）
      this.top = y;
      this.left = x;
      this.visible = true; //显示菜单
    },
    //关闭菜单
    closeMenu() {
      this.visible = false; //关闭菜单
    },
    initForm() {
      this.ruleForm = {
        name: "", //机构名称
        code: "", //统一社会标识
        description: "", //机构描述
        area_id: "", //地域编号
        address: "", //机构详细地址
        type: "", //机构类型
        total_user: "", //机构人数
        title: [],
        pro: "",
        city: "",
        xian: "",
      };
      this.work_list = [{ title_type: "", title_user: "" }];
      this.form.state_remark = "";
    },
    deal_area(areaObj) {
      this.get_pro();
      if (this.gentral.indexOf(areaObj.city_code) >= 0) {
        this.ruleForm.pro = areaObj.city_code;
        if (areaObj.country_code > 0) {
          this.get_city(this.ruleForm.pro);
          this.ruleForm.city = areaObj.country_code;
        }
      } else {
        if (areaObj.city_code > 0) {
          let codeStr = areaObj.city_code.toString();
          this.ruleForm.pro = parseInt(codeStr.substring(0, 2) + "0000");
          this.get_city(this.ruleForm.pro);
          this.ruleForm.city = areaObj.city_code;
          if (areaObj.country_code > 0) {
            this.get_xian(this.ruleForm.city);
            this.ruleForm.xian = areaObj.country_code;
          }
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
td {
  text-align: center;
}
.renzheng {
  width: 80%;
  text-align: center;
  margin: 100px auto;
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
  padding: 0 10px 0 10px;
}
.mine-head {
  width: 100%;
  height: 140px;
  margin: 0px auto;
  background: url("/image/AOne/banner.png") no-repeat center;
  background-size: cover;
  //   border: ;
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
  background: url("/image/AOne/company.png") no-repeat center;
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
  background: url("/image/AOne/pointer_fenshu.png") no-repeat;
  width: 47px;
  height: 47px;
  color: #7f4215;
  font-weight: bold;
  font-size: 16px;
  text-align: center;
  line-height: 43px;
}
.tops {
  background: url("/image/AOne/tops.png") no-repeat;
  width: 630px;
  height: 300px;
  background-size: cover;
  margin: 20px auto;
}
</style>
