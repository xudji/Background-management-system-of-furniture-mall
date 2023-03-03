<template>
    <div class="address-main">
        <el-card shadow="never" class="margin-30">
            <div slot="header">
                <el-button type="primary" size="mini" @click="showAddAddress">新增</el-button>

            </div>
            <!-- card body -->
            <el-table :data="tableData" border style="width: 100%">
                <el-table-column type="index" label="#" width="50">
                </el-table-column>
                <el-table-column prop="addressName" label="地址名称" width="120">
                </el-table-column>
                <el-table-column prop="sendStatus" label="默认发货地址" width="200">
                    <template slot-scope="scope">
                        默认发货地址： <el-switch v-model="scope.row.sendStatus" @change="changeSwitch(scope.row)">
                        </el-switch>
                    </template>
                </el-table-column>
                <el-table-column prop="name" label="收获人姓名" width="120">
                </el-table-column>
                <el-table-column prop="phone" label="收货人电话" width="120">
                </el-table-column>
                <!-- province  city  detailAddress-->
                <el-table-column prop="region" label="收货人地址" width="120">
                    <template slot-scope="scope">
                        <span> {{ ` ${scope.row.province} ${scope.row.city}` }}</span>
                        {{ scope.row.detailAddress }}
                    </template>
                </el-table-column>
                <el-table-column prop="receiveStatus" label="默认收货地址" width="200">
                    <template slot-scope="scope">
                        默认收货地址: <el-switch v-model="scope.row.receiveStatus" :active-value="1" :inactive-value="0">
                        </el-switch>
                    </template>
                </el-table-column>
                <el-table-column prop="createTime" label="创建时间" width="180">
                </el-table-column>
                <el-table-column fixed="right" label="操作" width="150">
                    <template slot-scope="scope">

                        <el-button type="text" style="color:red" size="small" @click="showAddAddress">编辑</el-button>
                        <el-button type="text" size="small">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
        <!-- 第一种传props方法 -->
        <!-- <AddressDialog :is-show="isShowDialog" /> -->
        <!-- 第二种调用方法  this.$refs.dialogAdress.openDialog() 写个方法-->
        <AddressDialog ref="dialogAdress" @refreshList="getAddressList" />

    </div>
</template>

<script>
import AddressDialog from './Detail.vue'
import { addressList as addressListApi, setSendOne as setSendOneApi, setReceiveOne as setReceiveOneApi } from '@/api/order/address'
export default {
    name: 'Address',
    mixins: [],
    components: {
        AddressDialog
    },
    data() {
        return {
            isShowDialog: false,
            tableData: [],

        }
    },
    created() {
        this.getAddressList()
    },
    methods: {
        showAddAddress() {
            this.$refs.dialogAdress.openDialog()
        },
        getAddressList() {
            addressListApi().then((res) => {
                console.log('地址', res)
                this.tableData = res.data.items
            })
        },
        //更改默认发货
        changeSwitch(row) {
            const data = {
                // 传入要修改的id
                id: row.id,
                sendStatus: row.sendStatus,
            };  // 
            setSendOneApi(data).then(res => {
                const { success } = res
                if (success) {
                    // 调用表格数据,刷新数据,数据驱动视图,data => ui
                    this.getAddressList();
                    this.$message.success('修改默认发货地址成功');
                } else {
                    this.$message.error('修改默认发货地址成功');
                    // 调用表格数据 
                    this.getAddressList();
                }
                this.loading = false;
            }).catch({

            });
        },
        //更改默认收货
        setReceiveOne() {
            setReceiveOneApi().then((res) => {

            })
        }
    },
}
</script>

<style lang="scss" scoped>
.address-main {
    .margin-30 {
        margin: 30px;
    }
}
</style>

