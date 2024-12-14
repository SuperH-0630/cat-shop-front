<script setup lang="ts">
import { ElMessage, ElMessageBox } from 'element-plus'
import useUserStore, {isLogin, UserBase} from "@/store/user"

const router = useRouter()
const route = useRoute()

const userStore = useUserStore()
if (!isLogin()) {
  router.push({
    path: "/login",
    query: {
      redirect: encodeURIComponent(route.fullPath)
    }
  })
}

const ub = ref({
  name: userStore.user.name,
  location: userStore.user.location,
} as UserBase)

function getRandomInt(max: number) {
  return Math.floor(Math.random() * max)
}

const a = ref(getRandomInt(10))
const b = ref(getRandomInt(10))
const code = ref("")
const answer = computed(() => a.value + b.value)
const question = computed(() => `${a.value} + ${b.value}`)

const resetCode = () => {
  a.value = getRandomInt(10)
  b.value = getRandomInt(10)
  code.value = ""
}


const codeCheck = computed(() => Number(code.value).valueOf() === answer.value)
const checkName = computed(() => ub.value.name.length > 0 && ub.value.name.length <= 10)
const allCheck = computed(() => codeCheck.value && checkName.value)

const update = () => {
  ElMessageBox.confirm('您是否确定更新你的用户信息', '提示', {
    confirmButtonText: '确定更新',
    cancelButtonText: '取消更新',
    type: 'warning',
  }).then(() => {
    return userStore.editData(ub.value).then(() => {
      ElMessage({
        type: 'success',
        message: "更新成功",
      })
      router.push({
        path: "/center/user"
      })
    }, () => {
      resetCode()
      ElMessage({
        type: 'error',
        message: "更新失败",
      })
    })
  }, () => resetCode())
}

</script>

<template>
  <div style="display: flex; justify-content: center; margin-top: 10px; margin-bottom: 10px">
    <el-card style="display: flex; max-width: 75%; justify-content: center; margin-top: 10px">
      <el-form :model="ub" label-width="auto" style="width: 15vw">
        <el-form-item>
          <template #label>
            <el-text>昵称</el-text>
          </template>
          <el-input v-model="ub.name" />
        </el-form-item>
        <el-form-item>
          <template #label>
            <el-text>地址</el-text>
          </template>
          <el-input v-model="ub.location" />
        </el-form-item>
        <el-form-item>
          <template #label>
            <el-text>验证码</el-text>
          </template>
          <el-input v-model="code">
            <template #append>
              <el-text>
                {{ question }}
              </el-text>
            </template>
          </el-input>
        </el-form-item>
      </el-form>
      <div style="display: flex; width: 15vw; justify-content: center">
        <el-button :disabled="!allCheck" @click="update">
          更新
        </el-button>
      </div>
      <div style="width: 15vw; margin-top: 5px">
        <div class="tip_box" style="display: flex; justify-content: center">
          <el-alert v-if="!codeCheck" title="请输入正确的验证码！" :closable="false" type="warning" center show-icon>
          </el-alert>
        </div>
        <div class="tip_box" style="display: flex; justify-content: center">
          <el-alert v-if="!checkName" title="名字需要在1-10位！" :closable="false" type="warning" center show-icon>
          </el-alert>
        </div>
      </div>
    </el-card>
  </div>
</template>

<style scoped lang="scss">
.tip_box {
  margin-top: 5px;
}
</style>