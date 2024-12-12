<script setup lang="ts">
  import {Wupin} from "@/store/hotwupin"
  import {Class} from "@/store/class"
  import WupinPic from "@/assets/images/logo.jpg"
  import useClassStore from "@/store/class"
  import { ElNotification } from 'element-plus'

  const route = useRoute()
  const router = useRouter()

  const wupinId = ref(route.query.id as number | null | undefined)
  if (!wupinId.value || wupinId.value <= 0) {
    router.push({
      name: "NotFound",
      query: {
        msg: "找不到物品",
      }
    })
  }

  const classStore = useClassStore()
  classStore.getLstMust()

  const classId = 2
  const classOf = classStore.findClass(classId) as Class | undefined | null

  if (!classOf) {
    router.push({
      name: "NotFound",
      query: {
        msg: "找不到分类",
      }
    })
  }

  const wupin = ref({
    id: wupinId.value,
    name: "物品" + wupinId.value,
    pic: WupinPic,
    classid: classId,
    classOf: classOf,
    tag: "爆卖！",
    hotPrice: 19999,
    realPrice: 19999,
    info: "<p style='font-size: 20px;'> 贵在坚持，成在创新：满满充满本事的比亚迪，贵在坚持，成在创新：满满充满本事的比亚迪，贵在坚持，成在创新：满满充满本事的比亚迪，贵在坚持，成在创新：满满充满本事的比亚迪，贵在坚持，成在创新：满满充满本事的比亚迪，贵在坚持，成在创新：满满充满本事的比亚迪 </p>" +
        "<p style='font-size: 20px;'> 贵在坚持，成在创新：满满充满本事的比亚迪，贵在坚持，成在创新：满满充满本事的比亚迪，贵在坚持，成在创新：满满充满本事的比亚迪，贵在坚持，成在创新：满满充满本事的比亚迪，贵在坚持，成在创新：满满充满本事的比亚迪，贵在坚持，成在创新：满满充满本事的比亚迪 </p>" +
        "<p style='font-size: 20px;'> 贵在坚持，成在创新：满满充满本事的比亚迪，贵在坚持，成在创新：满满充满本事的比亚迪，贵在坚持，成在创新：满满充满本事的比亚迪，贵在坚持，成在创新：满满充满本事的比亚迪，贵在坚持，成在创新：满满充满本事的比亚迪，贵在坚持，成在创新：满满充满本事的比亚迪 </p>" +
        "<p style='font-size: 20px;'> 贵在坚持，成在创新：满满充满本事的比亚迪，贵在坚持，成在创新：满满充满本事的比亚迪，贵在坚持，成在创新：满满充满本事的比亚迪，贵在坚持，成在创新：满满充满本事的比亚迪，贵在坚持，成在创新：满满充满本事的比亚迪，贵在坚持，成在创新：满满充满本事的比亚迪 </p>" +
        "<p style='font-size: 20px;'> 贵在坚持，成在创新：满满充满本事的比亚迪，贵在坚持，成在创新：满满充满本事的比亚迪，贵在坚持，成在创新：满满充满本事的比亚迪，贵在坚持，成在创新：满满充满本事的比亚迪，贵在坚持，成在创新：满满充满本事的比亚迪，贵在坚持，成在创新：满满充满本事的比亚迪 </p>" +
        "<p style='font-size: 20px;'> 贵在坚持，成在创新：满满充满本事的比亚迪，贵在坚持，成在创新：满满充满本事的比亚迪，贵在坚持，成在创新：满满充满本事的比亚迪，贵在坚持，成在创新：满满充满本事的比亚迪，贵在坚持，成在创新：满满充满本事的比亚迪，贵在坚持，成在创新：满满充满本事的比亚迪 </p>" +
        "<p style='font-size: 20px;'> 贵在坚持，成在创新：满满充满本事的比亚迪，贵在坚持，成在创新：满满充满本事的比亚迪，贵在坚持，成在创新：满满充满本事的比亚迪，贵在坚持，成在创新：满满充满本事的比亚迪，贵在坚持，成在创新：满满充满本事的比亚迪，贵在坚持，成在创新：满满充满本事的比亚迪 </p>" +
        "<p style='font-size: 20px;'> 贵在坚持，成在创新：满满充满本事的比亚迪，贵在坚持，成在创新：满满充满本事的比亚迪，贵在坚持，成在创新：满满充满本事的比亚迪，贵在坚持，成在创新：满满充满本事的比亚迪，贵在坚持，成在创新：满满充满本事的比亚迪，贵在坚持，成在创新：满满充满本事的比亚迪 </p>" +
        "<p style='font-size: 20px;'> 贵在坚持，成在创新：满满充满本事的比亚迪，贵在坚持，成在创新：满满充满本事的比亚迪，贵在坚持，成在创新：满满充满本事的比亚迪，贵在坚持，成在创新：满满充满本事的比亚迪，贵在坚持，成在创新：满满充满本事的比亚迪，贵在坚持，成在创新：满满充满本事的比亚迪 </p>" +
        "<p style='font-size: 20px;'> 贵在坚持，成在创新：满满充满本事的比亚迪，贵在坚持，成在创新：满满充满本事的比亚迪，贵在坚持，成在创新：满满充满本事的比亚迪，贵在坚持，成在创新：满满充满本事的比亚迪，贵在坚持，成在创新：满满充满本事的比亚迪，贵在坚持，成在创新：满满充满本事的比亚迪 </p>" +
        "<p style='font-size: 20px;'> 贵在坚持，成在创新：满满充满本事的比亚迪，贵在坚持，成在创新：满满充满本事的比亚迪，贵在坚持，成在创新：满满充满本事的比亚迪，贵在坚持，成在创新：满满充满本事的比亚迪，贵在坚持，成在创新：满满充满本事的比亚迪，贵在坚持，成在创新：满满充满本事的比亚迪 </p>" +
        "<p style='font-size: 20px;'> 贵在坚持，成在创新：满满充满本事的比亚迪，贵在坚持，成在创新：满满充满本事的比亚迪，贵在坚持，成在创新：满满充满本事的比亚迪，贵在坚持，成在创新：满满充满本事的比亚迪，贵在坚持，成在创新：满满充满本事的比亚迪，贵在坚持，成在创新：满满充满本事的比亚迪 </p>" +
        "<p style='font-size: 20px;'> 贵在坚持，成在创新：满满充满本事的比亚迪，贵在坚持，成在创新：满满充满本事的比亚迪，贵在坚持，成在创新：满满充满本事的比亚迪，贵在坚持，成在创新：满满充满本事的比亚迪，贵在坚持，成在创新：满满充满本事的比亚迪，贵在坚持，成在创新：满满充满本事的比亚迪 </p>" +
        "<p style='font-size: 20px;'> 贵在坚持，成在创新：满满充满本事的比亚迪，贵在坚持，成在创新：满满充满本事的比亚迪，贵在坚持，成在创新：满满充满本事的比亚迪，贵在坚持，成在创新：满满充满本事的比亚迪，贵在坚持，成在创新：满满充满本事的比亚迪，贵在坚持，成在创新：满满充满本事的比亚迪 </p>" +
        "<p style='font-size: 20px;'> 贵在坚持，成在创新：满满充满本事的比亚迪，贵在坚持，成在创新：满满充满本事的比亚迪，贵在坚持，成在创新：满满充满本事的比亚迪，贵在坚持，成在创新：满满充满本事的比亚迪，贵在坚持，成在创新：满满充满本事的比亚迪，贵在坚持，成在创新：满满充满本事的比亚迪 </p>" +
        "<p style='font-size: 20px;'> 贵在坚持，成在创新：满满充满本事的比亚迪，贵在坚持，成在创新：满满充满本事的比亚迪，贵在坚持，成在创新：满满充满本事的比亚迪，贵在坚持，成在创新：满满充满本事的比亚迪，贵在坚持，成在创新：满满充满本事的比亚迪，贵在坚持，成在创新：满满充满本事的比亚迪 </p>" +
        "<p style='font-size: 20px;'> 贵在坚持，成在创新：满满充满本事的比亚迪，贵在坚持，成在创新：满满充满本事的比亚迪，贵在坚持，成在创新：满满充满本事的比亚迪，贵在坚持，成在创新：满满充满本事的比亚迪，贵在坚持，成在创新：满满充满本事的比亚迪，贵在坚持，成在创新：满满充满本事的比亚迪 </p>" +
        "<p style='font-size: 20px;'> 贵在坚持，成在创新：满满充满本事的比亚迪，贵在坚持，成在创新：满满充满本事的比亚迪，贵在坚持，成在创新：满满充满本事的比亚迪，贵在坚持，成在创新：满满充满本事的比亚迪，贵在坚持，成在创新：满满充满本事的比亚迪，贵在坚持，成在创新：满满充满本事的比亚迪 </p>",
    phone: "17322061610",
    email: "songzihuan@song-zh.com",
    location: "广东广州",
    wechat: "12345",
    buytotal: 100,
    buygood: 90,
  } as Wupin)


  const onClassClick = () => {
    router.push({
      path: "/search",
      query: {
        "info": JSON.stringify({
          select: [classId],
          search: "",
        })
      }
    })
  }

  const num = ref(1)
  const facePrice = computed(() => {
    if (typeof wupin.value.hotPrice === "number") {
      if (wupin.value.hotPrice < wupin.value.realPrice && wupin.value.hotPrice > 0) {
        return wupin.value.hotPrice
      } else if (wupin.value.hotPrice <= 0) {
        return 0
      } 
      return wupin.value.realPrice
    } else if (typeof wupin.value.realPrice === "number") {
      if (wupin.value.realPrice >= 0) {
        return wupin.value.realPrice
      } 
      return 0
    }
  })
  const realPrice = ref(wupin.value.realPrice >= 0 ? wupin.value.realPrice : 0)
  const totalPrice = computed(() => (((facePrice.value as number / 100) * num.value).toFixed(2)))

  const totalBuy = ref(wupin.value.buytotal >= 0 ? wupin.value.buytotal : 0)
  const totalBuyGood = ref(wupin.value.buygood >= 0 ? wupin.value.buygood : 0)

  if (totalBuyGood.value > totalBuy.value) {
    totalBuyGood.value = totalBuy.value
  }

  const goodBuyPre = computed(() => (totalBuyGood.value / totalBuy.value) * 100)
  const goodBuyMsg = ref("好评如潮")
  if (goodBuyPre.value >= 85) {
    goodBuyMsg.value = "好评如潮"
  } else if (goodBuyPre.value >= 50) {
    goodBuyMsg.value = "部分好评"
  } else if (goodBuyPre.value >= 30) {
    goodBuyMsg.value = "好评甚少"
  } else {
    goodBuyMsg.value = "谨慎购买"
  }

  const onClickBag = () => {
    ElNotification({
      title: '已经加入购物车',
      message: `尊敬的用户您好，我们已经将${num.value}件${wupin.value.name}添加到您的购物车。请您进行接下来的操作。若现在购买，预测价格为￥${totalPrice.value}。`,
      duration: 0,
      type: "success",
      position: 'top-left',
    })
  }
