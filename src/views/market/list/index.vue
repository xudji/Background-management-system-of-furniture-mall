<template>
    <div class="list">
        <el-card class="margin-30" shadow="never">
            <div slot="header">
                <el-button type="primary" size="mini" @click="showAdlist">新增</el-button>
            </div>
            <el-table v-loading="loading" :data="recommendsList.slice((currentPage - 1) * pagesize, currentPage * pagesize)"
                style="width: 100%" border>
                <el-table-column type="index" label="序号" align="center">
                </el-table-column>

                <el-table-column prop="pic" label="商品图片" align="center">
                    <template slot-scope="scope">
                        <img :src="scope.row.pic" style="width: 100px;" alt="">
                    </template>
                </el-table-column>
                <el-table-column prop="promotionStartTime,promotionEndTime" label="活动时间" align="center">
                    <!-- 多个参数用插槽 -->
                    <template slot-scope="scope">
                        开始时间:{{ scope.row.promotionStartTime }}
                        <br>
                        结束时间:{{ scope.row.promotionEndTime }}
                    </template>
                </el-table-column>
                <el-table-column prop="promotionPerLimit" label="是否过期" align="center">
                    <template slot-scope="scope">
                        {{ scope.row.promotionPerLimit == '0' ? "过期" : scope.row.promotionPerLimit == '1' ? '' : '否' }}
                    </template>
                </el-table-column>
                <el-table-column prop="name" label="商品名称" align="center">
                </el-table-column>
                <el-table-column prop="brandName" label="品牌名称" align="center">
                </el-table-column>
                <el-table-column prop="promotionPrice" label="商品价格" align="center">
                </el-table-column>
                <el-table-column prop="productCategoryName" label="商品类别" align="center">
                </el-table-column>
                <el-table-column prop="createTime" label="创建时间" align="center">
                </el-table-column>
                <el-table-column fixed="right" label="操作" align="center">
                    <template slot-scope="scope">
                        <el-button @click.native.prevent="delRecommend(scope.row.recommendId)" type="text" size="small">
                            删除
                        </el-button>
                    </template>
                </el-table-column>

            </el-table>

            <el-pagination background :current-page.sync="currentPage" :page-size="pagesize" :total="totalListMedia"
                :page-sizes="[3, 6, 9, 12, 15, 17]" @current-change="handleCurrentChange" @size-change="handleSizeChange"
                layout="total, sizes, prev, pager, next, jumper" align="right" class="margin-top">
            </el-pagination>

        </el-card>
        <AddAdlist ref="AddAdlists" @refresh="getRecommends"></AddAdlist>
    </div>
</template>

<script>
import { findAllRecommends as findAllRecommendsApi, delRecommend as delRecommendApi } from '@/api/market/list'
import AddAdlist from './detail.vue'
export default {
    name: 'list',
    components: {
        AddAdlist
    },
    data() {
        return {
            loading: false,
            totalListMedia: 6, //分页单页显示条数
            recommendsList: [], // 接口数据
            currentPage: 1, //  el-pagination 第几页
            pagesize: 6, //  el-pagination 每页的数据

        }
    },
    created() {
        // 已进入页面就渲染
        this.getRecommends()
        this.getListMedia()
    },
    methods: {
        showAdlist() {
            this.$refs.AddAdlists.openDialog()
        },
        // 删除商品
        delRecommend(recommendId) {
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                // 删除文章
                delRecommendApi(recommendId).then(res => {
                    const { success, message } = res
                    if (success) {
                        // 刷新数据
                        this.getRecommends()
                    } else {
                        this.$message.error(message)
                    }
                })
            }).catch(() => {
                //取消删除
                console.log('取消删除')
            })

        },

        //改变分页单页显示条数
        handleSizeChange(size) {
            this.pagesize = size
            // 每次改变页码大小,重定向第一页
            this.currentPage = 1
            // 调用接口数据
            this.getListMedia()
        },
        // 点击第几页把页码传进来，发送接口请求改变数据
        handleCurrentChange(currentPage) {
            this.currentPage = currentPage
            // 调用接口数据
            this.getListMedia()
        },
        //接口数据
        getListMedia() {
            findAllRecommendsApi().then(res => {
                console.log(res.data)
                this.recommendsList = res.data.items
                this.totalListMedia = res.data.items.length
            })
        },
        // 获取商品数据
        getRecommends() {
            this.loading = true
            findAllRecommendsApi().
                then((res) => {
                    // console.log(res)
                    const { success, data, message } = res
                    if (success) {
                        const { items } = data
                        this.recommendsList = items
                    } else {
                        this.$message.error(message)
                    }
                    this.loading = false
                })
        }
    },
    mounted() {
    },

}
</script>

<style lang="scss" scoped>
.margin-30 {
    margin: 30px;
}

.margin-top {
    margin-top: 10px;
}
</style>