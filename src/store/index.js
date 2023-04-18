import Vue from 'vue'
import Vuex from 'vuex'

import d2admin from './modules/d2admin'
import { getToken, removeToken } from "@/plugin/utils/auth";
import { login, getMenu } from "@/common/login.js";

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        d2admin
    },
    // actions: {
    //     //    lds 登录部分 *****************************
    //     async LoginByUsername({ commit }, userInfo) {
    //         return new Promise((resolve, reject) => {
    //             login(userInfo)
    //                 .then((res) => {
    //                     console.log(res, 'response')
    //                     const data = res.data;
    //                     // Cookies.set("token", data.token, {
    //                     //     expires: 7,
    //                     // }); //登录成功后将token存储在cookie之中   response.data.token
    //                     sessionStorage.setItem("token", data.token);
    //                     commit("SET_TOKEN", data.token); //data.token
    //                     commit("SET_NAME", data.nickname);
    //                     resolve(res);
    //                 })
    //                 .catch((error) => {
    //                     reject(error);
    //                 });
    //         });
    //     },
    //     //    lds 登录部分 *****************************
    // }
})
