<template>
  <div class="echarts-main" ref="echartsMain">
    <el-container>
      <!-- 定义一个顶栏 -->
      <el-header height='60px' style="margin:10px 0px 30px 0px ;">
        <el-row :gutter="20" type="flex" justify="center" align="middle">
          <el-col :span="8" :offset="0"> <svg-icon icon-class="全屏" class-name='custom-class' class="full"
              @click="fullScreen" />
          </el-col>
          <el-col :span="8" :offset="0" align="center">
            <h2 class="title">订单数据大屏</h2>
          </el-col>
          <el-col :span="8" :offset="0" align="right">
            <!-- 显示时间 -->
            <div class="timeNow">{{ date }}</div>
          </el-col>
        </el-row>

        <!-- 用普通的标签设置标题 -->

      </el-header>
      <!-- 嵌套的容器 -->
      <el-container>
        <!-- 定义内容栏 -->
        <el-main>
          <!-- 定义第一行，栅格布局 -->
          <el-row>
            <!-- 一行中有两个大小相同的列 -->
            <el-col :span='6' class='col1' align="left">
              <el-row :gutter="20" class="shellData">
                <el-col :span="24" :offset="0" style="margin-bottom: 30px;">
                  <span>电商数据</span> <i>Shell Data</i></el-col>

              </el-row>

              <div>销售量</div>
              <!-- 销售额 -->
              <el-col align="center" :span="24" :offset="0" style="margin-bottom: 10px;">
                <div class="saleNum">
                  <SaleNum></SaleNum>
                </div>
              </el-col>



              <div>销售百分比</div>
              <el-col align="center" :span="24" :offset="0" style="margin-top: 10px;">
                <!-- 百分比进度条 -->
                <div class="container" style="margin-bottom: 40px;">
                  <div class="progress3 progress-moved" id="child">
                    <div id="myBar">0%</div>
                    <div class="progress-bar3">
                    </div>
                  </div>
                </div>
              </el-col>


              <div><span>热门搜索词</span><i> Top Search</i>
                <!-- 字符云 -->
                <el-col align="center" :span="24" :offset="0" style="margin-top: 20px;">
                  <div class="world-cloud">
                    <WorldEcharts></WorldEcharts>
                  </div>
                </el-col>

              </div>
            </el-col>


            <el-col :span='12' class='col2' :offset="0">
              <el-row :gutter="20">
                <div style="margin-left: 20px;">订单退单柱状图</div>
                <el-col :span="24" :offset="0" align="center">
                  <!-- 订单柱状图 -->
                  <div class="order-echart">
                    <OrderEcharts :orderData="mockData"></OrderEcharts>
                  </div>
                </el-col>

              </el-row>

              <el-row :gutter="20">
                <el-col :span="12" :offset="0">
                  <div style="margin: 0px 0px 0px 20px;">全国订单人数分布图</div>
                  <!-- 地图 -->
                  <div class="map">
                    <MapEchart></MapEchart>
                  </div>
                </el-col>
                <el-col :span="10" :offset="0">
                  <div>购买终端</div>
                  <!-- 饼图 -->
                  <div class="pic">
                    <PicEcharts></PicEcharts>
                  </div>
                </el-col>
              </el-row>

            </el-col>
            <el-col :span='6' class='col3'>
              <el-row :gutter="20">
                <span>统计数据</span> <i>Statistics Data</i>
              </el-row>
              <div class="statis-data">
                <div class="statis-data-item">
                  <div><svg-icon icon-class="订单" class-name='custom-class' /></div>
                  <div class="statis-box">
                    <div class="statis-count">85.6</div>
                    <div class="statis-detail">订单总数（万）</div>
                  </div>
                </div>
                <div class="statis-data-item">
                  <div><svg-icon icon-class="5-销售看板" class-name='custom-class' /></div>
                  <div class="statis-box">
                    <div class="statis-count">32.5</div>
                    <div class="statis-detail">销售总量（万元）</div>
                  </div>
                </div>
              </div>
              <div class="statis-data">
                <div class="statis-data-item">
                  <div><svg-icon icon-class="消费者-5" class-name='custom-class' /></div>
                  <div class="statis-box">
                    <div class="statis-count">6.8</div>
                    <div class="statis-detail">人均消费(万元)</div>
                  </div>
                </div>
                <div class="statis-data-item" style="margin-right:13px">
                  <div><svg-icon icon-class="添加" class-name='custom-class' /></div>
                  <div class="statis-box">
                    <div class="statis-count">45</div>
                    <div class="statis-detail">近半天新增订单(件)</div>
                  </div>
                </div>
              </div>

              <el-row :gutter="20">
                <div style="margin: 20px 0px 30px 0px"> <span>大额订单Top</span> <i>Supper Orders</i></div>
                <div class="table_data"></div>
                <el-table :data="tableData" style="width: 100%" :header-cell-style="{ 'text-align': 'center', }"
                  align="center" border>
                  <el-table-column prop="time" label="时间" align="center">
                  </el-table-column>
                  <el-table-column prop="name" label="物品" align="center">
                  </el-table-column>
                  <el-table-column prop="amount" label="数量" align="center">
                  </el-table-column>
                  <el-table-column prop="money" label="金额" align="center">
                  </el-table-column>
                </el-table>

              </el-row>
            </el-col>
          </el-row>

        </el-main>
      </el-container>
      <el-footer height='30px'>
        <!-- 背景粒子 -->
        <div class="bg-animate">
          <BgAnimate></BgAnimate>
        </div>
      </el-footer>
    </el-container>

  </div>
