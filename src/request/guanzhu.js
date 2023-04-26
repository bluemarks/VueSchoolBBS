import httpRequest from '@/request/service'


export function apiGuanzhuList() {
    return httpRequest({
        url: "/follow/list",
        method: 'get',
    })

}
export function apiGuanzhu(userId) {
    return httpRequest({
        url: "/add/follow",
        method: 'get',
        params: {
            userId
        }
    })

}
export function apiNoGuanzhu(userId) {
    return httpRequest({
        url: "/cancel/follow",
        method: 'get',
        params: {
            userId
        }
    })

}
export function apiDisLike(param) {
    return httpRequest({
        url: "/dislike",
        method: 'get',
        params: {
            param
        }
    })

}
export function apiLike(param) {
    return httpRequest({
        url: "/like",
        method: 'get',
        params: {
            param
        }
    })

}
export function apiChangArt1(param) {
    return httpRequest({
        url: "/article/can/edit",
        method: 'get',
        params: {
            param
        }
    })

}
export function apiDeleteArt(param) {
    return httpRequest({
        url: "/article/delete"+param,
        method: 'get',
       
    })

}
export function apiInsertArt(param) {
    return httpRequest({
        url: "/insert/comment"+param,
        method: 'get',
       
    })

}
export function apiGetdetail(articleId) {
    return httpRequest({
        url: "/detail/"+articleId,
        method: 'get',
       
    })

}
export function apiGetComment(articleId) {
    return httpRequest({
        url: "/comment/list/",
        method: 'get',
        params:{
            articleId
        }
    })

}
export function apiGetHotPot(param) {
    return httpRequest({
        url: "/article/hotspot",
        method: 'get',
        params: {
            param
        }
    })

}
//notice
export function apiNoticeList(param) {
    return httpRequest({
        url: "/notice/list",
        method: 'get',
        params: {
            param
        }
    })

}
export function apiGetUserInfo(param) {
    return httpRequest({
        url: "/userInfo",
        method: 'get',
        params: {
            param
        }
    })

}
export function apiUpdataImages(param) {
    return httpRequest({
        url: "/update/userInfo",
        method: 'post',
        params: {
            param
        }
    })

}
export function apiGetFansList(param) {
    return httpRequest({
        url: "/fans/list",
        method: 'post',
        params: {
            param
        }
    })

}

export function apiGetRank(param) {
    return httpRequest({
        url: "/TopAchieve",
        method: 'post',
        params: {
            param
        }
    })

}