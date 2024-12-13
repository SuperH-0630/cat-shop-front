import defaultAvatar from "@/assets/images/avatar.jpg"
import {isMobile} from "@/utils/str"

const useUserStore = defineStore("user", () => {
    const name = ref("")
    const avatar = ref("")
    const phone = ref("")
    const location = ref("")
    const xtoken = ref("")
    const isLogin = computed(() => xtoken.value.length > 0)
    const totalPrice = ref(0)
    const totalBuy = ref(0)
    const totalGood = ref(0)
    const totalJian = ref(0)
    const totalShouHuo = ref(0)
    const goodPre = computed(() => (totalGood.value / totalShouHuo.value) * 100)
    const pricePre = computed(() => (totalPrice.value / totalBuy.value))
    const lastUpdateTime = ref(Date.now())

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
        location.value = "暂无"
        xtoken.value = "123456"
        totalPrice.value = 100000
        totalBuy.value = 30
        totalGood.value = 20
        totalJian.value = 40
        totalShouHuo.value = 25
        lastUpdateTime.value = Date.now()

        return Promise.resolve()
    }

    const logout = () => {
        if (!isLogin.value) {
            return Promise.reject("未登录")
        }

        name.value = ""
        avatar.value = ""
        phone.value = ""
        location.value = ""
        xtoken.value = ""
        totalPrice.value = 0
        totalBuy.value = 0
        totalGood.value = 0
        totalJian.value = 0
        totalShouHuo.value = 0
        lastUpdateTime.value = Date.now()

        return Promise.resolve()
    }

    const setData = (name1: string, avatar1: string, location1: string) => {
        if (!isLogin.value) {
            return Promise.reject("未登录")
        }

        name.value = name1
        avatar.value = avatar1
        location.value = location1
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

    const updateInfo = () => {
        if (!isLogin.value) {
            return Promise.reject("未登录")
        }

        if (lastUpdateTime.value && (Date.now() - lastUpdateTime.value > 5 * 60 * 1000)) {
            lastUpdateTime.value = Date.now()
            return Promise.resolve()
        }

        return Promise.resolve()
    }

    return {
        name,
        avatar,
        phone,
        location,
        xtoken,
        isLogin,
        totalPrice,
        totalBuy,
        totalGood,
        totalJian,
        totalShouHuo,
        goodPre,
        pricePre,
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