<script setup lang="ts">
import { defineProps } from "vue"
import { Bar } from "vue-chartjs"
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js"

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

const { labels, data } = defineProps<{ labels: string[]; data: number[] }>()

const chartData = {
  labels,
  datasets: [
    {
      label: "Total de assinantes",
      backgroundColor: "rgba(10, 43, 255, 0.4)",
      data,
    },
  ],
}

const chartOptions = {
  responsive: true,
}
</script>

<template>
  <Bar :options="chartOptions" :data="chartData" />
</template>
