<script setup lang="ts">
import useUserStore, {isLogin} from "@/store/user"
import {isMobile} from "@/utils/str"

const userStore = useUserStore()

const route = useRoute()
const router = useRouter()

const goRedirect = () => {
  const redirectPath = route.query?.redirect
  if (typeof redirectPath === "string" && redirectPath.length > 0) {
    const p = decodeURIComponent(redirectPath)
    if (p.startsWith("http")) {
      window.open(p)
    } else {
      window.location.href = p
    }
  } else {
    router.push({
      "path": "/home",
    })
  }
}

watch(() => isLogin(), (value) => {
  if (value) {
    goRedirect()
  }
})

if (isLogin()) {
  goRedirect()
}

const form = ref({
  phone: "",
  password: "",
  passwordDouble: "",
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
const passwordCheck = computed(() => form.value.password.length >= 8)
const doublePasswordCheck = computed(() => form.value.password === form.value.passwordDouble)
const allCheck = computed(() => codeCheck.value && phoneCheck.value && passwordCheck.value && doublePasswordCheck.value)

const register = () => {
  if (!allCheck.value) {
    return
  }

  userStore.register(form.value.phone, form.value.password).then(() => {
    if (isLogin()) {
      goRedirect()
    } else {
      router.push({
        path: "/login",
        query: {
          redirect: encodeURIComponent(route.fullPath)
        }
      })
    }
  }, () => {
    resetCode()
    ElMessage({
      type: "error",
      message: "登录失败，请检查手机号或者密码",
    })
  })
}

</script>

<template>
  <div v-if="!isLogin()" style="display: flex; justify-content: center; margin-top: 10px; margin-bottom: 10px">
    <el-card style="display: flex; max-width: 75%; justify-content: center; margin-top: 10px">
      <el-form :model="form" label-width="auto" style="width: 15vw">
        <el-form-item>
          <template #label>
            <el-text>手机号</el-text>
          </template>
          <el-input v-model="form.phone" />
        </el-form-item>
        <el-form-item>
          <template #label>
            <el-text>密码</el-text>
          </template>
          <el-input v-model="form.password" type="password" show-password />
        </el-form-item>
        <el-form-item>
          <template #label>
            <el-text>再次密码</el-text>
          </template>
          <el-input v-model="form.passwordDouble" type="password" show-password />
        </el-form-item>
        <el-form-item>
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
        <el-button :disabled="!allCheck" @click="register">
          注册并登录
        </el-button>
      </div>
      <div style="width: 15vw; margin-top: 5px">
        <div class="tip_box" style="display: flex; justify-content: center">
          <el-alert v-if="!codeCheck" title="请输入正确的验证码！" :closable="false" type="warning" center show-icon>
          </el-alert>
        </div>
        <div class="tip_box" style="display: flex; justify-content: center">
          <el-alert v-if="!phoneCheck" title="请输入正确到手机号！" :closable="false" type="warning" center show-icon>
          </el-alert>
        </div>
        <div class="tip_box" style="display: flex; justify-content: center">
          <el-alert v-if="!passwordCheck" title="密码必须长度大于8！" :closable="false" type="warning" center show-icon>
          </el-alert>
        </div>
        <div class="tip_box" style="display: flex; justify-content: center">
          <el-alert v-if="!doublePasswordCheck" title="两次输入密码不正确！" :closable="false" type="warning" center show-icon>
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