<script setup lang="ts">
  import useClassStore from "@/store/class"

  const props = defineProps({
    "type": String || null || undefined,
    "select": Array || null || undefined,
    "search": String || null || undefined,
  })

  const select = ref(props.select || [] as number[])
  const search = ref(props.search || "" as string)

  const router = useRouter()
  const route = useRoute()

  const infoController = (info) => {
    if (!info) {
      return
    }

    const data = JSON.parse(info as string) as { select?: number[], search?: string }

    if (data && data.select) {
      select.value = data.select
    }

    if (data && data.search) {
      search.value = data.search
    }
  }

  infoController(route.query?.info)
  watch(() => route.query?.info, infoController)

  const classStore = useClassStore()
  classStore.getLstMust()

  const onSearch = () => {
    console.log("Tag B")
    router.push({
      path: "/search",
      query: {
        "info": JSON.stringify({
          select: select.value,
          search: search.value,
        })
      }
    })
  }

  const onChange = (ids: number[]) => {
    console.log("select change", select, ids)
    if (ids[ids.length - 1] === classStore.allClass.id) {
      select.value = [classStore.allClass.id]
    } else {
      select.value = ids.filter((id) => id !== classStore.allClass.id)
    }
  }

</script>

<template>
  <div style="display: flex; justify-content: space-between; margin-top: 10px">
    <el-select
        v-model="select"
        placeholder="请选择分类"
        size="large"
        style="width: 20%; margin-right: 5px"
        :multiple="true"
        :clearable="true"
        @change="onChange"
    >
      <el-option
          v-for="(item, j) in classStore.getLstWithAll"
          :key="j"
          :label="item.name"
          :value="item.id"
      >
      </el-option>
    </el-select>
    <el-input v-model="search" maxlength="120" placeholder="搜索感兴趣的内容吧" size="large" :clearable="true"></el-input>
    <el-button size="large" :bg="true" type="success" style="margin-left: 5px" @click="onSearch"> 立刻搜索 </el-button>
  </div>
</template>

<style scoped lang="scss">

</style>