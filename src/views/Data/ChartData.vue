<template>
  <div class="chart-data">
    <el-tabs type="border-card" v-model="tab">
      <el-tab-pane label="折线图" name="line">
        <chart chart-type="line" :chart-data="chartData"></chart>
      </el-tab-pane>
      <el-tab-pane label="柱状图" name="bar">
        <chart chart-type="bar" :chart-data="chartData"></chart>
      </el-tab-pane>
      <el-tab-pane label="饼图" name="pie">
        <chart chart-type="pie" :chart-data="chartData"></chart>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Provide } from 'vue-property-decorator';
import Chart from '../../components/Chart.vue';

@Component({
  components: { Chart }
})
export default class ChartData extends Vue {
  @Provide() tab: string = 'line';
  @Provide() chartData: any = {
    xAxisData: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    yAxisData: [820, 932, 901, 934, 1290, 1330, 1320]
  };
}
</script>

<style lang="scss" scoped>
</style>