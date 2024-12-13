import {Wupin} from "@/store/hotwupin"
import {Result} from "@/utils/request"
import wupinPic from "@/assets/images/logo.jpg"

export const BuyRecordStatus = {
    1: "已下单，支付代确认",
    2: "已下单，支付失败",
    3: "待发货",
    4: "已发货",
    5: "已收货",
    6: "已评价",
    7: "申请退货",
    8: "申请退货成功，等待寄回",
    9: "申请退货失败",
    10: "已退货",
    11: "已取消",
} as Object

export interface BuyRecord {
    id: number
    userid: number
    wupinid: number
    classid: number
    num: number
    price: number
    time: number
    fukuantime: number
    fahuotime: number
    shouhuotime: number
    pingjiatime: number
    dengjituihuotime: number
    querentuihuotime: number
    tuohuotime: number
    status: number
    kuaidi: string
    kuaidinum: string
    backkuaidi: string
    backkuaidinum: string
    isgood: boolean
    wupin: Wupin
}

type BuyRecordLst = {
    total: number
    list: BuyRecord[]
}

export function getUserBuyRecord(offset: number, limit: number): Result<BuyRecordLst> {
    if (limit > 100) {
        limit = 100
    }
    // return request({
    //     url: '/user/buy/record',
    //     method: 'get',
    // })

    if (offset > 10000) {
        return Promise.resolve({
            data: {
                code: 0,
                data: {
                    total: 0,
                    list: [],
                },
            },
            status: 200,
        })
    }

    const buyRecordLst = [] as BuyRecord[]
    for (let i = 0; i < limit; i++) {
        buyRecordLst.push({
            id: offset + i + 1,
            userid: 1,
            wupinid: 1,
            classid: 1,
            num: 2,
            price: 9999,
            time: 1734024269,
            fukuantime: 1734024269,
            fahuotime: 1734024269,
            shouhuotime: 1734024269,
            pingjiatime: 1734024269,
            dengjituihuotime: 1734024269,
            querentuihuotime: 1734024269,
            tuohuotime: 1734024269,
            status: 6,
            kuaidi: "顺丰",
            kuaidinum: "SF1234",
            backkuaidi: "",
            backkuaidinum: "",
            isgood: true,
            wupin: {
                id: 1,
                name: "物品",
                pic: wupinPic,
                classid: 1,
                classOf: {
                    id: 1,
                    name: "分类1",
                },
                tag: "火爆",
                hotPrice: 9999,
                realPrice: 19999,
                info: "hhhhhh",
                ren: "小超市",
                phone: "17322061610",
                email: "songzihuan@song-zh.com",
                location: "广东广州",
                buytotal: 100,
                buygood: 90,
            },
        })
    }

    return Promise.resolve({
        data: {
            code: 0,
            data: {
                total: limit,
                list: buyRecordLst,
            },
        },
        status: 200,
    })
}

export function getBuyRecordData(id: number): Result<BuyRecord> {
    if (id <= 0) {
        return Promise.reject()
    }

    return Promise.resolve({
        data: {
            code: 0,
            data: {
                id: id,
                userid: 1,
                wupinid: 1,
                classid: 1,
                num: 2,
                price: 9999,
                time: 1734024269,
                fukuantime: 1734024269,
                fahuotime: 1734024269,
                shouhuotime: 1734024269,
                pingjiatime: 1734024269,
                dengjituihuotime: 1734024269,
                querentuihuotime: 1734024269,
                tuohuotime: 1734024269,
                status: 6,
                kuaidi: "顺丰",
                kuaidinum: "SF1234",
                backkuaidi: "",
                backkuaidinum: "",
                isgood: true,
                wupin: {
                    id: 1,
                    name: "物品",
                    pic: wupinPic,
                    classid: 1,
                    classOf: {
                        id: 1,
                        name: "分类1",
                    },
                    tag: "火爆",
                    hotPrice: 9999,
                    realPrice: 19999,
                    info: "hhhhhh",
                    phone: "17322061610",
                    email: "songzihuan@song-zh.com",
                    location: "广东广州",
                    buytotal: 100,
                    buygood: 90,
                },
            },
        },
        status: 200,
    })
}

type BuyRecordLstByPage = {
    maxpage: number
    pagesize: number
    total: number
    list: BuyRecord[]
}

