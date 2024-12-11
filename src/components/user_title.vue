<script setup lang="ts">
import useUserStore from "@/store/user"
import {maskPhoneNumber} from "@/utils/str"

const userStore = useUserStore()
userStore.isLogin || userStore.login("17322061610", "123456")// 用于测试

</script>

<template>
  <div id="info">
    <div id="user_name">
      <el-dropdown>
        <el-text class="user_name_text">
          <el-icon><Folder /></el-icon>
          {{ userStore.name }} - {{ maskPhoneNumber(userStore.phone) }}
          <el-icon class="el-icon--right">
            <arrow-down />
          </el-icon>
        </el-text>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>我的中心</el-dropdown-item>
            <el-dropdown-item>我的购物车</el-dropdown-item>
            <el-dropdown-item>我的客服</el-dropdown-item>
            <el-dropdown-item>关于猫猫购物</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
    <el-avatar class="user_avatar" shape="square" size="large" :src="userStore.avatar" />
  </div>
</template>

<style scoped lang="scss">
#user_name {
  display: inline-block;
  padding-right: 10px;
  vertical-align: middle;
}

.user_avatar {
  vertical-align: middle;
}

.user_name_text {
  font-size: 2.3vh;
}

#info {
  padding-right: 1.5vh;
  padding-top: 1vh;
}
</style>