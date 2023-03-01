<!--  -->
<template>
    <div class="add-goods-main">
        <el-steps class="steps" :active="step" finish-status="success">
            <el-step title="商品基本信息"></el-step>
            <el-step title="添加库存信息"></el-step>
            <el-step title="添加移动端详情"></el-step>
        </el-steps>
        <el-card shadow="never" class="margin-30">
            <div slot="header">
                <el-form :model="goods" ref="form" label-width="80px" size="mini">
                    <!-- 第一页 -->
                    <div v-show="step == 1">
                        <div class="common-header">
                            <h5>基本信息</h5>
                            <el-divider></el-divider>

                        </div>
                        <el-row :gutter="20">
                            <el-col :span="8" :offset="0"> <el-form-item label="商品名称">
                                    <el-input v-model="goods.name"></el-input>
                                </el-form-item></el-col>
                            <el-col :span="8" :offset="0"></el-col>
                        </el-row>
                    </div>

                    <!-- 第二页 -->
                    <div v-show="step == 2">
                        <div class="common-header">
                            <h5>商品sku信息</h5>
                            <el-divider></el-divider>
                        </div>
                    </div>

                    <!-- 第三页 -->
                    <div v-show="step == 3">
                        <div class="common-header">
                            <h5>详情描述</h5>
                            <el-divider></el-divider>
                        </div>
                    </div>
                    <el-form-item>
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
export default {
    name: 'AddGoods',
    data() {
        return {
            step: 1,
            goods: {}
        };
    },

    components: {},

    computed: {},

    created() { },

    // mounted: {},

    methods: {
        preStep() {
            this.step--

        },
        nextStep() {
            this.step++
        }
    }
}

</script>
<style lang='scss' scoped>
.add-goods-main {
    .steps {
        padding: 50px 300px;
        background-color: #fff;
    }

    .margin-30 {
        margin: 30px;
    }
}
</style>