<script setup lang="ts">
import AdminShoppingbag from "@/components/admin/adminshoppingbag.vue"
import {isAdmin} from "@/store/admin"
import useAdminUserStore, {AdminUser} from "@/store/admin/user"
import {AdminShopRecord, apiAdminGetUserShoppingRecord} from "#/admin/shoppingbag"
import pushTo from "@/views/admin/router_push"

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

const userAdminStore = useAdminUserStore()

const userId = ref(Number(route.query?.userId).valueOf() || 0)
const user = ref(null as AdminUser | null)

const maxpage = ref(0)
const page = ref(Number(route.query?.page).valueOf() || 1)
const pagesize = ref(20)
if (page.value < 1) {
  page.value = 1
}
const shoppingbagLst = ref([] as AdminShopRecord[])

if (userId.value) {
  userAdminStore.getUser(userId.value).then((res) => {
    user.value = res as AdminUser
    onChange()
  }, () => {
    router.push({
      path: "/system/error",
      query: {
        msg: "页面错误"
      }
    })
  })
} else {
  router.push({
    path: "/system/error",
    query: {
      msg: "页面错误"
    }
  })
}

const onChange = () => {
  user.value && apiAdminGetUserShoppingRecord(userId.value, page.value, pagesize.value).then((res) => {
    maxpage.value = res.data.data.maxpage
    shoppingbagLst.value = res.data.data.list
  })
}

const toHome = () => {
  pushTo(router, route, "/admin/user/list/info")
}

</script>

<template>
  <div v-if="user && isAdmin()" style="display: flex; justify-content: center; margin-top: 10px; margin-bottom: 10px">
    <el-card style="display: flex; height: 70vh; width: 60vw; justify-content: center; margin-top: 10px">
      <div v-if="shoppingbagLst && shoppingbagLst.length > 0">
        <el-scrollbar height="65vh">
          <div>
            <div style="display: flex; justify-content: center; margin-bottom: 10px; margin-top: 10px;">
              <el-pagination v-model:current-page="page" class="pager" background layout="prev, pager, next" :page-size="pagesize" :total="maxpage || 0" @change="onChange" />
            </div>
            <div style="width: 55vw; display: flex; justify-content: center">
              <div style="width: 100%;">
                <el-scrollbar>
                  <div v-for="(item, index) in shoppingbagLst" :key="index" style="margin-left: 30px; margin-right: 30px">
                    <AdminShoppingbag ref="shopper" :record="item" @reload="onChange"></AdminShoppingbag>
                  </div>
                </el-scrollbar>
              </div>
            </div>
            <div style="display: flex; justify-content: center; margin-top: 10px; margin-bottom: 10px">
              <el-pagination v-model:current-page="page" class="pager" background layout="prev, pager, next" :page-size="pagesize" :total="maxpage || 0" @change="onChange" />
            </div>
          </div>
        </el-scrollbar>
      </div>
      <div v-else>
        <el-result
            icon="info"
            title="您的购物车还没有任何记录呢"
            sub-title="欢迎到别处去看看吧"
        >
          <template #extra>
            <el-button type="primary" @click="toHome">到我的中心</el-button>
          </template>
        </el-result>
      </div>
    </el-card>
  </div>
  <div v-else></div>
</template>

<style scoped lang="scss">

</style>