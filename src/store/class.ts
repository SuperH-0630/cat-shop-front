import {apiGetClassLst} from "@/api/class";

export interface Class {
    id: number
    name: string
}

const useClassStore = defineStore("classStore", () => {
    const classLst = ref([] as Class[])
    const allClass = ref({
        id: -1,
        name: "全部",
    } as Class)

    const deleteAll = () => {
        classLst.value = []
    }

    const updateInfo = () => {
        return apiGetClassLst().then((res) => {
            classLst.value = res.data.data.list
            return classLst.value
        })
    }

    const getLst = () => {
        if (classLst.value.length === 0) {
            return updateInfo()
        }

        return Promise.resolve(classLst.value)
    }

    const classLstWithAll = computed(() => {
        return ([allClass.value] as Class[]).concat(classLst.value as Class[])
    })

    const findClass = (id: number) => {
        return classLst.value.find((item) => item.id === id)
    }

    return {
        classLst,
        allClass,
        deleteAll,
        updateInfo,
        getLst,
        classLstWithAll,
        findClass,
    }
})

export default useClassStore