</template>
<script>
// * 全部导入，as 起个别名
import * as echarts from 'echarts';
import OrderEcharts from './components/OrderEcharts.vue'
import { mockData } from './components/mockOrder'
import SaleNum from './components/SaleNum.vue';
import WorldEcharts from './components/WorldEcharts'
import PicEcharts from './components/PicEcharts.vue'
import MapEchart from './components/MapEchart.vue';
import screenfull from 'screenfull'
import BgAnimate from './components/BgAnimate'
import { parseTime } from '@/utils/index'
export default {
  name: 'Dashboard',
  data() {
    return {

      p: '88%',
      date: parseTime(new Date()),
      tableData: [{
        time: '12-04',
        name: '灯光组合套餐',
        amount: '83',
        money: '532330',

      }, {
        time: '12-04',
        name: '家乐铭品鞋柜',
        amount: '125',
        money: '434310',

      }, {
        time: '12-05',
        name: '北欧陶瓷花瓶',
        amount: '680',
        money: '192200',
      }, {
        time: '12-07',
        name: '单人沙发椅北欧现代实木',
        amount: '87',
        money: '223334',

      }, {
        time: '12-10',
        name: '雷士（ NVC ）客厅灯',
        amount: '123',
        money: '429318',

      },
      {
        time: '12-11',
        name: '简野（JIANYE）B-16',
        amount: '123',
        money: '429318',

      },
      {
        time: '12-11',
        name: '鹿摆件',
        amount: '127',
        money: '429718',

      },
      {
        time: '12-12',
        name: '摇钱树',
        amount: '63',
        money: '229318',

      },
      ]
    }
  },
  computed: {
    mockData() {
      return mockData()
    },

  },
  components: {
    OrderEcharts,
    SaleNum,
    WorldEcharts,
    PicEcharts,
    MapEchart,
    screenfull,
    BgAnimate
  },
  beforeCreate() {

  },
  //vue实例创建
  created() {

  },
  // dom好了
  mounted() {
    this.move()
    this.timer = setInterval(() => {
      this.date = parseTime(new Date()); // 修改数据date
    }, 0)

    // 给原生标签添加自定义样式
    document.getElementById('child').style.setProperty('--animationWidth', this.p)
    // 初始化echarts实例
    var demoEchart = echarts.init(document.getElementById('demo'),);
    demoEchart.setOption({
      title: {
        text: 'ECharts 入门示例'
      },
      tooltip: {},
      xAxis: {
        data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
      },
      yAxis: {},
      series: [
        {
          name: '销量',
          type: 'line',
          data: [5, 20, 36, 10, 10, 20]
        }
        ,
        {
          name: 'demo',
          type: 'bar',
          data: [5, 20, 36, 10, 10, 20]
        },
        {
          name: 'dem',
          type: 'scatter',
          data: [5, 20, 36, 10, 10, 20]
        }
      ]
    });
  },
  beforeDestroy() {
    if (this.timer) {
      clearInterval(this.timer); // 在Vue实例销毁前，清除我们的定时器
    }
  },
  methods: {
    move() {
      var elem = document.getElementById("myBar");
      var width = 1
      var id = setInterval(frame, 30);
      function frame() {
        if (width >= 88) {
          clearInterval(id);
        } else {
          width++;
          elem.style.width = width + '%';
          elem.innerHTML = width * 1 + '%';
        }
      }
    },
    fullScreen() {
      if (screenfull.isEnabled) {
        screenfull.toggle(this.$refs.echartsMain);
      }
    }
  }
}
</script>

