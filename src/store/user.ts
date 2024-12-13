import {isMobile} from "@/utils/str"
import useConfigStore from "@/store/config"
import {sha512} from "@/utils/encrypt"
import {getSelfInfo, loginGetXToken, registerGetXToken} from "@/api/user"

export interface User {
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
    return typeof userStore === "object" && Object.keys(userStore).length > 0
}

const useUserStore = defineStore("userStore", () => {
    const user = ref({} as User)
    const lastUpdateTime = ref(Date.now())

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const login = (phone1: string, password: string) => {
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

        return sha512((`${configStore.cfg.value.passwordfronthash}::${password}>>`)).then((password) => {
            loginGetXToken(phone1, password).then((res) => {
                if (!res.data.data.xtoken || !res.data.data.success) {
                    return Promise.reject("登录失败")
                }

                setXtoken(res.data.data.xtoken)
                return updateInfo(true)
            }, () => {
                return Promise.reject("登录失败")
            })
        })
    }

    const logout = () => {
        if (!isLogin()) {
            return Promise.reject("未登录")
        }

        user.value = {} as User
        lastUpdateTime.value = Date.now()

        delXtoken()
        return Promise.resolve()
    }

    const setData = (name1: string, avatar1: string, location1: string) => {
        if (!isLogin()) {
            return Promise.reject("未登录")
        }

        user.value.name = name1
        user.value.avatar = avatar1
        user.value.location = location1
    }

    const register = (phone1: string, password: string) => {
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

        return sha512((`${configStore.cfg.value.passwordfronthash}::${password}>>`)).then((password) => {
            registerGetXToken(phone1, password).then((res) => {
                if (!res.data.data.xtoken || !res.data.data.success) {
                    return Promise.reject("登录失败")
                }

                setXtoken(res.data.data.xtoken)
                return updateInfo(true)
            }, () => {
                return Promise.reject("登录失败")
            })
        })
    }
    async function updateInfo(must: boolean = false) {
        if (!isLogin()) {
            return Promise.reject("未登录")
        }

        if (must || Object.keys(user.value).length === 0 || (lastUpdateTime.value && (Date.now() - lastUpdateTime.value > 5 * 60 * 1000))) {
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
                    user.value.avatar = configStore.cfg.value.avatar
                }

                if (![1, 2, 3].some((v) => v === user.value.type)) {
                    user.value.type = 1
                }

                console.log("AAAASSS", Object.entries(user.value))
                lastUpdateTime.value = Date.now()
            })
        }
        return Promise.resolve()
    }

    return {
        user,
        lastUpdateTime,
        login,
        logout,
        register,
        updateInfo,
        setData,
    }
})

export default useUserStore