import httpRequest from '@/request/service'


export function apiGetCheckPass(userId) {
    return httpRequest({
        url: "/login/sendSMSCode",
        method: 'get',
        params: {userId}
    })
}

export function apiSubmitForm(userId, code) {
    return httpRequest({
        url: "/login/verifyLoginInfo",
        method: 'get',
        params: {
            userId,
            code
        }
    })
}

export function apiSubmitFormPass(userId, password) {
    return httpRequest({
        url: "/login/loginPassword",
        method: 'get',
        params:{
            userId,
            password
        } 
    })
}

export function apiRegisteSubmitForm(userId) {
    return httpRequest({
        url: "/register/sendSMSCode?",
        method: 'get',
        params: {
          userId
        }
    })
}
export function apiRegisteGetCheckPass(userId, password, code) {
    return httpRequest({
        url: "/register/verifyRegisterInfo",
        method: 'get',
        params:{
            userId:userId,
            password:password,
            code:code

        } 
    })
}

