<script setup lang="ts">
import {BuyRecordStatus} from "@/api/user"
import {formatDate} from "@/utils/time"
import {BuyRecord} from "@/api/user"
import {ElNotification} from "element-plus"
import router from "@/router"

const props = defineProps({
  "record": Object as PropType<BuyRecord>,
  "safe": Boolean,
  "zhifutishi": Boolean,
})

const safe = ref(props.safe || false)
const item = ref(props.record)

onMounted(() => {
  if (props.zhifutishi && item.value && item.value.status === 2) {
    ElNotification({
      title: '支付提示',
      message: '支付失败，请尝试重新支付',
      type: 'warning',
      duration: 0,
      position: 'top-left',
    })
  }
})

const onClassClick = () => {
  item.value && router.push({
    path: "/search",
    query: {
      "info": JSON.stringify({
        select: [item.value.wupin.classid],
        search: "",
      })
    }
  })
}

const onGoWupin = () => {
  item.value && router.push({
    path: "/wupin",
    query: {
      "id": item.value.id,
    }
  })
}

</script>

<template>
  <div>
    <el-card v-if="item" style="margin-right: 15px">
      <template #header>
        <div style="display: flow-root">
          <div style="float: left">
            <el-badge :value="record.wupin.tag" style="margin-top: 10px">
              <el-text class="wupin_name" @click="onGoWupin"> {{ record.wupin.name }} </el-text>
            </el-badge>
            <el-text class="wupin_class_name">
              商品来源：
              <el-text class="wupin_class_name_btn" @click="onClassClick"> {{ record.wupin.classOf.name }} > </el-text>
            </el-text>
          </div>
          <div v-if="safe && record.status === 2" style="float:right;">
            <el-button type="warning">
              重新支付
            </el-button>
          </div>
          <div v-if="safe && record.status === 4" style="float:right;">
            <el-button type="success">
              确认收获
            </el-button>
          </div>
          <div v-if="safe && ([5, 6].some((i) => i == record.status))" style="float:right;">
            <el-button type="danger">
              登记退货
            </el-button>
          </div>
          <div v-if="safe && record.status === 5" style="float:right;">
            <el-button type="success">
              前往评价
            </el-button>
          </div>
        </div>
      </template>
      <div>
        <el-text>
          当前状态：{{ (BuyRecordStatus[record.status]) || "未知" }}
        </el-text>
      </div>
      <div>
        <el-text>
          购买数量：{{ record.num }} 件
        </el-text>
      </div>
      <div>
        <el-text>
          付款金额：￥{{ ((record.price / 100).toFixed(2)) }}
        </el-text>
      </div>
      <div>
        <el-text>
          平均金额：￥{{ (((record.price / record.num) / 100).toFixed(2)) }}
        </el-text>
      </div>
      <div>
        <el-text>
          下单时间：{{ formatDate(record.time) }}
        </el-text>
      </div>
      <div v-if="[3, 4, 5, 6, 7, 8].some((i) => i == record.status)">
        <el-text>
          付款时间：{{ formatDate(record.fukuantime) }}
        </el-text>
      </div>
      <div v-if="[4, 5, 6, 7, 8].some((i) => i == record.status)">
        <el-text>
          发货时间：{{ formatDate(record.fahuotime) }}
        </el-text>
      </div>
      <div v-if="[4, 5, 6, 7, 8].some((i) => i == record.status) && record.kuaidi && record.kuaidinum">
        <el-text>
          发货快递公司：{{ record.kuaidi }}
        </el-text>
      </div>
      <div v-if="[4, 5, 6, 7, 8].some((i) => i == record.status) && record.kuaidi && record.kuaidinum">
        <el-text>
          发货运单号：{{ record.kuaidinum }}
        </el-text>
      </div>
      <div v-if="[5, 6, 7, 8].some((i) => i == record.status)">
        <el-text>
          到货时间：{{ formatDate(record.shouhuotime) }}
        </el-text>
      </div>
      <div v-if="[6, 7, 8].some((i) => i == record.status)">
        <el-text>
          评价时间：{{ formatDate(record.pingjiatime) }}
        </el-text>
      </div>
      <div v-if="[6, 7, 8].some((i) => i == record.status)">
        <el-text>
          评价：{{ record.isgood ? "好评" : "差评" }}
        </el-text>
      </div>
      <div v-if="[7, 8].some((i) => i == record.status)">
        <el-text>
          退货登记时间：{{ formatDate(record.dengjituihuotime) }}
        </el-text>
      </div>
      <div v-if="[7, 8].some((i) => i == record.status) && record.backkuaidi && record.backkuaidinum">
        <el-text>
          退货快递公司：{{ record.backkuaidi }}
        </el-text>
      </div>
      <div v-if="[7, 8].some((i) => i == record.status) && record.backkuaidi && record.backkuaidinum">
        <el-text>
          退运单号：{{ record.backkuaidinum }}
        </el-text>
      </div>
      <div v-if="[8].some((i) => i == record.status)">
        <el-text>
          退货到货时间：{{ formatDate(record.tuohuotime) }}
        </el-text>
      </div>
    </el-card>
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