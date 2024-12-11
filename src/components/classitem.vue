<script setup lang="ts">
  import { Class } from "@/store/class"

  const props = defineProps({
    "cl": Object as PropType<Class>,
  })
  const item = ref(props.cl)
  const router = useRouter()

  const onClick = () => {
    router.push({
      path: "/search",
      query: {
        "info": JSON.stringify({
          select: [item.value],
          search: "",
        })
      }
    })
  }
</script>

<template>
  <div>
    <el-button class="classItem" size="large" text @click="onClick">
      <el-text tag="ins">
        {{ item.name }}
      </el-text>
    </el-button>
  </div>
</template>

<style scoped lang="scss">

.el-button {
  margin: 2px 2px 2px 2px;
}

</style>