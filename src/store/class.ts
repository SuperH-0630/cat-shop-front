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
        return Promise.resolve()
    }

    const getLstMust = () => {
        deleteAll()

        for (let i = 0; i < 60; i++) {
            classLst.value.push({
                name: "分类" + i,
                id: i,
            })
        }
        return Promise.resolve()
    }

    const getLst = () => {
        if (classLst.value.length !== 0) {
            return Promise.resolve()
        }

        for (let i = 0; i < 60; i++) {
            classLst.value.push({
                name: "分类" + i,
                id: i,
            })
        }

        return Promise.resolve()
    }

    const getLstWithAll = computed(() => {
        getLst()
        return ([allClass.value] as Class[]).concat(classLst.value as Class[])
    })

    return {
        classLst,
        allClass,
        deleteAll,
        getLstMust,
        getLst,
        getLstWithAll,
    }
})

export default useClassStore