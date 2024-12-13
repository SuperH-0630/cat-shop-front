import {Wupin} from "@/store/hotwupin"
import {Result} from "@/utils/request"
import wupinPic from "@/assets/images/logo.jpg"

export const BuyRecordStatus = {
    1: "已下单，支付代确认",
    2: "已下单，支付失败",
    3: "待发货",
    4: "已发货",
    5: "已收获",
    6: "已评价",
    7: "已登记退货",
    8: "已退货",
    9: "已取消",
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
