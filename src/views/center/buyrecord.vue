<script setup lang="ts">
import {apiGetBuyRecordInfo, BuyRecord as BuyRecordData} from "#/center/buyrecord"
import BuyRecord from "@/components/center/buyrecord.vue"

const route = useRoute()
const router = useRouter()
const recordId = ref(Number(route.query?.id).valueOf() || 0)

const record = ref(null as BuyRecordData | null)

const reload = () => {
  apiGetBuyRecordInfo(recordId.value as number).then((res) => {
    record.value = res.data.data as BuyRecordData
  }).catch(() => {
    router.push({
      path: "/system/error",
      query: {
        msg: "获取数据失败"
      }
    })
  })
}
reload()

</script>

<template>
  <div v-if="record" style="display: flex; justify-content: center; margin-top: 10px; margin-bottom: 10px">
    <div style="width: 50%;">
      <BuyRecord :zhifutishi="true" :record="record as BuyRecordData" :safe="true" :xiangqing="false" @reload="reload"></BuyRecord>
    </div>
  </div>
</template>

<style scoped lang="scss">

.wupin_name {
  display: inline-block;
  font-size: 1.5vw;
  font-weight: bold;
  margin-right: 5px;
  vertical-align: bottom;
  cursor: pointer;
}

.wupin_name:hover {
  text-decoration: underline;
}

.wupin_name:active {
  color: blue;
}

.wupin_tag {
  margin-top: 10px;
  margin-left: 5px;
}

.wupin_class_name {
  margin-top: 10px;
  display: inline-block;
  margin-left: 5px;
  font-size: 0.6vw;
}

.wupin_class_name_btn {
  margin-left: 1px;
  font-size: 0.6vw;
  vertical-align: bottom;
  cursor: pointer;
}

.wupin_class_name_btn:hover {
  text-decoration: underline;
}

.wupin_class_name_btn:active {
  color: blue;
}

</style>