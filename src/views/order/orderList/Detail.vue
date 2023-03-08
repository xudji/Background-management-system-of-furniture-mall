<!--  -->
<template>
  <div class="order-detail-main">
    <el-card shadow="never" class="margin-30">
      <el-steps :active="orderBase.status" class="order-steps">
        <el-step title="待付款" :description="orderBase.createTime"></el-step>
        <el-step title="待发货" :description="orderBase.paymentTime"></el-step>
        <el-step title="已发货" :description="orderBase.deliveryTime"></el-step>
        <el-step v-if="orderBase.status !== 4" title="已完成" :description="orderBase.receiveTime"></el-step>
        <el-step v-if="orderBase.status !== 3" title="退货" description="退货时间"></el-step>
        <el-step v-if="orderBase.status !== 3 && orderBase.status !== 4" title="无效订单" description="订单无效"></el-step>
      </el-steps>
      <!-- 订单信息 -->
      <div>
        <h4 style="display: inline-block;">订单信息:</h4>
        <el-tag v-if="orderBase.status == 0" type="success" size="mini" effect="dark">微信</el-tag>
        <el-tag v-if="orderBase.status == 1" type="primary" size="mini" effect="dark">支付宝</el-tag>
        <el-tag v-if="orderBase.status == 2" type="info" size="mini" effect="dark">未支付</el-tag>
        <el-tag v-if="orderBase.status == 3" type="success" size="mini" effect="dark">微信</el-tag>
        <el-tag v-if="orderBase.status == 4" type="primary" size="mini" effect="dark">支付宝</el-tag>
        <el-tag v-if="orderBase.status == 5" type="primary" size="mini" effect="dark">支付宝</el-tag>
        <el-row :gutter="20">
          <el-col :span="6" :offset="0">
            <p>订单金额:
              <span style="color:red">{{ orderBase.totalAmount }}</span>
            </p>
          </el-col>
          <el-col :span="6" :offset="0">
            <p>订单编号:<span>{{ orderBase.orderSn }}</span> </p>
          </el-col>
          <el-col :span="6" :offset="0">
            <p>用户账号:<span>{{ orderBase.memberUsername }}</span> </p>
          </el-col>
          <el-col :span="6" :offset="0">
            <p>备注:<span>{{ orderBase.note }}</span> </p>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="6" :offset="0">
            <p>下单时间:
              <span style="color:red">{{ orderBase.createTime }}</span>
            </p>
          </el-col>
          <el-col :span="6" :offset="0">
            <p>付款时间:<span>{{ orderBase.paymentTime }}</span> </p>
          </el-col>
          <el-col :span="6" :offset="0">
            <p>发货时间:<span>{{ orderBase.deliveryTime }}</span> </p>
          </el-col>
          <el-col :span="6" :offset="0">
            <p>收货时间:<span>{{ orderBase.receiveTime }}</span> </p>
          </el-col>
        </el-row>

      </div>
      <div>
        <!-- 收货人信息 -->
        <h4>收货人信息</h4>
        <div>
          <!-- 商品信息 -->
          <el-table :data="orderItems" border stripe>
            <el-table-column prop="productName" label="商品名称" :width="200">
              <template slot-scope="scope">
                <img align="center" width="180" :src="scope.row.productPic" alt="">
              </template>
            </el-table-column>
            <el-table-column label="是否退货" align="center">
              <template slot-scope="scope">
                <span v-if="scope.row.isReturn == 0">否</span>
                <span v-if="scope.row.isReturn == 1" style="color: red;">是</span>

              </template>
            </el-table-column>
            <el-table-column label="品牌" prop="productBrand" align="center">
            </el-table-column>
            <el-table-column label="价格" prop="productPrice" align="center">
            </el-table-column>
            <el-table-column label="数量" prop="productQuantity" align="center">
            </el-table-column>
            <el-table-column label="小计" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.productQuantity * scope.row.productPrice }}</span>
              </template>
            </el-table-column>
          </el-table>

        </div>
        <!-- 费用信息 -->
        <div>
          <h4>费用信息</h4>
          <el-row :gutter="20">
            <el-col :span="6" :offset="0">
              <p>运费金额:<span style="color:red">0</span></p>
            </el-col>
            <el-col :span="6" :offset="0">
              <p>订单总金额:<span style="color:red">{{ orderBase.totalAmount }}</span></p>
            </el-col>
            <el-col :span="6" :offset="0">
              <p>实际金额:<span style="color:red">{{ orderBase.payAmount }}</span></p>
            </el-col>
            <el-col :span="6" :offset="0">
              <p>促销优惠金额:<span style="color:red">0</span></p>
            </el-col>
          </el-row>
        </div>
      </div>
      <!-- 发货表单 -->
      <div v-if="orderBase.status == 1">
        发货表单
        <el-form :model="form" ref="form" :rules="rules" label-width="80px" size="normal">
          <el-row :gutter="20">
            <el-col :span="6" :offset="0">
              <el-form-item label="物流公司" prop="deliveryCompany">
                <el-select v-if="orderBase.status == 1" v-model="form.deliveryCompany" placeholder="请选择物流公司">
                  <el-option v-for="item in expressList" :key="item.value" :label="item.label" :value="item.label">
                  </el-option>
                </el-select>
              </el-form-item></el-col>
            <el-col :span="6" :offset="0">
              <el-form-item label="物流单号" prop="deliverySn">
                <el-input v-model="form.deliverySn" placeholder="请填写物流单号"></el-input>
              </el-form-item></el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="20" :offset="0">
              <el-form-item align="center">
                <el-button type="primary" @click="sendDone">确认发货</el-button>
              </el-form-item>
            </el-col>

          </el-row>


        </el-form>
      </div>
      <!-- 物流信息 -->
      <div v-if="orderBase.status == 2 || orderBase.status == 3">
        物流信息</div>
    </el-card>
  </div>
