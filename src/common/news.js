/**
 * 账号管理接口
 */


import request from "@/requtest/basic";
import qs from "qs";



// 新闻列表*
export function getNews(data) {
  return request({
    url: '/api/news/',
    method: 'post',
    data: (data),
  });
}


// 词云*
export function getWord(data) {
    return request({
      url: '/api/screen/word/',
      method: 'get',
      data: (data),
    });
  }

// /api/screen/map/  获取地图数据

export function getMap(data) {
    return request({
      url: '/api/screen/map/',
      method: 'get',
      data: (data),
    });
  }