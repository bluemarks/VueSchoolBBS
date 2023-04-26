import httpRequest from '@/request/service'

// get请求用params,post请求用data
//导出api方法
// 具体api
// export const  loginApi=data=>{
//     return post({
//         url:"/article/search",
//         data
//     })
// }
export function apionEnterSearch(param) {
    return httpRequest({
        url: "/article/search",
        method: 'get',
        params:{
            param
        } 
    })
}
//index页面
export function apiHasReadNotice() {
    return httpRequest({
        url: "/hasReadNotice",
        method: 'get',
    })

}

export function apiGetData(categoryId) {
    return httpRequest({
        url: "/category/"+categoryId,
        method: 'get',
        
    })

}
