<!--  -->
<template>
  <div class="user-userPage-main">
    <el-card shadow="never" class="card">
      <el-tabs :tab-position="tabPosition">
        <el-tab-pane label="安全设置">
          <div class="userPage-title">安全设置</div>
          <div class="userPage-item">
            <div class="userPage-detail">
              <div class="item-title">账号密码</div>
              <span>当前密码强度: 强</span>
            </div>
            <el-link type="primary" :underline="false">修改</el-link>
          </div>
          <div class="userPage-item">
            <div class="userPage-detail">
              <div class="item-title">密保手机</div>
              <span>已绑定手机：138****8293</span>
            </div>
            <el-link type="primary" :underline="false">修改</el-link>
          </div>
          <div class="userPage-item">
            <div class="userPage-detail">
              <div class="item-title">密保问题</div>
              <span>未设置密保问题，密保问题可有效保护账户安全</span>
            </div>
            <el-link type="primary" :underline="false">修改</el-link>
          </div>
          <div class="userPage-item">
            <div class="userPage-detail">
              <div class="item-title">备用邮箱</div>
              <span>已绑定邮箱：ant***sign.com</span>
            </div>
            <el-link type="primary" :underline="false">修改</el-link>
          </div>
          <div class="userPage-item">
            <div class="userPage-detail">
              <div class="item-title">MFA 设备</div>
              <span>未绑定 MFA 设备，绑定后，可以进行二次确认</span>
            </div>
            <el-link type="primary" :underline="false">修改</el-link>
          </div>
        </el-tab-pane>
        <el-tab-pane label="新消息通知">
          <div class="userPage-title">新消息通知</div>
          <div class="userPage-item">
            <div class="userPage-detail">
              <div class="item-title">账号密码</div>
              <span>其他用户的消息将以站内信的形式通知</span>
            </div>
            <el-switch v-model="value"></el-switch>
          </div>
          <div class="userPage-item">
            <div class="userPage-detail">
              <div class="item-title">系统消息</div>
              <span>系统消息将以站内信的形式通知</span>
            </div>
            <el-switch v-model="value"></el-switch>
          </div>
          <div class="userPage-item">
            <div class="userPage-detail">
              <div class="item-title">待办任务</div>
              <span>待办任务将以站内信的形式通知</span>
            </div>
            <el-switch v-model="value"></el-switch>
          </div>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'UserSet',
  data() {
    return {
      tabPosition: 'left',
      value: true
    };
  },

  components: {},

  computed: {},

  created() { },

  //mounted() {},

  methods: {}
}

</script>
<style lang='scss' scoped>
.card {
  margin: 30px;

  .userPage-title {
    font-size: 22px;
    margin: 8px 0px 0px 6px;
  }

  .userPage-item {
    font-size: 14px;
    margin: 20px 40px 20px 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #e5e5e5;
    padding-bottom: 20px;

    .item-title {
      margin-bottom: 10px;
    }

    .userPage-detail {
      margin-top: 10px;

      span {
        color: #8F8F8F;

      }


    }

    .el-link {
      font-size: 16px;
    }
  }
}
</style>