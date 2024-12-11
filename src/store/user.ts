import defaultAvatar from "@/assets/images/avatar.jpg"
import {isMobile} from "@/utils/str"

const useUserStore = defineStore("user", () => {
    const name = ref("")
    const avatar = ref("")
    const phone = ref("")
    const xtoken = ref("")
    const isLogin = computed(() => xtoken.value.length > 0)

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const login = (phone1: string, password: string) => {
        if (isLogin.value) {
            return Promise.reject("已登录")
        }

        if (!isMobile(phone1)) {
            return Promise.reject("手机号格式错误")
        }

        name.value = "测试用户"
        avatar.value = defaultAvatar
        phone.value = phone1
        xtoken.value = "123456"

        return Promise.resolve()
    }

    const logout = () => {
        if (!isLogin.value) {
            return Promise.reject("未登录")
        }

        name.value = ""
        avatar.value = ""
        phone.value = ""
        xtoken.value = ""
        return Promise.resolve()
    }

    const setData = (name1: string, avatar1: string) => {
        if (!isLogin.value) {
            return Promise.reject("未登录")
        }

        name.value = name1
        avatar.value = avatar1
    }

    const deleteUser = () => {
        if (!isLogin.value) {
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

    return {
        name,
        avatar,
        phone,
        xtoken,
        isLogin,
        login,
        logout,
        setData,
        deleteUser,
        register
    }
})

export default useUserStore