export function getUserBuyRecordByPage(page: number, pageize: number, status:number): Result<BuyRecordLstByPage> {
    if (page <= 0) {
        return Promise.reject()
    }

    if (pageize <= 0 || pageize > 20) {
        return Promise.reject()
    }

    // return request({
    //     url: '/user/buy/record',
    //     method: 'get',
    // })

    if (status == 9) {
        return Promise.resolve({
            data: {
                code: 0,
                data: {
                    maxpage: 0,
                    pageize: 0,
                    total: 0,
                    list: [],
                },
            },
            status: 200,
        })
    }

    if (page > 10) {
        return Promise.resolve({
            data: {
                code: 0,
                data: {
                    maxpage: 0,
                    pageize: 20,
                    total: 0,
                    list: [],
                },
            },
            status: 200,
        })
    }

    const buyRecordLst = [] as BuyRecord[]
    for (let i = 0; i < pageize; i++) {
        buyRecordLst.push({
            id: page * pageize + i + 1,
            userid: 1,
            wupinid: 1,
            classid: 1,
            num: 2,
            price: 9999,
            time: 1734024269,
            fukuantime: 1734024269,
            fahuotime: 1734024269,
            shouhuotime: 1734024269,
            pingjiatime: 1734024269,
            dengjituihuotime: 1734024269,
            querentuihuotime: 1734024269,
            tuohuotime: 1734024269,
            status: status,
            kuaidi: "顺丰",
            kuaidinum: "SF1234",
            backkuaidi: "",
            backkuaidinum: "",
            isgood: true,
            wupin: {
                id: 1,
                name: `物品-${page}-${i}`,
                pic: wupinPic,
                classid: 1,
                classOf: {
                    id: 1,
                    name: "分类1",
                },
                tag: "火爆",
                hotPrice: 9999,
                realPrice: 19999,
                info: "hhhhhh",
                ren: "小超市",
                phone: "17322061610",
                email: "songzihuan@song-zh.com",
                location: "广东广州",
                buytotal: 100,
                buygood: 90,
            },
        })
    }

    return Promise.resolve({
        data: {
            code: 0,
            data: {
                maxpage: 20,
                pagesize: pageize,
                total: buyRecordLst.length,
                list: buyRecordLst,
            },
        },
        status: 200,
    })
}

export interface ShopRecord {
    id: number
    userid: number
    wupinid: number
    classid: number
    num: number
    price: number
    time: number
    wupin: Wupin
}

type ShopRecordLst = {
    total: number
    list: ShopRecord[]
}

export function getUserShoppingRecord(offset: number, limit: number): Result<ShopRecordLst> {
    if (limit > 100) {
        limit = 100
    }
    // return request({
    //     url: '/user/buy/record',
    //     method: 'get',
    // })

    if (offset > 10000) {
        return Promise.resolve({
            data: {
                code: 0,
                data: {
                    total: 0,
                    list: [],
                },
            },
            status: 200,
        })
    }

    const shopRecordLst = [] as ShopRecord[]
    for (let i = 0; i < limit; i++) {
        shopRecordLst.push({
            id: offset + i + 1,
            userid: 1,
            wupinid: 1,
            classid: 1,
            num: 2,
            price: 9999,
            time: 1734024269,
            wupin: {
                id: 1,
                name: "物品",
                pic: wupinPic,
                classid: 1,
                classOf: {
                    id: 1,
                    name: "分类1",
                },
                tag: "火爆",
                hotPrice: 9999,
                realPrice: 19999,
                info: "hhhhhh",
                ren: "小超市",
                phone: "17322061610",
                email: "songzihuan@song-zh.com",
                location: "广东广州",
                buytotal: 100,
                buygood: 90,
            },
        })
    }

    return Promise.resolve({
        data: {
            code: 0,
            data: {
                total: limit,
                list: shopRecordLst,
            },
        },
        status: 200,
    })
}

export interface LoginResult {
    autiregister?: boolean,
    xtoken: string
    success: boolean
}

export function loginGetXToken(phone: string, password: string): Result<LoginResult> {
    if (phone.startsWith("1732206") || password.length >= 10) {
        return Promise.resolve({
            data: {
                code: 0,
                data: {
                    autiregister: false,
                    xtoken: "123456" + phone + password,
                    success: true,
                },
            },
            status: 200,
        })
    }

    return Promise.resolve({
        data: {
            code: 0,
            data: {
                xtoken: "",
                success: false,
            },
        },
        status: 200,
    })
}

export function registerGetXToken(phone: string, password: string): Result<LoginResult> {
    return Promise.resolve({
        data: {
            code: 0,
            data: {
                autiregister: false,
                xtoken: "123456" + phone + password,
                success: true,
            },
        },
        status: 200,
    })
}

export interface UserData {
    name: string
    type: number
    avatar: string
    phone: string
    location: string
    xtoken: string
    totalPrice: number
    totalBuy: number
    totalGood: number
    totalJian: number
    totalShouHuo: number
}

export function getSelfInfo(): Result<UserData> {
    return Promise.resolve({
        data: {
            code: 0,
            data: {
                name: "",
                type: 3,
                avatar: "",
                phone: "17322061610",
                location: "广东广州",
                xtoken: "123456",
                totalPrice: 100000,
                totalBuy: 30,
                totalGood: 20,
                totalJian: 45,
                totalShouHuo: 25,
            } as UserData
        },
        status: 200,
    })
}
