import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: 'Dashboard', icon: 'dashboard' }
    }]
  },
  {
    path: '/market',
    component: Layout,
    redirect: '/market/list',
    name: 'Market',
    meta: { title: '营销管理', icon: 'el-icon-coin' },
    children: [
      {
        path: 'list',
        name: 'List',
        component: () => import('@/views/market/list/index'),
        meta: { title: '限时活动', icon: 'el-icon-odometer' }
      },
      {
        path: 'advertisement',
        name: 'Advertisement',
        component: () => import('@/views/market/advertisement/index'),
        meta: { title: '广告列表', icon: 'el-icon-discount' }
      },
    ]
  },
  {
    path: '/content',
    component: Layout,
    redirect: '/content/article',
    name: 'Content',
    meta: { title: '内容管理', icon: 'el-icon-folder' },
    children: [
      {
        path: 'article',
        name: 'Ariticle',
        component: () => import('@/views/content/article/index'),
        meta: { title: '文章列表', icon: 'el-icon-document' }
      },
      {
        path: 'add/article',
        name: 'AriticleDetail',
        hidden: true,
        component: () => import('@/views/content/article/Detail'),
        meta: { title: '新增文章', icon: 'table', activeMenu: '/content/article' }
      },
      {
        path: 'edit/article:id',
        name: 'EditArticle',
        hidden: true,
        component: () => import('@/views/content/article/Detail'),
        meta: { title: '编辑文章', icon: 'table', activeMenu: '/content/article' }
      },
      {
        path: 'material',
        name: 'Material',
        component: () => import('@/views/content/material/index'),
        meta: { title: '素材列表', icon: 'el-icon-set-up' }
      }
    ]
  },
  {
    path: '/order',
    component: Layout,
    redirect: '/order/address',
    name: 'Order',
    meta: { title: '订单管理', icon: 'el-icon-receiving' },
    alwaysShow: true,
    children: [
      {
        path: 'address',
        name: 'Address',
        component: () => import('@/views/order/address/index'),
        meta: { title: '地址管理', icon: 'el-icon-place' }
      },
      {
        path: 'orderList',
        name: 'OrderList',
        component: () => import('@/views/order/orderList/index'),
        meta: { title: '订单列表', icon: 'el-icon-document-checked' }
      },
      {
        path: 'orderDetail/:orderId',
        name: 'OrderDetail',
        hidden: true,
        component: () => import('@/views/order/orderList/Detail'),
        meta: { title: '订单详情', icon: 'el-icon-document-checked', activeMenu: '/order/orderlist' }
      },
      {
        path: 'returnOrderList',
        name: 'ReturnOrderList',
        component: () => import('@/views/order/returnList/index'),
        meta: { title: '退单列表', icon: '支付宝' }
      },
    ]
  },
  {
    path: '/product',
    component: Layout,
    redirect: '/product/goodslist',
    name: 'Product',
    meta: { title: '商品管理', icon: 'el-icon-money' },
    alwaysShow: true,
    children: [
      {
        path: 'goodslist',
        name: 'Goodslist',
        component: () => import('@/views/product/goodslist/index'),
        meta: { title: '商品列表', icon: 'table' }
      },
      {
        path: 'addGoods',
        name: 'AddGoods',
        hidden: true,
        component: () => import('@/views/product/goodslist/Detail'),
        meta: { title: '新增商品', icon: 'table', activeMenu: '/product/goodslist' }

      },
    ]
  },


  {
    path: '/form',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Form',
        component: () => import('@/views/form/index'),
        meta: { title: 'Form', icon: 'form' }
      }
    ]
  },
  {
    path: 'external-link',
    component: Layout,
    children: [
      {
        path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
        meta: { title: 'External Link', icon: 'link' }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
