import {Wupin} from "@/store/hotwupin";
import {Result, Success} from "@/utils/request";
import wupinPic from "@/assets/images/logo.jpg";

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

export function apiGetUserShoppingRecord(offset: number, limit: number): Result<ShopRecordLst> {
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

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const apiPostAddToShoppingBag = (wupinId: number, num: number): Success => {
    return Promise.resolve({
        data: {
            data: {
                success: true,
            },
            code: 0,
        },
        status: 200,
    })
}
