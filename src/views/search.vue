<script setup lang="ts">
import WupinLst from "@/components/wupinlist.vue"
import wupinPic from "@/assets/images/logo.jpg"
import Search from "@/components/search.vue"

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

</script>

<template>
  <div style="display: flex; justify-content: center; margin-top: 10px; margin-bottom: 10px">
    <div style="width: 65%;">
      <Search  style="margin-top: 10px; margin-bottom: 10px" :tyoe="-1"></Search>
    </div>
  </div>
  <div style="display: flex; justify-content: center; margin-top: 10px; margin-bottom: 10px">
    <div style="width: 90%; display: flex; justify-content: space-between; margin-top: 10px">
      <WupinLst :wp="wupinlst"></WupinLst>
    </div>
  </div>
</template>

<style scoped lang="scss">

</style>