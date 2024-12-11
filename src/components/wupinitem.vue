<script setup lang="ts">
  const props = defineProps({
    "wp": Object,
  })
  const item = ref(props.wp)
</script>

<template>
  <el-card class="WupinItem">
    <template #header>
      <el-text class="WupinTitle">
        {{ item.name }} 
        <span v-if="item.classname">
        （{{item.classname}}）
        </span>
      </el-text>
    </template>
    <div class="WupinItemPic">
      <el-image
          :src="item.pic"
      />
    </div>
    <template #footer>
      <div style="display: flow-root">
        <el-text v-if="item.price >= 0" class="hotprice">
          火热价：￥{{ (item.price / 100).toFixed(2) }}
        </el-text>
        <el-tag v-if="item.tag" type="primary" class="hottag">
          {{ item.tag }}
        </el-tag>
        <el-button style="float: right" class="btn">查看详情</el-button>
      </div>
    </template>
  </el-card>
</template>

<style scoped lang="scss">
.WupinItem {
  display: inline;
  margin: 3px 3px 3px 3px;
  max-width: 30vw;
  min-width: 15vw;
  max-height: 50wh;
  min-height: 30wh;
}

.WupinItemPic {
  display: flex;
  justify-content: center;
  align-content: center;
}

.WupinTitle {
  font-size: 2vh;
  margin: 0 0 0 0;
}

.hotprice {
  font-size: 2vh;
  color: red;
  font-weight: bold;
  vertical-align: middle;
  margin-right: 10px;
}

.hottag {
  font-size: 1.5vh;
  color: red;
  font-weight: bold;
  vertical-align: middle;
  margin-right: 10px;
}

.btn {
  margin-left: 10px;
  vertical-align: middle;
}

</style>