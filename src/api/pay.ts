import {Result} from "@/utils/request"

export const testPayPath = "/test/pay"
export const alipay = "alipay"
export const wechat = "wechat"

export const type = "type"
export const buyRecordId = "buyRecordId"
export const redirect = "redirect"

export interface AliRepayData {
    url: string
}

export const aliRepay = (id: number, redirectTo: string): Result<AliRepayData> => {
    return Promise.resolve({
        data: {
            code: 0,
            data: {
                url: window.location.origin + testPayPath + `?${type}=` + encodeURIComponent(alipay) + `&${buyRecordId}=` + encodeURIComponent(id) + `&${redirect}=` + encodeURIComponent(redirectTo),
            }
        },
        status: 200,
    })
}

export const wechatRepay = (id: number, redirectTo: string): Result<AliRepayData> => {
    return Promise.resolve({
        data: {
            code: 0,
            data: {
                url: window.location.origin + testPayPath + `?${type}=` + encodeURIComponent(wechat) + `&${buyRecordId}=` + encodeURIComponent(id) + `&${redirect}=` + encodeURIComponent(redirectTo),
            }
        },
        status: 200,
    })
}