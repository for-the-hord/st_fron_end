export default {
    name: "qd-table",
    props: {
        handle: {
            type: Object,
        },
        className: {
            type: String,
        }, // 自定义类名
        refresh: {
            type: Number,
        }, // 刷新
        api: {
            type: Function,
        }, // 获取数据的接口
        summary: {
            type: Object,
        }, // 合计
        tabIndex: {
            type: Boolean,
            default: false,
        }, // 是否显示序号
        checkBox: {
            type: Boolean,
            default: false,
        }, // 是否有选择框
        colspanArray: {
            type: Object,
        }, // 合并的参数
        checkedList: {
            type: Array,
            default: () => [],
        }, // 选中列表
        listTypeInfo: {
            type: Object,
        }, // 类型列表
        fieldList: {
            type: Array,
            default: () => [],
        }, // 表格字段配置
        handle: {
            type: Object,
        }, // 操作栏配置
        pager: {
            type: Boolean,
            default: true,
        }, // 是否分页
        initCurpage: {
            type: Number,
        }, // 重置当前页
        query: {
            type: Object,
            default: () => { },
        }, // 查询条件
        data: {
            type: Array,
            default: () => [],
        }, // 列表数据
        rowClassName: {
            type: Function,
        },
        expandWidth: {
            type: Number,
            default: 1360,
        }, // 行类名获取回调
        tableHeight: {
            type: String,
            default: null,
        },
    },
    computed: {
        expandList() {
            if (this.clientWidth <= this.expandWidth) {
                return this.fieldList.filter((v) => v.type === "expand");
            }
        },
        commomFieldList() {
            return this.fieldList.filter((v) => !v.hidden);

            return this.clientWidth > this.expandWidth
                ? this.fieldList.filter((v) => !v.hidden)
                : this.fieldList.filter((v) => !v.hidden && v.type !== "expand");
        },
    },
    data() {
        return {
            clickIndex: [],
            orders: [], //排序相关
            // 列表相关
            listInfo: {
                list: [],
                tableHeight: 0, // 表格最大高度,
                summary: "",
                total: 0, // 总条数
                loading: false, // 加载动画
                pageSizes: [10, 20, 50, 100], // 分页数量列表
                curPage: 1, // 当前页
                pageSize: 10, // 每页条数,
                query: {
                    // 查询条件
                    limit: 10,
                    page: 1,
                },
            },
            clientWidth: 1980,
            expandShow: false,
        };
    },
    watch: {
        initCurpage() {
            this.listInfo.curPage = 1;
            this.listInfo.query.page = 1;
        },
        refresh() {
            console.log("shuaxin ");
            console.log(this.api);
            if (!this.api) return;
            this.getList(this.api);
        },
        // obj: {
        //     handler(newName, oldName) {
        //       console.log('obj.a changed');
        //     },
        //     immediate: true,
        //     deep: true
        //   },

        data: {
            handler(newName, oldName) {
                console.log(newName, '全部数据table111')
                this.listInfo.list = newName;
                // this.listInfo.total = newName.total
            },
            immediate: true,
            deep: true
            // console.log(val, '全部数据table111')
            // this.listInfo.list = val;
            // this.listInfo.total =val.total
            // console.log(val, "0-0-0-");
            // this.getList(this.api); //不知道是否对错
        },
    },
    created() {
        this.handleResize();
        window.addEventListener("resize", this.handleResize);
    },
    beforeDestroy: function () {
        window.removeEventListener("resize", this.handleResize);
    },
    methods: {
        //删除前调用判断删除前返回前一页
        deleteOk() {
            if ((this.listInfo.total - 1) % 10 == 0) {
                if (this.listInfo.query.page != 1) {
                    this.listInfo.query.page -= 1
                }
            }
        },
        selectableHandler(row, index) {
            let path = this.$route.fullPath;
            if (path.indexOf("org") > -1) {
                //用于组织机构中省级不可选择
                return row.parentId !== 0;
            } else if (path.indexOf("user") > -1 || path.indexOf("limit") > -1) {
                //员工、角色管理id=1的不可选择
                return row.id !== 1;
            } else {
                return true;
            }
            // return path.indexOf("org") > -1 ? row.parentId !== 0 : true;
        },

        handleResize() {
            this.clientWidth = document.documentElement.clientWidth;
            this.expandShow = this.clientWidth > this.expandWidth ? false : true;
        },

        // 处理参数
        handleParams() {
            let obj = {};
            for (const key in this.query) {
                if (Array.isArray(this.query[key]) && this.query[key].length > 0) {
                    obj[key] = this.query[key].slice();
                } else if (this.query[key] || this.query[key] === 0) {
                    obj[key] = this.query[key];
                }
            }
            // let orders = {
            //     orders: this.orders,
            // };
            // 如果不需要分页，则无分页相关参数
            let query = this.pager
                ? {
                    ...this.listInfo.query,
                    ...obj,
                    //   ...orders,
                }
                : obj;
            // 处理时间范围参数
            if (query.timeRange != undefined) {
                query.extract_begin_date = query.timeRange[0];
                query.extract_end_date = query.timeRange[1];
            }
            if (query.timeRange2 != undefined) {
                query.deal_begin_date = query.timeRange2[0];
                query.deal_end_date = query.timeRange2[1];
            }
            console.log("[PageTable] 查询参数处理结果: %o", query);
            return query;
        },

        //统计
        getSummaries(param) {
            const { columns, data } = param;
            const sums = [];
            columns.forEach((column, index) => {
                if (index === 1) {
                    sums[index] = "合计";
                    return;
                }
                let summary = this.listInfo.summary;
                for (let k in summary) {
                    if (k === column.property) {
                        sums[index] = summary[k];
                    }
                }
            });
            return sums;
        },

        // 获取列表数据
        getList(api) {
            // console.log(api,'0000000')
            this.listInfo.loading = true;
            return new Promise((resolve, reject) => {
                // 每次调用接口时都自动绑定最新的数据
                api(this.handleParams())
                    .then((res) => {
                        console.log(this.handleParams());
                        console.log(res, '全部数据table');
                        let listArr = Array.isArray(res.data.data) ? res.data.data : [];
                        this.listInfo.list = res.list || [];

                        // 使外面可以访问到表格数据
                        this.$emit("update:data", this.listInfo.list);
                        console.log(res.data.total, '全部数据total');

                        this.listInfo.total = res.data.total || 0;
                        if (res.summary) {
                            this.listInfo.summary = res.summary;
                        }
                        // 设置当前选中项
                        this.checkedList.forEach((selected) => {
                            const row = listArr.find((item) => {
                                return item.id === selected;
                            });
                            this.$nextTick(() => {
                                if (!row) return;
                                this.$refs.table.toggleRowSelection(row, true);
                            });
                        });
                        resolve(res);
                        this.$emit("handleEvent", "list", listArr);
                        this.$emit("handleEvent", "total", this.listInfo.total);
                    })
                    .catch((err) => { })
                    .finally(() => {
                        this.listInfo.loading = false;
                    });
            });
        },

        handleSizeChange(val) {
            const query = this.listInfo.query;
            this.listInfo.pageSize = val; // 每页条数
            this.listInfo.curPage = 1; // 每页条数切换，重置当前页
            query.limit = val;
            query.page = this.listInfo.curPage;
            this.getList(this.api);
        },

        handleCurrentChange(val) {
            const query = this.listInfo.query;
            this.listInfo.curPage = val; // 当前页
            query.page = val;
            this.getList(this.api);
        },

        // 派发按钮点击事件
        handleClick(event, data) {
            this.$emit("handleClick", event, data);
        },

        // 选中数据
        handleSelectionChange(rows) {
            this.$emit("handleEvent", "tableCheck", rows);
            console.log(rows);
        },

        handleClickIndex(idx) {
            let arrTemp = this.clickIndex;
            const query = this.listInfo.query;
            idx = idx < query.limit ? idx : idx - query.limit;
            let bool = arrTemp.includes(idx),
                row = this.listInfo.list[idx];
            if (bool) {
                this.$refs.table.toggleRowSelection(row, false);
                arrTemp.remove(idx);
            } else {
                this.$refs.table.toggleRowSelection(row, true);
                arrTemp.push(idx);
            }
        },

        // 排序改变
        handleSortChange(params) {
            const { _, prop, order } = params;
            let orderType = order === "ascending" ? 1 : order === "descending" ? 2 : "";
            this.orders = orderType
                ? [
                    {
                        field: prop,
                        orderType,
                    },
                ]
                : [];
            this.getList(this.api);
        },

        //合并列
        arraySpanMethod({ row, column, rowIndex, columnIndex }) {
            let total = this.listInfo.total || 0;
            if (this.colspanArray) {
                switch (columnIndex) {
                    case 0:
                        return rowIndex === 0 ? [total, 1] : [0, 0];
                    case 1:
                    case 2:
                        const _row = this.colspanArray[columnIndex][rowIndex];
                        const _col = _row > 0 ? 1 : 0;
                        return [_row, _col];
                }
            }
        },
    },
};
