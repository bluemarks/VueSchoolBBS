import httpRequest from '@/request/service'

export function  apiMode(param){
    return httpRequest({
        url:"/article/edit",
        method:'post',
        params:{
            param
        }
    })
}
export function  apiPublish(param){
    return httpRequest({
        url:"/article/insert",
        method:'post',
        params:{
            param
        }
    })
}