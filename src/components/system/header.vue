<script setup lang="ts">
import HeaderAdmin from "@/components/system/headeradmin.vue"
import HeaderCenter from "@/components/system/headercenter.vue"
const route = useRoute()

const isAdmin = computed(() => {
  return route.meta?.admin === true || route.meta?.rootAdmin === true
})

</script>

<template>
  <div style="height: 10vh">
    <HeaderAdmin v-if="isAdmin"></HeaderAdmin>
    <HeaderCenter v-else></HeaderCenter>
  </div>
</template>

<style scoped lang="scss">

</style>