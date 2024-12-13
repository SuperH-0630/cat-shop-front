import {createRouter, createWebHistory, RouteRecordRaw} from 'vue-router'
import { clearPlaceholderLoading } from '@/utils/placeholder-loading'
import { isLogin } from "@/store/user"
import usePathStore from "@/store/path"
import useWechatStore from "@/store/wechat"
import useConfigStore from "@/store/config"

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
  },
  {
    path: '/center/orderrecordlst',
    component: () => import('@/views/buyrecordlst.vue'),
    meta: {
      title: '订单列表',
      xauth: true,
      wechat: true,
    }
  },
  {
    path: '/center/shoppingbag',
    component: () => import('@/views/shoppingbag.vue'),
    meta: {
      title: '购物车',
      xauth: true,
      wechat: true,
    }
  },
  {
    path: '/kefu',
    component: () => import('@/views/kefu.vue'),
    meta: {
      title: '我的客服',
    }
  },
  {
    path: '/center/kefu',
    redirect: "/kefu",
  },
  {
    path: '/aboutus',
    component: () => import('@/views/aboutus.vue'),
    meta: {
      title: '关于我们',
      wechat: true,
    }
  },
  {
    path: '/login',
    component: () => import('@/views/login.vue'),
    meta: {
      title: '登录',
      wechat: true,
    }
  },
  {
    path: '/regirster',
    component: () => import('@/views/regirster.vue'),
    meta: {
      title: '注册',
      wechat: true,
    }
  },
  {
    path: '/error',
    component: () => import('@/views/error.vue'),
    meta: {
      title: '错误',
      wechat: true,
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
  if (to.meta.xauth && to.meta.xauth === true && !isLogin()) {
    next({
      path: "/login",
      query: {
        redirect: encodeURIComponent(to.fullPath)
      }
    })
    return
  }
  console.log("to", to.query)
  next()
})

router.afterEach((to) => {
  const configStore = useConfigStore()
  if (to.meta.title && typeof to.meta.title === 'string') {
    document.title = configStore.cfg.value.name + " - " + (to.meta.title || "首页")
  }
  if (to.meta.wechat && to.meta.wechat === true) {
    useWechatStore().open()
  } else {
    useWechatStore().close()
  }
  usePathStore().pushPath()
  clearPlaceholderLoading()
  console.log("to2", to.query)
})

export default router
