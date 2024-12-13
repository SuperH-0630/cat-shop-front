<script setup lang="ts">
import UserTitle from "@/components/user_title.vue"
import useConfigStore from "@/store/config"

const router = useRouter()
const goHome = () => {
  router.push({
    path: "/home"
  })
}

const configStore = useConfigStore()
console.log("configStore.cfg.value", configStore.cfg.value)
</script>

<template>
  <el-header height="10vh" style="background-color: white">
    <el-page-header icon="">
      <template #title>
        <div class="title_box" @click="goHome">
          <el-avatar class="avatar_logo" :src="configStore.cfg.value.logo" fit="fill"></el-avatar>
          <el-text class="title">
            {{ configStore.cfg.value.name }}
          </el-text>
        </div>
      </template>

      <template #content>
        <el-text class="subtitle">
          {{ configStore.cfg.value.subname }}
        </el-text>
      </template>

      <template #extra>
        <div style="display: flex">
          <el-text class="extrainfo">
            <el-icon><Service /></el-icon>
            {{ configStore.cfg.value.service }}
          </el-text>

          <el-text class="extrainfo" style="margin-right: 40px">
            <el-icon><Microphone /></el-icon>
             {{ configStore.cfg.value.hotline }}
          </el-text>

          <UserTitle class="extrainfo"></UserTitle>
        </div>
      </template>
    </el-page-header>
  </el-header>
</template>

<style scoped lang="scss">
#logo {
  float: left;
}

.avatar_logo {
  height: 8vh;
  width: 8vh;
  margin: 0 0 0 0;
  vertical-align: middle;
}

.title {
  font-size: 5vh;
  font-weight: bold;
  margin-left: 10px;
  vertical-align: middle;
}

.subtitle {
  font-size: 1.8vh;
  font-weight: normal;
  margin-left: 5px;
  vertical-align: middle;
}

.title_box {
  padding-top: 1vh;
}

.extrainfo{
  font-size: 2vh;
  margin-right: 10px;
  vertical-align: middle;
}

.el-container {
  background-image: url("@/assets/images/bg.jpg");
}

.el-main {
  background-color: rgba(255, 255, 255, 0.8);
}
</style>
