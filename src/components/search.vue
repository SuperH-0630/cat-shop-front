<script setup lang="ts">
  import useClassStore from "@/store/class"

  const router = useRouter()
  const route = useRoute()

  const props = defineProps({
    "type": {
      type: String,
      required: false,
    },
    "select": {
      type: Array<number>,
      required: false,
    },
    "search": {
      type: String,
      required: false,
    },
  })

  const data = ref({
        select: [],
        search: "",
  } as { select?: number[], search?: string })

  const infoController = (info?: any) => {
    if (!info) {
      return
    }

    data.value = JSON.parse(info as string) as { select?: number[], search?: string }
  }

  infoController(route.query?.info)
  watch(() => route.query?.info, infoController)

  const select = ref(data.value.select || props.select || [] as number[])
  const search = ref(data.value.search || props.search || "" as string)

  const classStore = useClassStore()

  const onSearch = () => {
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
          v-for="(item, j) in classStore.classLstWithAll"
          :key="j"
          :label="item.name"
          :value="item.id"
      >
      </el-option>
    </el-select>
    <el-input v-model="search" maxlength="120" placeholder="搜索感兴趣的内容吧" size="large" :clearable="true"></el-input>
    <el-button size="large" :bg="true" type="success" style="margin-left: 5px" @click="onSearch"> <el-icon style="margin-right: 3px"><Search /></el-icon> 立刻搜索 </el-button>
  </div>
</template>

<style scoped lang="scss">
</style>