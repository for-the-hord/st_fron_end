/**
 * 账号管理接口
 */


import request from "@/requtest/basic";
import qs from "qs";
//获取首页统计信息
export function allData(data) {
    return request({
        url: '/api/screen/census/',
        method: 'get',
        // data: data,
        data: (data),
    });
}
//获取词云统计信息 
export function wordCloud(data) {
    return request({
        url: '/api/screen/word/',
        method: 'get',
        data: data,
    });
}
// /api/report/
export function top10(data) {
    return request({
        url: '/api/report/?type=3&page=1&limit=10',
        method: 'get',
        data: data,
    });
}
// /api/search/hot/
export function searchHot(data) {
    return request({
        url: '/api/report/rank/?type='+data,
        method: 'get',
        // data: data,
    });
}