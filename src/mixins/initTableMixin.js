import { _setLocalStore } from "@/plugin/utils/storage";

export default {
    data() {
        return {
            tableCheckData: [], //table单行选中
            tableInfo: {
                refresh: 1,
                initCurpage: 1,
                total: 0,
                data: [],
            },
            // exportLoading: false,
        };
    },
    computed: {
        typeToName() {
            return (type, status) => {
                let item = this.listTypeInfo[type].find((v) => v.value == status);
                return item ? item.label : "-";
            };
        },
        //权限处理
        isAuth() {
            return (name) => {
                let meta = this.$route.meta;
                let operats = _setLocalStore.get('currentOperats')
                let arrayOp = meta.operats ?  meta.operats: operats

                return arrayOp[name] ? arrayOp[name] : false;
            };
        },
    },
    created() {
        _setLocalStore.set("queryData", this.queryData || {});
    },
    methods: {
        // 触发事件----------------------------
        handleEvent(event, data) {
            switch (event) {
                case "tableCheck":
                    this.tableCheckData = [...data];
                    this.$emit('update:checkData',data)
                    break;
                // 对表格获取到的数据做处理
                case "list":
                    if (!data) return;
                    this.tableInfo.data = [...data];
                    // console.log(this.tableInfo.data,'*************333333333333333****************')
                    break;
                case "total":
                    this.tableInfo.total = data;
                    break;
            }
        },

        // 刷新列表
        freshTableList() {
            this.tableInfo.refresh = Math.random();
        },

        //新增or编辑
        handleOpenDialog(type, title) {
            this.resetForm();
            this.dialogInfo.title = title;
            if (type === "edit") {
                let tableCheck = this.tableCheckData[0];
                if (this.initFormData) {
                    this.initFormData(tableCheck);
                } else {
                    Object.keys(this.form).forEach((key) => {
                        this.form[key] = tableCheck[key];
                    });
                }
            }
            this.dialogInfo.visible = true;
        },

        resetForm(data = this.form) {
            Object.keys(data).forEach((key) => (this.form[key] = ""));
        },

        //删除操作
        handleDelete() {
            console.log(this.tableCheckData);
            if (this.tableCheckData.length == 0) {
                return this.$message.warning("请至少选择一条!");
            }

            let ids = this.tableCheckData.map((v) => v.id).join(",");
            this.$confirm("是否确认删除?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
            })
                .then(() => {
                    this.removeRequest({
                        ids: ids,
                    });
                })
                .catch((err) => {});
        },

        //删除请求
        removeRequest(params) {
            this.deleteAPI(params).then((res) => {
                this.$notify({
                    title: "操作成功提示",
                    type: "success",
                    message: "删除成功!",
                });
                this.freshTableList();
            });
        },
        //新增和编辑保存操作(外部可以通过传params改变，默认为this.form)
        handleSubmit(params) {
            if (!this.$refs.form) {
                this.handleSave(params);
            } else {
                this.$refs.form.validate((valid) => {
                    if (!valid) return false;
                    this.handleSave(params);
                });
            }
        },

        handleSave(params) {
            this.dialogInfo.btLoading = true;
            params = params ? params : this.form;
            this.saveAPI(params)
                .then((res) => {
                    this.$notify({
                        title: "操作成功提示",
                        type: "success",
                        message: "保存成功!",
                    });
                    this.freshTableList();
                })
                .finally(() => {
                    this.dialogInfo.visible = false;
                    this.dialogInfo.btLoading = false;
                });
        },
        //标记消息已读
        handleMarkRead() {
            console.log(this.tableCheckData);
            if (this.tableCheckData.length == 0) {
                return this.$message.warning("请选择要标记的消息!");
            }
            let ids = this.tableCheckData.map((v) => v.id).join(",");
            this.markReadAPI({
                ids,
            }).then((res) => {
                this.$notify({
                    title: "操作成功提示",
                    type: "success",
                    message: "标记成功!",
                });
                this.freshTableList();
            });
        },

        //更改状态
        handleChangeStatus() {
            this.resetForm();
            let tableCheck = this.tableCheckData[0];
            Object.keys(this.form).forEach((key) => {
                this.form[key] = tableCheck[key];
            });
            this.form.status = Number(tableCheck.status);
            this.changeStatusOptions = this.GetDictTypeList("status");
            this.dialogInfo.visible = true;
        },

        // 按钮点击
        handleClick(event, data) {
            const tableInfo = this.tableInfo;

            switch (event) {
                case "search": // 搜索
                    if (typeof this.handleParams === "function") {
                        this.handleParams();
                    }
                    tableInfo.initCurpage = Math.random();
                    return this.freshTableList();

                case "search-reset": // 重置分页
                    this.queryData = _setLocalStore.get("queryData");
                    tableInfo.initCurpage = Math.random();
                    return this.freshTableList();
            }
        },

        //导出
        exportExcel(title) {
            this.exportLoading = true;
            console.log(this.queryData);
            this.exportAPI(this.queryData)
                .then((res) => {
                    //先判断是否有数据可导出
                    if (res === null) {
                        return this.$notify.error({
                            title: "错误",
                            message: "服务端异常，请稍后再试",
                        });
                    }
                    const blob = new Blob([res]);
                    const blobUrl = window.URL.createObjectURL(blob);
                    this.downloadStream(blobUrl, `${title}.xlsx`);
                })
                .finally((v) => {
                    this.exportLoading = false;
                });
        },
        downloadStream(blobUrl, title) {
            const a = document.createElement("a");
            a.style.display = "none";
            a.download = title;
            a.href = blobUrl;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        },

        //下载文件
        downloadFile(blobUrl, title){
            this.downloadStream(blobUrl, title); 
        },
        //预览文件
        viewFile(row){
            // console.log(row)
            window.open("http://view.officeapps.live.com/op/view.aspx?src=" + row.url ,"_blank");
        },
    },

    mounted() {
        this.freshTableList();

    },
};
