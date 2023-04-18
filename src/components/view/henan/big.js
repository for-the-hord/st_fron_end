/**
 * 账号管理接口
 */

import request from '@/requtest/basic';
import qs from 'qs';

// 实验信息统计
export function indexCensus() {
    return request({
        url: '/api/index/census/',
        method: 'get',
    });
}

// 实验观测资源信息
export function indexResource() {
    return request({
        url: '/api/index/resource//',
        method: 'get',
    });
}

// 实验信息列表
export function indexRange() {
    return request({
        url: '/api/index/range/',
        method: 'get',
    });
}

// 安全评分信息
export function indexSecurity() {
    return request({
        url: '/api/index/security/',
        method: 'get',
    });
}

// 卫星互联网新闻榜单
export function indexSpider() {
    return request({
        url: '/api/index/spider/',
        method: 'get',
    });
}

// 镜像使用top榜单
export function indexImage() {
    return request({
        url: '/api/index/image/',
        method: 'get',
    });
}

// 卫星互联完科技挑战，1-应用，2-安全，3-趋势
export function indexChallenge(data) {
    return request({
        url: '/api/index/challenge/' + data + '/',
        method: 'get',
    });
}

// /api/index/agency/1/
export function agency(data) {
    return request({
        url: '/api/index/agency/1/',
        method: 'get',
    });
}

// /api/index/agency/2/

export function agency2(data) {
    return request({
        url: '/api/index/agency/2/',
        method: 'get',
    });
}

// /api/index/agency/3/
export function agency3(data) {
    return request({
        url: '/api/index/agency/3/',
        method: 'get',
    });
}

// /api/index/exam/1/
export function exam1(data) {
    return request({
        url: '/api/index/exam/1/',
        method: 'get',
    });
}

export function exam2(data) {
    return request({
        url: '/api/index/exam/2/',
        method: 'get',
    });
}

// /api/index/exam/3/?type=2&paper_id=1

export function exam3(data) {
    return request({
        url: '/api/index/exam/3/?type=2&paper_id=1',
        method: 'get',
    });
}

// /api/index/exam/3/?type=1
export function selects(data) {
    return request({
        url: '/api/index/exam/3/?type=1',
        method: 'get',
    });
}

// /api/index/exam/3/?type=2&paper_id=1

export function selects2(data) {
    return request({
        url: `/api/index/exam/3/?type=2&paper_id=${data}`,
        method: 'get',
    });
}


// /api/index/map/
export function new_map(data) {
    return request({
        url: `/api/index/map/`,
        method: 'get',
    });
}