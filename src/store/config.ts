import WeChat from "@/assets/images/wechat.jpg"
import Logo from "@/assets/images/logo.jpg"
import AD from "@/assets/images/ad.jpeg"
import defaultAvatar from "@/assets/images/avatar.jpg"

import {getConfig} from "@/api/config"

export interface Config {
    "name": string,
    "subname": string
    "hotline": string,
    "logo": string
    "service": string,
    "wechat": string,
    "adtitle": string
    "adpic": string,
    "ad": string,
    "adurl": string,
    "avatar": string,
}

const configStore = defineStore("configStore", () => {
    const config = ref({
        "name": "猫猫超市",
        "subname": "让您有个温馨的体验",
        "logo": Logo,
        "hotline": "400-930-1318",
        "service": "24小时在线贴心服务",
        "wechat": WeChat,
        "adtitle": "这只是个广告",
        "adpic": AD,
        "ad": "比亚迪，智领未来，引领绿色出行！作为全球新能源技术的先锋，比亚迪凭借卓越的自主研发和创新实力，打造高性能电动汽车，成就绿色科技与卓越驾控的完美融合。从刀片电池到e平台技术，每一次突破都树立行业标杆。比亚迪汽车不仅续航无忧，动力强劲，更以智能、安全、环保，赢得全球消费者信赖。选择比亚迪，就是选择环保出行，拥抱科技未来！比亚迪，向新而行，驶向明天的辉煌！",
        "adurl": "https://www.baidu.com",
        "avatar": defaultAvatar,
    } as Config)
    const lastUpdateTime = ref(0 as number)

    const updateConfig = () => {
        if (lastUpdateTime.value && (Date.now() - lastUpdateTime.value > 5 * 60 * 1000)) {
            getConfig().then((res) => {
                config.value = res.data.data
                lastUpdateTime.value = Date.now()
            })
        }
        return Promise.resolve()
    }

    const cfg = computed(() => {
        updateConfig()

        if (!config.value.name) {
            config.value.name = "猫猫超市"
        }

        if (!config.value.subname) {
            config.value.subname = "让您有个温馨的体验"
        }

        if (!config.value.logo) {
            config.value.logo = Logo
        }

        if (!config.value.wechat) {
            config.value.wechat = WeChat
        }

        if (!config.value.adpic) {
            config.value.adpic = AD
        }

        if (!config.value.ad) {
            config.value.ad = "比亚迪，智领未来，引领绿色出行！作为全球新能源技术的先锋，比亚迪凭借卓越的自主研发和创新实力，打造高性能电动汽车，成就绿色科技与卓越驾控的完美融合。从刀片电池到e平台技术，每一次突破都树立行业标杆。比亚迪汽车不仅续航无忧，动力强劲，更以智能、安全、环保，赢得全球消费者信赖。选择比亚迪，就是选择环保出行，拥抱科技未来！比亚迪，向新而行，驶向明天的辉煌！"
        }

        if (!config.value.adtitle) {
            config.value.adtitle = "这只是个广告"
        }

        if (!config.value.avatar) {
            config.value.avatar = defaultAvatar
        }

        return config
    })

    return {
        config,
        lastUpdateTime,
        cfg,
        updateConfig,
    }
})

export default configStore