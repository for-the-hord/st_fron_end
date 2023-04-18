<template>
  <d2-container>
    <div class="Aone-page">
      <div class="jigou">
        <el-form :inline="true" :model="formInline" :rules="rules" ref="formInline" class="demo-form-inline">
          <el-form-item label="题干名称：" prop="content" class="q-left">
            <el-input v-model="formInline.content" clearable placeholder="请输入题干名称"></el-input>
          </el-form-item>
          <el-form-item label="所属课程：">
            <el-select v-model="formInline.course_id" prop="course_id" clearable placeholder="请选择所属课程">
              <el-option v-for="item in course" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="难易度：">
            <el-select v-model="formInline.degree" prop="degree" clearable placeholder="请选择题目难易度">
              <el-option label="全部" value="0"></el-option>
              <el-option label="低" value="1"></el-option>
              <el-option label="中" value="2"></el-option>
              <el-option label="高" value="3"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="题目类型：">
            <el-select v-model="formInline.type" prop="type" clearable placeholder="请选择题目类型">
              <el-option label="全部" value="0"></el-option>
              <el-option label="单选" value="1"></el-option>
              <el-option label="多选" value="2"></el-option>
              <el-option label="判断" value="3"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="能力标识：">
            <el-select v-model="formInline.ability_id" prop="ability_id" clearable placeholder="请选择能力标识">
              <el-option v-for="item in ability" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="getSearch()">查询</el-button>
            <el-button type="primary_test" @click="resetForm('formInline')">重置</el-button>
            <el-button type="primary_test" @click="add()">新增题目</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="qd-table" style="position: relative; margin: 0 auto">
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
          <el-table-column prop="content" label="题干名称" :cell-style="timeStyle">
            <template slot-scope="scope">
              <span style="cursor: pointer; color: white" class="chaohcu"> {{ scope.row.content }}</span>
            </template>
          </el-table-column>

          <el-table-column prop="course" label="所属课程" :cell-style="timeStyle"> </el-table-column>
          <el-table-column prop="type" label="题型分类" :cell-style="timeStyle">
            <template slot-scope="scope">
              <!-- // "type": 1, //题目类型：0-未知，1-单选，2-多选，3-判断 -->
              <span style="cursor: pointer" v-if="scope.row.type == 0"> 未知</span>
              <span style="cursor: pointer" v-if="scope.row.type == 1"> 单选</span>
              <span style="cursor: pointer" v-if="scope.row.type == 2"> 多选</span>
              <span style="cursor: pointer" v-if="scope.row.type == 3"> 判断</span>
            </template>
          </el-table-column>
          <el-table-column prop="ability" label="能力标识" :cell-style="timeStyle"> </el-table-column>

          <el-table-column prop="used_num" label="使用次数" :cell-style="timeStyle">
            <template slot-scope="scope">
              <span style="cursor: pointer"> {{ scope.row.used_num }} 次</span>
            </template>
          </el-table-column>
          <el-table-column prop="right_rate" label="正确率（%）" :cell-style="timeStyle"> </el-table-column>
          <el-table-column prop="degree" label="难易度" :cell-style="timeStyle">
            <template slot-scope="scope">
              <!-- // "degree": 0, //题目难度：0-未知，1-低，2-中，3-高 -->
              <span style="cursor: pointer" v-if="scope.row.degree == 1"> 低</span>
              <span style="cursor: pointer" v-if="scope.row.degree == 2"> 中</span>
              <span style="cursor: pointer" v-if="scope.row.degree == 3"> 高</span>
              <span style="cursor: pointer" v-if="scope.row.degree == 0"> 未知</span>
            </template>
          </el-table-column>
          <el-table-column prop="state" label="状态" :cell-style="timeStyle">
            <template slot-scope="scope">
              <!-- 0-启用，1-禁用             -->
              <el-tag type="success" v-if="scope.row.state == 0" @click="revokeRow(scope.row, 1)">启用</el-tag>
              <el-tag type="danger" v-else @click="revokeRow(scope.row, 0)">禁用</el-tag>
              <!-- <span style="cursor: pointer" v-if="scope.row.state == 0"> 启用 </span>
              <span style="cursor: pointer" v-if="scope.row.state == 1"> 禁用 </span> -->
            </template>
          </el-table-column>

          <el-table-column label="操作">
            <template slot-scope="scope">
              <i @click="spider_put(scope.row)" class="m_spans_table_normal"> 编辑</i><el-divider direction="vertical"></el-divider>
              <i @click="spider_put2(scope.row)" class="m_spans_table_normal"> 删除</i><el-divider direction="vertical"></el-divider>
              <i @click="spider_look(scope.row)" class="m_spans_table_normal"> 查看</i>
              <!-- <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button> -->
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
          :page-size="10"
          layout="prev, pager, next, jumper"
          :total="total"
        >
        </el-pagination>
      </div>
      <div style="wdith: 100%; color: white; margin: 200px auto; text-align: center" v-if="tableInfo.data.length < 1">
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
        :inline="true"
        :model="formInline2"
        :rules="rules2"
        ref="formInline2"
        class="demo-form-inline lds_form"
        label-width="120px"
      >
        <el-form-item label="所属课程：">
          <el-select
            v-model="formInline2.course_id"
            prop="course_id"
            clearable
            placeholder="所属课程"
            :disabled="isDisabled"
          >
            <el-option v-for="item in course.slice(1, -1)" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="题目难度：">
          <el-select v-model="formInline2.degree" prop="degree" clearable placeholder="难易度" :disabled="isDisabled">
            <el-option label="低" value="1"></el-option>
            <el-option label="中" value="2"></el-option>
            <el-option label="高" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="题目类型：">
          <el-select v-model="formInline2.type" prop="type" clearable placeholder="题型分类" :disabled="isDisabled">
            <el-option label="单选" value="1"></el-option>
            <el-option label="多选" value="2"></el-option>
            <el-option label="判断" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="能力标识：">
          <el-select
            v-model="formInline2.ability_id"
            prop="ability_id"
            clearable
            placeholder="能力标识"
            :disabled="isDisabled"
          >
            <el-option v-for="item in ability.slice(1, -1)" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="题干名称：" prop="content" class="lds" style="width: 100%">
          <el-input
            v-model="formInline2.content"
            :rows="4"
            type="textarea"
            clearable
            placeholder="请输入题干内容"
            :disabled="isDisabled"
          >
          </el-input>
        </el-form-item>
        <el-form-item
          v-show="formInline2.type == 1"
          class="lds"
          label="题目选项："
          :disabled="isDisabled"
        >
          <p class="thead flex_center_starts2" style="width: 67%">
            <!-- <span>设置答案 </span> -->
            <span style="margin-left:20px">选项 </span>
            <span style="margin-left: 60px"> 选项内容 </span>
          </p>
          <div style="margin-top: 5px" class="flex_center_around" v-for="(item, index) in formInline2.options">
            <el-radio
              v-model="formInline2.answer_dan"
              :label="item.option"
              style="text-align: center; width: 10%"
              :disabled="isDisabled"
            ></el-radio>
            <el-input v-model="item.content" clearable placeholder="请输入选项内容" style="float: left; width: 60%" :disabled="isDisabled">
            </el-input>
            <div class="pointer" style="width: 15%; margin-left: 20px; float: left">
              <i @click="add_item(index)" style="margin-right: 10px" v-if="index == formInline2.options.length - 1" class="el-icon-plus"></i>
              <i @click="del_item(index)"  v-if="index != 0" class="el-icon-minus"></i>
            </div>
          </div>
        </el-form-item>
        <el-form-item v-show="formInline2.type == 2" label="题目选项：" class="lds" :disabled="isDisabled">
          <p class="thead flex_center_starts2" style="width: 67%">
            <span style="margin-left:25px">选项 </span>
            <span style="margin-left:-30px"> 选项内容 </span>
          </p>
          <div style="margin-top: 5px" class="flex_center_around" v-for="(item, index) in formInline2.options" :disabled="isDisabled">
            <el-checkbox
              style="text-align: center; width: 10%"
              v-model="formInline2.answer_ou"
              :label="item.option"
              :disabled="isDisabled"
            ></el-checkbox>
            <el-input v-model="item.content" clearable placeholder="请输入选项内容" style="float: left; width: 60%" :disabled="isDisabled">
            </el-input>
            <div class="pointer" style="width: 15%; margin-left: 20px; float: left">
              <i @click="add_item(index)"  style="margin-right: 10px" v-if="index == formInline2.options.length - 1" class="el-icon-plus"></i>
              <i @click="del_item(index)"   v-if="index != 0" class="el-icon-minus"></i>
            </div>
          </div>
        </el-form-item>
        <el-form-item v-show="formInline2.type == 3" class="lds" label="题目答案：" :disabled="isDisabled">
            <el-radio-group v-model="formInline2.answer_dan" :disabled="isDisabled">
                <el-radio label="True">正确</el-radio>
                <el-radio label="False">错误</el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="save('formInline2')" v-if="visits ==0">提交</el-button>
          <el-button type="primary_test" @click="resetForm2('formInline2')">取消</el-button>
        </el-form-item>
      </el-form>
    </qd-dialog>
  </d2-container>
