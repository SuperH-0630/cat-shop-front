<script setup lang="ts">
import useUserStore, {isLogin} from "@/store/user"
import {isMobile} from "@/utils/str";

const userStore = useUserStore()

const route = useRoute()
const router = useRouter()

const goRedirect = () => {
  const redirectPath = route.query?.redirect
  if (typeof redirectPath === "string" && redirectPath.length > 0) {
    router.push(redirectPath)
  } else {
    router.push("/home")
  }
}

if (isLogin()) {
  goRedirect()
}

const form = ref({
  phone: "",
  password: "",
  code: "",
})

function getRandomInt(max: number) {
  return Math.floor(Math.random() * max)
}

const a = ref(getRandomInt(10))
const b = ref(getRandomInt(10))

const resetCode = () => {
  a.value = getRandomInt(10)
  b.value = getRandomInt(10)
  form.value.code = ""
}

const answer = computed(() => a.value + b.value)
const question = computed(() => `${a.value} + ${b.value}`)

const codeCheck = computed(() => Number(form.value.code).valueOf() === answer.value)
const phoneCheck = computed(() => isMobile(form.value.phone))
// const passwordCheck = computed(() => form.value.password.length >= 8)
const passwordCheck = ref(true)// 登录阶段不检查密码
const allCheck = computed(() => codeCheck.value && phoneCheck.value && passwordCheck.value)

const login = () => {
  if (!allCheck.value) {
    return
  }

  resetCode()
  userStore.login(form.value.phone, form.value.password).then(() => {
    goRedirect()
  }, () => {
    ElMessage({
      type: "error",
      message: "登录失败，请检查手机号或者密码",
    })
  })
}

</script>

<template>
  <div style="display: flex; justify-content: center; margin-top: 10px; margin-bottom: 10px">
    <el-card style="display: flex; max-width: 75%; justify-content: center; margin-top: 10px">
      <el-form :model="form" label-width="auto" style="width: 15vw">
        <el-form-item>
          <template #label>
            <el-text>手机号</el-text>
          </template>
          <el-input v-model="form.phone" />
        </el-form-item>
        <el-form-item label="密码">
          <template #label>
            <el-text>密码</el-text>
          </template>
          <el-input v-model="form.password" type="password" show-password />
        </el-form-item>
        <el-form-item label="密码">
          <template #label>
            <el-text>验证码</el-text>
          </template>
          <el-input v-model="form.code">
            <template #append>
              <el-text>
                {{ question }}
              </el-text>
            </template>
          </el-input>
        </el-form-item>
      </el-form>
      <div style="display: flex; width: 15vw; justify-content: center">
        <el-button @click="login" :disabled="!allCheck">
          登录
        </el-button>
      </div>
      <div style="width: 15vw; margin-top: 5px">
        <div class="tip_box" style="display: flex; justify-content: center">
          <el-text v-if="!codeCheck">
            请输入正确的验证码！
          </el-text>
        </div>
        <div class="tip_box" style="display: flex; justify-content: center">
          <el-text v-if="!phoneCheck">
            请输入正确到手机号！
          </el-text>
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