<script setup lang="ts">
import useAdminUserStore from "@/store/admin/user";
import { AdminUser } from "@/store/admin/user"
import pushTo from "@/views/admin/router_push";
import {isAdmin, isRootAdmin} from "@/store/admin";
import {AdminWupin, apiAdminGetWupin} from "@/api/admin/wupin";
import {AdminClass, apiAdminGetClass} from "@/api/admin/class";

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
  }

  const m2Index = ref(pathLst.length >= 4 ? pathLst[2] + "/" + pathLst[3] : "")
  if (m2Index.value) {
    active.value = m2Index.value
  }

  const m3Index = ref(pathLst.length >= 5 ? pathLst[2] + "/" + pathLst[3] + "/" + pathLst[4] : "")
  if (m3Index.value) {
    active.value = m3Index.value
  }
}

watch(() => route.path, changePage)
changePage()

const userAdminStore = useAdminUserStore()

const userId = ref(0)
const user = ref(null as AdminUser | null)
const userPermissions = ref(false)

const onChangeUser = () => {
  userId.value = Number(route.query?.userId).valueOf() || 0
  user.value = null
  userPermissions.value = false

  if (userId.value) {
    userAdminStore.getUser(userId.value).then((res) => {
      user.value = res as AdminUser

      if (user.value.type === 3 && !isRootAdmin()) {
        userPermissions.value = false
      } else {
        userPermissions.value = true
      }

      if (user.value.status === 3 && !isRootAdmin()) {
        user.value = null
        userPermissions.value = false
      }
    }, () => {
      user.value = null
      userPermissions.value = false
    })
  } else {
    user.value = null
    userPermissions.value = false
  }
}

watch(() => route.query?.userId, onChangeUser)
onChangeUser()

const wupinId = ref(0)
const wupin = ref(null as AdminWupin | null)

const onChangeWupin = () => {
  wupinId.value = Number(route.query?.wupinId).valueOf() || 0
  wupin.value = null

  if (wupinId.value) {
    apiAdminGetWupin(wupinId.value).then((res) => {
      wupin.value = res.data.data as AdminWupin
    }, () => {
      wupin.value = null
    })
  } else {
    wupin.value = null
  }
}

watch(() => route.query?.wupinId, onChangeWupin)
onChangeWupin()

const classId = ref(Number(route.query?.classId).valueOf() || 0)
const classObj = ref(null as AdminClass | null)

const onChangeClass = () => {
  classId.value = Number(route.query?.classId).valueOf() || 0
  classObj.value = null

  if (classId.value) {
    apiAdminGetClass(classId.value).then((res) => {
      classObj.value = res.data.data as AdminClass
    }, () => {
      classObj.value = null
    })
  } else {
    classObj.value = null
  }
}

watch(() => route.query?.classId, onChangeClass)
onChangeClass()

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

const toUserPhone = () => {
  pushTo(router, route, "/admin/user/list/phone")
}

const toBuyRecordLst = () => {
  pushTo(router, route, "/admin/user/list/buyrecordlst")
}

const toShoppingBag = () => {
  pushTo(router, route, "/admin/user/list/shoppingbag")
}

const toOneUserMsg = () => {
  pushTo(router, route, "/admin/user/list/msg")
}

const toAddUser = () => {
  pushTo(router, route, "/admin/user/add")
}

const toMsg = () => {
  pushTo(router, route, "/admin/user/msg")
}

const toClassLst = () => {
  pushTo(router, route, "/admin/class/list")
}

const toClassInfo = () => {
  pushTo(router, route, "/admin/class/list/info")
}

const toClassEdit = () => {
  pushTo(router, route, "/admin/class/list/edit")
}

const toAddClass = () => {
  pushTo(router, route, "/admin/class/add")
}

const toWupinLst = () => {
  pushTo(router, route, "/admin/wupin/list")
}

const toWupinInfo = () => {
  pushTo(router, route, "/admin/wupin/list/info")
}

const toAddWupin = () => {
  pushTo(router, route, "/admin/wupin/add")
}

</script>

<template>
  <el-container v-if="isAdmin()">
    <el-aside style=" width: 12vw; height: 85vh; border-radius: 15px">
      <el-scrollbar height="100%" style="width: 100%">
        <el-menu
            :default-active="active"
            :default-openeds='["user", "user/list", "class", "class/list", "wupin", "wupin/list"]'
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
              <el-menu-item index="user/list/edit" :disabled="!user || !userPermissions" @click="toUserEdit">编辑用户</el-menu-item>
              <el-menu-item index="user/list/password" :disabled="!user || !userPermissions" @click="toUserPassword">编辑用户密码</el-menu-item>
              <el-menu-item index="user/list/phone" :disabled="!user || !userPermissions" @click="toUserPhone">编辑用户手机号</el-menu-item>
              <el-menu-item index="user/list/buyrecordlst" :disabled="!user" @click="toBuyRecordLst">用户订单列表</el-menu-item>
              <el-menu-item index="user/list/shoppingbag" :disabled="!user" @click="toShoppingBag">用户购物车列表</el-menu-item>
              <el-menu-item index="user/list/msg" :disabled="!user" @click="toOneUserMsg">用户留言</el-menu-item>
            </el-sub-menu>
            <el-menu-item index="user/add" @click="toAddUser">添加用户</el-menu-item>
            <el-menu-item index="user/msg" @click="toMsg">用户留言列表</el-menu-item>
          </el-sub-menu>

          <el-sub-menu
              index="class"
          >
            <template #title>
              <el-text>类别管理</el-text>
            </template>
            <el-sub-menu
                index="class/list"
            >
              <template #title>
                <el-text>类别列表</el-text>
              </template>
              <el-menu-item index="class/list" @click="toClassLst">类别列表</el-menu-item>
              <el-menu-item index="class/list/info" :disabled="!classObj" @click="toClassInfo">类别详情</el-menu-item>
              <el-menu-item index="class/list/edit" :disabled="!classObj" @click="toClassEdit">类别编辑</el-menu-item>
            </el-sub-menu>
            <el-menu-item index="class/add" @click="toAddClass">添加类别</el-menu-item>
          </el-sub-menu>

          <el-sub-menu
              index="wupin"
          >
            <template #title>
              <el-text>商品管理</el-text>
            </template>
            <el-sub-menu
                index="wupin/list"
            >
              <template #title>
                <el-text>商品管理</el-text>
              </template>
              <el-menu-item index="wupin/list" @click="toWupinLst">商品列表</el-menu-item>
              <el-menu-item index="wupin/list/info" :disabled="!wupin" @click="toWupinInfo">商品详情</el-menu-item>
              <el-menu-item index="wupin/list/edit" :disabled="!wupin" @click="toWupinEdit">商品编辑</el-menu-item>
            </el-sub-menu>
            <el-menu-item index="wupin/add" @click="toAddWupin">添加商品</el-menu-item>
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