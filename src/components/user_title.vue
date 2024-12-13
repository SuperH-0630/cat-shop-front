<script setup lang="ts">
import useUserStore from "@/store/user"
import {maskPhoneNumber} from "@/utils/str"

const userStore = useUserStore()
userStore.isLogin || userStore.login("17322061610", "123456")// 用于测试

userStore.updateInfo()

const router = useRouter()

const toCenter = () => {
  router.push({
    "path": "/center/user",
  })
}

const toOrderLst = () => {
  router.push({
    "path": "/center/orderrecordlst",
  })
}

const toGowuche = () => {
  router.push({
    "path": "/center/shoppingbag",
  })
}

</script>

<template>
  <div v-if="userStore.isLogin">
    <div class="user_name">
      <el-dropdown size="large">
        <el-text class="user_name_text">
          <el-icon><Folder /></el-icon>
          {{ userStore.name }} - {{ maskPhoneNumber(userStore.phone) }}
          <el-icon class="el-icon--right">
            <arrow-down />
          </el-icon>
        </el-text>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="toCenter" ><el-text class="drop_item">我的中心</el-text></el-dropdown-item>
            <el-dropdown-item @click="toOrderLst"><el-text class="drop_item">我的购物记录</el-text></el-dropdown-item>
            <el-dropdown-item @click="toGowuche"><el-text class="drop_item">我的购物车</el-text></el-dropdown-item>
            <el-dropdown-item><el-text class="drop_item">我的客服</el-text></el-dropdown-item>
            <el-dropdown-item><el-text class="drop_item">关于猫猫商城</el-text></el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
    <el-avatar class="user_avatar" shape="square" size="large" :src="userStore.avatar" @click="toCenter" />
  </div>
  <div v-else>
    
  </div>
</template>

<style scoped lang="scss">
.user_name {
  display: inline-block;
  padding-right: 10px;
  vertical-align: middle;
}

.user_avatar {
  vertical-align: middle;
  cursor: pointer;
}

.user_name_text {
  font-size: 2.3vh;
}
.drop_item{
  font-size: 0.6vw;
}
</style>