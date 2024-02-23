<script setup lang="ts">
import { ref, watch } from 'vue';

const props = defineProps(['title', 'count'])
const emit = defineEmits(["edit-count"]);
const title = ref(props.title)
const count = ref(props.count)
watch(count, () => emit('edit-count', { title: title.value, count: count.value }))

</script>

<template>
  <div class="card printable
              pb-4 w-[60mm] h-[60mm] 
              flex flex-col justify-start
              transition-colors duration-100 ease-in-out
              bg-slate-100
              hover:bg-slate-200
              checked:bg-green-200
              ">
    <div id="high-padding" class="basis-4/5 border-x-slate-50 border-b-2 ">
    </div>
    <div id="low-padding" class="basis-1/5">

    </div>
    <div class="font-bold text-3xl leading-none
                flex flex-col align-middle
                ">
      <p class="text-center">{{ title }}</p>
      <input class="text-center bg-inherit" type="text" required v-model="count" />
    </div>
  </div>
</template>

<style scoped></style>