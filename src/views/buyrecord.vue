<script setup lang="ts">
import {getBuyRecordData, BuyRecord} from "@/api/buyrecord"

const route = useRoute()
const recordId = ref((route.query?.id || 0) as number)

const record = ref(null as BuyRecord | null)

const reload = () => {
  getBuyRecordData(recordId.value as number).then((res) => {
    record.value = res.data.data as BuyRecord
  })
}
reload()

</script>

<template>
  <div style="display: flex; justify-content: center; margin-top: 10px; margin-bottom: 10px">
    <div style="width: 50%;">
      <Defaultbuyrecord :record="record" :safe="true" :xiangqing="false" @reload="reload"></Defaultbuyrecord>
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