import {Result, Success} from "@/utils/request"

export interface XieyiData {
    xieyi: string
}

export const apiAdminGetXieyi = (): Result<XieyiData> => {
    return Promise.resolve({
        data: {
            code: 0,
            data: {
                xieyi: `<p> 这是一份协议 </p>`,
            },
        },
        status: 200,
    })
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const apiAdminPostUpdateXieyi = (xieyi: string): Success => {
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
