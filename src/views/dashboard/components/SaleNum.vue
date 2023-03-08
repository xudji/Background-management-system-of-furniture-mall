<!--  -->
<template>
  <countTo :startVal='startVal' :endVal='endVal' :duration='3000'></countTo>
</template>

<script>
import countTo from 'vue-count-to';
export default {
  data() {
    return {
      startVal: 0,
      endVal: 23988221
    };
  },

  components: {
    countTo
  },

  computed: {},

  created() { },

  // mounted: {},

  methods: {}
}

</script>
<style lang='scss' scoped>
countTo {
  width: 50px;
}
</style>