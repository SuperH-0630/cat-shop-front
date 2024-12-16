<script setup lang="ts">
  import useConfigStore from "@/store/config"
  import Footer from "@/components/footer.vue"
  import useUserStore, {isLogin} from "@/store/user"
  import useClassStore from "@/store/class"
  import useHotWupinStore from "@/store/hotwupin"

  const route = useRoute()
  const configStore = useConfigStore()
  const userStore = useUserStore()
  const classStore = useClassStore()
  const hotWupinStore = useHotWupinStore()

  configStore.updateConfig()
  configStore.updateXieyi()
  isLogin() && userStore.updateInfo()
  classStore.updateInfo()
  hotWupinStore.updateInfo()

  const fn1 = (t: number) => {
    Promise.all(
        [
          configStore.updateConfig(),
          configStore.updateXieyi(),
        ]
    ).finally(() => {
      setTimeout(() => fn1(t), t)
    })
  }
  setTimeout(() => fn1(21000000), 21000000)// 35分

  const fn2 = (t: number) => {
    if (isLogin()) {
      userStore.updateInfo().finally(() => {
        setTimeout(() => fn2(t), t)
      })
    }
  }
  setTimeout(() => fn2(900000), 900000)// 10分

  const fn3 = (t: number) => {
    Promise.all(
        [
          classStore.updateInfo(),
          hotWupinStore.updateInfo(),
        ]
    ).finally(() => {
      setTimeout(() => fn3(t), t)
    })
  }
  setTimeout(() => fn3(900000), 900000)// 10分

  let s = document.querySelector('link[rel="icon"]')
  if (!s) {
    s = document.createElement('link')
    s.setAttribute('rel', "icon")
  }
  s.setAttribute('href', configStore.config?.logo)

  const isAdmin = computed(() => route.meta?.admin === true || route.meta?.rootAdmin === true)
  const showFooter = computed(() => !isAdmin.value && configStore.config.footer && configStore.config.footer.length > 0)

  const bodyHeight = computed(() => showFooter.value ? "83vh" : "90vh")

</script>

<template>
  <div id="home">
    <div class="header" style="height: 10vh">
      <Header></Header>
    </div>
    <div id="body" :style='{"height": bodyHeight}'>
      <el-container>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </div>
    <div v-if="showFooter" style="height: 7vh;">
      <Footer></Footer>
    </div>
  </div>
  <Rightwin></Rightwin>
  <Wechat></Wechat>
</template>

<style scoped lang="scss">
  #logo {
    float: left;
  }

  #home {
    display: flex;
    flex-direction: column;
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
