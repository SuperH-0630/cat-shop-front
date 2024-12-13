<script setup lang="ts">
import useConfigStore from "@/store/config"
import {Service} from "@element-plus/icons-vue";
import useUserStore, {isLogin} from "@/store/user";

const configStore = useConfigStore()
const textarea = ref("")

const userStore = useUserStore()
if (isLogin()) {
  userStore.updateInfo()
}

</script>

<template>
  <div style="display: flex; justify-content: center; margin-top: 10px; margin-bottom: 10px">
    <el-card style="display: flex; max-width: 75%; justify-content: center; margin-top: 10px">
      <div style="display: flow-root">
        <div style="float: left">
          <div>
            <el-text>
              <el-icon><Phone /></el-icon>
              400服务热线：
              <el-text>
                {{ configStore.cfg.value.hotline }}
              </el-text>
            </el-text>
          </div>

          <div>
            <el-text>
              <el-icon><Service /></el-icon>
              {{ configStore.cfg.value.service }}
            </el-text>
          </div>

          <div>
            <div>
              <el-text>
                <el-icon><Promotion /></el-icon>
                微信
              </el-text>
            </div>
            <div style="display: flex; justify-content: center">
              <el-image style="width: 15vw; max-height: 55vh" :src="configStore.cfg.value.wechat" fit="contain" :preview-src-list="[configStore.cfg.value.wechat]" :initial-index="0"></el-image>
            </div>
          </div>
        </div>
        <el-divider direction="vertical" style="min-height: 65vh; border-width: 1px; margin-left: 15px; margin-right: 15px"></el-divider>
        <div style="float: right">
          <div style="display: flex; flex-direction: column; justify-content: center; align-items: center">
            <div>
              <el-text class="liuyan_header">我要留言</el-text>
            </div>

            <div>
              <el-input
                  v-model="textarea"
                  style="width: 15vw;"
                  :rows="10"
                  type="textarea"
                  placeholder="请输入你的留言"
                  :disabled="!isLogin()"
                  :maxlength="150"
                  show-word-limit
                  clearable
              />
            </div>
            <div style="width: 100%; display: flex; justify-content: right; margin-top: 10px">
              <el-tooltip
                  v-if="!isLogin()"
                  effect="dark"
                  content="请登陆后再操作"
                  placement="bottom-start"
              >
                <el-button type="primary" disabled>
                  提交
                </el-button>
              </el-tooltip>
              <el-button v-else type="primary">
                提交
              </el-button>
            </div>
            <div>
              <el-text>
                我们将会仔细阅读你的留言，非常感谢。
              </el-text>
            </div>
          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<style scoped lang="scss">
.liuyan_header {
  margin-bottom: 5px;
  font-size: 0.8vw;
}
</style>