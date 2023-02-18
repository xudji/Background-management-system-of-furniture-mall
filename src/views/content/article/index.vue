<template>
  <div class="article-main">
    <el-card shadow="never" class="box-card margin-30">
      <div slot="header" class="clearfix">
        <span>条件查询</span>
        <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
      </div>
      <el-form ref="form" v-model="searchArticleForm" label-width="80px">
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="作者">
              <el-input v-model="searchArticleForm.autor" class="form-item" placeholder="作者" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="标题">
              <el-input v-model="searchArticleForm.title" class="form-item" placeholder="标题" clearable />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="编辑类型">
              <el-select v-model="searchArticleForm.editorType" class="form-item" placeholder="编辑类型" clearable>
                <el-option label="富文本" :value="0" />
                <el-option label="markdown" :value="1" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12" :offset="20">
            <el-button type="defautl" size="mini" @click="resetForm">重置</el-button>
            <el-button type="primary" size="mini" @click="searchArticle">搜索</el-button>
          </el-col>
        </el-row>
      </el-form>
      <!-- 文章列表 -->
      <el-card shadow="neveralways" class="margin-30">
        <div slot="header">
          <el-button type="primary" size="mini">新增</el-button>
        </div>
        <el-table v-loading="loading" :data="articleList" border stripe>
          <el-table-column label="#" type="index" align="center" />
          <el-table-column label="文章标题" prop="title" width="500" align="center" />
          <el-table-column label="展示图片" width="200" align="center">

            <template slot-scope="scope">
              <img width="100" height="100" :src="scope.row.coverImg" alt="">
            </template>

          </el-table-column>

          <el-table-column label="添加时间" prop="createTime" width="210" align="center" />
          <el-table-column label="作者" prop="author" width="170" align="center" />
          <el-table-column label="文章是否展示" prop="author" width="120" align="center">
            <template slot-scope="scope">
              <el-switch v-model="scope.row.isShow" :active-value="1" :inactive-value="0" />
            </template>
          </el-table-column>
          <el-table-column label="编辑类型" prop="editorType" width="160" align="center">
            <!-- scope.row是指的当前一行的所有数据 -->
            <template slot-scope="scope" align="center">
              <el-button v-if="scope.row.editorType === 0" type="primary" size="mini" round plain>富文本</el-button>
              <el-button v-if="scope.row.editorType === 1" type="success" size="mini" round plain>markdown</el-button>
            </template>
          </el-table-column>

          <el-table-column label="操作" width="180" align="center" fixed="right">
            <template>
              <el-button type="text" size="mini" icon="el-icon-view">编辑文章</el-button>
              <el-button type="text" size="mini" style="color:red;">删除</el-button>
            </template>
          </el-table-column>

          <!-- card body -->
        </el-table>
        <el-pagination style="margin-top: 10px; text-align: right;" :page-size="limit" @size-change="handleSizeChange"
          :total="100" layout="total, sizes, prev, pager, next, jumper" :page-sizes="[10, 20, 30, 40]"
          @current-change="handleCurrentChange" :current-page.sync="start" />
      </el-card>
    </el-card>
  </div>
</template>

<script>
import { findArticales as findArticlesApi } from '@/api/content/articale'
export default {
  data() {
    return {
      searchArticleForm: {},
      articleList: [],
      start: 1,
      limit: 10,
      totalNum: 0,
      loading: false
    }
  },
  created() {
    this.getArticleList()
  },
  mounted() {

  },

  methods: {
    // 重置表单
    resetForm() {
      this.searchArticleForm = {}
      this.start = 1
    },
    // 搜索文章
    searchArticle() {
      this.start = 1 // 从第一页开始搜索
      this.getArticleList()
    },
    // 获取文章列表
    getArticleList() {
      this.loading = true
      var searchObj = {}
      for (const key in this.searchArticleForm) {
        if (this.searchArticleForm[key] !== '') {
          searchObj[key] = this.searchArticleForm[key]
        }
      }
      console.log(searchObj)
      // 过滤 如果只填一个参数
      findArticlesApi(this.start, this.limit, searchObj)
        .then(res => {
          // console.log(res)
          const { success, data, message } = res
          if (success) {
            const { rows, total } = data
            this.articleList = rows
            console.log(total)
          } else {
            this.$message.error(message)
          }
          this.loading = false
        })
    },
    handleSizeChange(val) {
      this.limit = val
      this.start = 1
      this.getArticleList()
    },
    // 页面改变
    handleCurrentChange(val) {
      this.start = val
      this.getArticleList()
    }
  }
}
</script>

<style lang="scss" scoped>
.article-main {
  .margin-30 {
    margin: 30px;
  }

  .el-form {

    .el-row {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .el-form-item {
        .form-item {
          width: 200px;
        }
      }
    }
  }

  .el-table {
    margin-top: 20px;
  }
}
</style>

