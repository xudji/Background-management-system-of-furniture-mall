<!--  -->
<template>
  <div class="order-ecahrts-main">
    <!-- id唯一 -->

    <div id="picEcharts" class="order-echarts"></div>
  </div>
</template>

<script>
import * as echarts from 'echarts';
export default {
  data() {
    return {

    };
  },
  // vue子组件接收数据用props 需要设置类型,传递是否必须

  components: {

  },
  computed: {},

  created() { },

  mounted() {
    this.initOrderEcharts()

  },

  methods: {
    initOrderEcharts() {

      var demoEchart = echarts.init(document.getElementById('picEcharts'),);
      demoEchart.setOption({

        title: {
          left: 'center',
          top: 20,
          textStyle: {
            color: '#ccc'
          }
        },
        tooltip: {
          trigger: 'item',
          formatter: '{b}数量{c}个,占比:{d}%'
        },
        visualMap: {
          show: false,
          min: 80,
          max: 600,
          inRange: {
            colorLightness: [0, 1]
          }
        },
        series: [
          {
            name: 'Access From',
            type: 'pie',
            radius: [30, 58],
            center: ['50%', '50%'],
            data: [
              { value: 100, name: 'Wap Web' },
              { value: 410, name: 'Android' },
              { value: 200, name: 'PC Web' },
              { value: 265, name: 'ios' },

            ].sort(function (a, b) {
              return a.value - b.value;
            }),
            roseType: 'radius',
            label: {
              color: 'rgba(255, 255, 255, 0.3)'
            },
            labelLine: {
              lineStyle: {
                color: 'rgba(255, 255, 255, 0.3)'
              },
              smooth: 0.2,
              length: 8,
              length2: 10
            },
            itemStyle: {
              color: '#6B54E2',
              shadowBlur: 200,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            },
            animationType: 'scale',
            animationEasing: 'elasticOut',
            animationDelay: function (idx) {
              return Math.random() * 200;
            }
          }
        ]
      })



    }
  }
}

</script>
<style lang='scss' scoped>
.order-ecahrts-main {
  width: 100%;
  height: 100%;

  .order-echarts {
    width: 100%;
    height: 100%;
  }
}
</style>