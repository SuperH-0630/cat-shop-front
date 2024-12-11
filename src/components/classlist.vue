<script setup lang="ts">
  import ClassItem from "@/components/classitem.vue"
  import useClassStore from "@/store/class"

  const classStore = useClassStore()
  classStore.getLstMust()
</script>

<template>
  <div class="classLst">
    <ClassItem v-for="(item, j) in classStore.classLst" :key="j" :cl="item"> </ClassItem>
  </div>
</template>

<style scoped lang="scss">
.classLst {
  display: flex;
  flex-flow: wrap;
  justify-content: space-between;
  background-color: rgba(0, 0, 0, 0.03);
  border-radius: 5px;
}
</style>