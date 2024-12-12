<script setup lang="ts">
  import WupinItem from "@/components/wupinitem.vue"
  import useHotWupinStore from "@/store/hotwupin"

  const hotWupinStore = useHotWupinStore()
  hotWupinStore.getLstMust()
</script>

<template>
  <div class="classLst">
    <WupinItem v-for="(item, j) in hotWupinStore.wupinLst" :key="j" :wp="item"> </WupinItem>
  </div>
</template>

<style scoped lang="scss">

.classLst {
  display: flex;
  flex-flow: wrap;
  justify-content: space-between;
}

</style>