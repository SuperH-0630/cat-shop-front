import {Result, Success} from "@/utils/request"
import {AdminUserBase, AdminUserWithoutPre} from "@/store/admin/user"

export function apiAdminGetUserInfo(id: number): Result<AdminUserWithoutPre> {
    return Promise.resolve({
        data: {
            code: 0,
            data: {
                id: id,
                wechat: "xxx",
                email: "hhh",
                status: 1,
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
            } as AdminUserWithoutPre
        },
        status: 200,
    })
}

type AdminUserLst = {
    maxpage: number
    total: number
    list: AdminUserWithoutPre[]
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function apiAdminGetUserLst(page: number, pagesize: number, phone?: string, name?: string, status?: number): Result<AdminUserLst> {
    if (page <= 0) {
        return Promise.reject()
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    phone = phone || ""
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    name = name || ""
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    status = status || 0

    if (pagesize <= 0 || pagesize > 20) {
        return Promise.reject()
    }

    // return request({
    //     url: '/user/buy/record',
    //     method: 'get',
    // })

    const pagemax = 121
    const userLst = ref([] as AdminUserWithoutPre[])
    for (let i = (page - 1) * pagesize; i < pagemax; i++) {
        if (userLst.value.length >= pagesize) {
            break
        }

        userLst.value.push({
            id: page * pagesize + i + 1,
            wechat: "xxx",
            email: "hhh",
            status: 1,
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
        } as AdminUserWithoutPre)
    }

    return Promise.resolve({
        data: {
            code: 0,
            data: {
                maxpage: pagemax,
                total: userLst.value.length,
                list: userLst.value,
            },
        },
        status: 200,
    })
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function apiAdminPostUpdateAvatarData(userId: number, avatar: Blob): Success {
    return Promise.resolve({
        data: {
            code: 0,
            data: {
                success: true,
            },
        },
        status: 200,
    })
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function apiAdminPostUpdateSelfInfo(userId: number, data: AdminUserBase): Success {
    return Promise.resolve({
        data: {
            code: 0,
            data: {
                success: true,
            },
        },
        status: 200,
    })
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function apiAdminPostUpdateSelfPassword(userId: number, newPasswordHash: string): Success {
    return Promise.resolve({
        data: {
            code: 0,
            data: {
                success: true,
            },
        },
        status: 200,
    })
}