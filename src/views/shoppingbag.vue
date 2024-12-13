<script setup lang="ts">
import {getUserBuyRecord, ShopRecord} from "@/api/user"
import Shoppingbag from "@/components/shoppingbag.vue";

let offset = 0
const limit = 20
const stop = ref(false)
const shopRecord = ref([] as ShopRecord[])

const updater = () => {
  if (stop.value) {
    console.log("stop")
    return
  }

  getUserBuyRecord(offset, limit).then((res) => {
    if (res.data.data.total < limit) {
      console.log("start stop")
      stop.value = true
    }

    offset += res.data.data.total
    shopRecord.value = shopRecord.value.concat(res.data.data.list)
    console.log("update", offset)
  })
}
updater()
</script>

<template>
  <div style="display: flex; justify-content: center; margin-top: 10px; margin-bottom: 10px">
    <el-card style="display: flex; max-width: 50%; justify-content: center; margin-top: 10px">
      <div v-infinite-scroll="updater" style="height: 75vh; width: 50vw; overflow: auto">
        <div v-for="(item, index) in shopRecord" :key="index" style="display: flex; justify-content: center">
            <Shoppingbag :record="item" style="width: 95%"></Shoppingbag>
        </div>
      </div>
    </el-card>
  </div>
</template>

<style scoped lang="scss">

</style>