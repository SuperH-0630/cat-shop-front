<script setup lang="ts">
import {BuyRecordStatus, apiGetUserBuyRecordByPage} from "#/center/buyrecord"
import {ElNotification} from "element-plus"
import BuyRecord from "@/components/center/buyrecord.vue"
const router = useRouter()
const activeModel = ref("1")
const dataInfo = ref({} as any)
const currentPage = ref({} as { [key: number]: number })

const changePage = (status: number | string) => {
  const page = currentPage.value[status] || 1
  apiGetUserBuyRecordByPage(page, 20, Number(status).valueOf()).then((res) => {
    dataInfo.value[status] = {
      data: res.data.data.list,
      pagesizze:20,
      total: res.data.data.total,
      maxpage: res.data.data.maxpage,
      pagesize: 20,
    }

    if (status === "2" && res.data.data.total > 0) {
      ElNotification({
        title: '支付提示',
        message: '有订单支付失败哦，请尝试重新支付！',
        type: 'warning',
        duration: 0,
        position: 'top-left',
      })
    }
  }).catch(() => {
    ElMessage({
      type: "error",
      message: "获取数据失败",
    })
  })
}

changePage(activeModel.value)

const toHome = () => {
  router.push({
    path: "/shop/home",
  })
}
</script>

<template>
  <div style="display: flex; justify-content: center; margin-top: 10px; margin-bottom: 10px">
    <el-card style="display: flex; min-width: 50%; justify-content: center; margin-top: 10px">
      <el-tabs v-model="activeModel" @tab-change="changePage(activeModel)">
        <el-tab-pane v-for="(status, index) in BuyRecordStatus" :key="index" :hidden="!dataInfo[index]" :label="status" :name="index">
         <div v-if="(dataInfo[index]?.maxpage || 0) > 0">
           <div style="display: flex; justify-content: center">
             <el-pagination v-model:current-page="currentPage[index]" class="pager" background layout="prev, pager, next" :page-size="dataInfo[index]?.pgesize || 20" :total="dataInfo[index]?.maxpage || 0" @change="changePage(index)" />
           </div>
           <div style="width: 100%; display: flex; justify-content: center">
             <div style="width: 100%;">
               <div v-for="(record, idx) in dataInfo[index]?.data || {}" :key="idx" style="margin-top: 10px; width: 100%;">
                 <BuyRecord :record="record" :safe="false" :xiangqing="true"> </BuyRecord>
               </div>
             </div>
           </div>
           <div style="display: flex; justify-content: center">
             <el-pagination v-model:current-page="currentPage[index]" class="pager" background layout="prev, pager, next" :page-size="dataInfo[index]?.pgesize || 20" :total="dataInfo[index]?.maxpage || 0" @change="changePage(index)" />
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