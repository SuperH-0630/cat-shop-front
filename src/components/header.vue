<script setup lang="ts">
import useConfigStore from "@/store/config"
import UserTitle from "@/components/user_title.vue"

const router = useRouter()
const goHome = () => {
  router.push({
    path: "/home"
  })
}
const goKefu = () => {
  router.push({
    path: "/kefu"
  })
}
const configStore = useConfigStore()
</script>

<template>
  <el-header height="10vh" style="background-color: white">
    <el-page-header icon="">
      <template #title>
        <div class="title_box" @click="goHome">
          <el-avatar class="avatar_logo" :src="configStore.config?.logo" fit="fill"></el-avatar>
          <el-text class="title">
            {{ configStore.config?.name }}
          </el-text>
        </div>
      </template>

      <template #content>
        <el-text class="subtitle">
          {{ configStore.config?.subname }}
        </el-text>
      </template>

      <template #extra>
        <div style="display: flex">
          <el-text class="extrainfo gokefu" @click="goKefu">
            <el-icon><Service /></el-icon>
            {{ configStore.config?.service }}
          </el-text>

          <el-text class="extrainfo gokefu" style="margin-right: 40px" @click="goKefu">
            <el-icon><Microphone /></el-icon>
             {{ configStore.config?.hotline }}
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

.gokefu {
  color: black;
  cursor: pointer;
}

.gokefu:hover {
 text-decoration: underline;
}

.gokefu:active {
  color: #2448aa;
  text-decoration: underline;
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
