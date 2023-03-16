<!--  -->
<template>
  <el-dialog title="编辑限时活动" :visible.sync="isOpen">
    <el-form :model="form" :inline="true" label-position="top" size="mini">
      <el-row :gutter="20">
        <el-col :span="12" :offset="0"> <el-form-item label="商品原价" :label-width="formLabelWidth">
            {{ form.price }}
          </el-form-item></el-col>
        <el-col :span="12" :offset="0">
          <el-form-item label="商品名称" :label-width="formLabelWidth">
            {{ form.name }}
          </el-form-item></el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="12" :offset="0"> <el-form-item label="促销价格">
            <el-input-number v-model="form.promotionPrice" @change="handleChange" label="描述文字"></el-input-number>
          </el-form-item> </el-col>
        <el-col :span="12" :offset="0">
          <el-form-item label="排序">
            <el-input-number v-model="form.sort" @change="handleChange" label="描述文字"></el-input-number>
          </el-form-item></el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="12" :offset="0">
          <el-form-item label="开始时间">
            <div class="block">
              <el-date-picker v-model="form.promotionStartTime" class="myInput" type="datetime" placeholder="开始时间"
                value-format="yyyy-MM-dd HH:mm:ss">
              </el-date-picker>
            </div>
          </el-form-item>
        </el-col>
        <el-col :span="12" :offset="0"> <el-form-item label="结束时间">
            <div class="block">
              <el-date-picker v-model="form.promotionEndTime" class="myInput" type="datetime" placeholder="开始时间"
                value-format="yyyy-MM-dd HH:mm:ss">
              </el-date-picker>
            </div>
          </el-form-item></el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="12" :offset="0"><el-form-item label="活动限购数量">
            <el-input v-model="form.promotionPerLimit" />
          </el-form-item></el-col>
        <el-col :span="12" :offset="0"><el-form-item label="商品图片">
            <el-image :src="form.pic" fit="fill" :lazy="true" style="width:150px"></el-image>

          </el-form-item></el-col>

      </el-row>

    </el-form>

    <div slot="footer" class="dialog-footer">
      <el-button @click="cancelCurrentActivities">取 消</el-button>
      <el-button type="primary" @click="editCurrentActivity" :loading="couldNext">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import * as _ from 'lodash'
import { updateRecommend as updateRecommendApi, addRecommend as addRecommendApi } from '@/api/market/list'
export default {
  name: 'SaleDetail',
  props: {
    form: {
      type: Object,
      required: true
    },
    productId: {
      type: Object,
      require: true
    },

  },
  mixins: [],
  data() {
    return {
      isOpen: false,
      formLabelWidth: '120px',
      couldNext: false,
    };
  },

  components: {},

  computed: {},

  created() {

  },

  methods: {

    openDia() {
      this.isOpen = true
    },
    handleChange(value) {
      console.log(value)
    },
    // 编辑现时活动
    editCurrentActivity() {
      console.log(this.form
      )
      console.log(this.productId.id)
      this.$confirm(`是否确认新增最热推荐商品?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        // 发请求 传id 改数据
        .then(() => {
          this.couldNext = true // 打开btn  loding
          addRecommendApi({
            ...this.form,
            productId: this.productId.id
          })
            .then((res) => {
              console.log(res)
              if (res.success) {
                this.isOpen = false// 关闭编辑弹窗
                this.isShowDialog = false          // 关闭详情页
                this.productId.id = ''
                this.$emit('closeDialog')
                this.$message.success('添加成功')
              } else {
                this.$message.error('添加失败')
              }
              this.couldNext = false
            })
        })
    },
    // 取消现时活动
    cancelCurrentActivities() {
      this.isOpen = false
    }
  }
}

</script>
<style lang='scss' scoped></style>