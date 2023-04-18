import axios from "axios";
import store from "@/store";
import { getToken } from "@/plugin/utils/auth";
import router from "../router";
import { Message, MessageBox } from "element-ui";

// let baseURL = "http://192.168.0.9:8081" //预发布
//let baseURL = 'http://39.96.5.67:8081';   //测试接口 47.104.253.71   39.96.5.67
// let baseURL = 'https://entpc.qidianzhuyun.com/';     //正式接口

let baseURL = process.env.ENV_ROOT;
if (typeof baseURL == "undefined") {
    baseURL = "https://entpc.qidianzhuyun.com/";
}
baseURL = "http://192.168.0.61:9050"; // 预发布测试接口
//baseURL = "http://192.168.2.202:8081"; //玉涛本地

localStorage.setItem("uploadUrl", baseURL);
// 创建一个axios实例
const service = axios.create({
    baseURL: baseURL, // url = base url + request url
    timeout: 50000, // 请求超时
    // headers: {
    //   'Content-Type': 'application/json',
    // }
});

// 请求拦截
service.interceptors.request.use(
    (config) => {
        // do something before request is sent
        // console.log(config)
        if (
            config.url === "specificAreaData/exportExcel/vehicle" ||
            config.url === "specificAreaData/exportExcel/mortarPot"
        ) {
            //实时监控导出接口
            config.headers["Content-Type"] = "application/json";
            config.timeout = 100000;
        } else {
            config.headers["Content-Type"] = "application/x-www-form-urlencoded";
        }
        if (getToken() != null && getToken() != "") {
            // let each request carry token
            // ['X-Token'] is a custom headers key
            // please modify it according to the actual situation
            config.headers["token"] = getToken();
        }
        return config;
    },
    (error) => {
        // do something with request error
        console.log(error); // for debug
        return Promise.reject(error);
    }
);

// 响应拦截
service.interceptors.response.use(
    (response) => {
        const res = response.data;
        if (!res.code) return res;
        if (res.code === 9200||res.code === 1) {
            return res;
        } else {
            // Message({
            //     showClose: true,
            //     message: res.msg || '请求错误',
            //     type: 'error',
            //     duration: 3000
            // });
            return Promise.reject(res.msg || "error");
        }

        // if the custom code is not 20000, it is judged as an error.
        // if (res.msg !== "success") {
        //   Message({
        //     message: res.message || 'error',
        //     type: 'error',
        //     duration: 5 * 1000
        //   })
        //   // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
        //   if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
        //     // to re-login
        //     MessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
        //       confirmButtonText: 'Re-Login',
        //       cancelButtonText: 'Cancel',
        //       type: 'warning'
        //     }).then(() => {
        //       store.dispatch('resetToken').then(() => {
        //         location.reload()
        //       })
        //     })
        //   }
        //   return Promise.reject(res.message || 'error')
        // } else {
        //   return res
        // }
    },

    (error) => {
        console.log("err" + error); // for debug
        /*    store.dispatch("logout").then(() => {
      router.push(`/login`)
     });*/
        return Promise.reject(error);
    }
);

export default service;
