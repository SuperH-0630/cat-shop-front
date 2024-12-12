<script setup lang="ts">
  import useUserStore from "@/store/user"
  import {Edit} from "@element-plus/icons-vue"
  import {BuyRecord, getUserBuyRecord} from "@/api/user"
  import Defaultbuyrecord from "@/components/defaultbuyrecord.vue";

  const route = useRoute()
  const router = useRouter()

  const userStore = useUserStore()
  if (!userStore.isLogin) {
    router.push({
      path: "/login",
      query: {
        redirect: route.fullPath
      }
    })
  }

  userStore.updateInfo()

  const goHome = () => {
    router.push({
      path: "/home"
    })
  }

  let offset = 0
  const limit = 3
  const stop = ref(false)

  const buyRecord = ref([] as BuyRecord[])
  const updater = () => {
    if (stop.value) {
      return
    }

    getUserBuyRecord(offset, limit).then((res) => {
      console.log("res", res)
      if (res.data.data.total < limit) {
        stop.value = true
      }

      offset += res.data.data.total
      buyRecord.value = buyRecord.value.concat(res.data.data.list)
      console.log("res.data.data.list", res.data.data.list)
      console.log("buyRecord.value", buyRecord.value)
    })
  }
  updater()

  const kehutag = ref("普通客户")
  if (userStore.goodPre >= 85) {
    kehutag.value = "尊享III客户"
  } else if (userStore.goodPre >= 50) {
    kehutag.value = "星级II客户"
  } else if (userStore.goodPre >= 35) {
    kehutag.value = "贵宾I客户"
  } else if (userStore.goodPre >= 5) {
    kehutag.value = "高级客户"
  } else {
    kehutag.value = "普通客户"
  }

</script>

<template>
  <div style="display: flex; justify-content: center; margin-top: 10px; margin-bottom: 10px">
    <el-card style="display: flex; max-width: 75%; justify-content: center; margin-top: 10px">
      <div style="display: inline-block; width: 15vw; max-height: 75vh; min-height: 60vh; margin-right: 20px; margin-left: 20px">
        <el-scrollbar height="75vh">
          <div style="padding-right: 15px">
            <el-image :src="userStore.avatar" fit="contain" style="margin-right: 15px; height: auto; width: 100%; border-radius: 20px" :initial-index="0" :preview-src-list="[userStore.avatar]"></el-image>
            <div style="margin-right: 15px">
              <div class="user_info_box">
                <el-button-group>
                  <el-button class="user_info_text" type="success">
                    <el-icon><Edit /></el-icon>
                    更改个人信息
                  </el-button>
                  <el-button class="user_info_text" type="primary">
                    <el-icon><Edit /></el-icon>
                    更换头像
                  </el-button>
                </el-button-group>
              </div>
              <div class="user_info_box">
                <el-text class="user_info_text">
                  <el-icon><Iphone /></el-icon>
                  电话：
                  {{ userStore.phone ? userStore.phone : "暂无" }}
                </el-text>
              </div>
              <div class="user_info_box">
                <el-text class="user_info_text">
                  <el-icon><Location /></el-icon>
                  地址：
                  {{ userStore.location ? userStore.location : "暂无" }}
                </el-text>
              </div>

              <el-divider border-style="solid" content-position="left" style="margin-top: 50px;">
                消费统计
              </el-divider>

              <div class="user_info_box">
                <el-text class="user_info_text">
                  消费物品总件数：{{ userStore.totalJian >= 0 ? userStore.totalJian : 0 }} 件
                </el-text>
              </div>

              <div class="user_info_box">
                <el-text class="user_info_text">
                  消费总次数：{{ userStore.totalBuy >= 0 ? userStore.totalBuy : 0 }} 次
                </el-text>
              </div>

              <div class="user_info_box">
                <el-text class="user_info_text">
                  消费总金额：
                  ￥{{ userStore.totalPrice >= 0 ? (userStore.totalPrice / 100).toFixed(2) : "0.00" }}
                </el-text>
              </div>

              <div class="user_info_box">
                <el-text class="user_info_text">
                  收获总次数：{{ userStore.totalShouHuo >= 0 ? userStore.totalShouHuo : 0 }} 次
                </el-text>
              </div>

              <div class="user_info_box">
                <el-text class="user_info_text">
                  消费好评次数：{{ userStore.totalGood >= 0 ? userStore.totalGood : 0 }} 次
                </el-text>
              </div>

              <div class="user_info_box">
                <el-text class="user_info_text">
                  消费好评率：{{ userStore.goodPre.toFixed(2) }} %
                </el-text>
              </div>

              <div class="user_info_box">
                <el-text class="user_info_text">
                  平均每笔交易金额：￥{{ (userStore.pricePre / 100).toFixed(2) }}
                </el-text>
              </div>
            </div>
          </div>
        </el-scrollbar>
      </div>
      <div style="display: inline-block; width: 35vw; max-height: 85vh; margin-right: 20px; margin-left: 20px">
        <el-scrollbar height="75vh">
          <el-badge :value="kehutag" style="margin-top: 10px">
            <el-text class="user_name"> {{ userStore.name }} </el-text>
          </el-badge>
          <div v-if="buyRecord.length === 0" style="margin-top: 10px">
            <el-result icon="info" title="文学提示">
              <template #sub-title>
                <p>你还没有任何购买记录。</p>
                <p>你可以去主页看看，那里或许有你想要的。</p>
              </template>
              <template #extra>
                <el-button type="success" size="large" @click="goHome">去首页看看</el-button>
              </template>
            </el-result>
          </div>
          <div v-else style="margin-top: 10px">
            <div v-infinite-scroll="updater"  style="overflow: auto">
              <div v-for="(item, index) in buyRecord" :key="index">
                <Defaultbuyrecord :record="item" class="buy_record_box"></Defaultbuyrecord>
              </div>
            </div>
          </div>
        </el-scrollbar>
      </div>
    </el-card>
  </div>
</template>

<style scoped lang="scss">
  .user_name {
    display: inline-block;
    font-size: 1.8vw;
    font-weight: bold;
    margin-right: 5px;
    vertical-align: bottom;
  }

  .buy_record_box {
    margin-top: 5px;
    margin-bottom: 5px;
  }
</style>