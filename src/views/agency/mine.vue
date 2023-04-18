<template>
    <d2-container>
        <div class="Aone-page">
            <div v-show="next">
                <div class="mine-head flex_center_around">
                    <div class="item-head flex_center_around" v-for="item in head_list">
                        <div>
                            <img :src="item.src" alt="" />
                        </div>
                        <div>
                            <p class="names">{{ item.name }}</p>
                            <p class="nums">{{ item.num }}</p>
                        </div>
                    </div>
                </div>
                <div class="mine-body flex_center_starts2">
                    <div class="company_add pointer flex_center_around_c" @click="go_any()">
                        <img src="/image/AOne/more_c.png" alt="" />
                        <p class="weights fonts-20">认证更多机构</p>
                    </div>
                    <div class="company_add pointer" v-for="item in body_list">
                        <div class="company_head flex_center_around" @contextmenu.prevent="openMenu($event, item)">
                            {{ item.name }}
                        </div>
                        <div class="test flex_center_starts2">
                            <div class="imgs" v-if="item.review_score">{{ item.review_score }}</div>
                            <!-- <img class="imgs" src="/image/AOne/pointer_fenshu.png" alt=""> -->
                            <span class="heing" v-if="item.state == 0">审核进行中</span>
                            <!-- <span class="yice" >已评测</span> -->
                            <span class="heerror" v-if="item.state == 1">审核未通过</span>
                            <span class="yihe" v-if="item.state == 2">审核已通过</span>
                        </div>
                        <div class="bodys">
                            <p class="info-p">
                                <span class="info-left"> 机构类型： </span>
                                <span class="info-right">
                                    {{ item.type }}
                                </span>
                            </p>
                            <p class="info-p">
                                <span class="info-left"> 机构人数： </span>
                                <span class="info-right">
                                    {{ item.total_user }}
                                </span>
                            </p>
                            <p class="info-p">
                                <span class="info-left"> 职称人数： </span>
                                <span class="info-right">
                                    {{ item.title_user }}
                                </span>
                            </p>
                            <p class="info-p">
                                <span class="info-left"> 统一社会信用代码： </span>
                            </p>
                            <p class="info-p">
                                <span class="info-left" style="color: #8f90a6">
                                    {{ item.code }}
                                </span>
                            </p>
                        </div>
                        <div class="fots">
                            <el-button @click="test_s(item)" type="primary_test">开始评测</el-button>
                        </div>
                    </div>
                </div>
            </div>
            <ul v-show="visible" :style="{ left: left + 'px', top: top + 'px' }" class="contextmenu">
                <li @click="go_edit()" class="context_li"><i class="el-icon-edit"></i> 修改</li>
                <li @click="go_delete(item)" class="context_li"><i class="el-icon-delete"></i>删除</li>
            </ul>
        </div>
        <div v-show="!next">
            <div class="renzheng" v-show="next">
                <p>您还未认证任何机构，请先认证机构后进行测评！</p>
                <img src="/image/AOne/new_nothing.png" alt="" />
                <br />
                <el-button type="renheng" @click="next = !next"> 去认证 </el-button>
            </div>
        </div>


        <qd-dialog :title="dialogInfo.title" :visible.sync="dialogInfo.visible" :width="dialogInfo.width"
            :bt-loading="dialogInfo.btLoading" @handleOk="submitFormhandle()" @quxiao="quxiao()" :isOk="isok"
            :nofooter="true">
            <div class="new_renzheng">
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="机构名称：" prop="name" required>
                        <el-input v-model="ruleForm.name" placeholder="请输入机构名称"></el-input>
                    </el-form-item>
                    <el-form-item label="机构描述：" prop="description">
                      <el-input type="textarea" :rows="3" v-model="ruleForm.description"></el-input>
                    </el-form-item>
                    <el-form-item label="信用代码：" prop="code" required>
                        <el-input v-model="ruleForm.code" placeholder="请输入机构社会统一信用代码"></el-input>
                    </el-form-item>

                    <el-form-item label="所在区域：" prop="pro">
                        <el-select clearable @change="get_city" v-model="ruleForm.pro" placeholder="请选择一级区域"
                            style="width:30%;float:left;margin-right:10px">
                            <el-option v-for="item in pro_list" :label="item.name" :code="item.code" :value="item.code">
                            </el-option>
                        </el-select>
                        <el-select clearable v-if="if_city" @change="get_xian" v-model="ruleForm.city"
                            placeholder="请选择二级区域" style="width:30%;float:left;margin-right:10px">
                            <el-option v-for="item in city_list" :label="item.name" :value="item.code"></el-option>
                        </el-select>
                        <el-select clearable v-if="if_xian" v-model="ruleForm.xian" placeholder="请选择三级区域"
                            style="width:30%;float:left;margin-right:10px">
                            <el-option v-for="item in xian_list" :label="item.name" :value="item.code"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="机构类型：" prop="type">
                        <el-select v-model="ruleForm.type" placeholder="请选择机构类型">
                            <el-option v-for="item in type_list" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="详细地址：" prop="address">
                        <el-input v-model="ruleForm.address" placeholder="请输入机构详细地址"></el-input>
                    </el-form-item>

                    <el-form-item label="机构人数：" prop="total_user">
                        <el-input v-model="ruleForm.total_user" min="0" placeholder="请输入机构人数"></el-input>
                    </el-form-item>
                    <el-form-item label="职称信息：" required>
                        <p class="thead flex_center_around" style="width: 65%">
                            <span> 职称类型 </span>
                            <span> 职称人数 </span>
                        </p>
                        <div style="width: 100%; height: 40px; margin-top: 10px" v-for="(item, index) in work_list">
                            <div style="width: 35%; float: left">
                                <el-select v-model="item.title_type" placeholder="请选择职称类型">
                                    <el-option v-for="items in options" :key="items.value" :label="items.label"
                                        :value="items.value">
                                    </el-option>
                                </el-select>
                            </div>
                            <div style="width: 25%; float: left;margin-left: 10px;">
                                <el-input type="number" min="0" v-model="item.title_user"></el-input>
                            </div>
                            <div class="pointer" style="width: 15%; margin-left: 20px; float: left">
                                <i @click="add_item()" v-if="index == work_list.length - 1" class="el-icon-plus"></i>
                                <i @click="del_item(index)" style="margin-left: 10px" v-if="index != 0"
                                    class="el-icon-minus"></i>
                            </div>
                        </div>
                    </el-form-item>
                    <!-- 职称信息 录入： -->
                    <el-form-item>
                        <el-button style="float: right" @click="resetForm('ruleForm')">取消</el-button>
                        <el-button style="float: right; margin-right: 10px" type="primary_test"
                            @click="submitForm('ruleForm')">{{ tijiao }}</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </qd-dialog>
    </d2-container>
