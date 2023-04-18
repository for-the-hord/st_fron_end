<template>
    <el-form
        ref="form"
        class="qd-form"
        :class="className"
        :model="data"
        :rules="rules"
        :disabled="readonly"
        :label-width="labelWidth"
        v-loading="loading"
        size="medium"
        :label-position="labelPosition ? labelPosition : 'right'"
    >
        <el-row
            v-for="(row, idx) in formatFieldList"
            :key="idx"
            :class="row[0].type !== 'title' ? 'form-row-class' : 'form-row-title'"
            :style="idx == 0 ? 'margin-top:0' : ''"
        >
            <template v-for="(item, index) in row">
                <el-col :span="item.span" :key="index">
                    <el-form-item
                        v-if="item.type !== 'whiteSpace'"
                        :prop="item.value"
                        :class="[
                            item.className,
                            item.type === 'title' ? 'qd-form-content-title' : 'qd-form-content-other',
                        ]"
                        :label="item.label"
                        :required="item.required"
                        :rules="
                            item.rules
                                ? [
                                      {
                                          required: item.required || false,
                                          trigger: ['change', 'blur'],
                                      },
                                      ...item.rules,
                                  ]
                                : [
                                      {
                                          required: item.required || false,
                                          trigger: ['change', 'blur'],
                                      },
                                  ]
                        "
                    >
                        <!-- 头部说明 -->
                        <template v-if="item.type === 'title'">
                            <div style="display:flex;" v-if="Array.isArray(item.title)">
                                <p
                                    style="flex:1;text-align:center"
                                    :style="!!idx ? 'border-left:0' : ''"
                                    class="qd-form_title"
                                    :key="t"
                                    v-for="(t, idx) in item.title"
                                >
                                    {{ t }}
                                </p>
                            </div>
                            <p v-else class="qd-form_title">{{ item.title }}</p>
                        </template>
                        <!-- solt -->
                        <template v-if="item.type === 'slot'">
                            <slot :name="'form-' + item.value" />
                        </template>

                        <!-- 普通输入框 
                            :show-word-limit="item.maxlength > 0"
                         -->
                        <el-input
                            v-if="item.type === 'input' || item.type === 'password' || item.type === 'number'"
                            v-model.trim="data[item.value]"
                            :maxlength="item.maxlength"
                            :minlength="item.minlength"
                            :type="item.type === 'input' ? 'text' : item.type"
                            :clearable="item.clearable ? item.clearable : false"
                            :name="item.value"
                            :disabled="item.disabled"
                            :placeholder="getPlaceholder(item)"
                            @blur="handleEvent(item.event, data[item.value])"
                        >
                            <template v-if="item.append" slot="append">{{ item.append }}</template>
                            <template v-if="item.suffix" slot="suffix">{{ item.suffix }}</template>
                        </el-input>

                        <!-- 文本输入框 -->
                        <el-input
                            v-if="item.type === 'textarea'"
                            v-model.trim="data[item.value]"
                            :type="item.type"
                            :maxlength="item.maxlength"
                            :show-word-limit="!!item.maxlength"
                            :disabled="item.disabled"
                            :placeholder="getPlaceholder(item)"
                            :name="item.value"
                            :autosize="item.autosize || { minRows: 3, maxRows: 10 }"
                            @focus="handleEvent(item.event)"
                        />

                        <!-- 选择框 -->
                        <el-select
                            style="width:100%"
                            v-if="item.type === 'select'"
                            :ref="`form-item_${item.value}`"
                            :multiple-limit="100"
                            v-model="data[item.value]"
                            :disabled="item.disabled"
                            :multiple="item.multiple"
                            @remove-tag="(val) => handleEvent('remove-tag', val, item.value)"
                            :clearable="!item.noClearable"
                            :filterable="item.filterable"
                            :remote="item.remote"
                            autocomplete="on"
                            :remote-method="(query) => handleEvent('filter', query, item.value)"
                            loading-text="努力加载中..."
                            :loading="item.remote ? listTypeInfo.loading : false"
                            :placeholder="getPlaceholder(item)"
                            :name="item.value"
                            @change="handleEvent(item.event, data[item.value], item.value)"
                        >
                            <el-option
                                :class="item.className"
                                v-for="(childItem, childIndex) in listTypeInfo[item.list ? item.list : item.value]"
                                :key="childIndex"
                                :label="childItem.name"
                                :value="childItem.value"
                            >
                                <span>{{ childItem.name }}</span>
                            </el-option>
                        </el-select>

                        <!-- 日期选择框 -->
                        <el-date-picker
                            v-if="item.type === 'date' || item.type === 'daterange' || item.type === 'monthrange'"
                            v-model="data[item.value]"
                            :type="item.type"
                            :format="item.format"
                            :value-format="item.format ? item.format : 'yyyy-MM-dd'"
                            :picker-options="item.TimePickerOptions"
                            :clearable="item.clearable"
                            :disabled="item.disabled"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            :placeholder="getPlaceholder(item)"
                            :name="item.value"
                            @change="(val) => handleChange(val, item)"
                        />

                        <!-- 下拉级联 -->
                        <!-- <el-cascader
                            v-if="item.type === 'cascader'"
                            v-model="data[item.value]"
                            :name="item.value"
                            clearable
                            :options="listTypeInfo[item.list]"
                            :placeholder="getPlaceholder(item)"
                            :filterable="item.filterable"
                            :props="item.props"
                            style="width:100%"
                            @change="handleEvent(item.event, item)"
                            ></el-cascader> -->

                        <el-cascader
                            size="medium"
                            style="width:100%"
                            v-if="isCascader(item.type)"
                            v-model="data[item.value]"
                            clearable
                            class="form-cascader"
                            :options="options[item.key]"
                            :placeholder="getPlaceholder(item)"
                            :filterable="true"
                            :props="{
                                lazy: true,
                                checkStrictly: false,
                                lazyLoad: cascaderChildrenFn(item),
                            }"
                            @change="handleEvent"
                        />
                    </el-form-item>
                </el-col>
            </template>
        </el-row>
    </el-form>
