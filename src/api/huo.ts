import {Success} from "@/utils/request"

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const apiPostGouWuDaoHuo = (buyRecordId: number): Success => {
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
export const apiPostGouWuPingJia = (buyRecordId: number, isGood: boolean = true): Success => {
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
export const apiPostTuiHuoShenQing = (buyRecordId: number, name: string, phone: string, reason: string): Success => {
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
export const apiPostTuiHuoDengJi = (buyRecordId: number, kuaidi: string, danhao: string): Success => {
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
export const apiPostFaHuoQuXiaoDengJi = (buyRecordId: number): Success => {
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
