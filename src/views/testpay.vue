<script setup lang="ts">
import {redirect, type, alipay, wechat, paytype, repay, shoppingbagpay, newpay} from "@/api/pay"

  const route = useRoute()
  const router = useRouter()

  const Type = ref(route.query?.[type] || alipay as string)
  const payname = ref("在线支付工具")
  if (Type.value == alipay) {
    payname.value = "支付宝"
  } else if (Type.value == wechat) {
    payname.value = "微信支付"
  }

  const PayType = ref(route.query?.[paytype] || repay as string)
  const paytypename = ref("网络购物")
  if (PayType.value == repay) {
    paytypename.value = "订单重新支付"
  } else if (PayType.value == shoppingbagpay) {
    paytypename.value = "购物车商品支付"
  } else if (PayType.value == newpay) {
    paytypename.value = "网络商品下单"
  }

  const goRedirect = () => {
    const redirectPath = route.query?.[redirect]
    if (typeof redirectPath === "string" && redirectPath.length > 0) {
      const p = decodeURIComponent(redirectPath)
      if (p.startsWith("http")) {
        window.location.href = p
      } else {
        window.location.href = window.location.origin + p
      }
    } else {
      router.push({
        "path": "/home",
      })
    }
  }

  const backSec = ref(6)
  const backTimer = () => {
    if (backSec.value == 0) {
      goRedirect()
      return
    }

    backSec.value = backSec.value - 1
    setTimeout(backTimer, 1000)
  }
  backTimer()
</script>

<template>
  <div style="display: flex; justify-content: center; margin-top: 10px; margin-bottom: 10px">
    <el-result
        icon="success"
        sub-title="Please follow the instructions"
    >
      <template #title>
        <el-text style="font-size: 1.2vw">
          您已经使用{{payname}}提交支付请求。
        </el-text>
      </template>
      <template #sub-title>
        <el-text style="font-size: 0.8vw">
          接下来请耐心等待支付的处理情况，一旦处理被支付成功，将会为您的商品尽快发货。<br>
          若您的支付被处理失败，您的自己将由{{payname}}退回到你的账号中，并且你的商品需要重新下单发货。<br>
          你的资金被用于：{{ paytypename }}。
        </el-text>
      </template>
      <template #extra>
        <el-button type="success" size="large" @click="goRedirect">
          返回
          （{{ backSec > 5 ? 5 : backSec }}s）
        </el-button>
      </template>
    </el-result>
  </div>
</template>

<style scoped lang="scss">

</style>