</template>

<script>
// import { GetAddressListAPI } from "@/ajax/common";

export default {
    name: "qdForm",
    props: {
        refObj: {
            type: Object,
        },
        refName: {
            type: String,
            default: "form",
        },
        labelWidth: {
            type: String,
            default: "80px",
        },
        // 自定义类名
        className: {
            type: String,
        },
        labelPosition: {
            type: String,
        },
        readonly: {
            type: Boolean,
            default: false,
        },
        // 表单数据
        data: {
            type: Object,
        },
        dialogType: {
            type: String,
        },
        // 相关字段
        fieldList: {
            type: Array,
        },
        rules: {
            type: Object,
        },
        // loading
        loading: {
            type: Boolean,
            default: false,
        },
        listTypeInfo: {
            type: Object,
            default: () => {},
        },
    },
    data() {
        return {
            options: {},
            clientWidth: 1500,
            rowNumber: 4,
            formatFieldList: [],
            dateTypeArr: [
                "year",
                "month",
                "week",
                "date",
                "dates",
                "datetime",
                "datetimerange",
                "daterange",
                "monthrange",
            ],
        };
    },
    watch: {
        data: {
            handler: function(val) {
                // 将form实例返回到父级
                this.$emit("update:refObj", this.$refs.form);
            },
            deep: true, // 深度监听
        },
        fieldList: {
            handler(newVal) {
                this.getConfigList(newVal);
            },
            deep: true,
            immediate: true,
        },
    },
    created() {
        this.getClientWidth();
        window.addEventListener("resize", this.getClientWidth);
    },
    destroyed() {
        window.removeEventListener("resize", this.getClientWidth);
    },
    mounted() {
        // 将form实例返回到父级
        this.$emit("update:refObj", this.$refs.form);
    },
    methods: {
        //时间选择器
        handleChange(val, item) {
            if (item.type.indexOf("range") > -1) {
                this.data[item.startTime] = val ? val[0] : "";
                this.data[item.endTime] = val ? val[1] : "";
            }
            console.log(val, this.data);

            this.$emit("update:data", this.data);
        },
        getClientWidth() {
            this.clientWidth = document.body.clientWidth;
            this.rowNumber = this.clientWidth < 1500 ? 3 : 4;
            this.getConfigList(this.fieldList);
            console.log(this.clientWidth, "0-0-0-");
        },
        // 获取字段列表
        getConfigList(fieldList) {
            let arrayList = fieldList.filter((item) => !item.hidden);
            let arrReturn = [],
                arrTemp = []; //ruturn的数据
            arrayList.forEach((v) => {
                if (!v.span || v.span === 6 || v.span === 8) {
                    v.span = 24 / this.rowNumber;
                }
            });
            console.log(arrayList, "数据分组之前的数组");

            arrayList.forEach((v, index) => {
                arrTemp.push(v);
                let number = 0;
                arrTemp.forEach((v) => (number += v.span));
                if (number == 24 || v.end) {
                    arrReturn.push(arrTemp);
                    arrTemp = [];
                }
            });
            console.log(arrReturn, "数据分组之后的数组");
            this.formatFieldList = arrReturn;
        },

        // 得到placeholder的显示
        getPlaceholder(row) {
            if (this.readonly) return "";

            if (row.placeholder) {
                return row.placeholder;
            }
            switch (row.type) {
                case "input":
                case "inputNumber":
                case "textarea":
                    return "请输入" + row.label;
                case "select":
                    return row.remote ? "请输入搜索" : "请选择 " + row.label;
                case "time":
                case "date":
                case "upload":
                case "switch":
                case "cascader":
                    return "请选择 " + row.label;
            }

            return row.label;
        },

        // 绑定的相关事件
        handleEvent(event, data) {
            console.log({...arguments})
            this.$emit("handleEvent", ...arguments);
        },

        isCascader(t) {
            switch (t) {
                case "cascade_address": // 省市区级联
                case "cascade_org": // 机构门店级联
                    return true;
            }
            return false;
        },

        buildCascaderOptions(list, label, value, leaf = false) {
            let options = [];

            if (list && list.length > 0) {
                list.forEach((v) => {
                    let item = { label: v[label], value: v[value] };
                    if (leaf) {
                        item.leaf = "leaf";
                    }
                    options.push(item);
                });
            }
            return options;
        },

        // 获取省市区
        get_cascade_address(node, resolve) {
            let pId = node.value;
            GetAddressListAPI({ pId }).then((rsp) => {
                let children = this.buildCascaderOptions(rsp.datas, "name", "code", node.level === 2);
                resolve(children);
            });
        },

        // 级联数据处理处理
        cascaderChildrenFn(item) {
            console.log(`get_${item.type}`, "=----------------`get_${item.type}`");
            return this[`get_${item.type}`];
        },
    },
};
</script>

