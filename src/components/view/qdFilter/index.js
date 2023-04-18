// import {GetAddressListAPI} from "@/ajax/common";
import { formatParams } from "@/plugin/utils/index.js"
import commonExportExcel from "@/mixins/commonExportExcel.js"
// import { number } from "node_modules/echarts/index";
export default {
    name: "qdFilter",
    mixins: [commonExportExcel],
    props: {
        bianhua: { type: String },
        className: { type: String }, // 自定义类名
        listTypeInfo: { type: Object, default: () => { } }, // select组件 options 列表
        filterList: { type: Array, default: () => [] }, // 过滤器列表
        query: { type: Object, default: () => { } },
        levelType: { type: Number, default: () => 3 }, //联动级别  默认为三级联动
        // daoBtn:{type:Boolean},
        daoMessage: { type: Object, default: () => { } },
        search_lds: "",
        search_lds_set: ""
    },

    data() {
        return {
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
            // 时间相关设置
            datePickerOptions: {
                disabledDate(time) {
                    if (localStorage.getItem("start") && localStorage.getItem("end")) {
                        return time.getTime() > new Date(localStorage.getItem("end")).getTime() || time.getTime() < new Date(localStorage.getItem("start")).getTime();
                    } else {
                        // 大于当前的时间都不能选 (+十分钟让点击此刻的时候可以选择到当前时间)
                        return time.getTime() > new Date().getTime() + 86400000 + 1000;
                    }

                },
            },
            // 搜索表单绑定值
            searchQuery: {},
            // 存放级联数据, key 为字段名
            options: {},
            flag: "inner",
        };
    },
    watch: {

        // 此处为了满足联动改动了一下
        bianhua: {
            handler: function (val) {
                console.log(val, 'fuzichuanzhi')
                console.log(this.searchQuery, 'searchQuery')
                this.searchQuery.position_id = ''
            },
        },
        // 此处为了满足联动改动了一下
        searchQuery: {
            handler: function (val) {
                // 传入参数修改，不派发
                if (this.flag === "outside") {
                    return (this.flag = "inner");
                }
                if (val.timeRange === null) {
                    val.extract_begin_date = "";
                    val.extract_end_date = "";
                }
                if (val.timeRange2 === null) {
                    val.deal_begin_date = "";
                    val.deal_end_date = "";
                }
               
                let result = { ...val };
                // 修改传入进来的参数
                this.$emit("update:query", result);
            },
            deep: true, // 深度监听
        },
        query: {
            handler: function (val) {
                let result = { ...val };
                console.log(result,'result')
                this.flag = "outside"; // 标识为传入参数修改
                this.searchQuery = result;
                if (this.searchQuery.timeRange != undefined) {
                    this.searchQuery.extract_begin_date = this.searchQuery.timeRange[0];
                    this.searchQuery.extract_end_date = this.searchQuery.timeRange[1];
                }
                if (this.searchQuery.timeRange2 != undefined) {
                    this.searchQuery.deal_begin_date = this.searchQuery.timeRange2[0];
                    this.searchQuery.deal_end_date = this.searchQuery.timeRange2[1];
                }

            },
            deep: true, // 深度监听
            immediate: true,
        },
    },
    mounted() {
        // console.log(this.query)
        // this.initListTypeInfo();
    },
    methods: {
        getClass(type) {
            if (this.dateTypeArr.indexOf(type) > -1 && type !== "date") {
                return "timewidth";
            } else if (type === "select") {
                return "selectwidth";
            }
        },
        isCascader(t) {
            switch (t) {
                case "cascade_address": // 省市区级联
                case "cascade_org": // 机构门店级联
                    return true;
            }
            return false;
        },

        // 获取placeholder字符串
        getPlaceholder(row, postfix = "") {
            switch (row.fieldType) {
                case "text":
                case "textarea":
                    console.log(row.value.split('')[row.value.split('').length-1],'rrrrrr')
                    console.log(row.value.split('：')  ,'rrrrrr')
                    console.log(row.value  ,'rrrrrr')
                    if(row.value.split('：').length==2){
                        return row.value.split('：')[0]
                    }else{
                        return "请输入" + row.value + postfix;

                    }


                case "select":
                case "datetime":
                case "time":
                case "date":
                case "cascade_address":
                case "cascade_org":
                    return "请选择" + row.value + postfix;
            }
            return row.value + postfix;
        },

        // 绑定的相关事件
        handleEvent(event, data) {
            this.$emit("handleEvent", event, data);
            console.log(event, data, '组件')
        },

        // 派发按钮点击事件
        handleClick($event, data) {
            console.log($event, data,'组件内')
            console.log(this.searchQuery,'过滤器')
            this.$emit("handleClick", $event, data);
        },
        //派发按钮导出事件
        handleDao() {
            if (this.daoMessage.show) {
                this.commonExportExcel(this.daoMessage.api, this.daoMessage.queryData, `${this.daoMessage.title}.xlsx`);
            } else {
                // this.$emit("handleDao");
                let newdata = formatParams(this.daoMessage.queryData);
                if (newdata.timeRange != undefined) {
                    newdata.beginTime = newdata.timeRange[0];
                    newdata.endTime = newdata.timeRange[1];
                    delete newdata.timeRange;
                }
                this.commonExportExcel(this.daoMessage.api, { ...newdata }, `${this.daoMessage.title}.xlsx`);
            }

        },
        buildCascaderOptions(list, label, value, leaf = false) {
            let options = [];
            // console.log(list,'---------lixst--------')

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
            // GetAddressListAPI({ pId }).then(rsp => {
            //     let children
            //     if(this.levelType == 2) {   //二级联动
            //         children = this.buildCascaderOptions(rsp.datas, 'name', 'code', node.level === 1);
            //     }else {     //三级联动
            //         children = this.buildCascaderOptions(rsp.datas, 'name', 'code', node.level === 2);
            //     }
            //     resolve(children);
            // });
        },

        // 级联数据处理处理
        cascaderChildrenFn(item) {
            if (item.list === "noauth") {
                return this[`get_${item.fieldType}_${item.list}`];
            } else {
                return this[`get_${item.fieldType}`];
            }
        },

        //初始化select数据
        // initListTypeInfo(){
        //     setTimeout(()=>{
        //         Object.keys(this.listTypeInfo).forEach(v=>{
        //             this.listTypeInfo[v] = !this.listTypeInfo[v].length? this.GetDictTypeList(v):this.listTypeInfo[v];
        //             this.listTypeInfo[v].forEach(v => {
        //                 if(!v.label) v.label = v.name;
        //             });
        //         })
        //     },100)
        // },
    },
};