</template>
<script>
import { orderDetail as orderDetailApi, sendDone as sendDoneApi } from '@/api/order/order'
export default {
  name: 'OrderDetail',
  data() {
    return {
      orderBase: {},
      orderItems: [],
      orderId: '',
      expressList: [{
        value: '选项1',
        label: '顺丰快递'
      }, {
        value: '选项2',
        label: '韵达快递'
      }, {
        value: '选项3',
        label: '中国邮政'
      }, {
        value: '选项4',
        label: '申通快递'
      }, {
        value: '选项5',
        label: '中通快递'
      },],

      // 待发货验证表单
      form: {
        deliverySn: '',
        deliveryCompany: ''
      },
      rules: {
        deliveryCompany: [
          {
            required: true,
            message: '请填写物流公司',
            trigger: 'change'
          }
        ],
        deliverySn: [
          {
            required: true,
            message: '请填写物流单号',
            trigger: 'blur'
          }
        ]
      },
    };
  },

  components: {},

  computed: {},

  created() {
    this.orderId = this.$route.params.orderId
    this.getOrderDetail()
  },
  // mounted: {},
  methods: {
    //确认发货
    sendDone() {


      sendDoneApi({
        orderId: this.orderId,
        deliverySn: this.form.deliverySn,
        deliveryCompany: this.form.deliveryCompany
      })
        .then((res) => {
          const { success } = res
          if (success) {
            this.$message.success('确定发货成功')
            this.getOrderDetail()
          } else {
            this.$message.error('确定发货失败')
          }
        })
        .catch((res) => {
          this.$message.error('确认发货失败')
        })

    },
    getOrderDetail() {
      orderDetailApi(this.orderId)
        .then(res => {
          const { success, data, message } = res
          console.log(res)
          if (success) {
            this.orderBase = data.orderDetail.orderBase
            this.orderItems = data.orderDetail.orderItems
          } else {
            this.$message.error(message)
          }
        })
    },

  }
}

</script>   


<style lang='scss' scoped>
.order-detail-main {
  .margin-30 {
    margin: 30px;

    .order-steps {
      padding: 30px 200px;
    }
  }
}
</style>