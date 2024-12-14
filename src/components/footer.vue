<script setup lang="ts">
import useConfigStore from "@/store/config";

const configStore = useConfigStore()

</script>

<template>
<div v-if="configStore.config.footer && configStore.config.footer.length > 0" style="display: flex; justify-content: center; min-height: 2vh; width: 100%">
  <div class="box">
    <el-text class="txt">
      {{ configStore.config.footer }}
    </el-text>
  </div>
</div>
<div v-else></div>
</template>

<style scoped lang="scss">
.txt {
  font-size: 0.7vw;
  color: black;
  margin-bottom: 5px;
  margin-top: 5px;
}

.box {
  display: flex;
  justify-content: center;

  min-width: 30vw;
  padding-left: 10px;
  padding-right: 10px;
  padding-top: 2px;
  background-color: rgba(255, 255, 255, 0.8);
  border-top-right-radius: 5px;
  border-top-left-radius: 5px;
  box-shadow: 4px -2px rgba(0, 0, 0, 0.3)
}

</style>