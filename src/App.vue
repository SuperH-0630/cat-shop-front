<script setup lang="ts">
  import useConfigStore from "@/store/config";

  const configStore = useConfigStore()

  let s = document.querySelector('link[rel="icon"]')
  if (!s) {
    s = document.createElement('link')
    s.setAttribute('rel', "icon")
  }
  s.setAttribute('href', configStore.cfg.value.logo)
</script>

<template>
  <div id="home">
    <Header></Header>
    <el-container>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
    <Rightwin></Rightwin>
    <Back></Back>
    <Wechat></Wechat>
  </div>
</template>

<style scoped lang="scss">
  #logo {
    float: left;
  }

  .avatar_logo {
    height: 8vh;
    width: 8vh;
    margin: 0 0 0 0;
    vertical-align: middle;
  }

  .title {
    font-size: 5vh;
    font-weight: bold;
    margin-left: 10px;
    vertical-align: middle;
  }

  .subtitle {
    font-size: 1.8vh;
    font-weight: normal;
    margin-left: 5px;
    vertical-align: middle;
  }

  .title_box {
    padding-top: 1vh;
  }

  .extrainfo{
    font-size: 2vh;
    margin-right: 10px;
    vertical-align: middle;
  }
</style>
