<!--  -->
<template>
  <div class="advertisement-main">

    <el-card shadow="never" class="margin-30">
      <div slot="header">
        <span>广告列表</span>
      </div>
      <!-- card body -->
    </el-card>


  </div>
</template>

<script>
import { adsList as adsListApi } from '@/api/ad/ad';
export default {
  name: 'Advertisement',
  mixins: [],
  data() {
    return {
    };
  },

  components: {},

  computed: {},

  created() {
   // this.adsList()
  },

  //mounted() {},

  methods: {
    adsList() {
      adsListApi().then(res => {
        console.log(res)
      })
    }

  }
}

</script>
<style lang='scss' scoped>
.advertisement-main {
  .margin-30 {
    margin: 30px;
  }
}
</style>