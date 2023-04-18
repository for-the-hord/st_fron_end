<template>
  <div class="Aone-page2">
    <div class="lefts">
      <p class="size20_weights">试卷候选区{{ set_points }}</p>
      <p class="size16_weights">
        已选单选题{{ odd_num }}道{{ odd_num }}分 ， 已选多选题{{ even_num }}道{{ even_num * 2 }}分 ， 已选判断题{{
          judge
        }}道{{ judge * 3 }}分 ， 已选总分 <span class="zongshu">{{ total_s }}</span>
      </p>
      <div class="questions_left">
        <div class="item_question" v-for="(item, index) in $store.state.d2admin.account.filters_list">
          <div class="icon_lds">
            <i class="el-icon-circle-close pointer" @click="del_item(index, item)"> </i>
          </div>
          <p class="ques_content">
            <span class="ques_type" style="display: inline-block"> 【 {{ setType(item.type) }} 】</span>
            <span class="chaochu2" style="width: 80%">{{ index + 1 }}、 {{ item.content }} </span>
          </p>
          <div v-if="item.type == 3">
            <p class=" zhengque item_aswer">
              <el-radio label="正确" style="text-align: center; width: 10%; font-size: 16px"></el-radio>
              <el-radio label="错误" style="text-align: center; width: 10%; font-size: 16px"></el-radio>
            </p>
            <p class="item_aswer" style="text-align:left">
              <span class="bingo">
                正确答案为：
                <span> {{ set_pan(item.answer) }} </span>
              </span>
            </p>
          </div>
          <div v-if="item.type == 2">
            <p class="flex_center_starts2 item_aswer">
              <el-checkbox v-for="items in item.options"  :title="items.option+'.'+items.content"  :label="items.option+'.'+items.content"> </el-checkbox>
            </p>
            <p class="item_aswer" style="text-align:left">
              <span class="bingo">
                正确答案为： 【<span v-for="item2 in item.answer"> {{ item2 }}、</span> 】
              </span>
            </p>
          </div>
          <div v-if="item.type == 1">
            <p class="flex_center_starts2 item_aswer">
              <el-radio v-for="items in item.options" :title="items.option+'.'+items.content" :label="items.option+'.'+items.content"> </el-radio>
            </p>
            <p class="item_aswer" style="text-align:left">
              <span class="bingo">
                正确答案为：
                <span> {{ item.answer[0] }} </span>
              </span>
            </p>
          </div>
        </div>
        <div
          v-if="$store.state.d2admin.account.filters_list.length == 0"
          style="margin: 100px auto; width: 50%; text-align: center"
        >
          暂无选中题目
        </div>
      </div>
    </div>
    <div class="rights">
      <p class="size20_weights" style="margin-left:20px">题库</p>
      <el-form :inline="true" :model="formInline" ref="formInline" class="demo-form-inline" style="margin-left:20px">
        <el-form-item style="width:180px">
          <el-input v-model="formInline.content" clearable placeholder="题干名称"></el-input>
        </el-form-item>
        <el-form-item style="width:160px">
          <el-select v-model="formInline.course_id" prop="course_id" clearable placeholder="所属课程">
            <el-option v-for="item in course" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <!-- <el-form-item label="难易度：">
          <el-select v-model="formInline.degree" prop="degree" clearable placeholder="请选择题目难易度">
            <el-option label="全部" value="0"></el-option>
            <el-option label="低" value="1"></el-option>
            <el-option label="中" value="2"></el-option>
            <el-option label="高" value="3"></el-option>
          </el-select>
        </el-form-item> -->
        <el-form-item style="width:120px">
          <el-select v-model="formInline.type" prop="type" clearable placeholder="题目类型">
            <el-option label="全部" value="0"></el-option>
            <el-option label="单选" value="1"></el-option>
            <el-option label="多选" value="2"></el-option>
            <el-option label="判断" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item style="width:120px">
          <el-select v-model="formInline.ability_id" prop="ability_id" clearable placeholder="能力标识">
            <el-option v-for="item in ability" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="getSearch()">查询</el-button>
          <!-- <el-button type="primary_test" @click="resetForm('formInline')">重置</el-button> -->
          <!-- <el-button type="primary_test" @click="add()">新增题目</el-button> -->
        </el-form-item>
      </el-form>

      <div class="questions" v-if="tableInfo.data.length > 1">
        <el-table
          :data="tableInfo.data"
          style="width: 100%; color: white"
          v-loading="loading"
          ref="lds_new_table"
          @cell-mouse-enter="hover_table_lds"
          @row-click="goDetail"
          :header-cell-style="header_style"
          :cell-style="body_style"
          @selection-change="handleSelectionChange"
          :row-key="getkey"
        >
          <el-table-column prop="content" :cell-style="timeStyle">
            <template slot-scope="scope">
              <p>
                <span style="cursor: pointer; color: black">
                  <span class="ques_type"> 【 {{ setType(scope.row.type) }} 】</span>
                  {{ scope.row.content }}
                </span>
              </p>
              <div v-if="scope.row.type == 3">
                <p class="  item_aswer zhengque" style="text-align:left">
                  <el-radio label="正确" style="text-align: center; width: 10%; font-size: 16px"></el-radio>
                  <el-radio label="错误" style="text-align: center; width: 10%; font-size: 16px"></el-radio>
                </p>

                <p class="item_aswer" style="text-align:left">
                  <span class="bingo">
                    正确答案：{{ set_pan(scope.row.answer) }}
                  </span>
                </p>
              </div>
              <div v-if="scope.row.type == 2">
                <p class="flex_center_starts2 item_aswer">
                  <el-checkbox v-for="item in scope.row.options" :title="item.option+'.'+item.content"  :label="item.option+'.'+item.content"> </el-checkbox>
                </p>

                <p class="item_aswer" style="text-align:left">
                  <span class="bingo">
                    正确答案：<span v-for="item in scope.row.answer"> {{ item }}</span>
                  </span>
                </p>
              </div>
              <div v-if="scope.row.type == 1">
                <p class="flex_center_starts2 item_aswer">
                  <el-radio v-for="item in scope.row.options" :title="item.option+'.'+item.content"  :label="item.option+'.'+item.content"> </el-radio>
                </p>

                <p class="item_aswer" style="text-align:left">
                  <span class="bingo">
                    正确答案：<span>{{ scope.row.answer[0] }}</span>
                  </span>
                </p>
              </div>
            </template>
          </el-table-column>
          <el-table-column :reserve-selection="true" type="selection" width="55"> </el-table-column>
        </el-table>

      </div>
      <div class="block qd-table" style="margin-top:7px">
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
      <div style="wdith: 100%; color: white; margin: 200px auto; text-align: center" v-if="tableInfo.data.length < 1">
        <br />
        <span class="zanwu" style="color: gray"> 暂无数据</span>
      </div>



    </div>
    <transition name="fade-transverse">
      <div v-if="zhens" class="bottoms flex_center_around">
        <div class="rights_rights flex_center_around">
          <el-button @click="set_paper()" type="primary2">试卷预览</el-button>
          <el-button @click="go_paper()" type="primary2">提交试卷</el-button>
        </div>
      </div>
    </transition>

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
      <div class="item_question" v-for="(item, index) in $store.state.d2admin.account.filters_list">
        <div class="icon_lds">
          <!-- <i class="el-icon-circle-close pointer" @click="del_item(index, item)"> </i> -->
        </div>
        <p class="ques_content" style="display: flex">
          <span class="ques_type chaochu" style="color: black; text-align: left"> 【 {{ setType(item.type) }} 】 </span>
          <span class="chaochu2" style="width: 80%; color: black; text-align: left">
            {{ index + 1 }}. {{ item.content }}</span
          >
        </p>
        <div v-if="item.type == 3">
          <p class="flex_center_around item_aswer">
            <el-radio label="是" style="text-align: center; width: 10%; font-size: 16px"></el-radio>
            <el-radio label="否" style="text-align: center; width: 10%; font-size: 16px"></el-radio>
          </p>
          <!-- <p class="item_aswer">
              <span class="bingo">
                正确答案为：
                <span> {{ set_pan(item.answer) }} </span>
              </span>
            </p> -->
        </div>
        <div v-if="item.type == 2">
          <p class="flex_center_around item_aswer">
            <el-checkbox v-for="items in item.options" :label="items.option"> </el-checkbox>
          </p>
          <!-- <p class="item_aswer">
              <span class="bingo">
                正确答案为： 【<span v-for="item2 in item.answer"> {{ item2 }}、</span> 】
              </span>
            </p> -->
        </div>
        <div v-if="item.type == 1">
          <p class="flex_center_around item_aswer">
            <el-radio v-for="items in item.options" :label="items.option"> </el-radio>
          </p>
          <!-- <p class="item_aswer">
              <span class="bingo">
                正确答案为：
                <span> {{ item.answer[0] }} </span>
              </span>
            </p> -->
        </div>
      </div>
    </qd-dialog>
  </div>
