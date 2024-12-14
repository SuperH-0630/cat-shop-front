<script setup lang="ts">
import {getUserShoppingRecord, ShopRecord} from "@/api/shoppingbag"
import Shoppingbag from "@/components/shoppingbag.vue"

let offset = 0
const limit = 20
const stop = ref(false)
const shopRecord = ref([] as ShopRecord[])
const router = useRouter()

const updater = () => {
  if (stop.value) {
    return
  }

  getUserShoppingRecord(offset, limit).then((res) => {
    if (res.data.data.total < limit) {
      stop.value = true
    }

    offset += res.data.data.total
    shopRecord.value = shopRecord.value.concat(res.data.data.list)
  })
}
updater()

const reload = () => {
  offset = 0
  stop.value = false
  shopRecord.value = [] as ShopRecord[]

  updater()
}

const toHome = () => {
  router.push({
    path: "/home"
  })
}

</script>

<template>
  <div style="display: flex; justify-content: center; margin-top: 10px; margin-bottom: 10px">
    <el-card style="display: flex; max-width: 50%; justify-content: center; margin-top: 10px">
      <div v-if="stop && shopRecord.length === 0">
        <el-result
            icon="success"
            title="您的购物车还没有任何记录呢"
            sub-title="欢迎到别处去看看吧"
        >
          <template #extra>
            <el-button type="primary" @click="toHome">到我的中心</el-button>
          </template>
        </el-result>
      </div>
      <div v-else v-infinite-scroll="updater" style="height: 60vh; width: 50vw; overflow: auto">
        <div v-for="(item, index) in shopRecord" :key="index" style="margin-left: 30px; margin-right: 30px">
            <Shoppingbag ref="shopper" :record="item" @reload="reload"></Shoppingbag>
        </div>
      </div>
    </el-card>
  </div>
</template>

<style scoped lang="scss">

</style>