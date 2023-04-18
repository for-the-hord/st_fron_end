// 级联地址处理
export default {
    data(){
        return{
            exportLoading:false
        }
    },
    methods: {
        downloadStream(blobUrl,title) {
            const a = document.createElement('a');
            a.style.display = 'none';
            a.download = title;
            a.href = blobUrl;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        },


        //导出
        commonExportExcel(api,params,title) {
            this.exportLoading = true
            api(params).then((res) => {
                const blob = new Blob([res]);
                const blobUrl = window.URL.createObjectURL(blob);
                this.downloadStream(blobUrl,title)
            }).finally(() => {
                this.exportLoading = false
            })
        },

    }

};