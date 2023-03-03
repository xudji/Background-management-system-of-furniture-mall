<!--  -->
<template>
  <div class="order-list-main">
    <el-card shadow="never" class="margin-30">
      <div slot="header">
        <span>条件查询</span>
      </div>
      <el-form :model="searchForm" ref="form" label-width="80px" size="normal">
        <el-row :gutter="20">
          <el-col :span="6" :offset="0">
            <el-form-item label="订单编号">
              <el-input v-model="searchForm.orderSn"></el-input>
            </el-form-item></el-col>
          <el-col :span="6" :offset="0">
            <el-form-item label="订单类型">
              <el-select v-model="searchForm.orderType" clearable filterable>
                <el-option :value="0" label="正常订单">
                </el-option>
                <el-option :value="1" label="秒杀">
                </el-option>
              </el-select>

            </el-form-item></el-col>
          <el-col :span="6" :offset="0">
            <el-form-item label="支付方式">
              <el-select v-model="searchForm.payType" clearable filterable>
                <el-option :value="0" label="未支付">
                </el-option>
                <el-option :value="1" label="支付宝">
                </el-option>
                <el-option :value="2" label="微信">
                </el-option>
              </el-select>

            </el-form-item></el-col>
          <el-col :span="6" :offset="0">
            <el-form-item label="订单状态" align="center">
              <el-select v-model="searchForm.status" clearable filterable>
                <el-option v-for="item in orderState" :key="item.value" :label="item.text" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>

        </el-row>
        <el-row :gutter="20">
          <el-col :span="6" :offset="18">
            <el-form-item>
              <el-button type="primary" size="default" @click="doSearch">搜索</el-button>
              <el-button>取消</el-button>
            </el-form-item>
          </el-col>
          <el-col :span="12" :offset="0"></el-col>
        </el-row>

      </el-form>

    </el-card>

    <el-card shadow="never" class="margin-30">
      <div slot="header">
        <el-table :data="orderList">
          <el-table-column type="index" label="#" :width="50">
          </el-table-column>
          <el-table-column label="订单编号" prop="orderSn">
          </el-table-column>
          <el-table-column label="订单ID" prop="id">
          </el-table-column>
          <el-table-column label="支付方式" align="center">
            <template slot-scope="scope">
            <!--  <svg-icon v-if="scope.row.payType == 2" icon-class="微信" class-name='custom-class' />
              <svg-icon v-if="scope.row.payType == 1" icon-class="支付宝" class-name='custom-class' />
                                                                                          <el-button v-if="scope.row.payType == 0" size="mini">未支付</el-button> -->
              <el-tag v-if="scope.row.payType == 2" type="success" size="mini" effect="dark">微信</el-tag>
              <el-tag v-if="scope.row.payType == 1" type="primary" size="mini" effect="dark">支付宝</el-tag>
              <el-tag v-if="scope.row.payType == 0" type="info" size="mini" effect="dark">未支付</el-tag>

            </template>
          </el-table-column>

          <el-table-column label="添加时间" prop="createTime">
          </el-table-column>
          <el-table-column label="用户账号" prop="memberUsername">
          </el-table-column>
          <el-table-column label="订单类型" prop="orderType">
            <template slot-scope="scope">
              <el-button v-if="scope.row.deliveryCompany" size="mini">{{ scope.row.deliveryCompany }}</el-button>
            </template>
          </el-table-column>
          <el-table-column label="备注" prop="note">
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="100">
            <template slot-scope="scope">
              <el-button @click="goOrderDetail(scope.row.id)" size="small" type="primary"> <i class="el-icon-view"></i>
                查看订单</el-button>

            </template>
          </el-table-column>

        </el-table>

      </div>
      <!-- card body -->
    </el-card>

  </div>
</template>

<script>
import { findOrdersByPage as findOrdersByPageApi } from '@/api/order/order'
import mix from '@/mixins'
export default {
  name: 'OrderList',
  mixins: [mix],
  data() {
    return {
      orderList: [],
      searchForm: {},
      orderState: [
        {
          text: '待付款',
          value: 0,
        },
        {
          text: '待发货',
          value: 1,
        },
        {
          text: '已发货',
          value: 2,
        },
        {
          text: '已完成',
          value: 3,
        },
        {
          text: '退货',
          value: 4,
        },
        {
          text: '无效订单',
          value: 5,
        },
      ]
    };
  },

  components: {},

  computed: {},

  created() {
    this.getOrderList()
  },

  //mounted: {},

  methods: {
    goOrderDetail(id) {
      this.$router.push({ name: 'OrderDetail', params: { orderId: id } })
    },
    doSearch() {
      this.getOrderList()
    },
    getOrderList() {
      findOrdersByPageApi(this.pagniationParams.start, this.pagniationParams.limit, this.searchForm)
        .then(res => {
          const { success, data, message } = res
          console.log(res)
          if (success) {
            this.orderList = data.rows
            console.log(this.orderList)
            this.pagniationParams.totalNum = data.total
          } else {
            this.$message.error(message)
          }
        })


    }
  }
}

</script>
<style lang='scss' scoped>
.order-list-main {
  .margin-30 {
    margin: 30px;
  }
}
</style>