<style lang="scss" scoped  >
.echarts-main {
  width: 100%;
  height: 100vh;
  background-color: #0a1631;
  overflow: auto;

  .el-header {
    .title {
      box-shadow: 0px -5px 20px 0px rgb(186, 66, 255), 0px 5px 20px 0px rgb(0, 225, 255);
      color: #ffffff;
      border-radius: 50px;
      text-shadow: 0 0 .5em rgb(217, 176, 255);

    }

    .timeNow {
      color: #ffffff;
      font-size: 18px;
      text-shadow: 2px 2px 8px rgb(0, 225, 255);
      color: #ffffff;

    }
  }

  /* 内容栏样式 */
  .el-main {
    color: #8D9BC1;
    font-size: 24px;
    overflow: hidden;

    i {
      font-style: normal;
      color: #3C4B67;
    }


  }

  /* 列的样式 */
  .col1 {
    .shellData {
      margin-bottom: 20px;
    }

    .saleNum {
      font-size: 50px;
      font-weight: bold;
      letter-spacing: 3px;
      margin: 20px;
      color: #fff;
    }

    #myProgress {
      width: 280px;
    }

    #myBar {
      position: absolute;
      bottom: 26px;
      text-align: right;
      line-height: 0px;


    }
  }

  .col2 {
    .order-echart {
      margin-top: 0px;
      width: 600px;
      height: 300px;
    }

    .map {
      margin: 20px 0px 0px -20px;
      width: 400px;
      height: 350px;
      position: absolute;
      z-index: 10;
    }

    .pic {
      margin: 0px 0px 0px -40px;
      width: 360px;
      height: 360px;
      position: absolute;
      z-index: 10;
    }

  }

  .col3 {


    ::v-deep .cell {
      padding: 0;
      color: #8D9BC1;
    }

    ::v-deep .el-table__header th {
      padding: 0;
      height: 40px;
      line-height: 40px;
    }

    .el-table--border tr,
    td {
      border: none !important;
    }

    //设置表的外边框
    .el-table {
      border: 0px solid #ccc;
      overflow: hidden;
    }

    .el-table::before {
      background-color: #8D9BC1;
    }

    ::v-deep .el-table__body-wrapper::-webkit-scrollbar {
      /*width: 0;宽度为0隐藏*/
      display: none;
    }

    ::v-deep .el-table__body tr,
    ::v-deep.el-table__body td {
      padding: 0;
      height: 40px;
      line-height: 40px;
    }

    ::v-deep .el-table {
      background-color: transparent !important;
      color: #8D9BC1 !important;
    }

    ::v-deep .el-table__expanded-cell {
      background-color: transparent !important;
    }

    ::v-deep .el-table th,
    ::v-deep .el-table tr,
    ::v-deep .el-table td {
      background-color: transparent;
      border-right: 0px;
      border: 1px solid #8D9BC1;
    }

    ::v-deep .el-table--border td,
    .el-table--border th,
    .el-table__body-wrapper .el-table--border.is-scrolling-left~.el-table__fixed {
      border-right: 0px !important;
    }

    .statis-data {
      display: flex;
      justify-content: space-between;

      .statis-data-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 20px;

        svg-icon {
          font-size: 20px;

        }

        .statis-box {
          margin-left: 20px;

          .statis-count {
            font-size: 38px;
            font-weight: 600;
            color: #fff;
          }

          .statis-detail {
            color: #B0C2F9;
            font-size: 12px;
          }
        }
      }
    }
  }

  // .el-footer {}

  .full {
    opacity: 0.5;
    margin: 10px;
    width: 16px;
    height: 16px;
  }

  .container {
    margin: 30px auto;
    width: 280px;
    text-align: center;
  }

  .progress3 {
    position: relative;
    border-radius: 30px;
    box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.25), 0 1px rgba(255, 255, 255, 0.08);
  }

  .progress-bar3 {
    height: 10px;
    border-radius: 10px;
    background-image:
      linear-gradient(to bottom, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.05));
  }

  .progress-moved .progress-bar3 {
    width: 85%;
    background-color: #475def;
    transition: 0.4s linear;
    transition-property: width, background-color;
    animation: progressAnimation 3.2s forwards;
  }

  @keyframes progressAnimation {
    0% {
      width: 5%;
      background-color: #ad4bda;

    }

    100% {
      // 自定义属性
      width: var(--animationWidth);
      background-color: #4a47ef;

    }
  }

  .world-cloud {
    margin: 16px 0px 0px 10px;
    width: 300px;
    height: 300px;
    background: linear-gradient(315deg, #19233c, #1b263e, );
    position: absolute;
    z-index: 10;
  }



  .bg-animate {
    position: absolute;
    left: 0;
    bottom: 10px;
    width: 100%;
    height: 40%;
    z-index: 0;
  }

}
</style>
