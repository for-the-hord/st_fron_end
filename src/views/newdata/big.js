/**
 * 账号管理接口
 */

import request from '@/requtest/basic';
import qs from 'qs';




// /api/getFormwork  获取模板
export function getFormwork(data) {
    return request({
        url: `/api/getFormwork`,
        method: 'post',
        data: data
    });
}

// /addFormwork 新增
export function addFormwork(data) {
    return request({
        url: `/api/addFormwork`,
        method: 'post',
        data: data
    });
}
// /delFormwork 删除
export function delFormwork(data) {
    return request({
        url: `/api/delFormwork`,
        method: 'post',
        data: data
    });
}
// /putFormworkItem 修改
export function putFormworkItem(data) {
    return request({
        url: `/api/putFormworkItem`,
        method: 'post',
        data: data
    });
}
// getFormworkItem
export function getFormworkItem(data) {
    return request({
        url: `/api/getFormworkItem`,
        method: 'post',
        data: data
    });
}

// /getEquipmentSearch
export function getEquipmentSearch(data) {
    return request({
        url: `/api/getEquipmentSearch`,
        method: 'post',
        data: data
    });
}



// /getUnitSearch
export function getUnitSearch(data) {
    return request({
        url: `/api/getUnitSearch`,
        method: 'post',
        data: data
    });
}
// /getTemplateSearch
export function getFormworkSearch(data) {
    return request({
        url: `/api/getFormworkSearch`,
        method: 'post',
        data: data
    });
}

// /getDataInfo   获取数据列表
export function getDataInfo(data) {
    return request({
        url: `/api/getDataInfo`,
        method: 'post',
        data: data
    });
}

// /getDataInfoItem

export function getDataInfoItem(data) {
    return request({
        url: `/api/getDataInfoItem`,
        method: 'post',
        data: data
    });
}


// /getUnit 获取单位列表
export function getUnit(data) {
    return request({
        url: `/api/getUnit`,
        method: 'post',
        data: data
    });
}
// /addUnit 新增单位

export function addUnit(data) {
    return request({
        url: `/api/addUnit`,
        method: 'post',
        data: data
    });
}

// /putUnitItem 修改单位
export function putUnitItem(data) {
    return request({
        url: `/api/putUnitItem`,
        method: 'post',
        data: data
    });
}

// /delUnit
export function delUnit(data) {
    return request({
        url: `/api/delUnit`,
        method: 'post',
        data: data
    });
}


// addDataInfo 新增数据
export function addDataInfo(data) {
    return request({
        url: `/api/addDataInfo`,
        method: 'post',
        data: data
    });
}
// /delDataInfo 删除数据
export function delDataInfo(data) {
    return request({
        url: `/api/delDataInfo`,
        method: 'post',
        data: data
    });
}
// /putDataInfo 修改数据
export function putDataInfo(data) {
    return request({
        url: `/api/putDataInfo`,
        method: 'post',
        data: data
    });
}


export function getexcel(data) {
    return request({
        url: `/api/getexcel`,
        method: 'post',
        data: data
    });
}

// /api/agency/
export function new_agency(data) {
    return request({
        url: `/api/agency/`,
        method: 'post',
        data: data
    });
}
export function new_agency2(data) {
    return request({
        url: `/api/agency/`,
        method: 'get',
        // data: data
    });
}

// /api/system/area/?code=100000

export function new_area(data) {
    return request({
        url: `/api/system/area/?code=100000`,
        method: 'get',
    });
}

// export function new_area2(data) {
//     return request({
//         url: `/api/system/area/?code=${data}`,
//         method: 'get',
//     });
// }

// /api/agency/process/

export function new_area2(data) {
    return request({
        url: `/api/system/area/?code=${data}`,
        method: 'get',
    });
}


// /api/agency/process/
export function process(data) {
    return request({
        url: `/api/agency/process/`,
        method: 'post',
        data: data
    });
}

export function process2(data) {
    return request({
        url: `/api/agency/process/`,
        method: 'get',
        params: data
    });
}
// /api/agency/1/
export function getagency(data) {
    return request({
        url: `/api/agency/${data}/`,
        method: 'get',
        // data: data
    });
}

// /api/agency/process/
export function process3(data) {
    return request({
        url: `/api/agency/process/`,
        method: 'put',
        params: data
    });
}


