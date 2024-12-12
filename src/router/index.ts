import {createRouter, createWebHistory, RouteRecordRaw} from 'vue-router'
import { clearPlaceholderLoading } from '@/utils/placeholder-loading'
import useUserStore from "@/store/user"
import usePathStore from "@/store/path"
import useWechatStore from "@/store/wechat"

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    component: () => import('@/views/home.vue'),
    meta: {
      title: '主页',
      wechat: true,
    }
  },
  {
    path: '/search',
    component: () => import('@/views/search.vue'),
    meta: {
      title: '搜索',
    }
  },
  {
    path: '/wupin',
    component: () => import('@/views/wupin.vue'),
    meta: {
      title: '商品',
      wechat: true,
    }
  },
  {
    path: '/center',
    redirect: '/center/user',
  },
  {
    path: '/center/user',
    component: () => import('@/views/mine.vue'),
    meta: {
      title: '个人中心',
      xauth: true,
      wechat: true,
    }
  },
  {
    path: '/center/buyrecord',
    component: () => import('@/views/buyrecord.vue'),
    meta: {
      title: '消费详情',
      xauth: true,
    }
  }
]

const router = createRouter({
  history: createWebHistory(''),
  routes,
  scrollBehavior() {
    return { top: 0 }
  }
})

router.beforeEach((to, from, next) => {
  const userStore = useUserStore()
  if (to.meta.xauth && to.meta.xauth === true && !userStore.isLogin) {
    next({
      path: "/login",
      query: {
        redirect: to.fullPath
      }
    })
    return
  }
  next()
})

router.afterEach((to) => {
  if (to.meta.title && typeof to.meta.title === 'string') {
    document.title = "猫猫商城 - " + (to.meta.title || "首页")
  }
  if (to.meta.wechat && to.meta.wechat === true) {
    useWechatStore().open()
  } else {
    useWechatStore().close()
  }
  usePathStore().pushPath()
  clearPlaceholderLoading()
})

export default router
