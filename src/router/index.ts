import {createRouter, createWebHistory, RouteRecordRaw} from 'vue-router'
import { clearPlaceholderLoading } from '@/utils/placeholder-loading'
import useUserStore, {isLogin } from "@/store/user"
import usePathStore from "@/store/path"
import useWechatStore from "@/store/wechat"
import useConfigStore from "@/store/config"

export const redirect = "redirect"

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
    path: '/kefu',
    component: () => import('@/views/kefu.vue'),
    meta: {
      title: '我的客服',
    }
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
    path: '/center/buyrecordlist',
    component: () => import('@/views/buyrecordlst.vue'),
    meta: {
      title: '消费列表',
      xauth: true,
      wechat: true,
    }
  },
  {
    path: '/center/buyrecordlist/detial',
    component: () => import('@/views/buyrecord.vue'),
    meta: {
      title: '消费详情',
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
    path: '/center/kefu',
    redirect: "/kefu",
  },
  {
    path: '/center/aboutus',
    redirect: "/aboutus",
  },
  {
    path: '/center/user/edit',
    component: () => import('@/views/edituser.vue'),
    meta: {
      title: '编辑信息',
      xauth: true,
      wechat: true,
    }
  },
  {
    path: '/test/pay',
    component: () => import('@/views/testpay.vue'),
    meta: {
      title: '支付测试',
      xauth: true,
      wechat: true,
      test: true,
    }
  },
  {
    path: '/admin',
    component: () => import('@/views/admin.vue'),
    meta: {
      title: '后台',
      admin: true,
    },
    children: [
      {
        path: '',
        redirect: '/admin/home',
      },
      {
        path: 'home',
        component: () => import('@/views/admin/home.vue'),
        meta: {
          title: '后台',
          admin: true,
        },
      }
    ]
  },
  {
    path: '/error',
    component: () => import('@/views/error.vue'),
    meta: {
      title: '错误',
      wechat: true,
    }
  },
  {
    path: '/:catchAll(.*)',
    component: () => import('@/views/notfound.vue'),
    meta: {
      title: '404-页面不存在',
      wechat: true,
      notfound: true,
    }
  },
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

  if (to.meta.xauth && to.meta.xauth === true && !isLogin()) {
    next({
      path: "/login",
      query: {
        [redirect]: encodeURIComponent(to.fullPath)
      }
    })
    return
  }

  if (to.meta.admin && to.meta.admin === true) {
    if (!isLogin()) {
      next({
        path: "/login",
        query: {
          [redirect]: encodeURIComponent(to.fullPath)
        }
      })
      return
    }

    if (userStore.user.type === 1) {
      next({
        path: "/error",
        query: {
          msg: "未知页面",
        }
      })
      return
    }
  }

  next()
})

router.afterEach((to) => {
  const configStore = useConfigStore()
  if (to.meta.title && typeof to.meta.title === 'string') {
    document.title = configStore.config?.name + " - " + (to.meta.title || "首页")
  }

  if (to.meta.wechat && to.meta.wechat === true) {
    useWechatStore().open()
  } else {
    useWechatStore().close()
  }

  if (to.meta.admin && to.meta.admin === true) {
    useWechatStore().close()
  }

  usePathStore().pushPath()
  clearPlaceholderLoading()
})

export default router