// /api/agency/target/
export function target(data) {
    return request({
        url: `/api/agency/target/`,
        method: 'get',
        params: data
    });
}

// /api/agency/target
export function target2(data) {
    return request({
        url: `/api/agency/target/`,
        method: 'post',
        data: data
    });
}

// /api/agency/target/score/
export function score(data) {
    return request({
        url: `/api/agency/target/score/`,
        method: 'get',
        params: data
    });
}

// /api/agency/process/detail/1/
export function detail(data) {
    return request({
        url: `/api/agency/process/detail/${data}/`,
        method: 'get',
        // params: data
    });
}

// /api/agency/2/
export function dels(data) {
    return request({
        url: `/api/agency/${data}/`,
        method: 'DELETE',
        // params: data
    });
}


// /api/agency/2/
export function puts(data) {
    return request({
        url: `/api/agency/${data}/`,
        method: 'put',
        // params: data
    });
}

// =========================================================
// /api/exam/question/
export function getquestion(data) {
    return request({
        url: `/api/exam/question/`,
        method: 'get',
        params: data
    });
}


// /api/exam/course/

export function getcourse(data) {
    return request({
        url: `/api/exam/course/`,
        method: 'get',
        // params: data
    });
}


// /api/exam/ability/
export function getability(data) {
    return request({
        url: `/api/exam/ability/`,
        method: 'get',
        // params: data
    });
}


// api/exam/question/
export function postquestion(data) {
    return request({
        url: `/api/exam/question/`,
        method: 'post',
        data: data
    });
}

// api/exam/question/
export function putquestion(rowId, data) {
    return request({
        url: `/api/exam/question/` + rowId + '/',
        method: 'put',
        data: data
    });
}


// /api/exam/question/1/
export function deletequestion(data) {
    return request({
        url: `/api/exam/question/${data}/`,
        method: 'DELETE',
        // data: data
    });
}

// 试卷管理接口
// 获取试卷列表
export function paperList(data) {
    return request({
        url: `/api/exam/paper/`,
        method: 'get',
        params: data
    });
}

// 删除试卷
export function paperDelete(rowId) {
    return request({
        url: `/api/exam/paper/${rowId}/`,
        method: 'delete',
        // data: data
    });
}

// 编辑试卷
export function paperEdit(rowId, data) {
    return request({
        url: `/api/exam/paper/${rowId}/`,
        method: 'put',
        data: data
    });
}

// 试卷启用/禁用
export function paperRevoke(rowId, data) {
    return request({
        url: `/api/exam/paper/${rowId}/`,
        method: 'patch',
        data: data
    });
}

// 添加试卷
export function paperCreate(data) {
    return request({
        url: `/api/exam/paper/`,
        method: 'post',
        data: data
    });
}

// 查看试卷题目
export function paperQuestion(rowId, data) {
    return request({
        url: `/api/exam/paper_question/${rowId}/`,
        method: 'get',
        params: data
    });
}

// 提交试卷题目
export function paperQuestion2(rowId, data) {
    return request({
        url: `/api/exam/paper_question/${rowId}/`,
        method: 'put',
        data: data
    });
}


// /api/exam/paper/

export function getpaper() {
    return request({
        url: `/api/exam/paper/`,
        method: 'get',
        // data: data
    });
}
// /api/exam/paper_question/2/

// /api/exam/mine/1/
export function postpaper(data, data2) {
    return request({
        url: `/api/exam/mine/${data}/`,
        method: 'post',
        data: data2
    });
}

// /api/exam/mine/
export function getpapermine() {
    return request({
        url: `/api/exam/mine/`,
        method: 'get',
        // data: data
    });
}

// /api/exam/result/1/
export function getresult(data) {
    return request({
        url: `/api/exam/result/${data}/`,
        method: 'get',
        // data: data
    });
}


// /api/exam/mine/

export function getid(data) {
    return request({
        url: `/api/exam/mine/`,
        method: 'post',
        data: data
    });
}

// /api/exam/mine/1/
export function get_look(data) {
    return request({
        url: `/api/exam/mine/${data}/`,
        method: 'get',
        // data: data
    });
}

// /api/exam/paper_score/2/
// 榜单
export function top_one(data) {
    return request({
        url: `/api/exam/paper_score/${data}/`,
        method: 'get',
        // data: data
    });
}