<script setup lang="ts">
import wupinPic from "@/assets/images/logo.jpg"

import ClassLst from '@/components/classlist.vue'
import WupinLst from '@/components/wupinlist.vue'
import Search from "@/components/search.vue"
import Ad from "@/components/ad.vue"

const classification = ref([] as { name: string, id: number }[])
const wupinlst = ref([] as { name: string, id: number, pic: string, classname?: string, tag?: string, price?: number }[])

for (let i = 0; i < 60; i++) {
  classification.value.push({
    name: "分类" + i,
    id: i,
  })
}

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

const adDiv = ref(null)

</script>

<template>
  <Search  style="margin-top: 10px; margin-bottom: 10px" :tyoe="-1" :cl="classification"></Search>
  <div style="display: flex; justify-content: center; margin-top: 10px; margin-bottom: 10px">
    <div style="width: 65%; display: flex; flex-direction: row-reverse; justify-content: space-between; margin-top: 10px">
      <div style="margin-left: 2vw; flex-grow: 2">
        <Ad ref="adDiv"></Ad>
      </div>
      <div>
        <el-scrollbar :height="adDiv && adDiv.height">
          <ClassLst style="width: 100%" :cl="classification"></ClassLst>
        </el-scrollbar>
      </div>
    </div>
  </div>
  <div style="display: flex; justify-content: center; margin-top: 10px; margin-bottom: 10px">
    <div style="width: 90%; display: flex; justify-content: space-between; margin-top: 10px">
      <WupinLst :cl="wupinlst"></WupinLst>
    </div>
  </div>
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