</script>

<template>
  <div style="display: flex; justify-content: center; margin-top: 10px; margin-bottom: 10px">
    <div style="display: flex; max-width: 75%; justify-content: center; margin-top: 10px">
      <div style="display: inline-block; width: 15vw; max-height: 80vh; min-height: 60vh; margin-right: 20px; margin-left: 20px">
        <el-scrollbar height="80vh">
          <el-image :src="wupin.pic" fit="contain" style="height: auto; width: 100%" :initial-index="0" :preview-src-list="[wupin.pic]"></el-image>
          <div>
            <div v-if="wupin.phone" class="wupin_info_box">
              <el-text class="wupin_info_text">
                <el-icon><Iphone /></el-icon>
                客服专属电话
                {{ wupin.phone }}
              </el-text>
            </div>
            <div v-if="wupin.email" class="wupin_info_box">
              <el-text class="wupin_info_text">
                <el-icon><Message /></el-icon>
                客服专属邮箱
                {{ wupin.email }}
              </el-text>
            </div>
            <div v-if="wupin.wechat" class="wupin_info_box">
              <el-text class="wupin_info_text">
                <el-icon><Service /></el-icon>
                客服专属微信
                {{ wupin.wechat }}
              </el-text>
            </div>

            <el-divider border-style="solid" content-position="left" style="margin-top: 50px;">
              购物数据
            </el-divider>

            <div class="wupin_buy_total_box" style="margin-top: 0">
              <el-text class="wupin_buy_total_text">
                <el-icon><UserFilled /></el-icon>
                购买人数：
                {{ totalBuy }}
              </el-text>
            </div>

            <div class="wupin_buy_total_box">
              <el-text class="wupin_buy_total_text">
                <el-icon><IceCream /></el-icon>
                购买好评人数：
                {{ totalBuyGood }}
              </el-text>
            </div>

            <div class="wupin_buy_total_box">
              <el-text class="wupin_buy_total_text">
                <el-icon><Goblet /></el-icon>
                购买好评率：
                <el-badge :value="goodBuyMsg">
                  {{ goodBuyPre.toFixed(2) }}%
                </el-badge>
              </el-text>
            </div>
          </div>
        </el-scrollbar>
      </div>
      <div style="display: inline-block; width: 60vw; max-height: 85vh; margin-right: 20px; margin-left: 20px">
        <el-scrollbar height="80vh">
          <el-badge :value="wupin.tag" style="margin-top: 10px">
            <el-text class="wupin_name"> {{ wupin.name }} </el-text>
          </el-badge>
          <el-text class="wupin_class_name">
            商品来源：
            <el-text class="wupin_class_name_btn" @click="onClassClick"> {{ wupin.classOf.name }} > </el-text>
          </el-text>
          <div class="price_box">
            <div v-if="facePrice == 0">
              <el-text class="wupin_hot_price">
                <el-icon><BellFilled /></el-icon>
                现在：免费抢购
                <el-text v-if="realPrice > 0" class="wupin_hot_real_price">
                  原价：￥{{ (realPrice / 100).toFixed(2) }}
                </el-text>
              </el-text>
            </div>
            <div v-else-if="facePrice < realPrice">
              <el-text class="wupin_hot_price">
                <el-icon><GobletSquareFull /></el-icon>
                促销：￥{{ (facePrice / 100).toFixed(2) }} / 件
                <el-text v-if="realPrice > 0" class="wupin_hot_real_price">
                  原价：￥{{ (realPrice / 100).toFixed(2) }} / 件
                </el-text>
                <el-text v-if="realPrice > 0" class="wupin_hot_real_price">
                  惊喜：{{ ((facePrice / realPrice) * 10).toFixed(1) }} 折扣
                </el-text>
              </el-text>
            </div>
            <div v-else-if="facePrice > realPrice">
