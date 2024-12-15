import {Result} from "@/utils/request";
import wupinPic from "@/assets/images/logo.jpg";
import {Wupin} from "@/store/hotwupin";
import {LocationForUser} from "@/api/pay";

export const AdminBuyRecordStatus = {
    1: "已下单，支付代确认",
    2: "已下单，支付失败",
    3: "待发货",
    4: "已发货",
    5: "已收货",
    6: "已评价",
    7: "申请退货审核中",
    8: "申请退货成功，等待寄回",
    9: "申请退货成功，待收货",
    10: "申请退货失败",
    11: "已退货",
    12: "申请取消订单审核中",
    13: "已取消订单",
} as Object

export interface AdminBuyRecord {
    id: number
    userid: number
    wupinid: number
    classid: number
    num: number
    price: number
    totalPrice: number
    time: number
    fukuantime: number
    fahuotime: number
    shouhuotime: number
    pingjiatime: number
    dengjituihuotime: number
    querentuihuotime: number
    tuohuotime: number
    quxiaotime: number
    status: number
    kuaidi: string
    kuaidinum: string
    backkuaidi: string
    backkuaidinum: string
    isgood: boolean
    user: LocationForUser
    shop: LocationForUser
    wupin: Wupin
}

type AdminBuyRecordLstByPage = {
    maxpage: number
    total: number
    list: AdminBuyRecord[]
}

export function apiAdminGetUserBuyRecordByPage(userId: number, page: number, pagesize: number, status: number): Result<AdminBuyRecordLstByPage> {
    if (page <= 0) {
        return Promise.reject()
    }

    if (pagesize <= 0 || pagesize > 20) {
        return Promise.reject()
    }

    // return request({
    //     url: '/user/buy/record',
    //     method: 'get',
    // })

    const pagemax = 100
    const buyRecordLst = ref([] as AdminBuyRecord[])
    for (let i = (page - 1) * pagesize; i < pagemax; i++) {
        if (buyRecordLst.value.length >= pagesize) {
            break
        }

        buyRecordLst.value.push({
            id: page * pagesize + i + 1,
            userid: userId,
            wupinid: 1,
            classid: 1,
            num: 2,
            price: 5000,
            totalPrice: 9999,
            time: 1734024269,
            fukuantime: 1734024269,
            fahuotime: 1734024269,
            shouhuotime: 1734024269,
            pingjiatime: 1734024269,
            dengjituihuotime: 1734024269,
            querentuihuotime: 1734024269,
            tuohuotime: 1734024269,
            quxiaotime: 1734024269,
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
            user: {
                name: "用户",
                phone: "17322061610",
                location: "广东广州",
                wechat: "1234",
                email: "1234",
                remark: "1234,"
            },
            shop: {
                name: "用户",
                phone: "17322061610",
                location: "广东广州",
                wechat: "1234",
                email: "1234",
                remark: "1234,"
            },
        })
    }

    return Promise.resolve({
        data: {
            code: 0,
            data: {
                maxpage: pagemax,
                total: buyRecordLst.value.length,
                list: buyRecordLst.value,
            },
        },
        status: 200,
    })
}

export function apiAdminGetBuyRecordInfo(id: number, userId: number): Result<AdminBuyRecord> {
    if (id <= 0 || userId <= 0) {
        return Promise.reject()
    }

    return Promise.resolve({
        data: {
            code: 0,
            data: {
                id: id,
                userid: userId,
                wupinid: 1,
                classid: 1,
                num: 2,
                price: 500,
                totalPrice: 9999,
                time: 1734024269,
                fukuantime: 1734024269,
                fahuotime: 1734024269,
                shouhuotime: 1734024269,
                pingjiatime: 1734024269,
                dengjituihuotime: 1734024269,
                querentuihuotime: 1734024269,
                tuohuotime: 1734024269,
                quxiaotime: 1734024269,
                status: 6,
                kuaidi: "顺丰",
                kuaidinum: "SF1234",
                backkuaidi: "中通",
                backkuaidinum: "ZT1234",
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
                    ren: "宋子桓",
                    phone: "17322061610",
                    wechat: "abcd",
                    email: "songzihuan@song-zh.com",
                    location: "广东广州",
                    buytotal: 100,
                    buygood: 90,
                } as Wupin,
                user: {
                    name: "用户",
                    phone: "17322061610",
                    location: "广东广州",
                    wechat: "1234",
                    email: "1234",
                    remark: "1234,"
                } as LocationForUser,
                shop: {
                    name: "用户",
                    phone: "17322061610",
                    location: "广东广州",
                    wechat: "1234",
                    email: "1234",
                    remark: "1234,"
                } as LocationForUser,
            } as AdminBuyRecord,
        },
        status: 200,
    })
}
