<script setup lang="ts">
import {ref, watch} from 'vue';
import Button from "primevue/button";
import Checkbox from "primevue/checkbox";

const props = defineProps({
  'title': String,
  'count': Number,
  'index': Number
})
const emit = defineEmits(["edit-count", "delete-label"]);
const title = ref(props.title)
const count = ref(props.count)
const selected = ref(false)
watch(count, () => emit('edit-count', {title: title.value, count: count.value}))
</script>

<template>
  <div v-on:dblclick="selected = !selected" v-on:contextmenu.prevent="selected = !selected"
       class="card printable non-print-breakable
              group
              pb-4 w-[60mm] h-[60mm] 
              flex flex-col justify-start
              transition-colors duration-200 ease-in-out
              bg-slate-100 dark:bg-slate-800
              hover:bg-slate-200 dark:hover:bg-slate-700
              checked:bg-green-200 dark:checked:bg-green-100
              text-slate-800 dark:text-slate-100
              has-[input:checked]:bg-green-600 dark:has-[input:checked]:bg-green-800
              ">
    <div class="grow flex w-full justify-between content-center">
      <Checkbox v-model="selected"
                binary variant="filled"
                aria-label="delete"
                class="invisible hover:bg-slate-50 dark:hover:bg-slate-500 rounded-lg" />
      <Button severity="danger" raised
              @click="$emit('delete-label', {title: title, count: 0, index: index})"
              class="invisible text-2xl group-hover:visible group-active:visible rounded-lg">
        <i class="pi pi-trash" />
      </Button>
    </div>
    <div id="high-padding" class="printable basis-4/5
    border-x-slate-50 dark:border-x-slate-700
    border-b-2 dark:border-b-2
    border-slate-200 dark:border-slate-600"/>
    <div id="low-padding" class="printable basis-1/5"/>
    <div class="printable font-bold text-3xl leading-none
                flex flex-col align-middle
                ">
      <p class="printable text-center">{{ title }}</p>
      <input class="printable text-center bg-inherit" type="number" required v-model="count"/>
    </div>
  </div>
</template>

<style scoped>
@tailwind components;



input[type='number']::-webkit-inner-spin-button,
input[type='number']::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

@media print {
  * {
    visibility: hidden;
  }
  .printable {
    visibility: visible;
  }
  .non-print-breakable {
    page-break-inside: avoid;
    page-break-after: auto;
  }
}
</style>