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
const updateStorage = (title: string, count: number) => {
  const index = labels.value.findIndex((item: { title: string }) => item.title === title)
  labels.value[index].count = count
  if (import.meta.env.DEV)
    console.log("updateStorage", labels.value)
  axios.post(`https://api.labeller.imben.co/${import.meta.env.VITE_TENANT}/`, labels.value, {
    headers: headers
  })
}
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

</script>

<template>
  <div class="infinipage flex flex-row flex-wrap">
    <template v-for="label in labels">
      <CutoutCard
          @edit-count="updateStorage($event.title, $event.count)"
          :title="label.title"
          :count="label.count"
      />
    </template>
  </div>
</template>

<style scoped>

.infinipage,
.infinipage > .card {
  border-style: dashed;
  border-color: rgba(0, 0, 0, 0.3);
}
.infinipage {
  border-width: 2px 0 0 2px;
}
.infinipage > .card {
  border-width: 0 2px 2px 0;
}

@media print {
  .infinipage {
    width: 210mm;
    /* height: 297mm; */

    /* overflow: hidden; */
    page-break-inside: auto;
  }
}

</style>