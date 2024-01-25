<script setup lang="ts">
import { ref, watch } from 'vue'
import { FwbFileInput, FwbSpinner } from 'flowbite-vue'

const file = ref(null)
let isUploadedFile = false
let isLoading = false



watch(file, (newValue: any) => {
  isUploadedFile = true
  isLoading = true
})


</script>

<template>
  <div class="flex w-full h-screen justify-center dark items-center border-x-green-100">
    <fwb-file-input v-if="!isUploadedFile" v-model="file" dropzone />
    <fwb-spinner v-if="isLoading" size="12" />
  </div>
</template>

