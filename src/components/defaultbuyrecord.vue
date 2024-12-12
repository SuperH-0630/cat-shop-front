<script setup lang="ts">
import {BuyRecordStatus} from "@/api/user"
import {formatDate} from "@/utils/time"
import {BuyRecord} from "@/api/user"

const props = defineProps({
  "record": Object as PropType<BuyRecord>,
})

const item = ref(props.record)
const router = useRouter()

const goBuyRecord = () => {
  router.push({
    path: "/center/buyrecord",
    query: {
      id: item.value.id,
    }
  })
}

</script>

<template>
  <div>
    <el-card style="margin-right: 15px">
      <template #header>
        <div style="display: flow-root">
          <div style="float: left">
            <el-text class="record_header_text">
              {{ item.wupin.name }}
            </el-text>
          </div>
          <div style="float: right">
            <el-button @click="goBuyRecord">
              <el-icon style="margin-right: 5px"><Shop /></el-icon>
              查看详情
            </el-button>
          </div>
        </div>
      </template>
      <div>
        <el-text>
          当前状态：{{ BuyRecordStatus[item.status] || "未知" }}
        </el-text>
      </div>
      <div>
        <el-text>
          下单时间：{{ formatDate(item.time) }}
        </el-text>
      </div>
      <div>
        <el-text>
          购买数量：{{ item.num }} 件
        </el-text>
      </div>
      <div>
        <el-text>
          付款金额：￥{{ (item.price / 100).toFixed(2) }}
        </el-text>
      </div>
    </el-card>
  </div>
</template>

<style scoped lang="scss">

.record_header_text {
  font-size: 0.8vw;
}

</style>