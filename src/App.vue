<script setup lang="ts">
import { ref } from 'vue'
import { FwbFileInput } from 'flowbite-vue'

const file = ref(null)

</script>

<template>
  <fwb-file-input v-model="file" dropzone />
</template>

