/**
 * 账号管理接口
 */


 import request from "@/requtest/basic";
 import qs from "qs";

 //正常搜索接口/api/search/
 export function searchs(data) {
   return request({
     url: '/api/report/search/',
     method: 'post',
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

 // /api/report/详情
 export function top10(data) {
   return request({
     url: '/api/report/' + (data) + "/",
     method: 'get',
     // params: data,
   });
 }

 // /api/report/详情
 // 更新后的接口
 export function pdfDown(data) {
   return request({
     // /api/report/pdf/?article_id
     url: '/api/report/pdf/?article_id=' + (data),
     method: 'get',
     responseType: "blob",
     // params: data,
   });
 }


 //获取专有名词信息
 export function specialword(data) {
   return request({
     url: '/api/system/lexicon/search/?name=' + data,
     method: 'get',
     // data: data,
   });
 }

 // 相关链接  搜索详情部分
 export function contactLink(data) {
   return request({
     url: '/api/system/lexicon/?name=' + data + '/',
     method: 'get',
     // data: data,
   });
 }

 //  攻击组织详情 搜索详情部分
 export function grouplink(data) {
   return request({
     url: '/api/org/' + data + "/",
     method: 'get',
     data: data,
   });
 }

 // /api/report/relate/?report_id=1  搜索详情关联情报 拓扑图下面

 export function tuopuxialink(data) {
   return request({
     url: '/api/report/relate/?report_id=' + data,
     method: 'get',
     // data: data,
   });
 }

 // /api/org/1/  威胁组织 轮播图
 export function Threatgroups(data) {
   return request({
     url: '/api/org/',
     method: 'post',
     data: data,
   });
 }


 // /api/position/census/  情报阵地
 export function newsposition(data) {
   return request({
     url: '/api/position/census/',
     method: 'get',
     data: data,
   });
 }

 // /api/position/?priority=1&location_type=3  情报阵地弹框
 // &page=' + data + '&limit=10'
 export function areaposition(data, data2, data3) {
   return request({
     url: '/api/position/?level=' + data + '&location_type=' + data2 + '&page=' + data3 + '&limit=10',
     method: 'get',
     // data: data,\
   });
 }

 // 三个列表   level  abc
 export function areaposition2(data, data3) {
   return request({
     url: '/api/position/?level=' + data + '&page=' + data3 + '&limit=10',
     method: 'get',
     // data: data,\
   });
 }

 export function areaposition3(data, data2, data3) {
   return request({
     url: '/api/position/?level=' + data + '&page=' + data2 + '&limit=10' + '&name=' + data3,
     method: 'get',
     // data: data,\
   });
 }


 //阵地跳转列表/api/search/
 export function searchs2(data) {
   return request({
     url: '/api/report/',
     method: 'get',
     params: (data),
   });
 }

 // /api/position/1/
 export function searchs3(data) {
   return request({
     url: '/api/position/' + data + '/',
     method: 'get',
     // params: (data),
   });
 }

 // /api/position/1/
 export function putposition(data, data2) {
   return request({
     url: '/api/position/' + data + '/',
     method: 'put',
     data: (data2),
   });
 }

 // /api/org/1/
 export function orgsearch(data) {
   return request({
     url: '/api/org/' + data + '/',
     method: 'get',
     // params: (data),
   });
 }

 // api、report、type=4、key=201005
 export function searchs4(data) {
   return request({
     url: '/api/report/?type=4',
     method: 'get',
     // params: (data),
   });
 }

 // api/report/?type=3&page=1&limit=10
 export function searchs5(data) {
   return request({
     url: 'api/report/?type=4&page=1&limit=10&key=' + data,
     method: 'get',
     // params: (data),
   });
 }

 export function searchs6(data) {
   return request({
     url: 'api/report/?type=4&page=1&limit=10',
     method: 'get',
     // params: (data),
   });
 }

 // 滚动
 export function searchs7(data) {
   return request({
     url: 'api/report/?type=4&page=' + data + '&limit=10',
     method: 'get',
     // params: (data),
   });
 }

 // 滚动具体月份
 export function searchs8(data, data2) {
   return request({
     url: 'api/report/?type=4&page=' + data + '&limit=10&key=' + data2,
     method: 'get',
     // params: (data),
   });
 }

 export function orgid(data) {
   return request({
     url: 'api/org/' + data + "/",
     method: 'get',
     // params: (data),
   });
 }

 // /api/report/census/?report_id=1  情报详情饼图

 export function census(data) {
   return request({
     url: '/api/report/census/?report_id=' + data,
     method: 'get',
     // params: (data),
   });
 }

 // /api/screen/map/

 export function mapsA(data) {
   return request({
     url: '/api/screen/map/',
     method: 'get',
     // params: (data),
   });
 }

 // /api/service/

 export function serviceA(data) {
   return request({
     url: '/api/service/',
     method: 'get',
     // params: (data),
   });
 }

 export function serviceB(data) {
   return request({
     url: '/api/service/?service_id=' + data,
     method: 'get',
     // params: (data),
   });
 }

 export function serviceC(data, data2) {
   return request({
     url: '/api/service/' + data + "/",
     method: 'put',
     data: (data2),
   });
 }

 export function serviceD(data) {
   return request({
     url: '/api/service/' + data + "/",
     method: 'DELETE',
     // data: (data2),
   });
 }

 export function serviceE(data) {
   return request({
     url: '/api/service/',
     method: 'post',
     data: (data),
   });
 }

 // /api/asset/
 export function assetA(data) {
   return request({
     url: '/api/asset/',
     method: 'get',
     // params: (data),
   });
 }

 export function assetB(data) {
   return request({
     url: '/api/asset/',
     method: 'post',
     data: (data),
   });
 }


 // 阵地下情报列表

 export function positionA(data) {
   return request({
     url: '/api/report/?type=2&key=' + data,
     method: 'get',
     // params: (data),
   });
 }

 // http://127.0.0.1:80/api/report/date/
 export function timeline(data) {
   return request({
     url: '/api/report/date/',
     method: 'get',
     // params: (data),
   });
 }


 //  数据全部的下拉框
 export function selectAll(data) {
   return request({
     url: '/api/position/?page=1&limit=400',
     method: 'get',
     // params: (data),
   });
 }

 //  搜索列表的数据全部的下拉框
 export function selectAll2(data) {
   return request({
     url: '/api/position/?page=1&limit=400&abroad=' + data,
     method: 'get',
     // params: (data),
   });
 }

 //  情报订阅列表

 // /api/subscribe/info/ 单个详情订阅
 export function subscribe1(data) {
   return request({
     url: '/api/subscribe/info/',
     method: 'get',
     // params: (data),
   });
 }

 // /api/subscribe/info/ 订阅列表
 export function subscribe2(data, data2) {
   return request({
     url: 'api/subscribe/?page=' + data + '&limit=' + data2,
     method: 'get',
     // params: (data),
   });
 }

 // /api/subscribe/info/ 订阅列表
 export function subscribe5(data, data2, data3) {
   return request({
     url: 'api/subscribe/?page=' + data + '&limit=' + data2 + '&keyword=' + data3,
     method: 'get',
     // params: (data),
   });
 }

 // /api/subscribe/  新增订阅
 export function subscribe3(data) {
   return request({
     url: 'api/subscribe/',
     method: 'post',
     data: (data),
   });
 }


 // /api/subscribe/  新增订阅
 export function subscribe4(data) {
   return request({
     url: 'api/subscribe/',
     method: 'post',
     data: (data),
   });
 }


 export function permit(data) {
   return request({
     url: 'api/system/permit/',
     method: 'post',
     data: (data),
   });
 }


 export function assetList(data, data2, data3) {
   return request({
     url: '/api/report/?type=4&key=' + data + '&limit=' + data2 + '&page=' + data3,
     // url: 'api/subscribe/?page=' + data + '&limit=' + data2,
     method: 'get',
     // params: (data),
   });
 }

 export function assetList2(data, data2, data3) {
   return request({
     url: '/api/report/?type=5&key=' + data + '&limit=' + data2 + '&page=' + data3,
     // url: 'api/subscribe/?page=' + data + '&limit=' + data2,
     method: 'get',
     // params: (data),
   });
 }

 // http://172.16.12.176:9007/api/report/census/

 //搜索列表 五大图表数据
 export function getFiveData(data) {
   return request({
     url: '/api/report/census/1/',
     method: 'post',
     data: (data),
   });
 }


 //资产列表 五大图表数据
 export function getFiveDataAsset(data) {
   return request({
     url: '/api/report/census/2/',
     method: 'post',
     data: (data),
   });
 }


 //资产列表 五大图表数据
 export function getFiveDataService(data) {
   return request({
     url: '/api/report/census/3/',
     method: 'post',
     data: (data),
   });
 }


 //订阅列表 五大图表数据
 export function getFiveDataSub(data) {
   return request({
     url: '/api/report/census/4/',
     method: 'post',
     data: (data),
   });
 }


 // http://127.0.0.1:8007/api/report/census/6/

 //详情页面 图表数据
 export function getXiangData(data) {
   return request({
     url: '/api/report/census/' + data + '/',
     method: 'get',
     // data: (data),/
   });
 }


 // http://127.0.0.1:8007/api/report/census/5875/
 // http://127.0.0.1:8001/api/report/forecast/176/

 //详情页面  预测数据
 export function getForecast(data) {
   return request({
     url: '/api/report/forecast/' + data + '/',
     method: 'get',
   });
 }

 // 情报分析台接口
 export function getAnalysis(data) {
   return request({
     url: '/api/analysis/trend/',
     method: 'post',
     data: (data)
   });
 }


 export function getAnalysisArea(data, data2) {

     if (data2) {
         return request({
             url: '/api/threat/area/?page=' + data + "&limit=40&name=" + data2,
             method: 'get',
             // data: (data),
         });
     } else {
         return request({
             url: '/api/threat/area/?page=' + data + "&limit=40",
             method: 'get',
             // data: (data),
         });
     }
 }


 export function getAnalysisOrg(data, data2) {

     if (data2) {
         return request({
             url: '/api/threat/org/?page=' + data + "&limit=40&name=" + data2,
             method: 'get',
             // data: (data),
         });
     } else {
         return request({
             url: '/api/threat/org/?page=' + data + "&limit=40",
             method: 'get',
             // data: (data),
         });
     }
 }

 export function getAnalysisMethod(data, data2) {

     if (data2) {
         return request({
             url: '/api/threat/method/?page=' + data + "&limit=40&name=" + data2,
             method: 'get',
             // data: (data),
         });
     } else {
         return request({
             url: '/api/threat/method/?page=' + data + "&limit=40",
             method: 'get',
             // data: (data),
         });
     }
 }

 export function getAnalysisIndustry(data, data2) {

     if (data2) {
         return request({
             url: '/api/threat/industry/?page=' + data + "&limit=40&name=" + data2,
             method: 'get',
             // data: (data),
         });
     } else {
         return request({
             url: '/api/threat/industry/?page=' + data + "&limit=40",
             method: 'get',
             // data: (data),
         });
     }
 }




 export function getAnalysisLeak(data, data2) {

     if (data2) {
         return request({
             url: '/api/threat/leak/?page=' + data + "&limit=40&name=" + data2,
             method: 'get',
             // data: (data),
         });
     } else {
         return request({
             url: '/api/threat/leak/?page=' + data + "&limit=40",
             method: 'get',
             // data: (data),
         });
     }
 }


 export function getAnalysisMalware(data, data2) {

     if (data2) {
         return request({
             url: '/api/threat/malware/?page=' + data + "&limit=40&name=" + data2,
             method: 'get',
             // data: (data),
         });
     } else {
         return request({
             url: '/api/threat/malware/?page=' + data + "&limit=40",
             method: 'get',
             // data: (data),
         });
     }
 }



 export function postOrg(data) {
   return request({
     url: '/api/analysis/org/',
     method: 'post',
     data: (data)
   });
 }

 export function postArea(data) {
   return request({
     url: '/api/analysis/area/',
     method: 'post',
     data: (data)
   });
 }
