<script setup lang="ts">
import { ElMessage, ElMessageBox } from 'element-plus'
import {isAdmin} from "@/store/admin"
import {
  AdminClass,
  AdminClassData,
  apiAdminGetClass,
  apiAdminPostUpdateClass,
} from "#/admin/class";
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

const toBack = () => {
  pushTo(router, route, "/admin/class/list")
}

const classId = ref(Number(route.query?.classId).valueOf() || 0)
const classObj = ref(null as AdminClass | null)

const onChangeClass = () => {
  classId.value = Number(route.query?.classId).valueOf() || 0
  classObj.value = null

  if (classId.value) {
    apiAdminGetClass(classId.value).then((res) => {
      classObj.value = res.data.data as AdminClass
      form.value = {
        name: classObj.value.name,
        show: classObj.value.show,
      }
    }, () => {
      toBack()
    })
  } else {
    toBack()
  }
}

watch(() => route.query?.wupinId, onChangeClass)
onChangeClass()

const form = ref({
  name: "",
  show: true,
} as AdminClassData)

const checkName = computed(() => form.value.name && form.value.name.length > 0 && form.value.name.length <= 10)
const allCheck = computed(() => checkName.value)

const update = () => {
  classObj.value && ElMessageBox.confirm('是否确定更新类别', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(() => {
    classObj.value && apiAdminPostUpdateClass(classObj.value.id, form.value).then(() => {
      ElMessage({
        type: 'success',
        message: "更新成功",
      })
      onChangeClass()
    }, () => {
      ElMessage({
        type: 'error',
        message: "更新失败",
      })
    })
  })
}

</script>

<template>
  <div v-if="classObj && isAdmin()" style="display: flex; justify-content: center; margin-top: 10px; margin-bottom: 10px">
    <el-card style="display: flex; max-width: 75%; justify-content: center; margin-top: 10px">
      <el-form :model="form" label-width="auto" style="width: 15vw">
        <el-form-item>
          <template #label>
            <el-text>名字</el-text>
          </template>
          <el-input
              v-model="form.name"
              maxlength="10"
              minlength="1"
              show-word-limit
              clearable
          />
        </el-form-item>
        <el-form-item>
          <template #label>
            <el-text>
              是否显示
            </el-text>
          </template>
          <el-checkbox v-model="form.show" label=""/>
        </el-form-item>
      </el-form>
      <div style="display: flex; width: 15vw; justify-content: center">
        <el-button :disabled="!allCheck" @click="update">
          跟新
        </el-button>
      </div>
      <div style="width: 15vw; margin-top: 5px">
        <div v-if="!checkName" class="tip_box" style="display: flex; justify-content: center">
          <el-alert title="名字需要在1-10位！" :closable="false" type="warning" center show-icon>
          </el-alert>
        </div>
      </div>
    </el-card>
  </div>
  <div v-else></div>
</template>

<style scoped lang="scss">
.tip_box {
  margin-top: 5px;
}
</style>