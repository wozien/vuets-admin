<template>
  <div class="chart" :style="{ width: width + 'px', height: height + 'px' }" ref="chart"></div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Provide } from 'vue-property-decorator';
import echarts from 'echarts';

@Component({
  components: {}
})
export default class Chart extends Vue {
  @Prop({ type: String, default: 'line' }) readonly chartType!: string;
  @Prop(Object) chartData!: Object;

  @Provide() width: number = 0;
  @Provide() height: number = 0;

  created() {
    this.width = document.body.offsetWidth * 0.8;
    this.height = document.body.offsetHeight * 0.6;
  }

  mounted() {
    this.drawChart();
  }

  drawChart() {
    let chart = echarts.init(this.$refs.chart as HTMLCanvasElement);
    if (chart === undefined) {
      console.log(`echarts init dom is failed`);
      return;
    }

    switch (this.chartType) {
      case 'line':
        chart.setOption((this as any).getLineOption());
        break;
      case 'bar':
        chart.setOption((this as any).getBarOption());
        break;
      case 'pie':
        chart.setOption((this as any).getPieOption());
        break;
    }
  }

  getLineOption() {
    return {
      title: {
        text: '近一周学习量',
        subtext: 'test',
        x: 'center'
      },
      xAxis: {
        type: 'category',
        data: (this as any).chartData.xAxisData
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: (this as any).chartData.yAxisData,
          type: 'line',
          smooth: true
        }
      ],
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          label: {
            backgroundColor: '#6a7985'
          }
        }
      }
    };
  }

  getBarOption() {
    return {
      title: {
        text: '近一周学习量',
        subtext: 'test',
        x: 'center'
      },
      xAxis: {
        type: 'category',
        data: (this as any).chartData.xAxisData
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: (this as any).chartData.yAxisData,
          type: 'bar',
          barWidth: '20%'
        }
      ],
      color: ['#3398DB'],
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          // 坐标轴指示器，坐标轴触发有效
          type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '5%'
      }
    };
  }

  getPieOption() {
    let pieData = [];
    for (let index in (this as any).chartData.xAxisData) {
      pieData.push({
        value: (this as any).chartData.yAxisData[index],
        name: (this as any).chartData.xAxisData[index]
      });
    }

    return {
      title: {
        text: '近一周学习量',
        subtext: 'test',
        x: 'center'
      },
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)'
      },
      legend: {
        orient: 'vertical',
        left: 'left',
        data: (this as any).chartData.xAxisData
      },
      series: [
        {
          name: '访问来源',
          type: 'pie',
          radius: '55%',
          center: ['50%', '60%'],
          data: pieData,
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    };
  }
}
</script>

<style lang="scss" scoped>
</style>