</template>

<script>
import {
  getquestion,
  postquestion,
  putquestion,
  deletequestion,
  getcourse,
  getability,
  process2,
  process3,
  detail,
} from './big.js';
export default {
  name: 'mine',
  data() {
    return {
      cha: false,
      visit: 1,
      visits:'',
      questionId: 0,
      options: [
        {
          option: 'A',
          content: '选项A',
        },
        {
          option: 'B',
          content: '选项B',
        },
        {
          option: 'C',
          content: '选项C',
        },
        {
          option: 'D',
          content: '选项D',
        },
      ],
      all_answer: [{ answer: '' }, { answer: '' }, { answer: '' }, { answer: '' }],
      answers: '',
      answers2: [{ answer: 'A' }, { answer: 'B' }, { answer: 'C' }, { answer: 'D' }],
      answer3: '',
      answer4: '',
      answer2: '',
      answer1: '',
      course: [{ id: 0, name: '全部' }],
      ability: [{ id: 0, name: '全部' }],
      new_id: {},
      form: {
        desc: '',
      },
      dialogInfo2: {
        title: '新增题目',
        visible: false,
        width: '800px',
      },
      dialogInfo3: {
        title: '查看',
        visible: false,
        width: '800px',
      },

      formInline: {
        content: '',
        course_id: '',
        page: 1, //分页页码，数字类型
        limit: 10, //每页数量
        degree: '', //题目难度：0-未知，1-低，2-中，3-高
        ability_id: '', //能力标识ID
        type: '', //题目类型：0-未知，1-单选，2-多选，3-判断
      },
      formInline2: {
        content: '',
        course_id: '',
        degree: '', //题目难度：0-未知，1-低，2-中，3-高
        ability_id: '', //能力标识ID
        type: '', //题目类型：0-未知，1-单选，2-多选，3-判断
        options: [
          {
            option: 'A',
            content: '',
          },
        ],
        answer_dan: '',
        answer_ou: [],
      },
      rules2: {
        content: [
          {
            trigger: 'blur',
            required: true,
            message: '请输入',
          },
        ],
      },
      send_data: {
        content: '',
        course_id: '',
        type: '',
        page: 1, //分页页码，数字类型
        limit: 10, //每页数量
        degree: '', //题目难度：0-未知，1-低，2-中，3-高
        ability_id: '', //能力标识ID
        type: '', //题目类型：0-未知，1-单选，2-多选，3-判断
        is_option: 1,
      },
      tableInfo: {
        data: [],
      },
      limit: 10,
      page: 1,
      total: '',
      currentPage_present: 1,
      next: true,
      //   右键
      visible: false,
      top: 0,
      left: 0,
      //   右键
      isDisabled: false,
    };
  },
  created() {
    getcourse().then((res) => {
      if (res.code == 200) {
        res.data.forEach((item) => {
          this.course.push(item);
        });
      }
    });
    getability().then((res) => {
      if (res.code == 200) {
        res.data.forEach((item) => {
          this.ability.push(item);
        });
      }
    });
    this.getSearch();
  },

  methods: {
    revokeRow(row, state) {
      let content = state === 1 ? "禁用" : "启用";
      this.$confirm(`确定要${content}题目 <span style="color: red">${row.content}</span> 吗?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        center: true,
        type: 'warning',
        dangerouslyUseHTMLString: true
      }).then(() => {
        let params = { state: state, code: 2 }
        putquestion(row.id, params).then(res => {
          if (res.code == 200) {
            this.$message.success("操作成功！");
            this.getSearch()
          } else {
            this.$message.error("操作失败！")
          }
        })
      }).catch(() => {
        this.$message.info("操作已取消")
      })
    },
    add_item(x) {
      let optionObj = { 0: "A", 1: "B", 2: "C", 3: "D", 4: "E", 5: "F", 6: "G" };
      let optionStr = optionObj[x+1];
      if (this.formInline2.type == 1 || this.formInline2.type == 2) {
        if (this.formInline2.options.length == 7) {
          this.$message.warning('最多7个选项');
          return false;
        }
      }
      if(this.formInline2.type==3){
        if (this.formInline2.options.length == 2) {
          this.$message.warning('判断题最多2个选项');
          return false;
        }
      }
      this.formInline2.options.push({
        option: optionStr,
        content: '',
      });
    },
    del_item(x) {
      this.formInline2.options.splice(x, 1);
    },
    save(formName) {
      console.log(this.formInline2.options)
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // return
          var abc = {
            course_id: this.formInline2.course_id, //章节id
            ability_id: this.formInline2.ability_id, //能力id
            type: this.formInline2.type, //题目类型：0-未知，1-单选，2-多选，3-判断
            degree: this.formInline2.degree, //题目难度：0-未知，1-低，2-中，3-高
            content: this.formInline2.content, //题干内容
            answer: [], //题目答案
            options: this.formInline2.options,
          };
          if (this.formInline2.type == 1 ||this.formInline2.type == 3 ) {
            abc.answer = [ this.formInline2.answer_dan];
          }
          if (this.formInline2.type == 2) {
            abc.answer = this.formInline2.answer_ou;

          }
          if (this.visit == 1) {
            postquestion(abc).then((res) => {
              if (res.code == 200) {
                this.getSearch();
                this.$message.success(res.message);
                this.dialogInfo2.visible = false;
              }
            });
          }
          if (this.visit == 2) {
            abc.code = 1;
            putquestion(this.questionId, abc).then((res) => {
              if (res.code == 200) {
                this.getSearch();
                this.$message.success(res.message);
                this.dialogInfo2.visible = false;
              }
            });
          }
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    add() {
        console.log('新增')
      this.visits =0;

      this.dialogInfo2.visible = true;
      this.dialogInfo2.title = '新增题目';
      this.initForm();
      this.isDisabled = false;
    //   this.visit = 1;
    },
    pass1() {
      let send = {
        list: `[${this.new_id.id}]`,
        state: 1,
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
      let send = {
        list: `[${this.new_id.id}]`,
        state: 1,
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
      this.visit = 2;
      this.visits=0
      this.questionId = x.id;
      this.initForm();
      this.isDisabled = false;
      this.dialogInfo2.visible = true;
      this.dialogInfo2.title = '编辑题目';
      this.formInline2.type = x.type.toString();
      this.formInline2.degree = x.degree.toString();
      this.formInline2.content = x.content;
      this.formInline2.course_id = x.course_id;
      this.formInline2.ability_id = x.ability_id;
      this.formInline2.options = x.options;
      this.formInline2.answer = x.answer;
      this.formInline2.answer_dan = x.answer[0];
      this.formInline2.answer_ou = x.answer;
    },
    spider_put2(x) {
      this.$confirm('此操作将删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true,
      })
        .then(() => {
          deletequestion(x.id).then((res) => {
            // console.log(res, "res");
            this.$message({
              type: 'success',
              message: res.message,
            });
            this.getSearch();
          });
        })
        .catch(() => {
          //   this.$message({
          //     type: "info",
          //     message: "已取消禁用",
          //   });
        });

      // deletequestion(x.id)
    },
    spider_look(x) {
      this.dialogInfo2.title = '查看题目';
      this.dialogInfo2.visible = true;
      this.visits= 1
      // 查看题目
      if(x.type==3){
        console.log('当前为判断')
        // this.visit = 3;
        this.isDisabled = true;
        this.initForm();
        this.formInline2.type = x.type.toString();
        this.formInline2.degree = x.degree.toString();
        this.formInline2.content = x.content;
        this.formInline2.course_id = x.course_id;
        this.formInline2.ability_id = x.ability_id;
        this.formInline2.options = x.options;
        this.formInline2.answer = x.answer;
        this.formInline2.answer_dan = x.answer[0];
      }
      if(x.type==1){
        console.log('当前为单选')
        this.visit = 1;
        this.isDisabled = true;
        this.initForm();
        this.formInline2.type = x.type.toString();
        this.formInline2.degree = x.degree.toString();
        this.formInline2.content = x.content;
        this.formInline2.course_id = x.course_id;
        this.formInline2.ability_id = x.ability_id;
        this.formInline2.options = x.options;
        this.formInline2.answer = x.answer;
        this.formInline2.answer_dan = x.answer[0];
      }
      if(x.type==2){
        this.visit = 2;
        this.isDisabled = true;
        this.initForm();
        this.formInline2.type = x.type.toString();
        this.formInline2.degree = x.degree.toString();
        this.formInline2.content = x.content;
        this.formInline2.course_id = x.course_id;
        this.formInline2.ability_id = x.ability_id;
        this.formInline2.options = x.options;
        this.formInline2.answer = x.answer;
        this.formInline2.answer_ou = x.answer;
      }
    },
    timeStyle() {
      return 'text-align:center !important';
    },
    resetForm(formName) {
      //   this.dialogInfo2.visible = false;
      this.formInline.type = '';
      this.formInline.degree = '';
      this.formInline.ability_id = '';
      this.formInline.content = '';
      this.formInline.course_id = '';
      this.setKey();
      this.getSearch();
    },
    resetForm2(formName) {
      this.dialogInfo2.visible = false;
    },
    getSearch() {
      this.setKey();
      this.tableInfo.data = [];
      getquestion(this.send_data).then((res) => {
        if (res.data.data) {
          this.tableInfo.data = res.data.data;
        } else {
          this.tableInfo.data = [];
        }
        this.total = res.data.total;
      });
    },
    setKey() {
      this.send_data.content = this.formInline.content;
      this.send_data.type = this.formInline.type || '0';
      this.send_data.degree = this.formInline.degree || '0';
      this.send_data.ability_id = this.formInline.ability_id || '0';
      this.send_data.course_id = this.formInline.course_id || '0';
    },
    handleCurrentChange(val) {
      this.send_data.page = val;
      this.getSearch();
    },
    initForm() {
      this.formInline2 = {
        content: '',
        course_id: '',
        degree: '', //题目难度：0-未知，1-低，2-中，3-高
        ability_id: '', //能力标识ID
        type: '', //题目类型：0-未知，1-单选，2-多选，3-判断
        options: [
          {
            option: 'A',
            content: '',
          },
        ],
        answer_dan: '',
        answer_ou: [],
      };
    },
  },
};
</script>

<style lang="scss" scoped>
.thead {
  color: black;
  span {
    font-weight: bold;
  }
}
.pointer {
  i {
    color: black !important;
  }
}
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
