<script setup lang="ts">
import {BuyRecordStatus, apiGetUserBuyRecordByPage} from "@/api/buyrecord"
import {ElNotification} from "element-plus";

const router = useRouter()
const route = useRoute()
const activeModel = ref("1")
const dataInfo = ref({} as any)
const currentPage = ref({} as { [key: number]: number })

Object.entries(BuyRecordStatus).forEach(([_key]) => {
  const key = Number(_key).valueOf() || 0
  apiGetUserBuyRecordByPage(1, 20, Number(key).valueOf()).then((res) => {
    dataInfo.value[key] = {
      data: res.data.data.list,
      pagesizze:20,
      total: res.data.data.total,
      maxpage: res.data.data.maxpage,
      pagesize: 20,
    }

    currentPage.value[key] = 1

    if ((Number(route.query?.status).valueOf() || -1) === key) {
      if (route.query?.page) {
        currentPage.value[key] = Number(route.query?.page).valueOf() || 1
      }
    }
  })
  // 不处理catch
})

if (dataInfo.value[2] && dataInfo.value[2].data && dataInfo.value[2].data.length > 0) {
  ElNotification({
    title: '支付提示',
    message: '支付失败，请尝试重新支付',
    type: 'warning',
    duration: 0,
    position: 'top-left',
  })
}

const changePage = (status: number) => {
  const page = currentPage.value[status]
  apiGetUserBuyRecordByPage(page, 20, Number(status).valueOf()).then((res) => {
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

const toHome = () => {
  router.push({
    path: "/home",
  })
}
</script>

<template>
  <div style="display: flex; justify-content: center; margin-top: 10px; margin-bottom: 10px">
    <el-card style="display: flex; min-width: 50%; justify-content: center; margin-top: 10px">
      <el-tabs v-model="activeModel">
        <el-tab-pane v-for="(status, index) in BuyRecordStatus" :key="index" :hidden="!dataInfo[index]" :label="status" :name="index">
         <div v-if="(dataInfo[index]?.maxpage || 0) > 0">
           <div style="display: flex; justify-content: center">
             <el-pagination v-model:current-page="currentPage[index]" class="pager" background layout="prev, pager, next" :total="dataInfo[index]?.maxpage || 0" @change="changePage(index)" />
           </div>
           <div style="width: 100%; display: flex; justify-content: center">
             <div style="width: 100%;">
               <div v-for="(record, idx) in dataInfo[index]?.data || {}" :key="idx" style="margin-top: 10px; width: 100%;">
                 <Defaultbuyrecord :record="record" :safe="false" :xiangqing="true"> </Defaultbuyrecord>
               </div>
             </div>
           </div>
           <div style="display: flex; justify-content: center">
             <el-pagination v-model:current-page="currentPage[index]" class="pager" background layout="prev, pager, next" :total="dataInfo[index]?.maxpage || 0" @change="changePage(index)" />
           </div>
         </div>
          <div v-else>
            <el-result
                icon="success"
                title="在此处您没有任何销售记录"
                sub-title="欢迎到别处去看看吧"
            >
              <template #extra>
                <el-button type="primary" @click="toHome">到我的中心</el-button>
              </template>
            </el-result>
          </div>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<style scoped lang="scss">
.pager {
  margin-bottom: 5px;
  margin-top: 5px;
}
</style>