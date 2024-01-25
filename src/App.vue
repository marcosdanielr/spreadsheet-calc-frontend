<script setup lang="ts">
import { ref, watch } from "vue"
import { FwbFileInput, FwbSpinner, FwbAlert } from "flowbite-vue"
import { uploadCSVService } from "./services/upload-csv-service"
import BarChart from "./components/BarChart.vue"

const file = ref<File | null>(null)
const isUploadedFile = ref<boolean>(false)
const isLoading = ref<boolean>(false)
const errorMessage = ref<string>("")
const data = ref<number[]>([])

const chartLabels = ["Total de assinantes"]

watch(file, (newFile) => {
  if (newFile?.type !== "text/csv") {
    errorMessage.value = "Only CSV files are allowed!"
    setTimeout(() => {
      errorMessage.value = ""
      file.value = null
    }, 3000)
    return
  }

  const MAX_FILE_SIZE = 5 * 1000000

  if (newFile!.size! > MAX_FILE_SIZE) {
    errorMessage.value = "Max file size is 10mb!"
    setTimeout(() => {
      errorMessage.value = ""
      file.value = null
    }, 3000)
    return
  }

  isUploadedFile.value = true
  isLoading.value = true

  uploadCSVService(newFile!)
    .then((response) => {
      const { average_billing_quantity, total_amount, total_subscribers } =
        response

      data.value = [total_subscribers]
    })
    .catch(() => alert("Error on upload CSV file"))
    .finally(() => (isLoading.value = false))
})
</script>

<template>
  <fwb-alert
    v-if="errorMessage"
    class="border-t-4 rounded-none"
    icon
    type="danger"
    closable
  >
    {{ errorMessage }}
  </fwb-alert>

  <div
    class="flex flex-col gap-3 w-full h-screen justify-center items-center border-x-green-100"
  >
    <fwb-file-input
      v-if="!isUploadedFile"
      v-model="file"
      dropzone
      accept=".csv"
    />
    <fwb-spinner v-if="isLoading" size="12" />

    <BarChart
      v-if="!isLoading && isUploadedFile"
      :data="data"
      :labels="chartLabels"
    />
  </div>
</template>
