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
    const lastUpdateTime = ref(Date.now())

    const deleteAll = () => {
        classLst.value = []
        return Promise.resolve()
    }

    const getLstMust = () => {
        deleteAll()

        for (let i = 0; i < 60; i++) {
            classLst.value.push({
                name: "分类" + i + 1,
                id: i + 1,
            })
        }

        lastUpdateTime.value = Date.now()
        return Promise.resolve()
    }

    const getLst = () => {
        if (classLst.value.length === 0) {
            return getLstMust()
        }

        if (lastUpdateTime.value && (Date.now() - lastUpdateTime.value > 5 * 60 * 1000)) {
            return getLstMust()
        }

        return Promise.resolve()
    }

    const classLstWithAll = computed(() => {
        getLst()
        return ([allClass.value] as Class[]).concat(classLst.value as Class[])
    })

    const findClass = (id: number) => {
        getLst()
        return classLst.value.find((item) => item.id === id)
    }

    return {
        classLst,
        allClass,
        deleteAll,
        getLstMust,
        getLst,
        classLstWithAll,
        findClass,
    }
})

export default useClassStore