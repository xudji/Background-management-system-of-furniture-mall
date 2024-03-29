
// import store from './store'
// import { Message } from 'element-ui'
import router from './router'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/myAuth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'
NProgress.configure({ showSpinner: false }) // NProgress Configuration
const whiteList = ['/login'] // no redirect whitelist
router.beforeEach(async (to, from, next) => {
  // 进度条
  NProgress.start()
  // 获取页面标题，设置到网页标题栏
  document.title = getPageTitle(to.meta.title)
  console.log(document.title)
  // 你有token吗
  const hasToken = getToken()
  if (hasToken) {
    if (to.path === '/login') {
      // if is logged in, redirect to the home page
      next({ path: '/' })
      NProgress.done()
    } else {
      next()
    }
  } else {
    /* 没有token*/ // 如果在白名单里,放行
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      // 没有访问权限的其他页面被重定向到登录页面。
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})
router.afterEach(() => {
  // 完成进度条
  NProgress.done()
})
