import {isMobile} from "@/utils/str"
import useConfigStore from "@/store/config"
import {sha256} from "@/utils/encrypt"
import {
    apiGetSelfInfo,
    apiPostLoginGetXToken,
    apiPostRegisterGetXToken,
    apiPostUpdateAvatarData,
    apiPostUpdateSelfInfo,
    apiPostUpdateSelfPassword
} from "@/api/user"

export const UserType = {
    1: "",//无显示
    2: "管理员",
    3: "根管理员",
}

export interface UserBase {
    name: string
    wechat: string,
    email: string,
    location: string
}

export interface UserAvatar {
    avatar: string
}

export interface UserWithoutPre extends UserBase, UserAvatar{
    type: number
    phone: string
    totalPrice: number
    totalBuy: number
    totalGood: number
    totalJian: number
    totalShouHuo: number
}

export interface UserPre {
    goodPre: number
    pricePre: number
}

export interface User extends UserWithoutPre, UserPre {}

export const getXtoken = (): string => (localStorage.getItem("xtoken") || "")
export const delXtoken = (): void => {
    localStorage.removeItem("xtoken")
}
export const setXtoken = (token: string): string => {
    localStorage.setItem("xtoken", token)
    return getXtoken()
}
export const isLogin = () => getXtoken().length > 0
export const hasLoad = () => {
    const userStore = useUserStore()
    return typeof userStore.user === "object" && Object.keys(userStore.user).length > 0
}

const useUserStore = defineStore("userStore", () => {
    const user = ref({} as User)

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const login = async (phone1: string, password: string) => {
        const configStore = useConfigStore()

        if (isLogin()) {
            return Promise.reject("已登录")
        }

        if (!isMobile(phone1)) {
            return Promise.reject("手机号格式错误")
        }

        if (password.length < 8) {
            return Promise.reject()
        }

        const passwordHash = await sha256((`${configStore.config?.passwordfronthash}::${password}>>`))

        apiPostLoginGetXToken(phone1, passwordHash).then((res) => {
            if (!res.data.data.xtoken || !res.data.data.success) {
                return Promise.reject("登录失败")
            }

            setXtoken(res.data.data.xtoken)
            return updateInfo()
        }).catch(() => {
            return Promise.reject("登录失败")
        })
    }

    const logout = () => {
        user.value = {} as User
        delXtoken()
    }

    const editData = async (data: UserBase) => {
        if (!isLogin()) {
            return Promise.reject("未登录")
        }

        return apiPostUpdateSelfInfo(data).then((res) => {
            if (!res.data.data.success) {
                return Promise.reject("更新失败")
            }
            return updateInfo()
        })
    }

    const editPassword = async (data: { oldPassword: string, newPassword: string; newPasswordDouble: string }) => {
        if (!isLogin()) {
            return Promise.reject("未登录")
        }

        const configStore = useConfigStore()
        const oldP = await sha256((`${configStore.config?.passwordfronthash}::${data.oldPassword}>>`))
        const newP = await sha256((`${configStore.config?.passwordfronthash}::${data.newPassword}>>`))

        return apiPostUpdateSelfPassword(oldP, newP).then((res) => {
            if (!res.data.data.success) {
                return Promise.reject("更新失败")
            }
            return logout()
        })
    }

    const editAvatar = async (avatar: Blob) => {
        if (!isLogin()) {
            return Promise.reject("未登录")
        }

        return apiPostUpdateAvatarData(avatar).then((res) => {
            if (!res.data.data.success) {
                return Promise.reject("更新失败")
            }
            return updateInfo()
        })
    }

    const register = async (phone1: string, password: string) => {
        const configStore = useConfigStore()

        if (isLogin()) {
            return Promise.reject("已登录")
        }

        if (!isMobile(phone1)) {
            return Promise.reject("手机号格式错误")
        }

        if (password.length < 8) {
            return Promise.reject()
        }

        const passwordHash = await sha256((`${configStore.config?.passwordfronthash}::${password}>>`))

        apiPostRegisterGetXToken(phone1, passwordHash).then((res) => {
            if (!res.data.data.xtoken || !res.data.data.success) {
                return Promise.reject("注册失败")
            }

            setXtoken(res.data.data.xtoken)
            return updateInfo()
        }).catch(() => {
            return Promise.reject("注册失败")
        })
    }

    async function updateInfo() {
        if (!isLogin()) {
            return Promise.reject("未登录")
        }

        const configStore = useConfigStore()
        return apiGetSelfInfo().then((res) => {
            user.value = res.data.data
            user.value.goodPre = (user.value.totalGood / user.value.totalShouHuo) * 100
            user.value.pricePre = user.value.totalPrice / user.value.totalBuy
        }).then(() => {
            if (!user.value.name) {
                user.value.name = "新用户"
            }

            if (!user.value.avatar) {
                user.value.avatar = configStore.config?.avatar
            }

            if (!Object.keys(UserType).some((v) => Number(v).valueOf() === user.value.type)) {
                user.value.type = 1
            }
            return user.value
        })
    }

    return {
        user,
        login,
        logout,
        register,
        updateInfo,
        editData,
        editAvatar,
        editPassword,
    }
})

export default useUserStore