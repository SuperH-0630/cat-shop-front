import {Result} from "@/utils/request"
import {Wupin} from "@/store/hotwupin";
import {ShopRecord} from "@/api/shoppingbag";

export const testPayPath = "/test/pay"
export const alipay = "alipay"
export const wechat = "wechat"

export const repay = "repay"
export const newpay = "newpay"
export const shoppingbagpay = "shoppingbagpay"

export const type = "type"
export const buyRecordId = "buyRecordId"
export const wupinId = "wupinId"
export const shoprecordId = "shoprecordId"
export const redirect = "redirect"
export const paytype = "paytype"

export interface AliRepayData {
    url: string
}

export interface WechatRepayData {
    url: string
}

export interface AliPayData {
    url: string
}

export interface WechatPayData {
    url: string
}

export interface LocationForUser {
    name: string
    phone: string
    location: string
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const apiPostAliNewPay = (redirectTo: string, wupin: Wupin, num: number, location: LocationForUser): Result<AliPayData> => {
    return Promise.resolve({
        data: {
            code: 0,
            data: {
                url: window.location.origin + testPayPath + `?${type}=` + encodeURIComponent(alipay) + `&${wupinId}=` + encodeURIComponent(wupin.id) + `&${redirect}=` + encodeURIComponent(redirectTo) + `&${paytype}=` + encodeURIComponent(newpay),
            }
        },
        status: 200,
    })
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const apiPostWechatNewPay = (redirectTo: string, wupin: Wupin, num: number, location: LocationForUser): Result<WechatPayData> => {
    return Promise.resolve({
        data: {
            code: 0,
            data: {
                url: window.location.origin + testPayPath + `?${type}=` + encodeURIComponent(wechat) + `&${wupinId}=` + encodeURIComponent(wupin.id) + `&${redirect}=` + encodeURIComponent(redirectTo) + `&${paytype}=` + encodeURIComponent(newpay),
            }
        },
        status: 200,
    })
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const apiPostAliNewPayWithShop = (redirectTo: string, shoprecord: ShopRecord, location: LocationForUser): Result<AliPayData> => {
    return Promise.resolve({
        data: {
            code: 0,
            data: {
                url: window.location.origin + testPayPath + `?${type}=` + encodeURIComponent(alipay) + `&${shoprecordId}=` + encodeURIComponent(shoprecord.id) + `&${redirect}=` + encodeURIComponent(redirectTo) + `&${paytype}=` + encodeURIComponent(shoppingbagpay),
            }
        },
        status: 200,
    })
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const apiPostWechatNewPayWithShop = (redirectTo: string, shoprecord: ShopRecord, location: LocationForUser): Result<WechatPayData> => {
    return Promise.resolve({
        data: {
            code: 0,
            data: {
                url: window.location.origin + testPayPath + `?${type}=` + encodeURIComponent(wechat) + `&${shoprecordId}=` + encodeURIComponent(shoprecord.id) + `&${redirect}=` + encodeURIComponent(redirectTo) + `&${paytype}=` + encodeURIComponent(shoppingbagpay),
            }
        },
        status: 200,
    })
}

export const apiPostAliRepay = (id: number, redirectTo: string): Result<AliRepayData> => {
    return Promise.resolve({
        data: {
            code: 0,
            data: {
                url: window.location.origin + testPayPath + `?${type}=` + encodeURIComponent(alipay) + `&${buyRecordId}=` + encodeURIComponent(id) + `&${redirect}=` + encodeURIComponent(redirectTo) + `&${paytype}=` + encodeURIComponent(repay),
            }
        },
        status: 200,
    })
}

export const apiPostWechatRepay = (id: number, redirectTo: string): Result<WechatRepayData> => {
    return Promise.resolve({
        data: {
            code: 0,
            data: {
                url: window.location.origin + testPayPath + `?${type}=` + encodeURIComponent(wechat) + `&${buyRecordId}=` + encodeURIComponent(id) + `&${redirect}=` + encodeURIComponent(redirectTo) + `&${paytype}=` + encodeURIComponent(repay),
            }
        },
        status: 200,
    })
}