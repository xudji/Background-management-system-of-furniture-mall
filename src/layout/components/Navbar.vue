<template>
  <div class="navbar">
    <hamburger :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />

    <breadcrumb class="breadcrumb-container" />

    <div class="right-menu">
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <!-- <img :src="avatar+'?imageView2/1/w/80/h/80'" > -->
          欢迎管理员: <span>{{ username }}</span>
          <!-- :src 绑定的是方法名 -->
          <img class="user-avatar" :src="avatar" alt="">
          <i class="el-icon-caret-bottom" />
        </div>
        <el-dropdown-menu slot="dropdown" class="user-dropdown">
          <router-link to="/">
            <el-dropdown-item>
              首页
            </el-dropdown-item>
          </router-link>
          <router-link to="/user">
            <el-dropdown-item>
              个人中心
            </el-dropdown-item>
          </router-link>
          <el-dropdown-item divided @click.native="logout">
            <span style="display:block;">退出</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>

    <div v-if="titleShow">
      <Title></Title>
    </div>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import Title from '@/components/Breadcrumb/title1.vue'
import { getUserInfo, removeUserInfo, removeToken } from '@/utils/myAuth'
// import { remove } from 'js-cookie'

export default {
  data() {
    return {
      titleShow: true
    };
  },
  components: {
    Breadcrumb,
    Hamburger,
    Title
  },
  computed: {
    ...mapGetters([
      'sidebar'
    ]),
    avatar() {
      return getUserInfo().icon
    },
    username() {
      // 要return
      return getUserInfo().username
    }
  },
  created() {
    if (this.$route.path === "/dashboard")
      this.titleShow = false;
  },
  mounted() {
  },
  watch: {
    $route(r) {
      this.titleShow = r.path !== '/dashboard'
    }
  },

  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    // 退出逻辑，清除token和用户信息，跳转到登录页面,async 表示函数里有异步操作
    async logout() {
      removeToken()
      removeUserInfo()
      this.$router.push('./login')
    }
  }
}

</script>

<style lang="scss" scoped>
.navbar {
  height: 52px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, .08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background .3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, .025)
    }
  }

  .breadcrumb-container {
    float: left;
  }



  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background .3s;

        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      span {
        width: 40px;
        height: 40px;
        line-height: 40px;
      }

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;
        display: flex;
        align-items: center;

        span {

          margin-right: 6px;
        }

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
          margin-bottom: 8px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
