<!--  -->
<template>
  <div class="add-goods-main">
    <el-steps class="steps" :active="step" finish-status="success">
      <el-step title="商品基本信息"></el-step>
      <el-step title="添加库存信息"></el-step>
      <el-step title="添加移动端详情"></el-step>
    </el-steps>
    <el-card shadow="never" class="margin-30 ">
      <div slot="header">
        <el-form :model="goods" :rules="rules" ref="form" label-width="100px" size="mini" id="selectForm">
          <!-- 第一页 -->
          <div v-show="step == 1">
            <div class="common-header">
              <div>基本信息</div>
              <el-divider></el-divider>

            </div>
            <el-row :gutter="20">
              <el-col :span="8" :offset="0"> <el-form-item label="商品名称" v-model="goods.name" prop="name">
                  <el-input></el-input>
                </el-form-item></el-col>

              <el-col :span="8" :offset="0"> <el-form-item label="商品编码" v-model="goods.productSn" prop="productSn">
                  <el-input></el-input>
                </el-form-item></el-col>

              <el-col :span="8" :offset="0">
                <el-form-item label="商品分类">
                  <el-select placeholder="商品分类" v-model="goods.productCategoryId" class="el-select-dense">
                    <el-option v-for="item in categoryList" :key="item.id" :label="item.name" :value="item.id">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>

            </el-row>
            <el-row :gutter="20">
              <el-col :span="8" :offset="0">
                <el-form-item label="商品品牌" prop="brandId">
                  <el-select placeholder="品牌" v-model="goods.brandId" class="el-select-dense">
                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12" :offset="0">
                <el-form-item label="商品描述">
                  <el-input v-model="goods.description" type="textarea"></el-input>
                </el-form-item>

              </el-col>

            </el-row>

            <div class="common-header">
              <div>商品属性</div>
              <el-divider></el-divider>

            </div>
            <el-row :gutter="20">
              <el-col :span="8" :offset="0">
                <el-form-item label="商品原价" prop="originalPrice">
                  <el-input-number v-model="goods.originalPrice" @change="handleChange" :min="1" :max="10"
                    label="描述文字"></el-input-number>
                </el-form-item>
              </el-col>
              <el-col :span="8" :offset="0">
                <el-form-item label="促销类型">
                  <el-select v-model="goods.promotionType" disabled placeholder="请选择">
                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8" :offset="0">
                <el-form-item label="活动价格">
                  <el-input-number v-model="goods.price" :disabled="true"></el-input-number>
                </el-form-item>
              </el-col>

            </el-row>
            <el-row :gutter="20">
              <el-col :span="8" :offset="0">
                <el-form-item label="重量(kg)" prop="weight">
                  <el-input-number v-model="goods.weight" @change="handleChange" :min="1" :max="10"
                    label="描述文字"></el-input-number>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12" :offset="0">
                <el-form-item label="审核状态">
                  <el-switch v-model="goods.verifyStatus"></el-switch>
                </el-form-item>
              </el-col>
              <el-col :span="12" :offset="0">
                <el-form-item label="是否上架">
                  <el-switch v-model="goods.publishStatus"></el-switch>
                </el-form-item>
              </el-col>
            </el-row>


            <el-row :gutter="30">
              <el-form-item label="缩略图" size="small" prop="pic">
                <!-- 上传缩略图 -->
                <el-upload class="avatar-uploader" :action="uploadFileOss" :on-success="handleCoverImgSuccess">
                  <img v-if="goods.pic" :src="goods.pic" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>

              </el-form-item>
            </el-row>


            <div class="common-header">
              <div>其他信息</div>
              <el-divider></el-divider>
            </div>
            <el-row :gutter="20">
              <el-col :span="8" :offset="0">
                <el-form-item label="推荐状态">
                  <el-switch v-model="goods.recommendStatus"></el-switch>
                </el-form-item>
              </el-col>
              <el-col :span="8" :offset="0">
                <el-form-item label="新品状态">
                  <el-switch v-model="goods.newStatus"></el-switch>
                </el-form-item>
              </el-col>
              <el-col :span="8" :offset="0">
                <el-form-item label="预告商品">
                  <el-switch v-model="goods.newStatus"></el-switch>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row :gutter="20">
              <el-col :span="8" :offset="0"> <el-form-item label="搜索关键词">
                  <el-input v-model="goods.keywords" placeholder="关键词"></el-input>
                </el-form-item></el-col>
              <el-col :span="8" :offset="0">
                <el-form-item label="库存预警" prop="lowStock">
                  <el-input-number v-model="goods.lowStock" @change="handleChange" :min="1" :max="10"
                    label="库存预警"></el-input-number>
                </el-form-item>
              </el-col>
              <el-col :span="8" :offset="0">
                <el-form-item label="商品排序" prop="sort">
                  <el-input-number v-model="goods.sort" @change="handleChange" :min="1" :max="10"
                    label="商品排序"></el-input-number>
                </el-form-item>
              </el-col>

            </el-row>
            <el-row :gutter="20">
              <el-col :span="12" :offset="0">
                <el-form-item label="产品服务">
                  <el-checkbox-group>
                    <el-checkbox v-model="checked">无忧退货</el-checkbox>
                    <el-checkbox v-model="checked">快速退款</el-checkbox>
                    <el-checkbox v-model="checked">免费包邮</el-checkbox>
                  </el-checkbox-group>
                </el-form-item>
              </el-col>
            </el-row>
          </div>

          <!-- 第二页 -->
          <div v-show="step == 2">
            <div class="common-header">
              <div>商品sku信息</div>
              <el-divider></el-divider>
            </div>
            <el-row :gutter="20">
              <el-col :span="24" :offset="0">
                <el-form-item label="画册">
                  <el-upload :action="uploadFileOss" :headers="token" :on-success="uploadAlbumPicsScee"
                    list-type="picture-card" :auto-upload="false">
                    <i slot="default" class="el-icon-plus"></i>
                    <div slot="file" slot-scope="{file}">
                      <img class="el-upload-list__item-thumbnail" :src="file.url" alt="">
                      <span class="el-upload-list__item-actions">
                        <span class="el-upload-list__item-preview" @click="handlePictureCardPreview(file)">
                          <i class="el-icon-zoom-in"></i>
                        </span>
                        <span v-if="!disabled" class="el-upload-list__item-delete" @click="handleDownload(file)">
                          <i class="el-icon-download"></i>
                        </span>
                        <span v-if="!disabled" class="el-upload-list__item-delete" @click="handleRemove(file)">
                          <i class="el-icon-delete"></i>
                        </span>
                      </span>
                    </div>
                  </el-upload>
                </el-form-item>
              </el-col>
              <el-col :span="12" :offset="0"></el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12" :offset="0">
                <el-form-item label="sku设置">
                  <div>颜色:
                    <el-checkbox-group style="display: inline-block;" v-model="skuColorTemp.skuSelectedList">
                      <el-checkbox label="item" v-for="item in skuColorTemp.skuList" :key="item">{{ item }}
                        <el-button type="text" size="mini" style="color: red;">删除</el-button>

                      </el-checkbox>
                      <el-checkbox label="土豪金">土豪金
                        <el-button type="text" size="mini" style="color: red;">删除</el-button>
                      </el-checkbox>
                    </el-checkbox-group>
                  </div>

                  <div>大小:
                    <el-checkbox-group style="display: inline-block;" v-model="skuSizeTemp.skuSelectedList">
                      <el-checkbox v-for="item in skuSizeTemp.skuList" :key="item" :label="item">{{ item }}</el-checkbox>
                      <el-checkbox label="128g">128g
                        <el-button type="text" size="mini" style="color: red;">删除</el-button>
                      </el-checkbox>
                    </el-checkbox-group>
                  </div>
                  <!-- 输入框 -->
                  <div style="width: 1000px;">

                    <el-input v-model="skuColorTemp.text" placeholder="颜色描述:比如土豪金" size="mini" clearable
                      style="display: inline-block; width: 160px; margin-right: 20px;" />
                    <el-button type="default" size="mini" @click="createOption('color')"
                      style="display: inline-block;margin-right: 20px;">创建颜色选项</el-button>

                    <el-input v-model="skuSizeTemp.text" placeholder="大小描述:比如128g" size="mini" clearable
                      style="display: inline-block;width: 160px; margin-right: 20px;" />
                    <el-button type="default" size="mini" @click="createOption('size')"
                      style="display: inline-block; margin-right: 20px;">创建大小选项</el-button>
                    <el-button type="primary" size="mini" style="display: inline-block;"
                      @click="creacteSkuList">生成sku列表</el-button>
                  </div>
                  <el-table :data="goods.pmsSkuStockList" border stripe>
                    <el-table-column>
                    </el-table-column>
                  </el-table>



                </el-form-item>
              </el-col>

            </el-row>
          </div>

          <!-- 第三页 -->
          <div v-show="step == 3">
            <div class="common-header">
              <div>详情描述</div>
              <el-divider></el-divider>
            </div>
          </div>
          <el-form-item align="center">
            <el-button v-if="step != 1" @click="preStep">上一步</el-button>
            <el-button v-if="step != 3" type="primary" @click="nextStep">下一步</el-button>
          </el-form-item>
        </el-form>
      </div>
      <!-- card body -->
    </el-card>

  </div>
