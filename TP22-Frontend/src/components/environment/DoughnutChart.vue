<template>
  <div>
    <Doughnut v-if="chartData" :data="chartData" :options="mergedOptions" />
  </div>
</template>

<script>
import { Doughnut } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from "chart.js";

ChartJS.register(Title, Tooltip, Legend, ArcElement);

export default {
  name: "DoughnutChart",
  components: { Doughnut },
  props: {
    chartData: {
      type: Object,
      required: true
    },
    options: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    mergedOptions() {
      return {
        rotation: -90,        
        circumference: 180,
        cutout: "70%",
        plugins: {
          legend: {
            position: "bottom"
          }
        },
        ...this.options
      };
    }
  }
};
</script>
