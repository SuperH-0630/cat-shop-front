<script setup lang="ts">
import { ElMessage, ElMessageBox } from 'element-plus'
import useUserStore, {isLogin} from "@/store/user"

const router = useRouter()
const route = useRoute()

const userStore = useUserStore()
if (!isLogin()) {
  router.push({
    path: "/shop/login",
    query: {
      redirect: encodeURIComponent(route.fullPath)
    }
  })
}

const form = ref({
  oldPassword: "",
  newPassword: "",
  newPasswordDouble: "",
} as { oldPassword: string, newPassword: string; newPasswordDouble: string })

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
const oldPasswordCheck = computed(() => form.value.oldPassword && form.value.oldPassword.length > 0)// 登录阶段不检查密码
const passwordCheck = computed(() => form.value.newPassword.length >= 8)
const doublePasswordCheck = computed(() => form.value.newPassword === form.value.newPasswordDouble)
const allCheck = computed(() => codeCheck.value && oldPasswordCheck.value && passwordCheck.value && doublePasswordCheck.value)

const update = () => {
  ElMessageBox.confirm('您是否确定更新您的用户密码', '提示', {
    confirmButtonText: '确定更新',
    cancelButtonText: '取消更新',
    type: 'warning',
  }).then(() => {
    return userStore.editPassword(form.value).then(() => {
      ElMessage({
        type: 'success',
        message: "更新成功",
      })
      router.push({
        path: "/shop/home"
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
      <el-form :model="form" label-width="auto" style="width: 15vw">
        <el-form-item>
          <template #label>
            <el-text>旧密码</el-text>
          </template>
          <el-input v-model="form.oldPassword" type="password" show-password />
        </el-form-item>
        <el-form-item>
          <template #label>
            <el-text>新密码</el-text>
          </template>
          <el-input v-model="form.newPassword" type="password" show-password />
        </el-form-item>
        <el-form-item>
          <template #label>
            <el-text>再次新密码</el-text>
          </template>
          <el-input v-model="form.newPasswordDouble" type="password" show-password />
        </el-form-item>
        <el-form-item>
          <template #label>
            <el-text>验证码</el-text>
          </template>
          <el-input v-model="code" clearable>
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
        <div v-if="!codeCheck" class="tip_box" style="display: flex; justify-content: center">
          <el-alert title="请输入正确的验证码！" :closable="false" type="warning" center show-icon>
          </el-alert>
        </div>
        <div v-if="!oldPasswordCheck" class="tip_box" style="display: flex; justify-content: center">
          <el-alert title="请输入旧密码！" :closable="false" type="warning" center show-icon>
          </el-alert>
        </div>
        <div v-if="!passwordCheck" class="tip_box" style="display: flex; justify-content: center">
          <el-alert title="新密码必须长度大于8！" :closable="false" type="warning" center show-icon>
          </el-alert>
        </div>
        <div v-if="!doublePasswordCheck" class="tip_box" style="display: flex; justify-content: center">
          <el-alert title="两次输入新密码不正确！" :closable="false" type="warning" center show-icon>
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