<!--  -->
<template>
  <div class="auth-source-main">
    <el-card shadow="never" class="margin-30">
      <div slot="header">
        <el-button type="warning" size="mini">初始化菜单</el-button>
        <el-button type="primary" size="mini">新增菜单</el-button>
      </div>
      <!-- card body -->
      <el-table :data="list" border stripe row-key="id" :header-cell-style="{ 'text-align': 'center' }"
        :cell-style="{ 'text-align': 'center' }">
      <!--  <template v-for="item in items">
          <el-table-column :prop="item.prop" :label=""></el-table-column>
                            </template> -->
        <el-table-column label="菜单名称" prop="title">
        </el-table-column>
        <el-table-column label="图标">
          <!-- 作用域插槽渲染不用写prop-->
          <template slot-scope="scope">
            <i :class="scope.row.icon"></i>
          </template>
        </el-table-column>
        <el-table-column label="等级" prop="level">
        </el-table-column>
        <el-table-column label="排序" prop="sort">
        </el-table-column>
        <el-table-column label="权限标识" prop="permissionValue">
        </el-table-column>
        <el-table-column label="路由" prop="path">
        </el-table-column>
        <el-table-column label="组件路径" prop="component">
        </el-table-column>
        <el-table-column label="是否可用" prop="status">
        </el-table-column>
        <el-table-column label="创建时间" prop="createTime">
        </el-table-column>
      </el-table>


    </el-card>


  </div>
</template>

<script>
import { findAllPermissions as findAllPermissionsApi } from '@/api/auth'
export default {
  name: 'Source',
  data() {
    return {
      list: []
    };
  },

  components: {},

  computed: {},

  created() {
    this.findAllPermissions()
  },

  //mounted: {},

  methods: {
    findAllPermissions() {
      findAllPermissionsApi()
        .then(res => {
          const { success, data, message } = res
          if (success) {
            this.list = data.menus
          } else {
            this.$message.error(message)
          }
        })
    }
  }
}

</script>
<style lang='scss' scoped>
.auth-source-main {
  .margin-30 {
    margin: 30px;
  }
}
</style>