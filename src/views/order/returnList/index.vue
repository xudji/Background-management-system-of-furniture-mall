<!--  -->
<template>
  <div class="return-order-main">
    <el-card shadow="never" class="margin-30">
      <div slot="header">
        <span>条件查询</span>
      </div>
      <el-form :model="form" ref="form" label-width="80px" size="mini">
        <el-form-item label="订单编号">
          <el-input v-model="form.orderSn"></el-input>
        </el-form-item>
        <el-form-item label="退单状态">
          <el-select v-model="form.status">
            <el-option label="待处理" :value="0"></el-option>
            <el-option label="退货中" :value="1"></el-option>
            <el-option label="已完成" :value="2"></el-option>
            <el-option label="已拒绝" :value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="doSearch">搜索</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>

    </el-card>



    <el-card shadow="never" class="margin-30">
      <el-table :data="returnOrderList" border stripe>
        <el-table-column label="#" width="50px" type="index">
        </el-table-column>
        <el-table-column label="退单ID" prop="id">
        </el-table-column>
        <el-table-column label="订单ID" prop="orderId">
        </el-table-column>
        <el-table-column label="订单编号" prop="orderSn">
        </el-table-column>
        <el-table-column label="退单状态" prop="status">
          <template slot-scope="scope">
            <el-button v-if="scope.row.status == 0" type="danger" size="mini">待处理</el-button>
            <el-button v-if="scope.row.status == 1" type="warning" size="mini">退货中</el-button>
            <el-button v-if="scope.row.status == 2" type="primary" plain size="mini">已完成</el-button>
            <el-button v-if="scope.row.status == 3" type="info" plain size="mini">已拒绝</el-button>
          </template>
        </el-table-column>
        <el-table-column label="描述" prop="description">
        </el-table-column>
        <el-table-column label="退单原因" prop="reason">
        </el-table-column>
        <el-table-column label="商品名称" prop="productName">
        </el-table-column>
        <el-table-column label="商品属性" prop="productAttr">
          <template slot-scope="scope">
            <div v-for="item in JSON.parse(scope.row.productAttr)" :key="item.id">
              <span>{{ item.key }}:{{ item.value }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="商家备注" prop="handleNote">
        </el-table-column>
        <el-table-column label="添加时间" prop="createTime">
        </el-table-column>
        <el-table-column fixed="right" label="操作">
          <template slot-scope="scope">
            <el-button @click="goReturnOrderDetail(scope.row.id)" size="small" type="primary"> <i
                class="el-icon-view"></i>
              查看退单</el-button>

          </template>
        </el-table-column>
      </el-table>

    </el-card>


  </div>
</template>

<script>
import { findReturnApply as findReturnApplyApi } from '@/api/order/returnOrder'
export default {
  name: 'ReturnOrderList',
  data() {
    return {
      returnOrderList: [],
      form: {}
    };
  },

  components: {},

  computed: {},

  created() {
    this.findReturnApply()
  },

  //mounted: {},

  methods: {
    doSearch() {
      this.findReturnApply()
    },
    goReturnOrderDetail(returnId) {
      console.log(returnId)
      this.$router.push({
        name: 'ReturnOrderDetail',
        params: {
          returnId: returnId
        }
      })
    },
    findReturnApply() {
      findReturnApplyApi(1, 10, this.form)
        .then(res => {
          console.log(res)
          const { success, data, message } = res
          if (success) {
            this.returnOrderList = data.rows
          }
          else {
            this.$message.error(message)
          }
        })
    }
  }
}

</script>
<style lang='scss' scoped>
.return-order-main {
  .margin-30 {
    margin: 30px
  }
}
</style>