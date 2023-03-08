<!--  -->
<template>
  <div>
    <el-checkbox v-model="expandedAll" @change="handleExpandeAll">展开/关闭</el-checkbox>
    <el-checkbox v-model="selectedAll" @change="handleSelectedAll">全选/反选</el-checkbox>
    <el-tree :data="listMenus" :props="props" show-checkbox>
    </el-tree>
  </div>
</template>

<script>
import { findAllPermissions as findAllPermissionsApi } from '@/api/auth';
export default {
  name: 'Roles',
  data() {
    return {
      expandedAll: false,
      selectedAll: false,
      props: {
        label: 'title',
        children: 'children'
      },
      listMenus: []
    };
  },

  components: {},

  computed: {},

  created() { },

  mounted() {
    this.findAllPermissions()
  },

  methods: {
    handleExpandeAll(v) {
      var nodes = this.$refs.tree.store.nodesMap
        for (const i in nodes) {
          nodes[i].expanded = v
        }
    },
    handleSelectedAll() {
      console.log('全选')
    },
    findAllPermissions() {
      findAllPermissionsApi()
        .then(res => {
          const { success, data, message } = res
          if (success) {
            this.listMenus = data.menus
          } else {
            this.$message.error(message)
          }
        })
    }
  }
}

</script>
<style lang='scss' scoped></style>