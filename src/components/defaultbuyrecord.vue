<script setup lang="ts">
import {BuyRecordStatus, BuyRecord} from "@/api/buyrecord"
import {formatDate} from "@/utils/time"
import {ElNotification} from "element-plus"
import router from "@/router"
import {aliRepay, wechatRepay} from "@/api/pay";

const props = defineProps({
  "record": {
    type: Object as PropType<BuyRecord>,
    required: true
  },
  "safe":  {
    type: Boolean,
    default: false,
  },
  "zhifutishi":  {
    type: Boolean,
    default: false,
  },
  "xiangqing": {
    type: Boolean,
    default: false,
  }
})

const record = computed(() => props.record)
const safe = computed(() => props.safe)
const zhifutishi = computed(() => props.zhifutishi)
const xiangqing = computed(() => props.xiangqing)

onMounted(() => {
  if (zhifutishi.value && record.value && record.value.status === 2) {
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
  record.value && router.push({
    path: "/search",
    query: {
      "info": JSON.stringify({
        select: [record.value.wupin.classid],
        search: "",
      })
    }
  })
}

const onGoWupin = () => {
  record.value && router.push({
    path: "/wupin",
    query: {
      "id": record.value.wupinid,
    }
  })
}

const onXiangQing = () => {
  record.value && router.push({
    path: "/center/buyrecord",
    query: {
      "id": record.value.id,
    }
  })
}

function getRandomInt(max: number) {
  return Math.floor(Math.random() * max)
}

const a = ref(getRandomInt(10))
const b = ref(getRandomInt(10))
const resetCode = () => {
  a.value = getRandomInt(10)
  b.value = getRandomInt(10)
  code.value = ""
}
const code = ref("")
const answer = computed(() => a.value + b.value)
const question = computed(() => `${a.value} + ${b.value}`)
const codeCheck = computed(() => Number(code.value).valueOf() === answer.value)

const repayModel = ref(false)
const repayForm = ref({
  password: "",
})

const passwordCheck = computed(() => repayForm.value.password && repayForm.value.password.length > 0)// 登录阶段不检查密码
const repayAllCheck = computed(() => codeCheck.value && passwordCheck.value)

const startRepay = () => {
  if (!record.value || record.value.status !== 2) {
    return
  }

  resetCode()
  repayModel.value = true
}

const doAliRepay = () => {
  if (!record.value || record.value.status !== 2) {
    return
  }

  return aliRepay(record.value.id, window.location.href).then((res) => {
    if (!res.data.data.url) {
      ElMessage({
        type: "error",
        message: "支付失败，请重试",
      })
    } else {
      window.location.href = res.data.data.url
    }
  })
}

const doWeChatRepay = () => {
  if (!record.value || record.value.status !== 2) {
    return
  }

  return wechatRepay(record.value.id, window.location.href).then((res) => {
    if (!res.data.data.url) {
      ElMessage({
        type: "error",
        message: "支付失败，请重试",
      })
    } else {
      window.location.href = res.data.data.url
    }
  })
}

</script>

<template>
  <div>
    <el-card v-if="record" style="margin-right: 15px">
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
          <div v-if="xiangqing" style="float:right;">
            <el-button type="success" @click="onXiangQing">
              查看详情
            </el-button>
          </div>
          <div v-if="safe && record.status === 2" style="float:right;">
            <el-button type="warning" @click="startRepay">
              重新支付
            </el-button>
          </div>
          <div v-if="safe && record.status === 4" style="float:right;">
            <el-button type="success">
              确认收获
            </el-button>
          </div>
          <div v-if="safe && record.status === 5" style="float:right;">
            <el-button type="success">
              前往评价
            </el-button>
          </div>
          <div v-if="safe && ([5, 6].some((i) => i == record.status))" style="float:right;">
            <el-button type="danger">
              重新申请退货
            </el-button>
          </div>
          <div v-if="safe && record.status === 8" style="float:right;">
            <el-button-group>
              <el-button type="primary">
                查看退货地址
              </el-button>
              <el-button type="success">
                登记退货信息
              </el-button>
            </el-button-group>
          </div>
          <div v-if="safe && record.status === 9" style="float:right;">
            <el-button type="danger">
              重新申请退货
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
      <div v-if="[3, 4, 5, 6, 7, 8, 9, 10].some((i) => i == record.status)">
        <el-text>
          付款时间：{{ formatDate(record.fukuantime) }}
        </el-text>
      </div>
      <div v-if="[4, 5, 6, 7, 8, 9, 10].some((i) => i == record.status)">
        <el-text>
          发货时间：{{ formatDate(record.fahuotime) }}
        </el-text>
      </div>
      <div v-if="[4, 5, 6, 7, 8, 9, 10].some((i) => i == record.status) && record.kuaidi && record.kuaidinum">
        <el-text>
          发货快递公司：{{ record.kuaidi }}
        </el-text>
      </div>
      <div v-if="[4, 5, 6, 7, 8, 9, 10].some((i) => i == record.status) && record.kuaidi && record.kuaidinum">
        <el-text>
          发货运单号：{{ record.kuaidinum }}
        </el-text>
      </div>
      <div v-if="[5, 6, 7, 8, 9, 10].some((i) => i == record.status)">
        <el-text>
          到货时间：{{ formatDate(record.shouhuotime) }}
        </el-text>
      </div>
      <div v-if="[6, 7, 8, 9, 10].some((i) => i == record.status)">
        <el-text>
          评价时间：{{ formatDate(record.pingjiatime) }}
        </el-text>
      </div>
      <div v-if="[6, 7, 8, 9, 10].some((i) => i == record.status)">
        <el-text>
          评价：{{ record.isgood ? "好评" : "差评" }}
        </el-text>
      </div>
      <div v-if="[7, 8, 9, 10].some((i) => i == record.status)">
        <el-text>
          申请退货时间：{{ formatDate(record.dengjituihuotime) }}
        </el-text>
      </div>
      <div v-if="record.status === 8">
        <el-text>
          申请退货情况：卖家同意退货，请尽快根据地址寄回商品，并上传物流信息。
        </el-text>
      </div>
      <div v-if="record.status === 9">
        <el-text>
          申请退货情况：卖家不同意退货，请联系卖家。
        </el-text>
      </div>
      <div v-if="record.status === 10">
        <el-text>
          申请退货情况：商家确认退货成功。
        </el-text>
      </div>
      <div v-if="[8, 10].some((i) => i == record.status)">
        <el-text>
          同意退货时间：{{ formatDate(record.querentuihuotime) }}
        </el-text>
      </div>
      <div v-if="[8, 10].some((i) => i == record.status) && record.backkuaidi && record.backkuaidinum">
        <el-text>
          退货快递公司：{{ record.backkuaidi }}
        </el-text>
      </div>
      <div v-if="[8, 10].some((i) => i == record.status) && record.backkuaidi && record.backkuaidinum">
        <el-text>
          退运单号：{{ record.backkuaidinum }}
        </el-text>
      </div>
      <div v-if="[8, 10].some((i) => i == record.status)">
        <el-text>
          退货到货时间：{{ formatDate(record.tuohuotime) }}
        </el-text>
      </div>
    </el-card>
  </div>
  <el-dialog
      v-model="repayModel"
      width="25%"
  >
    <template #title>
      <div style="width: 100%; display: flex; justify-content: center">
        <el-text style="font-size: 1vw">
          重新支付订单
        </el-text>
      </div>
    </template>

    <div style="width: 100%; display: flex; justify-content: center">
      <div>
        <div class="repay_box">
          <div class="repay_info">
            <el-text>
              购买数量：{{ record.num }} 件
            </el-text>
          </div>
          <div class="repay_info">
            <el-text>
              平均金额：￥{{ (((record.price / record.num) / 100).toFixed(2)) }}
            </el-text>
          </div>
          <div class="repay_info">
            <el-text class="pay_price">
              付款金额：￥{{ ((record.price / 100).toFixed(2)) }}
            </el-text>
          </div>
        </div>
        <el-divider style="margin-top: 30px"></el-divider>
        <div>
          <el-form :model="repayForm" label-width="auto" style="width: 15vw">
            <el-form-item>
              <template #label>
                <el-text>账号密码</el-text>
              </template>
              <el-input v-model="repayForm.password" type="password" show-password />
            </el-form-item>
            <el-form-item>
              <template #label>
                <el-text>验证码</el-text>
              </template>
              <el-input v-model="code">
                <template #append>
                  <el-text>
                    {{ question }}
                  </el-text>
                </template>
              </el-input>
            </el-form-item>
          </el-form>
        </div>
        <div style="width: 15vw; margin-top: 5px; display: flex; justify-content: center">
          <el-button-group>
            <el-button type="info" @click="repayModel = false">取消支付</el-button>
            <el-button :disabled="!repayAllCheck" type="primary" @click="doAliRepay">
              支付宝支付
            </el-button>
            <el-button :disabled="!repayAllCheck" type="success" @click="doWeChatRepay">
              微信支付
            </el-button>
          </el-button-group>
        </div>
        <div style="width: 15vw; margin-top: 5px">
          <div class="tip_box" style="display: flex; justify-content: center">
            <el-alert v-if="!codeCheck" title="请输入正确的验证码！" :closable="false" type="warning" center show-icon>
            </el-alert>
          </div>
          <div class="tip_box" style="display: flex; justify-content: center">
            <el-alert v-if="!passwordCheck" title="请输入密码！" :closable="false" type="warning" center show-icon>
            </el-alert>
          </div>
        </div>
      </div>
    </div>
  </el-dialog>
</template>

<style scoped lang="scss">
.tip_box {
  margin-top: 5px;
}

.repay_info {
  margin-top: 5px;
}

.pay_price {
  font-size: 0.8vw;
  color: red;
  font-weight: bold;
}

.repay_box {
  margin-top: 5px;
  margin-bottom: 5px;
}

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