</template>

<script>
import { new_agency2, new_area, new_area2, new_agency, dels, detail, editAgency } from './big.js';
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
            tijiao: "提交认证",
            pro_list: [],
            city_list: [],
            xian_list: [],
            next: true,
            work_list: [
             { title_type: '', title_user: '' }
            ],
          type_list: [
                {
                    label: '企业',
                    value: 1,
                }, {
                    label: '高校',
                    value: 2,
                }, {
                    label: '政府',
                    value: 3,
                },
                {
                    label: '科研单位',
                    value: 4,
                },

            ],
            options: [
                {
                    label: '助理级',
                    value: 1,
                },
                {
                    label: '中级',
                    value: 2,
                },
                {
                    label: '副高级',
                    value: 3,
                },
                {
                    label: '正高级',
                    value: 4,
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
                        required: true,
                    },
                ],
                address: [
                    {
                        validator: check_user2,
                        trigger: 'blur',
                        required: true,
                    },
                ],
                code: [{ required: true, message: '请输入机构社会统一信用代码', trigger: 'blur' }],
                name: [{ required: true, message: '请输入机构名称', trigger: 'blur' }],
                type: [{ required: true, message: '请选择机构类型', trigger: 'blur' }],
                total_user: [{ required: true, message: '请输入机构人数', trigger: 'blur' }],
                pro: [{ required: true, message: '请选择机构所在区域', trigger: 'blur' }],
                address: [{ required: true, message: '请输入机构详细地址', trigger: 'blur' }]
            },
            dialogInfo: {
                title: '机构认证',
                visible: false,
                width: '50%',
            },
            head_list: [
                { name: '认证机构总数', num: 0, src: '/image/AOne/count.png' },
                { name: '已通过审核', num: 0, src: '/image/AOne/ok.png' },
                { name: '审核中', num: 0, src: '/image/AOne/ing.png' },
                { name: '审核未通过', num: 0, src: '/image/AOne/rejucet.png' },
            ],
            body_list: [],
            //   右键
            visible: false,
            top: 0,
            left: 0,
            //   右键
            if_city: false,
            if_xian: false,
          item_id: "",
          // 直辖市
          gentral: [110000, 120000, 310000, 500000],
          submitType: 1
        };
    },
    created() {
        this.get_agency();
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
        get_agency() {
            new_agency2().then((res) => {
                if (res.data.list.length == 0) {
                    this.next = false;
                }
                this.body_list = res.data.list;
                this.head_list[0].num = res.data.total_info.total;
                this.head_list[1].num = res.data.total_info.pass;
                this.head_list[2].num = res.data.total_info.hall;
                this.head_list[3].num = res.data.total_info.fail;
                }
            );
        },
        add_item() {
            this.work_list.push({ title_type: '', title_user: '' }
        );
        },
        del_item(x) {
            this.work_list.splice(x, 1);
        },
        get_pro() {
          new_area().then((res) => {
            this.pro_list = res.data;
          });
        },
        get_city(x) {
            this.if_xian = false
            this.if_city = false
            this.ruleForm.city = ''
            this.ruleForm.xian = ''
            if (x) {
                new_area2(x).then((res) => {
                    this.city_list = res.data;
                    if (this.city_list.length > 0) {
                        this.if_city = true
                    } else {
                        this.if_city = false
                    }
                });
            }

        },
        get_xian(x) {
            this.if_xian = false
            this.ruleForm.xian = ''
            if (x) {
                new_area2(x).then((res) => {
                    this.xian_list = res.data;
                    this.xian_list = res.data;
                    if (this.xian_list.length > 0) {
                        this.if_xian = true
                    } else {
                        this.if_xian = false
                    }
                });
            }

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
                    // { title_type: '', title_user: '' }
//
                    this.ruleForm.title.map((e) => {
                        e.type = parseInt(e.title_type);
                        e.value = parseInt(e.title_user);
                    });
                    if (this.submitType == 1) {
                        new_agency(this.ruleForm).then((res) => {
                        if (res.code == 200) {
                            this.dialogInfo.visible = false
                            this.$message.success(res.message)
                            new_agency2().then((res) => {
                                if (res.data.list.length == 0) {
                                this.next = false;
                                }
                                this.body_list = res.data.list;
                                this.head_list[0].num = res.data.total_info.total;
                                this.head_list[1].num = res.data.total_info.pass;
                                this.head_list[2].num = res.data.total_info.hall;
                                this.head_list[3].num = res.data.total_info.fail;
                            })}else{
                                this.$message.error("提交失败")
                            }
                        });
                    } else if (this.submitType == 2) {
                        editAgency(this.ruleForm, this.item_id).then(res => {
                            if (res.code == 200) {
                                this.$message.success("修改成功")
                            } else {
                                this.$message.error("修改失败")
                            }
                            this.dialogInfo.visible = false;
                            this.get_agency();
                        })
                    }
                } else {
                    return false;
                }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
            this.dialogInfo.visible = false
        },
        test_s(x) {
            if (x.state == 0) {
                this.$message.warning("请在机构认证审核通过后再进行评测！认证审核请联系管理员！")
                return
            } else if (x.state == 1) {
                this.$message.warning("请在机构认证审核被拒绝，请联系管理员！")
            } else {
                this.$router.push({
                path: '/agency/mine_manager',
                query: { id: x.id },
                });
            }
        },
        go_any() {
            this.dialogInfo.visible = true;
            this.tijiao = "提交认证";
            this.submitType = 1;
            this.dialogInfo.title = '机构认证';
            this.initForm();
            this.get_pro();
            this.ruleForm.type = 1;
        },
        //右击
        openMenu(e, item) {
            this.item_id = item.id
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
        go_delete(x) {
            this.$confirm('此操作将永久删除该机构, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                dels(this.item_id).then(res => {
                    if (res.code == 200) {
                        this.$message.success(res.message)
                        new_agency2().then((res) => {
                            if (res.data.list.length == 0) {
                                this.next = false;
                            }
                            this.body_list = res.data.list;
                            this.head_list[0].num = res.data.total_info.total;
                            this.head_list[1].num = res.data.total_info.pass;
                            this.head_list[2].num = res.data.total_info.hall;
                            this.head_list[3].num = res.data.total_info.fail;
                        });

                    }
                })
            })
        },
        go_edit() {
          this.tijiao = '提交修改';
          this.submitType = 2;
          this.initForm();
          this.dialogInfo.title = '机构修改';
          this.dialogInfo.visible = true;
          detail(this.item_id).then(res => {
            this.ruleForm = res.data
            this.work_list = res.data.title;
            this.deal_area({"city_code": res.data.city_code, "country_code": res.data.country_code})
          });
      },
      initForm() {
          this.ruleForm = {
            name: '', //机构名称
            code: '', //统一社会标识
            description: '', //机构描述
            area_id: '', //地域编号
            address: '', //机构详细地址
            type: '', //机构类型
            total_user: '', //机构人数
            title: [],
            pro: '',
            city: '',
            xian: '',
          };
        this.work_list = [{ title_type: '', title_user: '' }];
        this.pro_list = [];
        this.city_list = [];
        this.xian_list = [];
        this.if_city = false;
        this.if_xian = false;
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
            let codeStr = areaObj.city_code.toString()
            this.ruleForm.pro = parseInt(codeStr.substring(0, 2) + '0000');
            this.get_city(this.ruleForm.pro);
            this.ruleForm.city = areaObj.city_code;
            if (areaObj.country_code > 0) {
              this.get_xian(this.ruleForm.city);
              this.ruleForm.xian = areaObj.country_code;
            }
          }
        }
      }
    },
};
</script>

<style lang="scss" scoped>
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
    width: 1240px;
    height: 140px;
    margin: 30px auto;
    background: #fff;
    border: 1px solid #e8e8e8;
}

.mine-body {
    width: 1240px;
    overflow: auto;
    margin: 0 auto;
    //   max-height: 1500px;
    flex-wrap: wrap;
    padding-bottom: 20px;
}

.company_add {
    width: 280px;
    height: 360px;
    text-align: center;
    background: #fff;
    border-radius: 4px;
    margin-top: 20px;
    margin-right: 40px;
    //   margin: 20px 20px 20px 0px;
}

.company_add:nth-child(4n) {
    margin-right: 0px !important;
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
    font-size: 14px;
    text-align: center;
    line-height: 43px;
}

.new_renzheng {
    width: 90%;
    margin: 0 auto;

    span {
        color: black
    }

    ;
}
.pointer  i{
    color: black!important;;
}
</style>
