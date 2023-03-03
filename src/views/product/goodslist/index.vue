<!--  -->
<template>
  <div class="goods-list-main">
    <el-collapse>
      <el-collapse-item title="商品管理介绍">
        <div>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div>
      </el-collapse-item>
    </el-collapse>
    <el-collapse class="margin-30">
      <el-collapse-item title="条件查询">
        <el-form :model="searchGoods" ref="form" label-width="120px" size="mini">
          <el-row :gutter="20">
            <el-col :span="6" :offset="0">
              <el-form-item label="商品名称">
                <el-input v-model="searchGoods.keywords" placeholder="商品名称/模糊查询"></el-input>
              </el-form-item></el-col>
            <el-col :span="5" :offset="0">
              <el-form-item label="商品货号">
                <el-input v-model="searchGoods.categoryId" placeholder="商品货号"></el-input>
              </el-form-item></el-col>
            <el-col :span="5" :offset="0">
              <el-form-item label="品牌">

                <el-select v-model="searchGoods.brandId" placeholder="品牌" clearable filterable>
                  <el-option v-for="item in brandList" :key="item.id" :label="item.name" :value="item.id">
                  </el-option>
                </el-select>

              </el-form-item></el-col>
            <el-col :span="6" :offset="0">
              <el-form-item label="上架状态">
                <el-select v-model="searchGoods.isDesc" placeholder="上架状态" clearable filterable>
                  <el-option label="下架" :value="0">
                  </el-option>
                  <el-option label="上架" :value="1">
                  </el-option>
                </el-select>

              </el-form-item></el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="6" :offset="0">
              <el-form-item label="审核状态">
                <el-select v-model="searchGoods.sortBy" placeholder="审核状态" clearable filterable>
                  <el-option label="未审核" :value="0">
                  </el-option>
                  <el-option label="审核通过" :value="1">
                  </el-option>
                </el-select>

              </el-form-item></el-col>
            <el-col :span="6" :offset="12">
              <el-form-item>
                <el-button>重置</el-button>
                <el-button type="primary" @click="doSearchGoods">搜索</el-button>
              </el-form-item></el-col>
          </el-row>



        </el-form>

      </el-collapse-item>
    </el-collapse>
    <!-- 商品列表 -->
    <el-card shadow="always" class="margin-30">
      <div slot="header">
        <el-button type="primary" size="mini" @click="goAddGoods">新增</el-button>
        <el-button type="primary" size="mini" @click="exportExcel">导出商品Excel</el-button>
      </div>
      <el-table :data="goodsList" border stripe>
        <el-table-column label="#" type="index" width="50" align="center">
        </el-table-column>
        <el-table-column label="商品图片" width="200" align="center">
          <template slot-scope="scope">
            <img width="180" :src="scope.row.bigPic" alt="">
          </template>
        </el-table-column>
        <el-table-column label="商品名称" prop="name" width="200" align="center">
        </el-table-column>
        <el-table-column label="标签" width="300" align="center">
          <template slot-scope="scope">
            <div> 最新:
              <el-switch v-model="scope.row.newStatus" :active-value="1" :inactive-value="0" @change="">
              </el-switch>
            </div>
            <div> 推荐:
              <el-switch v-model="scope.row.recommendStatus" :active-value="1" :inactive-value="0" @change="">
              </el-switch>
            </div>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination @size-change="sizeChange" @current-change="currentChange" :current-page.sync="pagniationParams.start"
        :page-sizes="pagniationParams.pageSizes" :page-size="pagniationParams.limit"
        layout="total, sizes, prev, pager, next, jumper" :total="pagniationParams.totalNum" background>
        >
      </el-pagination>

    </el-card>

  </div>
</template>

<script>
import { findAllBrand as findAllBrandApi, } from '@/api/product/brand'
import { findBrandByPage as findBrandByPageApi, productSkusDetail as productSkusDetailApi } from '@/api/product/goods'
import mix from '@/mixins'
export default {
  name: 'goodslist',
  mixins: [mix],
  data() {
    return {
      searchGoods: {},
      brandList: [],
      goodsList: []
    };
  },

  components: {},

  computed: {},

  created() {
    this.getBrandList()
    this.getGoodsList()
  },

  // mounted: {},

  methods: {
    // 导出excel
    exportExcel() {
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['品牌名称', '商品名称', '价格', '重量', '添加时间']
        const filterVal = ['brandName', 'name', 'price', 'weight', 'createTime']
        const list = this.goodsList
        const data = this.formatJson(filterVal, list)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: '测试',
          autoWidth: true,
          bookType: 'xlsx'
        })
        this.downloadLoading = false
      })
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => {
        if (j === 'timestamp') {
          return parseTime(v[j])
        } else {
          return v[j]
        }
      }))
    },
    goAddGoods() {
      this.$router.push({ name: 'AddGoods' })
    },
    getBrandList() {
      findAllBrandApi().then(res => {
        const { success, data, message } = res
        if (success) {
          this.brandList = data.items
        } else {
          this.$messege.error(message)
        }
      })
    },
    doSearchGoods() {
      this.getGoodsList()
    },
    // 获取商品列表
    getGoodsList() {
      //实参
      findBrandByPageApi(this.pagniationParams.start, this.pagniationParams.limit, this.searchGoods).then(res => {
        const { success, data, message } = res
        console.log(res)
        if (success) {
          this.goodsList = data.rows
          this.pagniationParams.totalNum = data.totalNum
        } else {
          this.$messege.error(message)
        }
      })
    },
    sizeChange() {
      
    },
    currentChange() {

    }
  },

}


</script>
<style lang='scss' scoped>
.goods-list-main {
  .el-collapse {
    background-color: #fff;
    padding-bottom: 10px;
    text-indent: 16px;

  }

  .margin-30 {
    margin: 30px;
  }
}
</style>