<!--              不应该出现此情况-->
              <el-text class="wupin_sb_price">
                <el-icon><Pouring /></el-icon>
                冤种价：￥{{ (facePrice / 100).toFixed(2) }} / 件
                <el-text v-if="realPrice > 0" class="wupin_sb_real_price">
                  原价：￥{{ (realPrice / 100).toFixed(2) }} / 件
                </el-text>
              </el-text>
            </div>
            <div v-else-if="facePrice == realPrice">
              <el-text class="wupin_real_price">
                <el-icon><Shop /></el-icon>
                售价：￥{{ (facePrice / 100).toFixed(2) }} / 件
              </el-text>
            </div>
            <div v-else-if="realPrice == 0">
<!--              不应该出现此情况-->
              <el-text class="wupin_sb_price">
                <el-icon><Pouring /></el-icon>
                冤种价：￥{{ (facePrice / 100).toFixed(2) }} / 件
                <el-text v-if="realPrice > 0" class="wupin_sb_real_price">
                  原价：免费送
                </el-text>
              </el-text>
            </div>
            <div v-else>
<!--              不应该出现此情况-->
              <el-text class="wupin_real_price">
                <el-icon><Shop /></el-icon>
                售价：￥{{ (facePrice / 100).toFixed(2) }} / 件
                <el-text v-if="realPrice > 0" class="wupin_else_real_price">
                  原价：￥{{ (realPrice / 100).toFixed(2) }} / 件
                </el-text>
              </el-text>
            </div>
          </div>

          <div style="display: flex; justify-content: left">
            <el-input-number v-model="num" :min="1" :max="99" size="large" class="buy_item" style="margin-left: 0px">
              <template #suffix>
                <span> 件 </span>
              </template>
            </el-input-number>
            <el-button class="buy_item" size="large" @click="onClickBag">
              <el-icon style="margin-right: 3px"><Handbag /></el-icon> 加入购物车
            </el-button>
            <el-button class="buy_item" size="large">
              <el-icon style="margin-right: 3px"><Money /></el-icon> 立即购买（实际价格：{{ facePrice > 0 ? "￥" + totalPrice : "免费" }}）
            </el-button>
          </div>
          <div class="info_box">
            <div v-html="wupin.info"></div>
          </div>
        </el-scrollbar>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .wupin_name {
    display: inline-block;
    font-size: 1.8vw;
    font-weight: bold;
    margin-right: 5px;
    vertical-align: bottom;
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

  .price_box {
    margin-top: 10px;
    margin-bottom: 10px;
  }

  .wupin_hot_price {
    color: red;
    font-size: 1vw;
  }

  .wupin_hot_real_price {
    margin-left: 5px;
    color: black;
    font-size: 0.7vw;
    text-decoration: line-through;
  }

  .wupin_sb_price {
    color: blue;
    font-size: 1vw;
  }

  .wupin_sb_real_price {
    margin-left: 5px;
    color: black;
    font-size: 0.7vw;
    text-decoration: line-through;
  }

  .wupin_real_price {
    color: black;
    font-size: 1vw;
  }

  .wupin_else_real_price {
    margin-left: 5px;
    color: black;
    font-size: 0.7vw;
    text-decoration: line-through;
  }

  .buy_item {
    margin-left: 3px;
    margin-right: 3px;
  }

  .info_box {
    margin-top: 10px;
  }

  .wupin_info_text {
    font-size: 0.6vw;
  }

  .wupin_info_box {
    margin-top: 1px;
    margin-bottom: 1px;
  }

  .wupin_buy_total_text {
    font-size: 0.6vw;
  }

  .wupin_buy_total_box {
    margin-top: 1px;
    margin-bottom: 1px;
  }
</style>