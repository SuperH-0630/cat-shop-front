<script setup lang="ts">
import AD from "@/assets/images/ad.jpeg"

const showAD = ref({} as { id: number, pic: string, text: string, header: string })
showAD.value = {
  id: 1,
  pic: AD,
  text: "比亚迪，智领未来，引领绿色出行！作为全球新能源技术的先锋，比亚迪凭借卓越的自主研发和创新实力，打造高性能电动汽车，成就绿色科技与卓越驾控的完美融合。从刀片电池到e平台技术，每一次突破都树立行业标杆。比亚迪汽车不仅续航无忧，动力强劲，更以智能、安全、环保，赢得全球消费者信赖。选择比亚迪，就是选择环保出行，拥抱科技未来！比亚迪，向新而行，驶向明天的辉煌！",
  header: "这是一个广告"
}

const adDiv = ref(null as HTMLElement | null)
const height = ref(0)

const resizeObserver = new ResizeObserver((entries) => {
  entries.forEach(entry => {
    height.value = entry.contentRect.height
  })
})

onMounted(() => {
  if (adDiv.value) {
    resizeObserver.observe(adDiv.value)
  }
})

defineExpose({
  height
})

</script>

<template>
  <div v-if="showAD" id="ad_box">
    <div id="ad_text">
      <el-card>
        <template #header>
          广告：{{ showAD.header }}
        </template>
        <el-text>
          {{ showAD.text }}
        </el-text>
      </el-card>
    </div>
    <div id="ad_pic" ref="adDiv">
      <el-image :src="showAD.pic" fit="contain"> </el-image>
    </div>
  </div>
</template>

<style scoped lang="scss">
.el-card {
  display: block;
}

.el-image {
  display: block;
}

#ad_box {
  display: flex;
  justify-content: center;
  min-width: 45vw;
}

#ad_pic {
  flex-grow: 2;
  margin-left: 10px;
}

#ad_text {
  display: flex;
  max-width: 15vw;
  flex-grow: 1;
  margin-left: 10px;
}

</style>