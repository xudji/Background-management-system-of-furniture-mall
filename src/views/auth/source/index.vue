<!--  -->
<template>
  <div class="auth-source-main">
    <el-card shadow="never" class="margin-30">
      <div slot="header">
        <el-button type="warning" size="mini" @click="goInitMenus">初始化菜单</el-button>
        <el-button type="primary" size="mini" @click="goAddMenu">新增菜单</el-button>
      </div>
      <!-- card body -->
      <el-table :data="menuList" border stripe row-key="id" :header-cell-style="{ 'text-align': 'center' }"
        :cell-style="{ 'text-align': 'center' }" :tree-props="{ children: 'children', hasChildren: 'hasChildren' }">

        <el-table-column label="菜单名称" width="200" fixed>
          <template slot-scope="scope">
            <span>{{ scope.row.title }}</span><svg-icon v-if="scope.row.hidden" title="隐藏,不可见" icon-class="hidden"
              class-name="custom-class" />

          </template>
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
    <el-card shadow="never" class="margin-30">
      <el-cascader v-model="pid" :options="formatList" :props="{
        checkStrictly: true, label: 'title', value: 'id', emitPath: false
      }" clearable></el-cascader>
    </el-card>
    <!-- v-on 缩写@ 用于向子组件传递自定义事件 this.$emit('事件名')触发事件  -->
    <MenuTree ref="menuTree" @refresh="findAllPermissions" />
    <MenuForm ref="menuForm" :options="menuList" />
  </div>
</template>

<script>
import { findAllPermissions as findAllPermissionsApi } from '@/api/auth'
import * as _ from 'lodash'
import MenuForm from './components/MenuForm.vue'
import MenuTree from './components/MenuTree.vue'
export default {
  name: 'Source',
  data() {
    return {
      menuList: [],
      pid: '',
      loading: false,
      dialog: false,
    };
  },

  components: {
    MenuForm,
    MenuTree
  },
  computed: {
    // 深拷贝来实现,深拷贝会另外创造一个一模一样的对象，与其拷贝的源对象的属性不共享相同的引用。 删除树形对象数据结构中的空children数组，目的是为了删除Cascader 级联选择器中没有数据的部分，因为不删除还会显示在el级联选择器中，当一个数据集合有清晰的层级结构时，可通过级联选择器逐级查看并选择。
    formatList() {
      var deepList = _.cloneDeep(this.menuList);
      this.reBuildDeepList(deepList)
      return deepList;
    }
  },

  created() {
    console.log(this.findAllPermissions())
  },

  //mounted: {},
  methods: {
    // 一件初始化餐单 
    goInitMenus() {
      this.$refs.menuTree.openDialog()
    },
    goAddMenu() {
      // 跳转打开对话框
      this.$refs.menuForm.openDialog()
    },

    reBuildDeepList(arr) {
      // 递归实现当走到第三层时禁用选中状态(0,1,2)
      for (var i = 0; i < arr.length; i++) {
        var item = arr[i]
        if (item.type === 2) {
          item.disabled = true
        }
        if (item.children && item.children.length > 0) {
          this.reBuildDeepList(item.children)
        } else {
          // 不大于0,删除空的children属性 delete 操作符用于删除对象的某个属性
          delete item.children
        }
      }
    },
    findAllPermissions() {
      this.loading = true
      findAllPermissionsApi()
        .then(res => {
          const { success, data, message } = res
          if (success) {
            this.menuList = data.menus
          } else {
            this.$message.error(message)
          }
          this.loading = false
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