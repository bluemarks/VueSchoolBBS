import httpRequest from '@/request/service'


export function apigetJobData(categoryId) {
    return httpRequest({
        url: "/category/"+categoryId,
        method: 'get',
        
    })

}
