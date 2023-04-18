import axios from "axios";
import {
    getToken
} from "@/plugin/utils/auth";

let tools = {
    install: null
};

// tools.install = function (Vue, router) {
//   // 注册全局socket链接
//   Vue.prototype.$sockets = function (namespace) {
//      let socketApi = process.env.VUE_APP_API
//     // let socketApi ='http://172.16.12.178:9005'
//     // http://172.16.12.178:9005
//     let socketUrl = namespace ? `${socketApi}/${namespace}` : `${socketApi}`;
//     console.log(socketUrl)
//     console.log(io,'000000')
//     return io.connect(socketUrl)
//   };
//   Vue.prototype.$axios = axios;

//   //   下载方法
//   Vue.prototype.downloadExcel = function (url, name, data) {
//     console.log(name)
//     // console.log(axios.headers['token'])
//     // axios.headers['token'] = getToken
//     axios({
//       url: url,
//       method: 'post',
//       responseType: 'blob', // important
//       headers: {
//         'token': getToken() //设置token 其中K名要和后端协调好
//       },
//       data: data
//     }).then((resp) => {
//       let data = resp.data;
//       let blob = new Blob([data], {
//         type: 'application/octet-stream'
//       });
//       let url = window.URL.createObjectURL(blob);
//       let link = document.createElement("a");
//       link.style.display = "none";
//       link.href = url;
//       link.setAttribute("download", name);
//       document.body.appendChild(link);
//       link.click();
//       document.body.removeChild(link);
//       window.URL.revokeObjectURL(url)
//     }).catch(function (error) {
//       console.log(error)
//     });
//   };
// }






export default tools;