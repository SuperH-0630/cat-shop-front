import {Success} from "@/utils/request"

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const apiAdminPostPeoplePay = (userId: number, buyRecordId: number): Success => {
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