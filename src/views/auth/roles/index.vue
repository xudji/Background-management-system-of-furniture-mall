<!--  -->
<template>
  <div class="role-main">
    <el-card shadow="never" class="margin-30">
      <div slot="header">
        <el-button type="primary" size="mini" @click=goAdd>新增角色</el-button>
      </div>
      <el-table :data="roleList" border style="width: 100%" stripe>
        <el-table-column type="index" label="#" width="60" fixed>
        </el-table-column>
        <el-table-column prop="roleName" label="角色名称" fixed>
        </el-table-column>
        <el-table-column prop="roleCode" label="角色编码">
        </el-table-column>
        <el-table-column prop="remark" label="备注">
        </el-table-column>
        <el-table-column prop="createTime" label="添加时间">
        </el-table-column>
        <el-table-column fixed="right" label="操作">
          <template slot-scope="scope">
            <el-button type="success" size="small" @click="goEdit(scope.row.id)">编辑</el-button>
            <el-button size="small" @click=goDel(scope.row.id)>删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination style="margin-top: 10px; text-align: right;" :page-size="pagniationParams.limit"
        :total="pagniationParams.totalNum" layout="total, sizes, prev, pager, next, jumper"
        :page-sizes="pagniationParams.pageSizes" :current-page.sync="pagniationParams.start"
        @size-change="handleSizeChange" @current-change="handleCurrentChange" />
    </el-card>
    <RoleForm ref="roleForm" :menuList="menuList" @refresh="findRolesByPage" @getAllMenu="getAllMenuList" />

  </div>
</template>

<script>
import { findRolesByPage as findRolesByPageApi, removeRole as removeRoleApi, findAllPermissions as findAllPermissionsApi, getRolePermissions } from '@/api/auth/index'
import RoleForm from './detail.vue'
import mix from '@/mixins';
export default {
  name: 'Roles',
  mixins: [mix],
  data() {
    return {
      search: {
        username: 'abc'
      },
      roleList: [],
      menuList: []
    };
  },

  components: {
    RoleForm
  },

  computed: {},

  created() {
    this.findRolesByPage()
    this.getAllMenuList()
  },

  //mounted() {},

  methods: {
    // 初始化所有菜单备用
    // 初始化所有菜单备用
    getAllMenuList() {
      findAllPermissionsApi().then((res) => {
        if (res.success) {
          console.log(res.data.menus)
          this.menuList = res.data.menus
        } else {
          this.$message.error('获取数据失败!')
        }
        this.loading = false
      })
    },
    findRolesByPage() {
      findRolesByPageApi(this.pagniationParams.start, this.pagniationParams.limit).then(res => {
        console.log(res)
        const { success, data, message } = res
        if (success) {
          const { rows, total } = data
          this.roleList = rows
          this.pagniationParams.totalNum = total
        } else {
          this.$message.error(message)
        }

      })
    },

    handleSizeChange(val) {
      this.limit = val
      this.start = 1
      this.getArticleList()
    },
    // 页面改变
    handleCurrentChange(val) {
      this.start = val
      this.getArticleList()
    },
    goAdd() {
      this.$refs.roleForm.openDialog()
    },
    goEdit(id) {
      this.$refs.roleForm.openDialog(id)
    },
    goDel(id) {
      this.$confirm('此操作将永久删除该角色, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        removeRoleApi(id).then(res => {
          const { success, message } = res
          if (success) {
            this.$message.success(message)
            this.findRolesByPage()
          } else {
            this.$message.error(message)
          }
        })
      }).catch(() => {
      })

    }

  }
}
</script>
<style lang='scss' scoped>
.role-main {
  .margin-30 {
    margin: 30px;
  }
}
</style>