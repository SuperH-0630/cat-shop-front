import {Result} from "@/utils/request"
import {Wupin} from "@/store/hotwupin"
import useClassStore, {Class} from "@/store/class";
import WupinPic from "@/assets/images/logo.jpg";

export interface HotWupinLst {
    list: Wupin[],
    total: number,
}

export const getHotWupinInfo = (): Result<HotWupinLst> => {
    const classStore = useClassStore()
    const wupinLst = [] as Wupin[]

    for (let i = 0; i < 50; i++) {
        let cl = {
            id: 1,
            name: "分类1"
        } as Class

        if (classStore.classLst.length > 0) {
            cl = classStore.classLst[Math.floor(Math.random() * classStore.classLst.length)]
        }

        wupinLst.push({
            id: i + 1,
            name: "物品" + " - " + (i + 1),
            pic: WupinPic,
            classid: cl.id,
            classOf: cl,
            tag: "爆卖！",
            hotPrice: 9999,
            realPrice: 19999,
            info: "<p style='font-size: 20px;'> 贵在坚持，成在创新：满满充满本事的比亚迪，贵在坚持，成在创新：满满充满本事的比亚迪，贵在坚持，成在创新：满满充满本事的比亚迪，贵在坚持，成在创新：满满充满本事的比亚迪，贵在坚持，成在创新：满满充满本事的比亚迪，贵在坚持，成在创新：满满充满本事的比亚迪 </p>" +
                "<p style='font-size: 20px;'> 贵在坚持，成在创新：满满充满本事的比亚迪，贵在坚持，成在创新：满满充满本事的比亚迪，贵在坚持，成在创新：满满充满本事的比亚迪，贵在坚持，成在创新：满满充满本事的比亚迪，贵在坚持，成在创新：满满充满本事的比亚迪，贵在坚持，成在创新：满满充满本事的比亚迪 </p>" +
                "<p style='font-size: 20px;'> 贵在坚持，成在创新：满满充满本事的比亚迪，贵在坚持，成在创新：满满充满本事的比亚迪，贵在坚持，成在创新：满满充满本事的比亚迪，贵在坚持，成在创新：满满充满本事的比亚迪，贵在坚持，成在创新：满满充满本事的比亚迪，贵在坚持，成在创新：满满充满本事的比亚迪 </p>" +
                "<p style='font-size: 20px;'> 贵在坚持，成在创新：满满充满本事的比亚迪，贵在坚持，成在创新：满满充满本事的比亚迪，贵在坚持，成在创新：满满充满本事的比亚迪，贵在坚持，成在创新：满满充满本事的比亚迪，贵在坚持，成在创新：满满充满本事的比亚迪，贵在坚持，成在创新：满满充满本事的比亚迪 </p>" +
                "<p style='font-size: 20px;'> 贵在坚持，成在创新：满满充满本事的比亚迪，贵在坚持，成在创新：满满充满本事的比亚迪，贵在坚持，成在创新：满满充满本事的比亚迪，贵在坚持，成在创新：满满充满本事的比亚迪，贵在坚持，成在创新：满满充满本事的比亚迪，贵在坚持，成在创新：满满充满本事的比亚迪 </p>" +
                "<p style='font-size: 20px;'> 贵在坚持，成在创新：满满充满本事的比亚迪，贵在坚持，成在创新：满满充满本事的比亚迪，贵在坚持，成在创新：满满充满本事的比亚迪，贵在坚持，成在创新：满满充满本事的比亚迪，贵在坚持，成在创新：满满充满本事的比亚迪，贵在坚持，成在创新：满满充满本事的比亚迪 </p>" +
                "<p style='font-size: 20px;'> 贵在坚持，成在创新：满满充满本事的比亚迪，贵在坚持，成在创新：满满充满本事的比亚迪，贵在坚持，成在创新：满满充满本事的比亚迪，贵在坚持，成在创新：满满充满本事的比亚迪，贵在坚持，成在创新：满满充满本事的比亚迪，贵在坚持，成在创新：满满充满本事的比亚迪 </p>" +
                "<p style='font-size: 20px;'> 贵在坚持，成在创新：满满充满本事的比亚迪，贵在坚持，成在创新：满满充满本事的比亚迪，贵在坚持，成在创新：满满充满本事的比亚迪，贵在坚持，成在创新：满满充满本事的比亚迪，贵在坚持，成在创新：满满充满本事的比亚迪，贵在坚持，成在创新：满满充满本事的比亚迪 </p>" +
                "<p style='font-size: 20px;'> 贵在坚持，成在创新：满满充满本事的比亚迪，贵在坚持，成在创新：满满充满本事的比亚迪，贵在坚持，成在创新：满满充满本事的比亚迪，贵在坚持，成在创新：满满充满本事的比亚迪，贵在坚持，成在创新：满满充满本事的比亚迪，贵在坚持，成在创新：满满充满本事的比亚迪 </p>" +
                "<p style='font-size: 20px;'> 贵在坚持，成在创新：满满充满本事的比亚迪，贵在坚持，成在创新：满满充满本事的比亚迪，贵在坚持，成在创新：满满充满本事的比亚迪，贵在坚持，成在创新：满满充满本事的比亚迪，贵在坚持，成在创新：满满充满本事的比亚迪，贵在坚持，成在创新：满满充满本事的比亚迪 </p>" +
                "<p style='font-size: 20px;'> 贵在坚持，成在创新：满满充满本事的比亚迪，贵在坚持，成在创新：满满充满本事的比亚迪，贵在坚持，成在创新：满满充满本事的比亚迪，贵在坚持，成在创新：满满充满本事的比亚迪，贵在坚持，成在创新：满满充满本事的比亚迪，贵在坚持，成在创新：满满充满本事的比亚迪 </p>" +
                "<p style='font-size: 20px;'> 贵在坚持，成在创新：满满充满本事的比亚迪，贵在坚持，成在创新：满满充满本事的比亚迪，贵在坚持，成在创新：满满充满本事的比亚迪，贵在坚持，成在创新：满满充满本事的比亚迪，贵在坚持，成在创新：满满充满本事的比亚迪，贵在坚持，成在创新：满满充满本事的比亚迪 </p>" +
                "<p style='font-size: 20px;'> 贵在坚持，成在创新：满满充满本事的比亚迪，贵在坚持，成在创新：满满充满本事的比亚迪，贵在坚持，成在创新：满满充满本事的比亚迪，贵在坚持，成在创新：满满充满本事的比亚迪，贵在坚持，成在创新：满满充满本事的比亚迪，贵在坚持，成在创新：满满充满本事的比亚迪 </p>" +
                "<p style='font-size: 20px;'> 贵在坚持，成在创新：满满充满本事的比亚迪，贵在坚持，成在创新：满满充满本事的比亚迪，贵在坚持，成在创新：满满充满本事的比亚迪，贵在坚持，成在创新：满满充满本事的比亚迪，贵在坚持，成在创新：满满充满本事的比亚迪，贵在坚持，成在创新：满满充满本事的比亚迪 </p>" +
                "<p style='font-size: 20px;'> 贵在坚持，成在创新：满满充满本事的比亚迪，贵在坚持，成在创新：满满充满本事的比亚迪，贵在坚持，成在创新：满满充满本事的比亚迪，贵在坚持，成在创新：满满充满本事的比亚迪，贵在坚持，成在创新：满满充满本事的比亚迪，贵在坚持，成在创新：满满充满本事的比亚迪 </p>" +
                "<p style='font-size: 20px;'> 贵在坚持，成在创新：满满充满本事的比亚迪，贵在坚持，成在创新：满满充满本事的比亚迪，贵在坚持，成在创新：满满充满本事的比亚迪，贵在坚持，成在创新：满满充满本事的比亚迪，贵在坚持，成在创新：满满充满本事的比亚迪，贵在坚持，成在创新：满满充满本事的比亚迪 </p>" +
                "<p style='font-size: 20px;'> 贵在坚持，成在创新：满满充满本事的比亚迪，贵在坚持，成在创新：满满充满本事的比亚迪，贵在坚持，成在创新：满满充满本事的比亚迪，贵在坚持，成在创新：满满充满本事的比亚迪，贵在坚持，成在创新：满满充满本事的比亚迪，贵在坚持，成在创新：满满充满本事的比亚迪 </p>" +
                "<p style='font-size: 20px;'> 贵在坚持，成在创新：满满充满本事的比亚迪，贵在坚持，成在创新：满满充满本事的比亚迪，贵在坚持，成在创新：满满充满本事的比亚迪，贵在坚持，成在创新：满满充满本事的比亚迪，贵在坚持，成在创新：满满充满本事的比亚迪，贵在坚持，成在创新：满满充满本事的比亚迪 </p>",
            ren: "小超",
            phone: "17322061610",
            email: "songzihuan@song-zh.com",
            location: "广东广州",
            wechat: "12345",
            buytotal: 100,
            buygood: 90,
        } as Wupin)
    }
    return Promise.resolve({
        data: {
            code: 0,
            data: {
                total: wupinLst.length,
                list: wupinLst,
            },
        },
        status: 200,
    })
}