<script setup lang="ts">
import useConfigStore from "@/store/config"
import UserTitleCenter from "@/components/system/usertitlecenter.vue"

const router = useRouter()
const route = useRoute()

const title = computed(() => route.meta?.title ? route.meta.title : "")
const configStore = useConfigStore()

const goHome = () => {
  router.push({
    path: "/shop/home"
  })
}

const goKefu = () => {
  router.push({
    path: "/system/kefu"
  })
}
</script>

<template>
  <el-header height="10vh" style="background-color: aliceblue; border-bottom-left-radius: 10px; border-bottom-right-radius: 10px;">
    <el-page-header icon="">
      <template #title>
        <div style="display: flex; justify-content: left">
          <div class="title_box" @click="goHome">
            <span @click="goHome">
              <el-avatar class="avatar_logo" :src="configStore.config.logo" fit="fill"></el-avatar>
              <el-text class="title">
                {{ configStore.config?.name }}
              </el-text>
            </span>
          </div>
        </div>
      </template>

      <template #content>
        <el-text class="subtitle">
          {{ title }} - {{ configStore.config?.subname }}
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

          <UserTitleCenter class="extrainfo"></UserTitleCenter>
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
  margin-left: 5px;
  margin-right: 5px;
  vertical-align: middle;
}

.title {
  font-size: 4vh;
  color: black;
  font-weight: bold;
  vertical-align: middle;
}

.subtitle {
  font-size: 2vh;
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
</style>
