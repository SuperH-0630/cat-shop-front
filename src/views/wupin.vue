<script setup lang="ts">
  import {Wupin} from "@/store/hotwupin"
  import {Class} from "@/store/class"
  import WupinPic from "@/assets/images/logo.jpg"
  import useClassStore from "@/store/class"

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
    realPrice: 9999,
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
</script>

<template>
  <div style="display: flex; justify-content: center; margin-top: 10px; margin-bottom: 10px">
    <div style="display: flex; min-width: 75%; justify-content: center; margin-top: 10px">
      <div style="display: inline-block; width: auto; height: 50vh; margin-right: 10px; margin-left: 10px">
        <el-image :src="wupin.pic" object-fit="contain" style="height: 100%;"></el-image>
      </div>
      <div style="display: inline-block; margin-right: 10px; margin-left: 10px; flex-grow: 2">
        <el-text class="wupin_name"> {{ wupin.name }} </el-text>
        <el-text class="wupin_class_name" @click="onClassClick"> {{ wupin.classOf.name }} > </el-text>
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

  .wupin_class_name {
    display: inline-block;
    margin-left: 5px;
    font-size: 1vw;
    vertical-align: bottom;
    cursor: pointer;
  }

  .wupin_class_name:hover {
    text-decoration: underline;
  }

  .wupin_class_name:active {
    color: blue;
  }
</style>