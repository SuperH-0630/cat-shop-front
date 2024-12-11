<script setup lang="ts">
import WupinLst from "@/components/wupinlist.vue"
import wupinPic from "@/assets/images/logo.jpg";
import Search from "@/components/search.vue";

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

const select = ref([] as number[])
const search = ref("")

const route = useRoute()
if (route.query.info) {
  const info = JSON.parse(route.query.info as string)
  if (info.select) {
    select.value = info.select
  }

  if (info.search) {
    search.value = info.search
  }
}

</script>

<template>
  <Search  style="margin-top: 10px; margin-bottom: 10px" :tyoe="-1" :cl="classification" :search="search" :select="select"></Search>
  <div style="display: flex; justify-content: center; margin-top: 10px; margin-bottom: 10px">
    <div style="width: 90%; display: flex; justify-content: space-between; margin-top: 10px">
      <WupinLst :cl="wupinlst"></WupinLst>
    </div>
  </div>
</template>

<style scoped lang="scss">

</style>