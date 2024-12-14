<script setup lang="ts">

const route = useRoute()
const router = useRouter()
const goHome = () => {
  router.push({
    path: "/home"
  })
}

const msg = ref(route.query?.msg || "")
if (!msg.value || msg.value.length > 20) {
  msg.value = "遇到系统未能捕获的错误，请稍后臭重试，"
}

</script>

<template>
  <div style="display: flex; justify-content: center; margin-top: 10px; margin-bottom: 10px">
    <el-card style="display: flex; max-width: 75%; justify-content: center; margin-top: 10px">
      <el-result
          style="min-width: 10vw; min-height: 40vh"
          icon="error"
          title="错误发生"
          :sub-title="msg"
      >
        <template #extra>
          <el-button  type="primary" @click="goHome">回到主页</el-button>
        </template>
      </el-result>
    </el-card>
  </div>
</template>

<style scoped lang="scss">

</style>