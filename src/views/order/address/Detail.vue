<!--  -->
<template>
    <div>
        <!-- 对话框 -->
        <el-dialog title="新增地址" :visible.sync="isShowDialog" width="40%" @close="handleCloseDialog">
            <el-form :model="address" ref="form" :rules="rules" label-width="110px" size="mini">
                <el-row :gutter="20">
                    <el-col :span="12" :offset="0"> <el-form-item label="发货地址" prop="addressName">
                            <el-input v-model="address.addressName"></el-input>
                        </el-form-item></el-col>
                    <el-col :span="12" :offset="0"> <el-form-item label="发货人姓名">
                            <el-input v-model="address.name"></el-input>
                        </el-form-item></el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="12" :offset="0"> <el-form-item label="发货人手机号">
                            <el-input v-model="address.phone"></el-input>
                        </el-form-item></el-col>
                    <el-col :span="12" :offset="0">
                        <el-form-item label="邮政编码">
                            <el-input v-model="address.postCode"></el-input>
                        </el-form-item></el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="12" :offset="0"> <el-form-item label="收货地址">
                            <el-cascader size="large" :options="options" v-model="initCity" @change="handleChange">
                            </el-cascader>
                        </el-form-item></el-col>
                    <el-col :span="12" :offset="0">
                        <el-form-item label="详细地址">
                            <el-input v-model="address.detailAddress"></el-input>
                        </el-form-item></el-col>
                </el-row>
            </el-form>

            <span slot="footer" class="dialog-footer">
                <el-button @click="handleCancleDialog">取 消</el-button>
                <el-button type="primary" @click="addAddress">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { initDataOption } from '@/utils'
import { saveAddress as saveAddressApi, addressList as addressListApi } from '@/api/order/address'
import { regionDataPlus, CodeToText } from 'element-china-area-data'
export default {
    name: 'AddressDialog',
    /*  props: {
         isShow: {
             type: Boolean,
             require: true,
             default: false
         }
     }, */
    data() {
        return {
            options: regionDataPlus,
            initCity: ['130000', '130300', '130302'],
            isShowDialog: false,
            address: {
                addressName: '郑州市中原区'
            },
            rules: {
                addressName: [{ required: true, message: '请填写发货地址', trigger: 'blur' }]
            },

        };
    },
    components: {},
    computed: {},
    created() {
        this.getAddressList()
    },

    // mounted: {},

    methods: {
        openDialog() {
            this.isShowDialog = true
        },

        handleChange(value) {
            this.address.province = CodeToText[value[0]]
            this.address.city = CodeToText[value[1]]
            this.address.region = CodeToText[value[2]]
            this.address.cityCode = value.join(',')
        },
        // 取消对话框
        handleCancleDialog() {
            this.isShowDialog = false
            // 内部有一个watch
        },
        handleCloseDialog() {
            // 初始化 this.$options.data()
            initDataOption(this, 'address')
            initDataOption(this, 'initCity')
            this.$refs.form.resetFields()
        },
        addAddress() {
            saveAddressApi(this.address)
                .then(res => {
                    const { success, message } = res
                    if (success) {
                        this.isShowDialog = false
                        // 重新获取数据
                        this.getAddressList()
                        this.$emit('refreshList')
                    } else {
                        this.$message.error(message)
                    }
                })
        },

        getAddressList() {


            addressListApi().then((res) => {
                console.log('地址', res)
                this.addressList = res.data.items
            })
        },
    }
}

</script>
<style lang='scss' scoped></style>