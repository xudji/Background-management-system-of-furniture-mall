<!--  -->
<template>
  <div class="order-ecahrts-main">
    <!-- id唯一 -->

    <div id="orderEacherts" class="order-echarts"></div>
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
  props: {
    orderData: {
      type: Array,
      require: true
    }
  },

  components: {

  },

  computed: {},

  created() { },

  mounted() {
    this.initOrderEcharts()

  },

  methods: {
    initOrderEcharts() {
      var dataList = []
      var orderList = []
      var returnList = []
      // 把值加进去
      this.orderData.forEach(ele => {
        dataList.push(ele.data)
        orderList.push(ele.orderNum)
        returnList.push(ele.returnNum)
      })
      var demoEchart = echarts.init(document.getElementById('orderEacherts'),);
      demoEchart.setOption({

        tooltip: {},
        // x 轴显示日期
        legend: {
          bottom: 20
        },
        xAxis: {
          data: dataList,
          /* axisLabel: {
            rotate: 30
          } */
        },
        tooltip: {
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          textStyle: {
            color: '#fff'
          },
        },

        yAxis: {
          axisLine: {
            lineStyle: {
              color: '#909EC3',
              width: '1',
              type: 'solid'
            }
          }
        },
        series: [
          {
            name: '订单',
            type: 'bar',
            data: orderList,
          }
          ,
          {
            name: '退单',
            type: 'bar',
            data: returnList,
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(
                  0, 0, 0, 1,
                  [
                    { offset: 0, color: '#7D05E2' },
                    { offset: 0.5, color: '#B600FF' },
                    { offset: 0, color: '#BC04E2' },
                  ]
                )
              }
            }
          },
        ]
      });
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