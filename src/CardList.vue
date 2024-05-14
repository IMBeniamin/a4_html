<script setup lang="ts">
import { ref } from 'vue';
import axios from 'axios'
import CutoutCard from './CutoutCard.vue'
const headers = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'X-Custom-PSK': import.meta.env.VITE_SECRET_KEY
}
const fetchedLabels = await axios.get(`https://api.labeller.imben.co/${import.meta.env.VITE_TENANT}/`, {
  headers: headers,
})
console.log(`using ${import.meta.env.VITE_SECRET_KEY} as secret key`)
if (import.meta.env.DEV)
  console.log("fetchedLabels", fetchedLabels)
const url = new URL(window.location.toString())
const tenantKey = url.pathname.split('/')[1]
console.log(tenantKey)

const parsedLabels: {title: string, count: number}[] = JSON.parse(fetchedLabels.data)
const labels = ref(parsedLabels)
const bulkUpdateStorage = (newData: { title: string, count: number }[]) => {
  if (import.meta.env.DEV)
    console.log("bulkUpdateStorage", labels)
  for (const item of newData) {
    const index = labels.value.findIndex((dataItem: { title: string }) => dataItem.title === item.title)
    if (index === -1) {
      if (import.meta.env.DEV)
        console.log("new item found, inserting... ", item)
      labels.value.push(item)
    } else {
      if (import.meta.env.DEV)
        console.log("existing item found, updating...", item)
      labels.value[index].count = item.count
    }
  }
  axios.post(`https://api.labeller.imben.co/${import.meta.env.VITE_TENANT}/`, labels, {
    headers: headers
  })
}
const editLabel = (data: { title: string, count: number, index: number }) => {
  console.log("editing label\nnew data", data)
  console.log("old data", labels.value[data.index])
  labels.value[data.index].count = data.count
  labels.value[data.index].title = data.title
  if (import.meta.env.DEV)
    console.log("updateStorage", labels.value)
  axios.post(`https://api.labeller.imben.co/${import.meta.env.VITE_TENANT}/`, labels.value, {
    headers: headers
  })
}
const deleteLabel = (data: { title: string, count: number, index: number }) => {
  labels.value.splice(data.index, 1)
  axios.post(`https://api.labeller.imben.co/${import.meta.env.VITE_TENANT}/`, labels.value, {
    headers: headers
  })
}
const addLabel = (data: { title: string, count: number }) => {
  labels.value.push(data)
  axios.post(`https://api.labeller.imben.co/${import.meta.env.VITE_TENANT}/`, labels.value, {
    headers: headers
  })
}
</script>

<template>
  <div class="infinipage flex flex-row flex-wrap bg-white dark:bg-slate-800">
    <template v-for="label in labels">
      <CutoutCard
          @edit-label="editLabel($event)"
          @delete-label="deleteLabel($event)"
          :title="label.title"
          :count="label.count"
          :index="labels.indexOf(label)"
      />
    </template>
    <div
        @click="addLabel({title: 'Title', count: 0})"
        class="
        card
        w-[60mm] h-[60mm]
        flex flex-col justify-center items-center
        text-slate-800 dark:text-slate-200
        transition-all duration-200 ease-in-out
        bg-slate-100 dark:bg-slate-800
        hover:bg-slate-200 dark:hover:bg-slate-700
        text-6xl hover:text-8xl
">
      <i class="pi pi-plus"/>
    </div>
  </div>
</template>

<style scoped>

.infinipage{
  border-style: dashed;
  border-color: rgba(0, 0, 0, 0.3);
  border-width: 0 2px 2px 0;
}
.infinipage {
  border-width: 2px 0 0 2px;
}

@media print {
  .infinipage {
    width: 210mm;
    /* height: 297mm; */

    /* overflow: hidden; */
    break-inside: auto;
  }
}

</style>