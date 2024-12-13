<script setup lang="ts">
import {BuyRecordStatus, getUserBuyRecordByPage} from "@/api/user"
import {ElNotification} from "element-plus";

const router = useRouter()
const activeModel = ref("1")
const dataInfo = ref({} as any)
const currentPage = ref({} as { [key: number]: number })

Object.entries(BuyRecordStatus).forEach(([_key]) => {
  const key = Number(_key).valueOf()
  getUserBuyRecordByPage(1, 20, Number(key).valueOf()).then((res) => {
    dataInfo.value[key] = {
      data: res.data.data.list,
      pagesizze:20,
      total: res.data.data.total,
      maxpage: res.data.data.maxpage,
      pagesize: res.data.data.pagesize,
    }

    currentPage.value[key] = 1
  })
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
  getUserBuyRecordByPage(page, 20, Number(status).valueOf()).then((res) => {
    dataInfo.value[status] = {
      data: res.data.data.list,
      pagesizze:20,
      total: res.data.data.total,
      maxpage: res.data.data.maxpage,
      pagesize: res.data.data.pagesize,
    }
    console.log(res.data.data.maxpage)
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
    <el-card  style="display: flex; min-width: 50%; justify-content: center; margin-top: 10px">
      <el-tabs v-model="activeModel">
        <el-tab-pane v-for="(status, index) in BuyRecordStatus" :key="index" :hidden="!dataInfo[index]" :label="status" :name="index" style="width: 50vw">
         <div v-if="(dataInfo[index]?.maxpage || 0) > 0">
           <div style="display: flex; justify-content: center">
             <el-pagination v-model:current-page="currentPage[index]" class="pager" background layout="prev, pager, next" :page-count="dataInfo[index]?.maxpage || 0" @change="changePage(index)" />
           </div>
           <div v-for="(record, idx) in dataInfo[index]?.data || {}" :key="idx">
             <Defaultbuyrecord :record="record" :safe="false" :xiangqing="true" style="margin-bottom: 10px"> </Defaultbuyrecord>
           </div>
           <div style="display: flex; justify-content: center">
             <el-pagination v-model:current-page="currentPage[index]" class="pager" background layout="prev, pager, next" :page-count="dataInfo[index]?.maxpage || 0" @change="changePage(index)" />
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