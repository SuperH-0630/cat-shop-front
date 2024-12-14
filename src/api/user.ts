import {Result, Success} from "@/utils/request"
import {UserBase} from "@/store/user";

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

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function updateData(data: UserBase): Success {
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
export function updateAvatarData(avatar: Blob): Success {
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
