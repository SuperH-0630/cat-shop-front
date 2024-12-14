import {isMobile} from "@/utils/str"
import useConfigStore from "@/store/config"
import {sha256} from "@/utils/encrypt"
import {getSelfInfo, loginGetXToken, registerGetXToken, updateAvatarData, updateData} from "@/api/user"

export interface UserBase {
    name: string
    location: string
}

export interface UserAvatar {
    avatar: string
}

export interface User extends UserBase, UserAvatar{
    type: number
    phone: string
    xtoken: string
    totalPrice: number
    totalBuy: number
    totalGood: number
    totalJian: number
    totalShouHuo: number
    goodPre: number
    pricePre: number
}

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

        loginGetXToken(phone1, passwordHash).then((res) => {
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

        return updateData(data).then((res) => {
            if (!res.data.data.success) {
                return Promise.reject("更新失败")
            }
            return updateInfo()
        })
    }

    const editAvatar = async (avatar: Blob) => {
        if (!isLogin()) {
            return Promise.reject("未登录")
        }

        return updateAvatarData(avatar).then((res) => {
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

        registerGetXToken(phone1, passwordHash).then((res) => {
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
        return getSelfInfo().then((res) => {
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

            if (![1, 2, 3].some((v) => v === user.value.type)) {
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
    }
})

export default useUserStore