<style lang="scss" scoped>
// 自定义form相关
.qd-form {
    .qd-form_title {
        height: 34px;
        padding: 0 15px;
        color: #333333;
        background: white;
        text-align: center;
        font-weight: bold;
        font-size: 20px;
        // border: 1px solid rgba(6, 102, 196, 1);
        // border-radius: 4px 4px 0px 0px;
    }

    .form-row-class {
        border: 1px solid #fff;
        border-top: 0;
        border-left: 0;
        .el-form-item {
            width: 100%;
            box-sizing: border-box;
            // margin: 0;
            display: flex;
            // margin-bottom: 0px !important;
            align-items: center;
            .el-form-item__content {
                flex: 1;
                padding: 6px;
                border-top: 0;
                // border-right: 0;
                position: relative;
                text-align: center;
            }

            .el-form-item__label {
                background-color: #DDEDFF;
                line-height: 1;
                height: 36px;
                display: inline-flex;
                justify-content: flex-end;
                align-items: center;
                // border-left: 1px solid rgba(6, 102, 196, 1);
                // border-right: 1px solid rgba(6, 102, 196, 1);
            }

            .el-input,
            .el-select {
                max-width: 420px;
            }
        }
        .el-date-editor--monthrange.el-input__inner{
            width: 100%;
        }
    }

    .el-form-item {
        .el-form-item__error {
            right: 12px;
            top: 28%;
            left: auto;
            display: none;
        }
    }
    .is-error .el-form-item__content .el-input .el-input__inner {
        border-color: #f56c6c;
    }
    .form-left.el-form-item .el-form-item__content {
        text-align: left;
    }
    .form-row-title {
        margin-top: 20px;
        .el-form-item__label {
            line-height: 36px;
        }
        .el-form-item {
            // margin-bottom: 0;
        }
    }
    .form-col-title:nth-child(1) {
        margin-top: 0;
    }

    .el-form-item__content {
        margin-left: 0 !important;
    }

    .form-files {
        border: 1px solid transparent;
        .el-form-item__content {
            padding: 0 !important;
        }
    }
}

.el-select-dropdown__item.select-info {
    height: auto;
    line-height: 24px;
    padding: 5px 20px;
    border-top: 1px solid #f7f7f7;
}
</style>
