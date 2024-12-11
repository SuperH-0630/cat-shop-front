<script setup lang="ts">
  import WupinItem from "@/components/wupinitem.vue"

  const props = defineProps({
    "cl": Array,
  })

  const classification = ref(props.cl as { name: string, id: number, pic: string, classname?: string, tag?: string, price?: number }[])
</script>

<template>
  <div class="classLst">
    <WupinItem v-for="(item, j) in classification" :key="j" :wp="item"> </WupinItem>
  </div>
</template>

<style scoped lang="scss">

.classLst {
  display: flex;
  flex-flow: wrap;
  justify-content: space-between;
}

</style>