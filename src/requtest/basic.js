import axios from 'axios';
import store from '@/store';
import { getToken } from '@/plugin/utils/auth';
import util from '@/plugin/libs/util.js';
import router from '../router';

// import router from '../router';
import { Message, MessageBox, Notification } from 'element-ui';
// import { Notification } from 'element-ui';

let baseURL = process.env.VUE_APP_API;
////console.log(baseURL, 'baseURL');

localStorage.setItem('uploadUrl', baseURL);
// 创建一个axios实例
const service = axios.create({
    // baseURL: 'http://172.16.12.176:9007/', //  本地环境开发
    // baseURL: baseURL, //  演示环境
    timeout: 50000, // 请求超时
});

// alert(util.cookies.get('token'))
// 请求拦截
service.interceptors.request.use(
    (config) => {
        // //console.log(util.cookies.get('token')
        // console.log(util.cookies.get('uuid')
        // do something before request is sent
        // console.log(config, "config");
        // if (
        //     config.url === 'specificAreaData/exportExcel/vehicle' ||
        //     config.url === 'specificAreaData/exportExcel/mortarPot'
        // ) {
        //     //实时监控导出接口
        //     config.headers['Content-Type'] = 'application/json';
        //     config.timeout = 100000;
        // } else {
        //     config.headers['Content-Type'] = 'application/json';
        //     // config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
        // }
        // console.log(getToken(), 'token')
        if (getToken() != null && getToken() != '') {
            var tokens = getToken()
            config.headers['Authorization'] = `Bearer ${tokens}`;
        } else {
            Notification({
                type: 'error',
                title: '错误提示',
                message: '当前未登录',
            });
            router.push({ path: '/login' });
        }

        return config;
    },
    (error) => {
        // do something with request error

        // console.log(error); // for debug
        return Promise.reject(error);
    }
);

// 响应拦截
const that = this;
service.interceptors.response.use(
    (response) => {
        console.log('打印当前', response)
            // Message.success('当前请求成功')
            // console.log(response, 'lanjieqi ')
            // return response.data;
        if (response.data.code === 200) {
            return response.data;
        }
        if (response.data.code === 100) {
            Message({
                showClose: true,
                message: response.data.msg || '请求错误',
                type: 'error',
                duration: 3000
            });
            return response.data;

        }
        if (response.data.code === 404) {
            //console.log(router, 'router')
            Message({
                showClose: true,
                message: response.data.message || '请求错误',
                type: 'error',
                duration: 3000,
            });
            return Promise.reject(response.data.message || 'error');
        }
        if (response.data.code === 401) {
            //console.log(router, 'router')
            router.push({
                path: '/login',
            });
        } else {
            Message({
                showClose: true,
                message: response.data.msg || '请求错误',
                type: 'error',
                duration: 3000,
            });
            return Promise.reject(response.data.message || 'error');
        }
    },

    (error) => {
        Notification({
            type: 'error',
            title: '错误提示',
            message: '系统异常',
        });

        // //console.log('err' + error); // for debug
        /*    store.dispatch("logout").then(() => {
              router.push(`/login`)
             });*/
        return Promise.reject(error);
    }
);

export default service;