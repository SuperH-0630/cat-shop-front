<script setup lang="ts">


</script>

<template>
  <el-dialog
      v-model="changeShopModel"
      width="500"
  >
    <template #title>
      <div style="width: 100%; display: flex; justify-content: center">
        <el-text style="font-size: 1vw">
          商户地址信息更改
        </el-text>
      </div>
    </template>
    <el-divider style="margin-top: 30px"></el-divider>
    <div>
      <el-form :model="changeShopForm" label-width="auto" style="width: 15vw">
        <el-form-item>
          <template #label>
            <el-text>收件人</el-text>
          </template>
          <el-input
              v-model="changeShopForm.name"
              maxlength="10"
              minlength="1"
              show-word-limit
              clearable
          />
        </el-form-item>
        <el-form-item>
          <template #label>
            <el-text>手机号</el-text>
          </template>
          <el-input
              v-model="changeShopForm.phone"
              maxlength="20"
              minlength="1"
              show-word-limit
              clearable
          />
        </el-form-item>
        <el-form-item>
          <template #label>
            <el-text>收件地址</el-text>
          </template>
          <el-input v-model="changeShopForm.location" minlength="0" maxlength="150" show-word-limit/>
        </el-form-item>
        <el-form-item>
          <template #label>
            <el-text>微信号</el-text>
          </template>
          <el-input v-model="changeShopForm.wechat" minlength="0" maxlength="30" show-word-limit/>
        </el-form-item>
        <el-form-item>
          <template #label>
            <el-text>邮箱</el-text>
          </template>
          <el-input v-model="changeShopForm.email" minlength="0" maxlength="30" show-word-limit/>
        </el-form-item>
        <el-form-item>
          <template #label>
            <el-text>备注</el-text>
          </template>
          <el-input v-model="changeShopForm.remark"  minlength="0" maxlength="150" show-word-limit type="textarea" :rows="3"/>
        </el-form-item>
      </el-form>
    </div>
    <div style="width: 15vw; margin-top: 5px; display: flex; justify-content: center">
      <el-button-group>
        <el-button type="info" @click="changeShopModel = false">取消</el-button>
        <el-button :disabled="!changeShopAllCheck" type="primary" @click="changeShop">
          确定
        </el-button>
      </el-button-group>
    </div>
    <div>
      <div v-if="!changeShopCheckName" class="tip_box" style="display: flex; justify-content: center">
        <el-alert title="名字需要在1-10位！" :closable="false" type="warning" center show-icon>
        </el-alert>
      </div>
      <div v-if="!changeShopPhoneCheck" class="tip_box" style="display: flex; justify-content: center">
        <el-alert title="请输入正确到手机号！" :closable="false" type="warning" center show-icon>
        </el-alert>
      </div>
      <div v-if="!changeShopEmailCheck" class="tip_box" style="display: flex; justify-content: center">
        <el-alert title="请输入正确到邮箱！" :closable="false" type="warning" center show-icon>
        </el-alert>
      </div>
      <div v-if="!changeShopCheckLocation" class="tip_box" style="display: flex; justify-content: center">
        <el-alert title="请输入正确的收件地址！" :closable="false" type="warning" center show-icon>
        </el-alert>
      </div>
    </div>
  </el-dialog>
</template>

<style scoped lang="scss">

</style>