<template>
  <div class="article-detail-main">
    <el-card shadow="never" class="margin-30">
      <div slot="header">
        <span>新增文章</span>
      </div>
      <el-form ref="articleform" :model="article" :rules="rules" label-width="120px" size="mini">
        <el-row :gutter="20">
          <el-col :span="6" :offset="0">
            <el-form-item label="作者" prop="name">
              <el-input v-model="article.author" placeholder="作者" />
            </el-form-item></el-col>

          <el-col :span="6" :offset="0">
            <el-form-item label="标题" prop="title">
              <el-input v-model="article.title" placeholder="标题" />
            </el-form-item></el-col>

          <el-col :span="6" :offset="0">
            <el-form-item label="是否显示">
              <el-switch v-model="article.isShow" :active-value="1" :inactive-value="0" />

            </el-form-item></el-col>

          <el-col :span="13" :offset="0">
            <el-form-item label="摘要">
              <el-input v-model="article.summary" type="textarea" rows="3" placeholder="摘要" />
            </el-form-item></el-col>

          <el-col :span="12" :offset="0">
            <el-form-item label="封面图片" size="normal">
              <el-upload class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/">
                <el-button size="small" type="primary">点击上传</el-button>
                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
              </el-upload>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="16" :offset="0">
            <el-form-item label="切换富文本类型" size="">
              <el-radio v-model="article.editorType" :label="0">富文本</el-radio>
              <el-radio v-model="article.editorType" :label="1">markdown</el-radio>
              <span style="color:#e6a23c"><i class="el-icon-warning-outline" /> 注意！切换编辑器会清空编辑器内容</span>
            </el-form-item>
          </el-col>
          </el-col :span="12" :offset="0">
        </el-row>
        <el-row :gutter="20">
          <el-col :span="24" :offset="0">
            <Tinymce />
          </el-col>
        </el-row>
        <el-form-item>
          <el-button type="primary">立即创建</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>

      <!-- card body -->
    </el-card>

  </div>
</template>

<script>
import Tinymce from '@/components/Tinymce'
export default {
  name: 'ArticleDetail',
  components: {
    Tinymce
  },
  mixins: [],
  data() {
    return {
      article: {},
      rules: {
        author: [
          { required: true, message: '请输入作者名称', trigger: 'blur' }
        ],
        title: [
          { required: true, message: '请输入文章标题', trigger: 'blur' }
        ]
      }
    }
  },
  mounted() {
  },
  created() {

  }
}
</script>

<style lang="scss" scoped>
.article-detail-main {
  .margin-30 {
    margin: 30px;
  }
}
</style>
