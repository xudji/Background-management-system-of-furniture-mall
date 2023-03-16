<template>
  <div class="marterial-main">
    <el-card shadow="always" class="margin-30">
      <div slot="header">
        <el-upload action="/lejuAdmin/material/uploadFileOssSave" ref="upload" multiple :limit="2" :headers="token"
          :on-exceed="exceedChange()" :on-success="marterialUploadSucc">
          <el-button slot="trigger" size="small" type="primary">上传素材</el-button>
          <div slot="tip" class="el-upload__tip">jpg/png files with a size less than 500kb</div>
        </el-upload>
      </div>

      <el-row :gutter="20">
        <el-col v-for="item in list" :key="item.id" style="width: 20%; margin-bottom: 20px;">
          <el-card shadow="never">
            <div slot="header">
              <span>
                创建时间: {{ item.createTime }}
              </span>
            </div>
            <el-image :preview-src-list="previewSrcList" :src="item.ossUrl"
              style="display: block; margin: 0 auto; width: 100px; height: 100px;"></el-image>
            <el-button type="danger" size="small" @click="deleteMaterialById(item.id)">删除</el-button>
          </el-card>

        </el-col>
      </el-row>
      <el-pagination style="margin-top: 10px; text-align: right;" :page-size="pagniationParams.limit"
        :total="pagniationParams.total" layout="total, sizes, prev, pager, next, jumper"
        :page-sizes="pagniationParams.pageSizes" :current-page.sync="pagniationParams.start"
        @size-change="handleSizeChange" @current-change="handleCurrentChange" />
    </el-card>
  </div>
</template>

<script>
import mix from '@/mixins'
import { findMaterialByPage } from '@/api/content/materail'
export default {
  mixins: [mix],
  name: 'material',

  data() {
    return {
      list: [],
      previewSrcList: []
    }
  },
  created() {
    this.getMaterialList()
  },
  mounted() {
  },
  methods: {
    marterialUploadSucc(res) {
      console.log(res)
      this.getMaterialList()
    },
    exceedChange() {
      console.log('超出图片个数')
    },
    getMaterialList() {
      findMaterialByPage(this.pagniationParams.start, this.pagniationParams.limit)
        .then(res => {
          const { success, data, message } = res
          if (success) {
            const { total } = data
            this.list = data.rows
            this.pagniationParams.total = total
            // map遍历对象返回一个结果，返回一个数组
            this.previewSrcList = data.rows.map(ele =>
              ele.ossUrl)
          } else {
            this.$message.error(message)
          }
        })
    },
    // 删除
    deleteMaterialById(id) {

    },
    handleSizeChange(val) {
      this.limit = val
      this.start = 1
      this.getMaterialList()
    },
    // 页面改变
    handleCurrentChange(val) {
      this.start = val
      this.getMaterialList()
    }
  }
}

</script>

<style lang="scss" scoped>
.marterial-main {
  .margin-30 {
    margin: 30px
  }
}
</style>
