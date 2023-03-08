<!--  -->
<template>
  <div class="order-ecahrts-main">
    <!-- id唯一 -->

    <div id="worldEcharts" class="order-echarts"></div>
  </div>
</template>

<script>
import * as echarts from 'echarts';
import 'echarts-wordcloud';
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

      var demoEchart = echarts.init(document.getElementById('worldEcharts'),);
      demoEchart.setOption({
        series: [{
          type: 'wordCloud',

          // The shape of the "cloud" to draw. Can be any polar equation represented as a
          // callback function, or a keyword present. Available presents are circle (default),
          // cardioid (apple or heart shape curve, the most known polar equation), diamond (
          // alias of square), triangle-forward, triangle, (alias of triangle-upright, pentagon, and star.

          shape: 'circle',

          // Keep aspect ratio of maskImage or 1:1 for shapes
          // This option is supported since echarts-wordcloud@2.1.0
          keepAspect: false,

          // A silhouette image which the white area will be excluded from drawing texts.
          // The shape option will continue to apply as the shape of the cloud to grow.

          //  maskImage: maskImage,

          // Folllowing left/top/width/height/right/bottom are used for positioning the word cloud
          // Default to be put in the center and has 75% x 80% size.

          left: 'center',
          top: 'center',
          width: '70%',
          height: '80%',
          right: null,
          bottom: null,

          // Text size range which the value in data will be mapped to.
          // Default to have minimum 12px and maximum 60px size.

          sizeRange: [12, 100],

          // Text rotation range and step in degree. Text will be rotated randomly in range [-90, 90] by rotationStep 45

          rotationRange: [-90, 90],
          rotationStep: 45,

          // size of the grid in pixels for marking the availability of the canvas
          // the larger the grid size, the bigger the gap between words.

          gridSize: 8,

          // set to true to allow word to be drawn partly outside of the canvas.
          // Allow word bigger than the size of the canvas to be drawn
          // This option is supported since echarts-wordcloud@2.1.0
          drawOutOfBound: false,

          // if the font size is too large for the text to be displayed,
          // whether to shrink the text. If it is set to false, the text will
          // not be rendered. If it is set to true, the text will be shrinked.
          // This option is supported since echarts-wordcloud@2.1.0
          shrinkToFit: false,

          // If perform layout animation.
          // NOTE disable it will lead to UI blocking when there is lots of words.
          layoutAnimation: true,

          // Global text style
          textStyle: {
            fontFamily: 'sans-serif',
            fontWeight: 'bold',
            // Color can be a callback function or a color string
            color: function () {
              // Random color
              return 'rgb(' + [
                Math.round(Math.random() * 160),
                Math.round(Math.random() * 160),
                Math.round(Math.random() * 160)
              ].join(',') + ')';
            }
          },
          emphasis: {
            focus: 'self',

            textStyle: {
              textShadowBlur: 3,
              textShadowColor: '#333'
            }
          },

          // Data is an array. Each array item must have name and value property.
          data: [
            { name: "Java", value: 16884 }, { name: "C", value: 16180 },
            { name: "Python", value: 9089 }, { name: "C++", value: 6229 },
            { name: "C#", value: 3860 }, { name: "VB.NET", value: 3745 },
            { name: "Ruby", value: 1318 }, { name: "Assembly", value: 1307 },
            { name: "R", value: 1261 }, { name: "Delphi", value: 1046 },
            { name: "VB", value: 1234 }, { name: "Go", value: 1100 },
            { name: "Delphi", value: 1046 }, { name: "SAS", value: 915 },
            { name: "Perl", value: 1023 }, { name: "Matlab", value: 924 },
            { name: "PL/SQL", value: 822 }, { name: "D", value: 814 },
            { name: "Scheme", value: 193 }, { name: "COBEL", value: 447 },
            { name: "Scratch", value: 524 }, { name: "Dart", value: 448 },
            { name: "ABAP", value: 447 }, { name: "Scala", value: 442 },
            { name: "Fortran", value: 439 }, { name: "LiveCode", value: 169 },
            { name: "Lisp", value: 409 }, { name: "F#", value: 391 }, ,
            { name: "Rust", value: 356 }, { name: "Kotlin", value: 319 },
            { name: "Ada", value: 316 }, { name: "Logo", value: 261 },
            { name: "SQL", value: 1935 }, { name: "RPG", value: 274 },
            { name: "PHP", value: 1909 }, { name: "LabVIEW", value: 243 },
            { name: "Haskell", value: 209 }, { name: "Bash", value: 196 },
            { name: "ActionScript", value: 182 }, { name: "Transact-SQL", value: 569 },
            { name: "PowerShell", value: 178 }, { name: "VBScript", value: 203 },
            { name: "JavaScript", value: 2076 }, { name: "TypeScript", value: 304 },
            { name: "Objective-C", value: 1501 }, { name: "Prolog", value: 261 },
            { name: "Groovy", value: 1394 }, { name: "Swift", value: 1362 },
            { name: "Crystal", value: 168 }, { name: "Lua", value: 379 },
            { name: "Julia", value: 224 }


          ]
        }]
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