</template>

<script>
import { getAllCategory as getAllCategoryApi } from '@/api/product/category'
import mix from '@/mixins'

export default {
  name: 'AddGoods',
  mixins: [mix],
  data() {
    return {
      step: 1,
      goods: {
        pic: ''
      },
      options: [],
      categoryList: [],
      skuColorTemp: {
        text: '',
        skuList: [],
        skuSelectedList: []
      },
      skuSizeTemp: {
        text: '',
        skuList: [],
        skuSelectedList: []
      },
      pmsSkuStockList: [],
      rules: {
        name: [
          { required: true, message: '请填写商品名称', trigger: 'blur' },
        ],
      },
      num: 1,
      switch1: true,
      dialogImageUrl: '',
      dialogVisible: false,
      disabled: false,
      checked: true,
      value: 1,
      imageUrl: ''
    }
  },

  components: {},

  computed: {},

  created() {
    this.getAllCategory()
  },

  // mounted: {},

  methods: {
    // 生成sku列表
    creacteSkuList() {
      for (let i = 0; i < this.skuColorTemp.skuSelectedList.length; i++) {
        for (let j = 0; j < this.skuSizeTemp.skuSelectedList.length; j++) {
          this.goods.pmsSkuStockList.push({
            'lockStock': '100',
            'lowStock': 10,
            'pic': '',
            'price': 100,
            'promotionPrice': 1,
            'sale': 0,
            'skuCode': '',
            'stock': 1000,
            color: this.skuColorTemp.skuSelectedList[i],
            size: this.skuSizeTemp.skuSelectedList[j]

          })
        }
      }
    }
  },
  // 创建颜色选项
  createOption(type) {
    if (type === 'color') {
      if (this.skuColorTemp.skuList.indexOf(this.skuColorTemp.text) === -1) {
        this.skuColorTemp.skuList.push(this.skuColorTemp.text)
        this.skuColorTemp.text = ''
      } else {
        this.$message.warning(`${this.skuColorTemp.text}已存在`)
      }
    } else if (type === 'size') {
      if (this.skuSizeTemp.skuList.indexOf(this.skuSizeTemp.text) === -1) {
        this.skuSizeTemp.skuList.push(this.skuSizeTemp.text)
        this.skuSizeTemp.text = ''
      } else {
        this.$message.warning(`${this.skuSizeTemp.text}已存在`)
      }
    }


  },
  preStep() {
    this.step--

  },
  nextStep() {
    this.step++
  },
  // 获取页面goods信息
  getAllCategory() {
    getAllCategoryApi().then((res) => {
      const { data, message, success } = res
      console.log(res)
      if (success) {
        //find可以找二级分类
        const value = data.items.find(ele => ele.category.name === '乐居')
        console.log(value)
        if (value) {
          this.categoryList = value.children
          console.log(value)
        }
      } else {
        this.$message.error(message)
      }
    })
  },
  handleCoverImgSuccess(res) {
    const { success, data, message } = res
    if (success) {
      this.goods.pic = data.fileUrl
    } else {
      this.$message.error(message)
    }
  },
  beforeAvatarUpload(file) {
    const isJPG = file.type === 'image/jpeg';
    const isLt2M = file.size / 1024 / 1024 < 2;

    if (!isJPG) {
      this.$message.error('上传头像图片只能是 JPG 格式!');
    }
    if (!isLt2M) {
      this.$message.error('上传头像图片大小不能超过 2MB!');
    }
    return isJPG && isLt2M;
  },
  handleRemove(file) {
    console.log(file);
  },
  handlePictureCardPreview(file) {
    this.dialogImageUrl = file.url;
    this.dialogVisible = true;
  },
  handleDownload(file) {
    console.log(file);
  },
  uploadAlbumPicsScee(res) {
    const { success, data, message } = res
    if (success) {
      this.goods.albumPics.push(data.fileUrl)
    } else {
      this.$message.error(message)
    }
  },
  handleChange() {

  }

}


</script>
<style lang='scss' scoped>
.add-goods-main {

  #selectForm ::v-deep .el-form-item__label {
    font-weight: 400;
  }

  .steps {
    padding: 50px 300px;
    background-color: #fff;
  }

  .margin-30 {
    margin: 30px;
  }


  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }

  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
}
</style>