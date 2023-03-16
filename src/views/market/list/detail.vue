<!--  -->
<template>
  <div>
    <!-- 对话框  :visible.sync 控制表单的显示隐藏  -->
    <el-dialog title="热销详情" :visible.sync="isShowDialog" width="90%">
      <el-card shadow="never">
        <div slot="header">
          <span>条件查询</span>
        </div>
        <el-form :model="search" v-model="search" ref="form" size="mini">
          <el-row :gutter="20">
            <el-col :span="4" :offset="0">
              <el-form-item>
                <el-input v-model="search.name" placeholder="商品名称/模糊查询"></el-input>
              </el-form-item></el-col>
            <el-col :span="4" :offset="0">

              <!-- v-model表单输入绑定 -->
              <el-form-item>
                <el-input v-model="search.productSn" placeholder="商品货号"></el-input>
              </el-form-item></el-col>
            <el-col :span="4" :offset="0">
              <el-form-item>
                <el-select placeholder="品牌" clearable filterable v-model="search.brandId">
                  <el-option v-for="item in brandList" :value="item.id" :key="item.id" :label="item.name">
                  </el-option>
                </el-select>
              </el-form-item></el-col>
            <el-col :span="4" :offset="0">
              <el-form-item>
                <el-select v-model="search.publishStatus" placeholder="上架状态" clearable filterable>
                  <el-option value="0" label="下架">
                  </el-option>
                  <el-option value="1" label="上架">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="4" :offset="0">
              <el-form-item>
                <el-select v-model="search.verifyStatus" placeholder="审核状态" clearable filterable>
                  <el-option value="0" label="未审核">
                  </el-option>
                  <el-option value="1" label="审核通过">
                  </el-option>
                </el-select>

              </el-form-item></el-col>
            <el-col :span="4" :offset="0">
              <el-form-item>
                <el-button @click="doReset">重置</el-button>
                <el-button type="primary" @click="doSearch">搜索</el-button>
              </el-form-item></el-col>
          </el-row>

        </el-form>
      </el-card>
      <el-card shadow="never">
        <div slot="header">
          <span>商品列表</span>
        </div>
        <el-radio-group v-model="productId" style="width: 100%" @change="radioChange">
          <el-table ref="productTable" v-loading="loading" :data="goodsData" style="width: 100%" height="400">
            <el-table-column fixed type="index" label="序号">
            </el-table-column>



            <el-table-column label="选择">
              <template slot-scope="scope">
                <!-- label是显示值 value是给后台传递的值  -->
                <el-radio :label="scope.row.id"><span /></el-radio>
              </template>
            </el-table-column>

            <el-table-column label="商品图片">
              <template slot-scope="scope">
                <el-image :src="scope.row.pic"><span /></el-image>
              </template>
            </el-table-column>
            <el-table-column label="商品名称" width="300px">
              <template slot-scope="scope">
                <div> {{ scope.row.name }} </div>
                <div> 品牌: {{ scope.row.brandName }} </div>
                <p> {{ scope.row.description }} </p>
              </template>
            </el-table-column>
            <el-table-column prop="address" label="商品价格">
              <template slot-scope="scope">
                <div>
                  原价: {{ scope.row.originalPrice }}
                </div>
                <div>
                  现价: {{ scope.row.price }}
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="productCategoryName" label="商品类别">
            </el-table-column>
            <el-table-column prop="weight" label="重量">
            </el-table-column>
          </el-table>
        </el-radio-group>
      </el-card>

      <el-pagination style="margin-top: 10px; text-align: right;" :page-size="pagniationParams.limit"
        :total="pagniationParams.totalNum" layout="total, sizes, prev, pager, next, jumper"
        :page-sizes="pagniationParams.pageSizes" :current-page.sync="pagniationParams.start"
        @size-change="handleSizeChange" @current-change="handleCurrentChange" />


      <span slot="footer" class="dialog-footer">
        <el-button type="mini" @click="closeDialog">取 消</el-button>
      </span>
    </el-dialog>
    <SaleDetail ref="SaleDetail" :form="form" :productId="{ id: productId }" @closeDialog="closeDialog" />
  </div>
</template>

<script>
import mix from '@/mixins';
import { productsByPage as productsByPageApi } from '@/api/product/goods'
import { findAllBrand as findAllBrandApi } from '@/api/product/brand'
import SaleDetail from './saleDetail.vue';
export default {
  name: 'AddAdlist',
  mixins: [mix],
  data() {
    return {
      isEditOpen: false,
      form: {
        productId: '', // 商品ID
        promotionPrice: '',
        promotionPerLimit: '',
        sort: '',
        promotionStartTime: '',
        promotionEndTime: ''
      },
      productId: '', //radio选中商品id
      loading: false,
      isShowDialog: false,
      goodsData: [],
      brandList: [],
      // search可以拿到表单输入的结果
      search: {
        productSn: '',
        publishStatus: '',
        verifyStatus: '',
        name: ''
      }, // 搜索栏
    };
  },

  components: {
    SaleDetail
  },

  computed: {},

  created() {
    this.productsByPage()
    this.findAllBrand()

  },

  //mounted() {},

  methods: {
    // radio改变 打开对话框 
    radioChange(v) {
      console.log(v)
      this.productId = v
      this.goodsData.forEach((item) => {
        if (item.id === v) {
          this.form = item
        }
      })
      this.$refs.SaleDetail.openDia()
    },
    findAllBrand() {
      findAllBrandApi().then(res => {
        const { data } = res
        this.brandList = data.items
      }
      )
    },
    productsByPage() {
      const sendSearch = {}
      for (const key in this.search) {
        if (Object.hasOwnProperty.call(this.search, key)) {
          sendSearch[key] = this.search[key];
        }
      }
      this.loading = true
      productsByPageApi(this.pagniationParams.start, this.pagniationParams.limit, {
        ...sendSearch
      }).then(res => {
        const { success, data, message } = res
        console.log(res)
        if (success) {
          this.pagniationParams.totalNum = data.total
          this.goodsData = data.rows
          this.loading = false
        } else {
          this.$message.error(message)
          this.loading = false
        }

      })
    }
    ,
    openDialog() {
      this.isShowDialog = true
    },
    closeDialog() {
      this.isShowDialog = false
    },
    doReset() {
      // 清空表单内容
      this.pagniationParams.start = 1
      this.search = this.$options.data().search // 等于表单初始值
      this.productsByPage() // 重新刷新请求数据
    },
    doSearch() {
      this.pagniationParams.start = 1
      this.productsByPage()
    },
    handleSizeChange(val) {
      this.limit = val
      this.start = 1
      this.productsByPage()
    },
    // 页面改变
    handleCurrentChange(val) {
      this.start = val
      this.productsByPage()
    }
  }
}

</script>
<style lang='scss' scoped></style>