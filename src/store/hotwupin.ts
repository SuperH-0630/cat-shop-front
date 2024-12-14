import {getHotWupinInfo} from "@/api/hotwupin";
import { Class } from "@/store/class"

export interface Wupin {
    id: number
    name: string
    pic: string
    classid: number
    classOf: Class
    tag?: string
    hotPrice?: number
    realPrice: number
    info: string
    ren: string
    phone: string
    email?: string
    wechat?: string
    location: string
    buytotal: number
    buygood: number
}

const useHotWupinStore = defineStore("hotWupinStore", () => {
    const wupinLst = ref([] as Wupin[])

    const deleteAll = () => {
        wupinLst.value = []
    }

    const updateInfo = async () => {
        return getHotWupinInfo().then((res) => {
            wupinLst.value = res.data.data.list
            return wupinLst.value
        })
    }

    const getLst = async () => {
        if (wupinLst.value.length === 0) {
            return updateInfo()
        }

        return Promise.resolve(wupinLst.value)
    }

    return {
        wupinLst,
        deleteAll,
        updateInfo,
        getLst,
    }
})

export default useHotWupinStore