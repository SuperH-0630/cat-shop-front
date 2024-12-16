<script setup lang="ts">
import ClassLst from '@/components/shop/classlist.vue'
import Search from "@/components/shop/search.vue"
import Ad from "@/components/shop/ad.vue"
import Hotwupinlist from "@/components/shop/hotwupinlist.vue"

const adDiv = ref(null)

</script>

<template>
  <div style="display: flex; justify-content: center; margin-top: 10px; margin-bottom: 10px">
    <div style="width: 65%;">
      <Search  style="margin-top: 10px; margin-bottom: 10px" :tyoe="-1"></Search>
      <div style="display: flex; flex-direction: row-reverse; justify-content: space-between; margin-top: 10px">
        <div style="margin-left: 2vw; flex-grow: 2">
          <Ad ref="adDiv"></Ad>
        </div>
        <div>
          <el-scrollbar :height="adDiv && adDiv.height">
            <ClassLst style="width: 100%"></ClassLst>
          </el-scrollbar>
        </div>
      </div>
    </div>
  </div>
  <div style="display: flex; justify-content: center; margin-top: 10px; margin-bottom: 10px">
    <div style="width: 90%; display: flex; justify-content: space-between; margin-top: 10px">
      <Hotwupinlist></Hotwupinlist>
    </div>
  </div>
</template>

<style scoped lang="scss">

#logo {
  float: left;
}

.avatar_logo {
  height: 8vh;
  width: 8vh;
  margin: 0 0 0 0;
  vertical-align: middle;
}

.title {
  font-size: 5vh;
  font-weight: bold;
  margin-left: 10px;
  vertical-align: middle;
}

.subtitle {
  font-size: 1.8vh;
  font-weight: normal;
  margin-left: 5px;
  vertical-align: middle;
}

.title_box {
  padding-top: 1vh;
}

.extrainfo{
  font-size: 2vh;
  margin-right: 10px;
  vertical-align: middle;
}

</style>
