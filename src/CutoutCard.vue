<script setup lang="ts">
import {ref, watch} from 'vue';
import InputNumber from "primevue/inputnumber";

const props = defineProps({
  'title': String,
  'count': Number
})
const emit = defineEmits(["edit-count"]);
const title = ref(props.title)
const count = ref(props.count)
watch(count, () => emit('edit-count', {title: title.value, count: count.value}))

</script>

<template>
  <div class="card printable
              pb-4 w-[60mm] h-[60mm] 
              flex flex-col justify-start
              transition-colors duration-100 ease-in-out
              bg-slate-100
              dark:bg-slate-800
              hover:bg-slate-200
              dark:hover:bg-slate-700
              checked:bg-green-200
              dark:checked:bg-green-300
              dark:text-slate-100
              ">
    <div id="high-padding" class="basis-4/5
    border-x-slate-50 dark:border-x-slate-700
    border-b-2 dark:border-b-2
    border-slate-200 dark:border-slate-600"/>
    <div id="low-padding" class="basis-1/5"/>
    <div class="font-bold text-3xl leading-none
                flex flex-col align-middle
                ">
      <p class="text-center">{{ title }}</p>
      <input class="text-center bg-inherit" type="number" required v-model="count"/>
    </div>
  </div>
</template>

<style scoped>
@tailwind components;

@layer components {
  .card:has(input:checked) {
    @apply bg-green-200;
    @apply dark:bg-green-300;
  }
}

@media print {
  .printable {
    visibility: visible;
    page-break-inside: avoid;
    page-break-after: auto;
  }
}
</style>