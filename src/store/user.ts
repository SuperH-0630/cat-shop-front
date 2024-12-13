import {isMobile} from "@/utils/str"
import useConfigStore from "@/store/config"

export interface User {
    name: string
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

const useUserStore = defineStore("userStore", () => {
    const user = ref({} as User)
    const lastUpdateTime = ref(Date.now())

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const login = (phone1: string, password: string) => {
        if (isLogin()) {
            return Promise.reject("已登录")
        }

        if (!isMobile(phone1)) {
            return Promise.reject("手机号格式错误")
        }

        if (password.length < 8) {
            return Promise.reject()
        }

        setXtoken("123456")
        updateInfo(true)
        return Promise.resolve()
    }

    const logout = () => {
        if (!isLogin()) {
            return Promise.reject("未登录")
        }

        user.value.name = ""
        user.value.avatar = ""
        user.value.phone = ""
        user.value.location = ""
        user.value.totalPrice = 0
        user.value.totalBuy = 0
        user.value.totalGood = 0
        user.value.totalJian = 0
        user.value.totalShouHuo = 0
        user.value.goodPre = (user.value.totalGood / user.value.totalShouHuo) * 100
        user.value.pricePre = user.value.totalPrice / user.value.totalBuy

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

    const deleteUser = () => {
        if (!isLogin()) {
            return Promise.reject("未登录")
        }

        return logout()
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const register = (phone1: string, password: string) => {
        if (!isMobile(phone1)) {
            return Promise.reject("手机号格式错误")
        }

        return login(phone1, password)
    }

    const updateInfo = (must: boolean | undefined = false) => {
        if (!isLogin()) {
            return Promise.reject("未登录")
        }

        if (must || Object.keys(user.value).length === 0 || (lastUpdateTime.value && (Date.now() - lastUpdateTime.value > 5 * 60 * 1000))) {
            const configStore = useConfigStore()

            user.value.name = ""
            user.value.avatar = ""
            user.value.phone = "17322061610"
            user.value.location = "广东广州"
            user.value.totalPrice = 100000
            user.value.totalBuy = 30
            user.value.totalGood = 20
            user.value.totalJian = 40
            user.value.totalShouHuo = 25
            user.value.goodPre = (user.value.totalGood / user.value.totalShouHuo) * 100
            user.value.pricePre = user.value.totalPrice / user.value.totalBuy

            if (!user.value.name) {
                user.value.name = "新用户"
            }

            if (!user.value.avatar) {
                user.value.avatar = configStore.cfg.value.avatar
            }

            lastUpdateTime.value = Date.now()
            return Promise.resolve()
        }

        return Promise.resolve()
    }

    return {
        user,
        lastUpdateTime,
        login,
        logout,
        setData,
        deleteUser,
        register,
        updateInfo,
    }
})

export default useUserStore