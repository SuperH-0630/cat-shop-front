<script setup lang="ts">
  import useWechatStore from "@/store/wechat"
  import useConfigStore from "@/store/config"

  const wechatStore = useWechatStore()
  const configStore = useConfigStore()

  const onClick = () => {
    wechatStore.close()
  }

  const img_width = ref("8vw")
  const img_height = ref("auto")
  const showWechat = ref(true)

  const onShow = () => {
    img_width.value = "auto"
    img_height.value = "70vh"
    showWechat.value = false
  }

  const onClose = () => {
    img_width.value = "8vw"
    img_height.value = "auto"
    showWechat.value = true
  }

  const deleayShow = ref(false)

  onMounted(() => {
    setTimeout(() => {
      deleayShow.value = true
    }, 1500)
  })

</script>

<template>
  <div v-if="wechatStore.show && deleayShow" class="wechat">
    <div class="wechat_box">
      <el-card>
        <template v-if="showWechat" #header>
          <div class="header">
            <el-text class="header_text">
              欢迎了解我！
            </el-text>
          </div>
        </template>
        <div class="wechat_img">
          <el-image :src="configStore.config?.wechat" fit="contain" :preview-src-list="[configStore.config?.wechat]" :initial-index="0" @show="onShow" @close="onClose"> </el-image>
        </div>
        <template v-if="showWechat" #footer>
          <div style="display: flex; justify-content: center;">
            <el-button @click="onClick">
              关闭
            </el-button>
          </div>
        </template>
      </el-card>
    </div>
  </div>
  <div v-else></div>
</template>

<style scoped lang="scss">

.wechat {
  position: fixed;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
}

.wechat_box {
  padding: 5px;
}

.wechat_img {
  display: flex;
  justify-content: center;
  align-items: center;
  width: v-bind(img_width);
  height: v-bind(img_height);
}

.header {
  display: flex;
  justify-content: center;
}

.header_text {
  font-size: 0.8vm;
  font-weight: bold;
}

</style>