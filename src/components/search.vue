<script setup lang="ts">
  import allLogo from "@/assets/images/logo.jpg"

  const props = defineProps({
    "type": String || null || undefined,
    "cl": Array,
    "select": Array || null || undefined,
    "search": String || null || undefined,
  })

  const itemLst = ref([{
    id: -1,
    cl: {
      id: -1,
      name: "全部",
      pic: allLogo,
    },
  }] as { id: number, cl: null | Object }[])

  if (props.cl && props.cl.length > 0) {
    for (let i = 1; i < props.cl.length; i++) {
      itemLst.value.push({
        id: i,
        cl: props.cl[i] as Object,
      })
    }
  }

  const selectValue = ref(props.select || [] as number[])
  const searchValue = ref(props.search || "")
  const router = useRouter()

  const onSearch = () => {
    router.push({
      path: "/search",
      query: {
        "info": JSON.stringify({
          select: selectValue.value,
          search: searchValue.value,
        })
      }
    })
  }

  const onChange = (ids: number[]) => {
    if (ids[ids.length - 1] === -1) {
      selectValue.value = [-1]
    } else {
      selectValue.value = ids.filter((id) => id !== -1)
    }
  }

</script>

<template>
  <div style="display: flex; justify-content: center">
    <div id="search" style="width: 65%; display: flex">
      <el-select
          v-model="selectValue"
          placeholder="请选择分类"
          size="large"
          style="width: 20%; margin-right: 5px"
          :multiple="true"
          :clearable="true"
          @change="onChange"
      >
        <el-option
            v-for="(item, j) in itemLst"
            :key="j"
            :label="item.cl.name"
            :value="item.id"
        >
        </el-option>
      </el-select>
      <el-input v-model="searchValue" maxlength="120" placeholder="搜索感兴趣的内容吧" size="large" :clearable="true"></el-input>
      <el-button size="large" :bg="true" type="success" style="margin-left: 5px" @click="onSearch"> 立刻搜索 </el-button>
    </div>
  </div>
</template>

<style scoped lang="scss">

</style>