/**
 * 账号管理接口
 */

import request from '@/requtest/basic';
import qs from 'qs';

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

// 编辑机构
export function editAgency(data, agencyId) {
    return request({
      url: `/api/agency/${agencyId}/`,
      method: 'put',
      data: data
    });
  }