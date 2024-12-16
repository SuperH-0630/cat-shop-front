import {createRouter, createWebHistory, RouteRecordRaw} from 'vue-router'
import { clearPlaceholderLoading } from '@/utils/placeholder-loading'
import {isLogin } from "@/store/user"
import usePathStore from "@/store/path"
import useWechatStore from "@/store/wechat"
import useConfigStore from "@/store/config"
import {isAdmin, isRootAdmin} from "@/store/admin";

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
    path: '/center/user/password',
    component: () => import('@/views/editpassword.vue'),
    meta: {
      title: '重新设置密码',
      xauth: true,
      wechat: true,
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
        redirect: '/admin/user/lst',
      },
      {
        path: 'home',
        redirect: '/admin/user/list',
      },
      {
        path: 'user',
        redirect: "/admin/user/list"
      },
      {
        path: 'user/list',
        component: () => import('@/views/admin/userlst.vue'),
        meta: {
          title: '用户列表',
          admin: true,
        },
      },
      {
        path: 'user/list/info',
        component: () => import('@/views/admin/user.vue'),
        meta: {
          title: '用户详情',
          admin: true,
        },
      },
      {
        path: 'user/list/edit',
        component: () => import('@/views/admin/edituser.vue'),
        meta: {
          title: '编辑用户',
          admin: true,
        },
      },
      {
        path: 'user/list/password',
        component: () => import('@/views/admin/editpassword.vue'),
        meta: {
          title: '编辑密码',
          admin: true
        },
      },
      {
        path: 'user/list/phone',
        component: () => import('@/views/admin/editphone.vue'),
        meta: {
          title: '编辑手机号',
          admin: true
        },
      },
      {
        path: 'user/list/buyrecordlst',
        component: () => import('@/views/admin/buyrecordlst.vue'),
        meta: {
          title: '用户订单列表',
          admin: true,
        },
      },
      {
        path: 'user/list/buyrecord',
        component: () => import('@/views/admin/buyrecord.vue'),
        meta: {
          title: '用户订单列表',
          admin: true,
          vpath: "/admin/user/list/buyrecordlst"
        },
      },
      {
        path: 'user/list/shoppingbag',
        component: () => import('@/views/admin/shoppingbag.vue'),
        meta: {
          title: '用户购物车列表',
          admin: true,
        },
      },
      {
        path: 'user/list/msg',
        component: () => import('@/views/admin/usermsg.vue'),
        meta: {
          title: '用户留言',
          admin: true,
        },
      },
      {
        path: 'user/add',
        component: () => import('@/views/admin/adduser.vue'),
        meta: {
          title: '添加用户',
          admin: true,
        },
      },
      {
        path: 'user/msg',
        component: () => import('@/views/admin/msg.vue'),
        meta: {
          title: '用户留言列表',
          admin: true,
        },
      },
      {
        path: 'class',
        redirect: "/admin/class/list"
      },
      {
        path: 'class/list',
        component: () => import('@/views/admin/classlst.vue'),
        meta: {
          title: '类别列表',
          admin: true,
        },
      },
      {
        path: 'class/list/info',
        component: () => import('@/views/admin/class.vue'),
        meta: {
          title: '类别详情',
          admin: true,
        },
      },
      {
        path: 'class/list/edit',
        component: () => import('@/views/admin/editclass.vue'),
        meta: {
          title: '类别编辑',
          admin: true,
        },
      },
      {
        path: 'class/add',
        component: () => import('@/views/admin/addclass.vue'),
        meta: {
          title: '新增类别',
          admin: true,
        },
      },
      {
        path: 'wupin',
        redirect: "/admin/wupin/list"
      },
      {
        path: 'wupin/list',
        component: () => import('@/views/admin/wupinlst.vue'),
        meta: {
          title: '商品列表',
          admin: true,
        },
      },
      {
        path: 'wupin/list/info',
        component: () => import('@/views/admin/wupin.vue'),
        meta: {
          title: '商品详情',
          admin: true,
        },
      },
      {
        path: 'wupin/list/edit',
        component: () => import('@/views/admin/editwupin.vue'),
        meta: {
          title: '商品编辑',
          admin: true,
        },
      },
      {
        path: 'wupin/add',
        component: () => import('@/views/admin/addwupin.vue'),
        meta: {
          title: '商品添加',
          admin: true,
        },
      },
    ]
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

    if (!isAdmin()) {
      next({
        path: "/error",
        query: {
          msg: "未知页面",
        }
      })
      return
    }
  }

  if (to.meta.rootAdmin && to.meta.rootAdmin === true) {
    if (!isLogin()) {
      next({
        path: "/login",
        query: {
          [redirect]: encodeURIComponent(to.fullPath)
        }
      })
      return
    }

    if (!isRootAdmin()) {
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
