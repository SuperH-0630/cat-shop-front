import wupinPic from "@/assets/images/logo.jpg"
import useClassStore, {Class} from "@/store/class"

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
    email: string
    wechat?: string
    location: string
    buytotal: number
    buygood: number
}

const useHotWupinStore = defineStore("hotWupinStore", () => {
    const wupinLst = ref([] as Wupin[])
    const lastUpdateTime = ref(Date.now())

    const deleteAll = () => {
        wupinLst.value = []
        return Promise.resolve()
    }

    const getLstMust = () => {
        deleteAll()

        const classStore = useClassStore()
        classStore.getLst()

        for (let i = 0; i < 50; i++) {
            const cl = classStore.classLst[Math.floor(Math.random() * classStore.classLst.length)]
            wupinLst.value.push({
                name: "物品" + i + 1,
                id: i + 1,
                pic: wupinPic,
                classid: cl.id,
                classOf: cl,
                tag: "火爆",
                hotPrice: 9999,
                realPrice: 19999,
                info: "hhhhhh",
                ren: "小超市",
                phone: "17322061610",
                email: "songzihuan@song-zh.com",
                location: "广东广州",
                wechat: "12345",
                buytotal: 100,
                buygood: 90,
            })
        }

        lastUpdateTime.value = Date.now()
        return Promise.resolve()
    }

    const getLst = () => {
        if (wupinLst.value.length === 0) {
            return getLstMust()
        }

        if (lastUpdateTime.value && (Date.now() - lastUpdateTime.value > 5 * 60 * 1000)) {
            return getLstMust()
        }

        return Promise.resolve()
    }

    return {
        wupinLst,
        lastUpdateTime,
        deleteAll,
        getLstMust,
        getLst,
    }
})

export default useHotWupinStore