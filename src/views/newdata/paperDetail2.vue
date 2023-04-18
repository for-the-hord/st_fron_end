<template>
  <div class="Aone-page2">
    <div class="lefts">
      <p class="size20_weights">试卷详情{{ set_points }}</p>
      <p class="size16_weights">
        已选单选题{{ single_num }}道{{ single_score }}分 ， 已选多选题{{ multi_num }}道{{
          multi_score
        }}分 ， 已选判断题{{ judge_num }}道{{ judge_score }}分 ， 已选总分{{score}}
        <span class="zongshu">{{ total_s }}</span>
      </p>
      <div class="questions_left">
        <div class="item_question" v-for="(item, index) in details">
          <div class="icon_lds">
            <!-- <i class="el-icon-circle-close pointer" @click="del_item(index, item)"> </i> -->
          </div>
          <p class="ques_content">
            <span class="ques_type" style="display: inline-block">
              【 {{ setType(item.question.type) }} 】</span
            >
            <span class="chaochu2" style="width: 80%"
              >{{ index + 1 }}、 {{ item.question.content }}
            </span>
          </p>
           <div v-if="item.question.type == 3" style="width:90%">
            <p class="flex_center_starts2 item_aswer">
              <el-radio
                label="是"
                style="text-align: center; width: 10%; font-size: 16px"
              ></el-radio>
              <el-radio
                label="否"
                style="text-align: center; width: 10%; font-size: 16px"
              ></el-radio>
            </p>
            <p class="item_aswer" style="text-align: left">
              <span class="bingo">
                正确答案为：
                <span> {{ set_pan(item.question.answer) }} </span>
              </span>
            </p>
          </div>
          <div v-if="item.question.type == 2" style="width:90%">
            <div class="  item_aswer">
                <p v-for="items in item.question.options" style="text-align:left">
              <el-checkbox  :title="items.option+'.'+items.content"  :label="items.option+'.'+items.content">
              </el-checkbox>
              </p>
 
             </div>
           
            <p class="item_aswer" style="text-align: left">
              <span class="bingo">
                正确答案为： 【<span v-for="item2 in item.question.answer">
                  {{ item2 }}、</span
                >
                】
              </span>
            </p>
          </div>
          <div v-if="item.question.type == 1" style="width:90%">
            <div class="  item_aswer">
                <p v-for="items in item.question.options" style="text-align:left">

                
              <el-radio :title="items.option+'.'+items.content"   :label="items.option+'.'+items.content">
              </el-radio></p>
 
            </div>
 
            <p class="item_aswer" style="text-align: left">
              <span class="bingo">
                正确答案为：
                <span> {{ item.question.answer[0] }} </span>
              </span>
            </p>
          </div>
        </div>
        <div
          v-if="details.length == 0"
          style="margin: 100px auto; width: 50%; text-align: center"
        >
          暂无选中题目
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import {
  getquestion,
  paperQuestion,
  paperQuestion2,
  getcourse,
  getability,
} from "./big.js";
export default {
  name: "paperDetail",
  data() {
    return {
      zancun_list: [],
      zhens: false,
      dialogInfo2: {
        title: "试卷预览",
        visible: false,
        width: "800px",
      },
      course: [{ id: 0, name: "全部" }],
      ability: [{ id: 0, name: "全部" }],
      judge: null,
      odd_num: null,
      even_num: null,
      activeName: "",
      paperId: 0,
      formInline: {
        content: "",
        course_id: "",
        page: 1, //分页页码，数字类型
        limit: 10, //每页数量
        degree: "", //题目难度：0-未知，1-低，2-中，3-高
        ability_id: "", //能力标识ID
        type: "", //题目类型：0-未知，1-单选，2-多选，3-判断
      },
      filters: {
        content: "",
        course_id: "",
        page: 1, //分页页码，数字类型
        limit: 20, //每页数量
        degree: "", //题目难度：0-未知，1-低，2-中，3-高
        ability_id: "", //能力标识ID
        type: "", //题目类型：0-未知，1-单选，2-多选，3-判断
        is_option: 1,
      },
      name: "",
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
     this.getPaperQuestion();

  },
  computed: {
  },
  methods: {
    go_paper() {
      let abc_arr = [];
      this.$store.state.d2admin.account.filters_list.map((e) => {
        abc_arr.push(e.id);
      });
      paperQuestion2(this.paperId, abc_arr).then((res) => {
        console.log(res, "是否提交成功");
      });
    },
    set_paper() {
      if (this.total_s != 100) {
        this.$message.warning("请确保总分为100分");
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
      console.log(
        this.$store.state.d2admin.account.filters_list[x].id,
        "删除数组id"
      );
      console.log(x, "删除数组角标");
      console.log(y, "删除得数据");
      let new_arr = [];
      this.$store.state.d2admin.account.filters_list.map((e) => {
        if (e.id != y.id) {
          new_arr.push(e);
        }
      });

      this.$nextTick(() => {
        this.$refs.lds_new_table.toggleRowSelection(y, false);
        this.$store.state.d2admin.account.filters_list = new_arr;
        console.log(this.$store.state.d2admin.account.filters_list, "剩余数组");
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
      console.log(x, "执行了搜索x原始数据");
      if (x) {
        console.log("并且是已经选择过的——————————————————————");
        let new_x = x;
        new_x = new_x.flat(2);
        console.log(new_x, "xx2，降维之后得数据");
        let obj = {};
        let peon = new_x.reduce((cur, next) => {
          obj[next.id] ? "" : (obj[next.id] = true && cur.push(next));
          return cur;
        }, []); //设置cur默认类型为数组，并且初始值为空的数组
        console.log(peon, "去重测试");

        console.log(peon, "newx首次去重之后得数据");
        this.$store.state.d2admin.account.filters_list = peon;
        console.log(
          this.$store.state.d2admin.account.filters_list,
          "当前得左侧数据"
        );

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
      if (x[0] == "True") {
        return "正确";
      } else {
        return "错误";
      }
    },
    set_duo(x) {
      let new_as = "";
      x.map((e) => {
        new_as = e + " 、";
      });

      return new_as;
    },
    setType(x) {
      if (x == 3) {
        return "判断题";
      }
      if (x == 2) {
        return "多选题";
      }
      if (x == 1) {
        return "单选题";
      }
    },
    setKey() {
      this.filters.content = this.formInline.content;
      this.filters.type = this.formInline.type || "0";
      this.filters.degree = this.formInline.degree || "0";
      this.filters.ability_id = this.formInline.ability_id || "0";
      this.filters.course_id = this.formInline.course_id || "0";
    },

    getPaperQuestion() {
      paperQuestion(this.paperId,{limit:100}).then((res) => {
        console.log(res, "22");
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
          this.$message.error("系统异常");
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
  width: 100px;
}
.item_aswer {
  margin: 10px;
  text-align: center;
}
.lefts,
.rights {
  width: 100%;
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
  overflow: hidden;

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
