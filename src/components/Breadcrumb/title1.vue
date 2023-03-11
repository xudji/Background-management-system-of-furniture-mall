<!--  -->
<template>
  <div class="navbar-title">
    <div class="title-item">
      <i><img style="width: 30px;" src="../../../public/家居.png" alt=""></i>
      <span>乐居家居管理系统</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'title',
  mixins: [],
  data() {
    return {
    };
  },

  components: {},

  computed: {},

  created() { },

  //mounted() {},

  methods: {}
}

</script>
<style lang='scss' scoped>
.navbar-title {
  .title-item {
    display: flex;
    justify-content: center;

    align-items: center;
    margin-top: 8px;

    span {
      margin-left: 4px;
      color: #5a5e66;
      font-weight: bold;
    }
  }
}
</style>