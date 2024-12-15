<script setup lang="ts">
import useAdminUserStore from "@/store/admin/user";
import { AdminUser } from "@/store/admin/user"
import pushTo from "@/views/admin/router_push";
import {isAdmin, isRootAdmin} from "@/store/admin";

const router = useRouter()
const route = useRoute()

if (!isAdmin()) {
  router.push({
    path: "error",
    query: {
      msg: "页面错误"
    }
  })
}

const active = ref("")
const openArray = ref([] as string[])

const changePage = () => {
  if (!route.path.startsWith("/admin")) {
    router.push({
      path: "/error",
      query: {
        msg: "页面错误"
      }
    })
  }

  const routePath = (route.meta.vpath || route.path || "/") as string
  const pathLst = routePath.split("/")
  if (pathLst.length <= 2 || pathLst[0] !== "" || pathLst[1] !== "admin") {
    router.push({
      path: "/error",
      query: {
        msg: "页面错误"
      }
    })
  }

  const m1Index = ref(pathLst.length >= 3 ? pathLst[2] : "")
  if (m1Index.value) {
    active.value = m1Index.value
    openArray.value.push(m1Index.value)
  }

  const m2Index = ref(pathLst.length >= 4 ? pathLst[2] + "/" + pathLst[3] : "")
  if (m2Index.value) {
    active.value = m2Index.value
    openArray.value.push(m2Index.value)
  }

  const m3Index = ref(pathLst.length >= 5 ? pathLst[2] + "/" + pathLst[3] + "/" + pathLst[4] : "")
  if (m3Index.value) {
    active.value = m3Index.value
    openArray.value.push(m3Index.value)
  }
}

watch(() => route.path, changePage)
changePage()

const userAdminStore = useAdminUserStore()

const userId = ref(0)
const user = ref(null as AdminUser | null)

const onChangeUser = () => {
  userId.value = Number(route.query?.userId).valueOf() || 0
  if (userId.value) {
    userAdminStore.getUser(userId.value).then((res) => {
      console.log("res is ", res)
      user.value = res
    }).catch(() => {
      user.value = null
    })
  }
}

watch(() => route.query?.userId, onChangeUser)
onChangeUser()


if (userId.value) {
  userAdminStore.getUser(userId.value).then((res) => {
    console.log("res is ", res)
    user.value = res
  }).catch(() => {
    user.value = null
  })
}

const toUserList = () => {
  pushTo(router, route, "/admin/user/list")
}

const toUserInfo = () => {
  pushTo(router, route, "/admin/user/list/info")
}

const toUserEdit = () => {
  pushTo(router, route, "/admin/user/list/edit")
}

const toUserPassword = () => {
  pushTo(router, route, "/admin/user/list/password")
}

const toBuyRecordLst = () => {
  pushTo(router, route, "/admin/user/list/buyrecordlst")
}

</script>

<template>
  <el-container v-if="isAdmin()">
    <el-aside style=" width: 12vw; height: 75vh; border-radius: 15px">
      <el-scrollbar height="100%" style="width: 100%">
        <el-menu
            :default-active="active"
            :default-openeds="openArray"
        >
          <el-sub-menu
              index="user"
          >
            <template #title>
              <el-text>用户管理</el-text>
            </template>
            <el-sub-menu index="user/list">
              <template #title>
                用户列表
              </template>
              <el-menu-item index="user/list" @click="toUserList">用户列表</el-menu-item>
              <el-menu-item index="user/list/info" :disabled="!user" @click="toUserInfo">用户详情</el-menu-item>
              <el-menu-item index="user/list/edit" :disabled="!user" @click="toUserEdit">编辑用户</el-menu-item>
              <el-menu-item index="user/list/password" :disabled="!user && isRootAdmin()" @click="toUserPassword">编辑用户密码</el-menu-item>
              <el-menu-item index="user/list/buyrecordlst" :disabled="!user" @click="toBuyRecordLst">用户订单列表</el-menu-item>
              <el-menu-item index="user/list/shoppingbag" :disabled="!user">用户购物车列表</el-menu-item>
              <el-menu-item index="user/list/msg" :disabled="!user">用户留言</el-menu-item>
            </el-sub-menu>
            <el-menu-item index="user/add">添加用户</el-menu-item>
            <el-menu-item index="user/msg">用户留言列表</el-menu-item>
          </el-sub-menu>

          <el-sub-menu
              index="class"
          >
            <template #title>
              <el-text>分类管理</el-text>
            </template>
            <el-menu-item-group>
              <el-menu-item index="class/list">分类列表</el-menu-item>
              <el-menu-item index="class/add">添加分类</el-menu-item>
            </el-menu-item-group>
          </el-sub-menu>

          <el-sub-menu
              index="class"
          >
            <template #title>
              <el-text>分类管理</el-text>
            </template>
            <el-menu-item-group>
              <el-menu-item index="class/list">分类列表</el-menu-item>
              <el-menu-item index="class/add">添加分类</el-menu-item>
            </el-menu-item-group>
          </el-sub-menu>

          <el-sub-menu
              index="class"
          >
            <template #title>
              <el-text>分类管理</el-text>
            </template>
            <el-menu-item-group>
              <el-menu-item index="class/list">分类列表</el-menu-item>
              <el-menu-item index="class/add">添加分类</el-menu-item>
            </el-menu-item-group>
          </el-sub-menu>

          <el-sub-menu
              index="class"
          >
            <template #title>
              <el-text>分类管理</el-text>
            </template>
            <el-menu-item-group>
              <el-menu-item index="class/list">分类列表</el-menu-item>
              <el-menu-item index="class/add">添加分类</el-menu-item>
            </el-menu-item-group>
          </el-sub-menu>
        </el-menu>
      </el-scrollbar>
    </el-aside>
    <el-main>
      <router-view />
    </el-main>
  </el-container>
  <div v-else></div>
</template>

<style scoped lang="scss">

</style>