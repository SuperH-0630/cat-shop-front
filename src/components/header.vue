<script setup lang="ts">
import logo from '@/assets/images/logo.jpg'
import wupinPic from "@/assets/images/logo.jpg"
import UserTitle from "@/components/user_title.vue"

const wupinlst = ref([] as { name: string, id: number, pic: string, classname?: string, tag?: string, price?: number }[])

for (let i = 0; i < 50; i++) {
  wupinlst.value.push({
    name: "物品" + i,
    id: i,
    pic: wupinPic,
    classname: "测试",
    tag: "火爆",
    price: 9999,
  })
}

const router = useRouter()
const goHome = () => {
  router.push({
    path: "/home"
  })
}

</script>

<template>
  <el-header height="10vh">
    <el-page-header icon="">
      <template #title>
        <div class="title_box" @click="goHome">
          <el-avatar class="avatar_logo" :src="logo" fit="fill"></el-avatar>
          <el-text class="title">
            猫猫商城
          </el-text>
        </div>
      </template>

      <template #content>
        <el-text class="subtitle">
          让您有个温馨的体验
        </el-text>
      </template>

      <template #extra>
        <div style="display: flex">
          <el-text class="extrainfo">
            <el-icon><Service /></el-icon>
            24小时在线贴心服务
          </el-text>

          <el-text class="extrainfo" style="margin-right: 40px">
            <el-icon><Microphone /></el-icon>
            400-930-1318
          </el-text>

          <UserTitle></UserTitle>
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
