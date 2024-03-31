<script setup lang="ts">
import CardList from "./CardList.vue";
</script>

<template>
  <div>
    <Suspense>
      <template #fallback>
        <div>Loading...</div>
      </template>
      <CardList />
    </Suspense>
  </div>
</template>

<style scoped></style>
