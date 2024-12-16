<script setup lang="ts">
import {BuyRecordStatus} from "@/api/center/center/buyrecord"
import AdminBuyRecord from "@/components/admin/buyrecord.vue";
import {isAdmin} from "@/store/admin";
import {apiAdminGetBuyRecordByPage} from "@/api/admin/buyrecord";

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

const activeModel = ref("1")
const dataInfo = ref({} as any)
const currentPage = ref({} as { [key: number]: number })

const onChangeUser = () => {
  Object.entries(BuyRecordStatus).forEach(([_key]) => {
    const key = Number(_key).valueOf() || 0
    apiAdminGetBuyRecordByPage(1, 20, Number(key).valueOf()).then((res) => {
      dataInfo.value[key] = {
        data: res.data.data.list,
        pagesizze: 20,
        total: res.data.data.total,
        maxpage: res.data.data.maxpage,
      }

      currentPage.value[key] = 1

      if ((Number(route.query?.status).valueOf() || -1) === key) {
        if (route.query?.page) {
          currentPage.value[key] = Number(route.query?.page).valueOf() || 1
          if (currentPage.value[key] < 1) {
            currentPage.value[key] = 1
          }
        }
      }
    })
  })
}

onChangeUser()

const changePage = (status: number) => {
  const page = currentPage.value[status]
  apiAdminGetBuyRecordByPage(page, 20, Number(status).valueOf()).then((res) => {
    dataInfo.value[status] = {
      data: res.data.data.list,
      pagesizze:20,
      total: res.data.data.total,
      maxpage: res.data.data.maxpage,
      pagesize: 20,
    }
    console.log(res.data.data.maxpage)
  }).catch(() => {
    ElMessage({
      type: "error",
      message: "获取数据失败",
    })
  })
}
</script>

<template>
  <div v-if="isAdmin()" style="display: flex; justify-content: center; margin-top: 10px; margin-bottom: 10px">
    <el-card style="display: flex; height: 70vh; width: 80vw; justify-content: center; margin-top: 10px">
      <el-tabs v-model="activeModel" style="width: 75vw" :stretch="true">
        <el-tab-pane v-for="(status, index) in BuyRecordStatus" :key="index" :hidden="!dataInfo[index]" :label="status" :name="index">
         <div v-if="dataInfo[index]?.data && dataInfo[index].data.length > 0">
           <el-scrollbar height="60vh">
             <div style="display: flex; justify-content: center; margin-bottom: 10px; margin-top: 10px;">
               <el-pagination v-model:current-page="currentPage[index]" class="pager" background layout="prev, pager, next" :page-size="dataInfo[index]?.pgesize || 20" :total="dataInfo[index]?.maxpage || 0" @change="changePage(index)" />
             </div>
             <div style="width: 100%; display: flex; justify-content: center">
               <div style="width: 100%;">
                   <div v-for="(record, idx) in dataInfo[index]?.data || {}" :key="idx" style="margin-top: 10px; width: 100%;">
                     <AdminBuyRecord :record="record" :safe="false" :xiangqing="true" :adminuser="false"> </AdminBuyRecord>
                   </div>
               </div>
             </div>
             <div style="display: flex; justify-content: center; margin-top: 10px; margin-bottom: 10px">
               <el-pagination v-model:current-page="currentPage[index]" class="pager" background layout="prev, pager, next" :page-size="dataInfo[index]?.pgesize || 20" :total="dataInfo[index]?.maxpage || 0" @change="changePage(index)" />
             </div>
           </el-scrollbar>
         </div>
          <div v-else>
            <el-result
                icon="info"
                title="在此处您没有任何销售记录"
                sub-title="欢迎到别处去看看吧"
            >
            </el-result>
          </div>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
  <div v-else></div>
</template>

<style scoped lang="scss">
.pager {
  margin-bottom: 5px;
  margin-top: 5px;
}
</style>