<template>
  <div>
    <Line :data="chartData" :options="chartOptions" />
  </div>
</template>

<script>
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
import { Line } from "vue-chartjs";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale
);

export default {
  name: "LineChart",
  components: { Line },
  props: {
    chartData: { type: Object, required: true },
  },
  computed: {
    chartOptions() {
      return {
        responsive: true,
        interaction: {
          mode: "index",
          intersect: false,
        },
        stacked: false,
        scales: {
          y: {
            type: "linear",
            display: true,
            position: "left",
            title: {
              display: true,
              text: "Number of Trees Planted",
            },
            ticks: { color: "#4CAF50" },
          },
          y1: {
            type: "linear",
            display: true,
            position: "right",
            title: {
              display: true,
              text: "Air Quality Index (AQI)",
            },
            min: 0,
            max: 40,
            grid: { drawOnChartArea: false },
            ticks: { color: "#2196F3" },
          },
          x: {
            title: { display: true, text: "Year" },
            ticks: { color: "#666" },
          },
        },
      };
    },
  },
  mounted(){
    window.addEventListener("resize", this.handleResize);
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.handleResize);
  },
  methods: {
    handleResize() {
      if (this.$refs.chartRef?.chart) {
        this.$refs.chartRef.chart.resize();
      }
    },
  }
};
</script>
