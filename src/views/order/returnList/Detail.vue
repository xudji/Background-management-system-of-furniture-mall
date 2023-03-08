<!--  -->
<template>
  <div class="return-order-main">
    <el-card shadow="never" class="margin-30">
      <div>
        <h4 style="display: inline-block;">退单信息：</h4>
        <el-button v-if="orderReturnApply.status == 0" type="danger" size="mini">待处理</el-button>
        <el-button v-if="orderReturnApply.status == 1" type="warning" size="mini">退货中</el-button>
        <el-button v-if="orderReturnApply.status == 2" type="primary" plain size="mini">已完成</el-button>
        <el-button v-if="orderReturnApply.status == 3" type="info" plain size="mini">已拒绝</el-button>
        <!-- 传递订单id -->
        <router-link :to="`/order/orderDetail/:${orderReturnApply.orderId}`">查看订单详情</router-link>
      </div>
      <div>
        <h4>费用信息</h4>
        <el-row :gutter="20">
          <el-col :span="6" :offset="0">
            <p>退单金额: <span style="color: red;">{{ orderReturnApply.returnAmount }} </span> </p>
          </el-col>
          <el-col :span="6" :offset="0">
            <p>运费金额:0</p>
          </el-col>
        </el-row>
        <el-form :model="form" ref="form" label-width="80px" size="mini">
          <el-form-item label="退款金额">
            <el-input v-model="form.returnAmount"></el-input>
          </el-form-item>
          <el-form-item label="处理人">
            <el-input v-model="form.handleMan"></el-input>
          </el-form-item>
          <el-form-item label="处理备注">
            <el-input v-model="form.handleNote"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="agreeReturnMoney">同意退款</el-button>
            <el-button @click="rejucetReturnMoney">拒绝退款</el-button>
          </el-form-item>
        </el-form>

      </div>
      <!-- 处理结果 -->
      <div v-if="orderReturnApply.status == 1">
        {{ orderReturnApply.handleMan }} --- {{ orderReturnApply.handleNote }} --- {{ orderReturnApply.handleTime }}
        <el-form :model="receiveProduct" ref="form" label-width="80px" :inline="false" size="mini">
          <el-form-item label="收货人">
            <el-input v-model="receiveProduct.receiveMan"></el-input>
          </el-form-item>
          <el-form-item label="收货备注">
            <el-input v-model="receiveProduct.receiveNote"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="doreceiveProduct">确认收货</el-button>
          </el-form-item>
        </el-form>

      </div>
    </el-card>


  </div>
</template>

<script>
import { orderReturn as orderReturnApi, agreeApply as agreeApplyApi, receiveProduct as receiveProductApi } from '@/api/order/returnOrder'
export default {
  name: 'ReturnOrderDetail',
  data() {
    return {
      returnId: '',
      orderReturnApply: {},
      form: {},
      receiveProduct: {}
    };
  },

  components: {},

  computed: {},

  created() {
    // 路由传参拿到父组件的数据
    this.returnId = this.$route.params.returnId
    this.orderReturn()


  },

  //mounted: {},

  methods: {
    doreceiveProduct() {
      this.receiveProduct.id = this.returnId
      receiveProductApi(this.returnId, this.receiveProduct).then(res => {
        const { success, message } = res
        if (success) {
          this.orderReturn()
        } else {
          this.$message.error(message)
        }
      })
    },
    agreeReturnMoney() {
      this.form.id = this.returnId
      agreeApplyApi(this.returnId, this.form)
        .then(res => {
          const { success, message } = res;
          if (success) {
            this.orderReturn()
          } else {
            this.$message.error(message)
          }
        })
    },
    rejucetReturnMoney() {

    },
    orderReturn() {
      orderReturnApi(this.returnId)
        .then(res => {
          const { success, data, message } = res
          if (success) {
            this.orderReturnApply = data.orderReturnApply
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