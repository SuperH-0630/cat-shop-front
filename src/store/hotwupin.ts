import wupinPic from "@/assets/images/logo.jpg";
import useClassStore, {Class} from "@/store/class";

export interface Wupin {
    id: number
    name: string
    pic: string
    classid: number
    classOf: Class
    tag?: string
    hotPrice?: number
    realPrice: number
}

const useHotWupinStore = defineStore("hotWupinStore", () => {
    const wupinLst = ref([] as Wupin[])

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
                name: "物品" + i,
                id: i,
                pic: wupinPic,
                classid: cl.id,
                classOf: cl,
                tag: "火爆",
                hotPrice: 9999,
                realPrice: 19999,
            })
        }

        return Promise.resolve()
    }

    const getLst = () => {
        if (wupinLst.value.length !== 0) {
            return Promise.resolve()
        }

        return getLstMust()
    }

    return {
        wupinLst,
        deleteAll,
        getLstMust,
        getLst,
    }
})

export default useHotWupinStore