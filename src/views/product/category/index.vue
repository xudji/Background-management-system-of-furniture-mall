<!--  -->
<template>
  <div class="product-category-main">
    <el-card shadow="never" class="margin-30">
      <el-table :data="categoryList" border stripe row-key="id" :tree-props="{ children: 'arr' }">
        <el-table-column label="菜单名称" prop="name">
        </el-table-column>
        <el-table-column label="Icon">
          <template slot-scope="scope">
            <img width="80px" :src="scope.row.icon" alt="">
          </template>
        </el-table-column>
        <el-table-column label="分类名字" prop="name">
        </el-table-column>
        <el-table-column label="排序" prop="sort">
        </el-table-column>
        <el-table-column label="显示状态">
          <template slot-scope="scope">
            <span v-if="scope.row.showStatus == 1">显示</span>
            <span v-if="scope.row.showStatus == 0">不显示</span>
          </template>
        </el-table-column>
        <el-table-column label="导航栏展示">
          <template slot-scope="scope">
            <span v-if="scope.row.navStatus == 1">展示</span>
            <span v-if="scope.row.navStatus == 0">不展示</span>
          </template>
        </el-table-column>
        <el-table-column label="描述" prop="description">
        </el-table-column>
        <el-table-column label="创建时间" prop="createTime">
        </el-table-column>


      </el-table>

    </el-card>

  </div>
</template>

<script>
import { getAllCategory as getAllCategoryApi } from '@/api/product/category';
export default {
  name: 'Category',
  data() {
    return {
      categoryList: []
    };
  },

  components: {},

  computed: {},

  created() {
    this.getAllCategory()
  },

  //mounted: {},

  methods: {
    getAllCategory() {
      getAllCategoryApi().then(res => {
        const { success, data, message } = res
        if (success) {
          var tempList = data.items
          tempList.forEach(ele => {
            this.categoryList.push({
              ...ele.category,
              // 树形表格必须children字段和row-key
              //children: ele.children
              arr: ele.children
            })
          });
        } else {
          this.$message.error(message)
        }
      })
    }
  }
}

</script>
<style lang='scss' scoped>
.product-category-main {
  .margin-30 {
    margin: 30px;
  }
}
</style>