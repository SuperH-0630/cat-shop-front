<script setup lang="ts">
  import {redirect, type, alipay, wechat} from "@/api/pay"

  const route = useRoute()
  const router = useRouter()

  const paytype = ref(route.query?.[type] || alipay as string)
  const payname = ref("在线支付工具")
  if (paytype.value == alipay) {
    payname.value = "支付宝"
  } else if (paytype.value == wechat) {
    payname.value = "微信支付"
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

  console.log("route.query", route.query)
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
          若您的支付被处理失败，您的自己将由{{payname}}退回到你的账号中，并且你的商品需要重新下单发货。
        </el-text>
      </template>
      <template #extra>
        <el-button type="success" @click="goRedirect" size="large">确认</el-button>
      </template>
    </el-result>
  </div>
</template>

<style scoped lang="scss">

</style>