</template>

<script>
import {
  getquestion, paperQuestion, paperQuestion2, getcourse, getability } from './big.js';
export default {
  name: 'paperDetail',
  data() {
    return {
      zhens: false,
      dialogInfo2: {
        title: '试卷预览',
        visible: false,
        width: '800px',
      },
      course: [{ id: 0, name: '全部' }],
      ability: [{ id: 0, name: '全部' }],
      judge: null,
      odd_num: null,
      even_num: null,
      activeName: '',
      paperId: 0,
      formInline: {
        content: '',
        course_id: '',
        page: 1, //分页页码，数字类型
        limit: 10, //每页数量
        degree: '', //题目难度：0-未知，1-低，2-中，3-高
        ability_id: '', //能力标识ID
        type: '', //题目类型：0-未知，1-单选，2-多选，3-判断
      },
      filters: {
        content: '',
        course_id: '',
        page: 1, //分页页码，数字类型
        limit: 20, //每页数量
        degree: '', //题目难度：0-未知，1-低，2-中，3-高
        ability_id: '', //能力标识ID
        type: '', //题目类型：0-未知，1-单选，2-多选，3-判断
        is_option: 1,
      },
      name: '',
      details: [],
      score: 0,
      single_num: 0,
      single_score: 0,
      multi_num: 0,
      multi_score: 0,
      judge_num: 0,
      judge_score: 0,
      filters_list: [],
    };
  },
  created() {
    this.paperId = this.$route.query.paperId;
    this.getSearch();
    this.getPaperQuestion();
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
  },
  watch: {
    '$store.state.d2admin.account.filters_list'(to, from) {
      //   console.log(to, '左侧');
      //   console.log(from, '右侧');
    },
    $route(to, from) {
      if (to) {
        console.log(to,'新的路由')
        this.$store.state.d2admin.account.filters_list = [];
      }
      //   this.routerRefresh();
    },
  },

  computed: {
    set_points() {
      var judge = 0;
      var odd_num = 0;
      var even_num = 0;
      this.$store.state.d2admin.account.filters_list.map((e) => {
        if (e.type == 3) {
          judge += 1;
        }
        if (e.type == 2) {
          even_num += 1;
        }
        if (e.type == 1) {
          odd_num += 1;
        }
      });

      this.judge = judge;
      this.odd_num = odd_num;
      this.even_num = even_num;

      this.total_s = this.judge * 3 + this.odd_num * 1 + this.even_num * 2;
      if (this.total_s > 100) {
        this.$message.warning('总分最大为100分');
        this.zhens = false;
        return false;
      }
      if (this.total_s == 100) {
        this.zhens = true;
      }
      if (this.total_s < 100) {
        this.zhens = false;
      }
      //   console.log(judge, odd_num, even_num, 'shuzi ');
      //   return judge + '' + even_num + '' + odd_num;
    },
  },
  methods: {
    go_paper() {
      let abc_arr = [];
      this.$store.state.d2admin.account.filters_list.map((e) => {
        abc_arr.push(e.id);
      });
      paperQuestion2(this.paperId, abc_arr).then((res) => {
        console.log(res, '是否提交成功');
      });
    },
    set_paper() {
      if (this.total_s != 100) {
        this.$message.warning('请确保总分为100分');
        return false;
      }
      if (this.total_s == 100) {
        this.dialogInfo2.visible = true;
      }
    },
    getkey(x) {
      return x.id;
    },
    // zujuanbufenxiugai
    // async del_you(x) {
    //   this.$nextTick(() => {
    //     this.$refs.lds_new_table.toggleRowSelection(this.$store.state.d2admin.account.filters_list[x], false);
    //   });
    // },

    del_item(x, y) {
      console.log(this.$store.state.d2admin.account.filters_list[x].id, '删除数组id');
      console.log(x, '删除数组角标');
      console.log(y, '删除得数据');
      let new_arr = [];
      this.$store.state.d2admin.account.filters_list.map((e) => {
        if (e.id != y.id) {
          new_arr.push(e);
        }
      });

      this.$nextTick(() => {
        this.$refs.lds_new_table.toggleRowSelection(y, false);
        this.$store.state.d2admin.account.filters_list = new_arr;
        console.log(this.$store.state.d2admin.account.filters_list, '剩余数组');
      });
    },
    handleCurrentChange(val) {
      this.filters.page = val;
      this.getSearch();
    },
    merge(x, y) {
      x = [...x, ...y];
      x = Array.from(new Set(x)); //let arr3 = [...new Set(arr1)]
      console.log(x);
    },
    handleSelectionChange(x) {
      console.log(x, '执行了搜索x原始数据');
      if (x) {
        console.log('并且是已经选择过的——————————————————————');
        let new_x = x;
        new_x = new_x.flat(2);
        console.log(new_x, 'xx2，降维之后得数据');
        let obj = {};
        let peon = new_x.reduce((cur, next) => {
          obj[next.id] ? '' : (obj[next.id] = true && cur.push(next));
          return cur;
        }, []); //设置cur默认类型为数组，并且初始值为空的数组
        console.log(peon, '去重测试');

        console.log(peon, 'newx首次去重之后得数据');
        this.$store.state.d2admin.account.filters_list = peon;
        console.log(this.$store.state.d2admin.account.filters_list, '当前得左侧数据');

        // this.$store.state.d2admin.account.filters_list = [...this.$store.state.d2admin.account.filters_list, ...new_x];
        // console.log(this.$store.state.d2admin.account.filters_list, 'store_list合并');
        // this.$store.state.d2admin.account.filters_list.flat(2);

        // this.$store.state.d2admin.account.filters_list = Array.from(
        //   new Set(this.$store.state.d2admin.account.filters_list)
        // );
        // //    console.log(x, ' 题目');
        // console.log(this.$store.state.d2admin.account.filters_list, 'store_list结果');
      }
      //   if(!x){
      //     console.log('这里是没有选择过的===============')
      //     let new_x =x
      //     new_x =  new_x.flat(2);
      //     console.log(new_x, 'xx2');
      //     new_x = Array.from(new Set(new_x));
      //     console.log(new_x, 'newx');

      //     this.$store.state.d2admin.account.filters_list = new_x;
      //     this.$store.state.d2admin.account.filters_list = [...this.$store.state.d2admin.account.filters_list, ...new_x];
      //     console.log(this.$store.state.d2admin.account.filters_list, 'store_list合并');
      //     this.$store.state.d2admin.account.filters_list.flat(2);

      //     this.$store.state.d2admin.account.filters_list = Array.from(
      //       new Set(this.$store.state.d2admin.account.filters_list)
      //     );
      //     //    console.log(x, ' 题目');
      //     console.log(this.$store.state.d2admin.account.filters_list, 'store_list结果');
      //   }
      // let arr1 = [1, 1, 2, 3, 6, 9, 5, 5, 4]
      // let arr2 = [1, 2, 5, 4, 9, 7, 7, 8, 8]
      //   function uniqueArr(arr1, arr2) {
      //     //合并两个数组
      //     arr1.push(...arr2)//或者arr1 = [...arr1,...arr2]
      //     //去重
      //     let arr3 = Array.from(new Set(arr1))//let arr3 = [...new Set(arr1)]
      //     console.log(arr3)
      //   }
      //    merge(this.$store.state.d2admin.account.filters_list, x)
    },
    get_question(x) {},
    set_pan(x) {
      if (x[0] == 'True') {
        return '正确';
      } else {
        return '错误';
      }
    },
    set_duo(x) {
      let new_as = '';
      x.map((e) => {
        new_as = e + ' 、';
      });

      return new_as;
    },
    setType(x) {
      if (x == 3) {
        return '判断题';
      }
      if (x == 2) {
        return '多选题';
      }
      if (x == 1) {
        return '单选题';
      }
    },
    setKey() {
      this.filters.content = this.formInline.content;
      this.filters.type = this.formInline.type || '0';
      this.filters.degree = this.formInline.degree || '0';
      this.filters.ability_id = this.formInline.ability_id || '0';
      this.filters.course_id = this.formInline.course_id || '0';
    },
    getSearch() {
      //   this.tableInfo.data = [];
      this.setKey();
      getquestion(this.filters).then((res) => {
        console.log(res, '11');
        if (res.data.data) {
          this.tableInfo.data = res.data.data;

          if (this.$store.state.d2admin.account.filters_list.length > 0) {
            this.$nextTick(() => {
              console.log('执行赋值任务！！！！！');
              // this.$refs.lds_new_table.toggleRowSelection(this.$store.state.d2admin.account.filters_list, true);
            });
          }
        } else {
          this.tableInfo.data = [];
        }
        this.total = res.data.total;
      });
    },
    getPaperQuestion() {
        paperQuestion(this.paperId).then((res) => {
          console.log(res, '22');
          if (res.code == 200) {
            this.name = res.data.name;
            this.details = res.data.details;
            this.score = res.data.score;
            this.single_num = res.data.single_num;
            this.single_score = res.data.single_score;
            this.multi_num = res.data.multi_num;
            this.multi_score = res.data.multi_score;
            this.judge_num = res.data.judge_num;
            this.judge_score = res.data.judge_score;
          } else {
            this.$message.error('系统异常');
          }
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.ques_content {
  font-size: 16px;
  display: flex;
}
.bingo {
  color: #8bc34a;
}
.ques_type {
  color: #ff7a00;
  display: inline-block;
  width:100px;
}
.item_aswer {
  margin: 10px;
  text-align: center;
}
.lefts,
.rights {
  width: 50%;
  float: left;
  height: 100%;
  overflow: auto !important;

  // border: 1px solid gray;
  // padding: 20px;
}
.rights {
  // margin-left:4%;
  background: #f6f7fb;
}
.lefts {
  // margin-left:4%;
  background: #fff;
}
.item_question {
  border: 1px solid #e8e8e8;
  margin-top: 10px;
  padding: 10px;
  position: relative;

  .icon_lds {
    color: red;
    font-size: 20px;
    position: absolute;
    right: -5px;
    top: -5px;
  }
}
.zongshu {
  font-size: 20px;
  color: #ff7a00;
  font-weight: bold;
}
.bottoms {
  width: 100%;
  position: fixed;
  bottom: 0;
  height: 60px;
  background: #fff;
  border: 1px solid #eeeeee;
}
.rights_rights {
  width: 200px;
  // float: right;
}
</style>
