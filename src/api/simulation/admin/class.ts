import {Result, Success} from "@/utils/request";

export interface AdminClassID {
    id: number
}

export interface AdminClassData {
    name: string
    show: boolean
}

export interface AdminClass extends AdminClassID, AdminClassData{ }

type AdminClassLst = {
    total: number
    list: AdminClass[]
}

export interface NewClassData {
    name: string
    show: boolean
}

export function apiAdminGetClass(classId: number): Result<AdminClass> {
    return Promise.resolve({
        data: {
            code: 0,
            data: {
                id: classId,
                name: "分类" + classId,
                show: classId % 2 == 0,
            },
        },
        status: 200,
    })
}

export function apiAdminGetClassLst(page: number, pagesize: number): Result<AdminClassLst> {
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
    const classLst = ref([] as AdminClass[])
    for (let i = (page - 1) * pagesize; i < pagemax; i++) {
        if (classLst.value.length >= pagesize) {
            break
        }

        classLst.value.push({
            id: page * pagesize + i + 1,
            name: "分类" + (page * pagesize + i + 1),
            show: i % 2 == 0,
        })
    }

    return Promise.resolve({
        data: {
            code: 0,
            data: {
                maxpage: pagemax,
                total: classLst.value.length,
                list: classLst.value,
            },
        },
        status: 200,
    })
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const apiAdminPostChangeClassName = (classId: number, name: string): Success => {
    return Promise.resolve({
        data: {
            code: 0,
            data: {
                success: true
            }
        },
        status: 200
    })
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const apiAdminPostChangeClassShow = (classId: number, show: boolean): Success => {
    return Promise.resolve({
        data: {
            code: 0,
            data: {
                success: true
            }
        },
        status: 200
    })
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const apiAdminPostAddClass = (newClass: NewClassData): Success => {
    return Promise.resolve({
        data: {
            code: 0,
            data: {
                success: true
            }
        },
        status: 200
    })
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const apiAdminPostUpdateClass = (classId: number, classData: AdminClassData): Success => {
    return Promise.resolve({
        data: {
            code: 0,
            data: {
                success: true
            }
        },
        status: 200
    })
}

