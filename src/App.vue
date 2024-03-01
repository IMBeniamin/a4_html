<script setup lang="ts">
import { ref } from 'vue';
import axios from 'axios'
import CutoutCard from './CutoutCard.vue'
// const data = ref(JSON.parse(localStorage.getItem('data') ?? '[]'))
const headers = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'X-Custom-PSK': "secret key"
}
const tenant = 'dev'
const fetchedAppData = await axios.get(`https://api.labeller.imben.co/${tenant}/`, {
  headers: headers
})
const data = ref(fetchedAppData.data)
const updateStorage = (title: string, count: number) => {
  const index = data.value.findIndex((item: { title: string }) => item.title === title)
  data.value[index].count = count
  axios.post(`https://api.labeller.imben.co/${tenant}/`, data.value, {
    headers: headers
  })
}

</script>

<template>
  <div class="infinipage flex flex-row flex-wrap">
    <CutoutCard @edit-count="updateStorage($event.title, $event.count)" :title="item.title" :count="item.count"
      v-for="item in data" :key="item.title" />
  </div>
</template>

<style scoped></style>
