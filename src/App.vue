<script setup lang="ts">
import CardList from "./CardList.vue";
import Skeleton from "primevue/skeleton";
</script>

<template>
  <div>
    <Suspense>
      <template #fallback>
        <div class="h-screen w-screen flex flex-row flex-wrap justify-around items-center
        bg-white dark:bg-slate-900">
          <template v-for="_ in 20">
            <Skeleton width="10rem" height="12rem" borderRadius="1rem"></Skeleton>
          </template>
        </div>
      </template>
      <template #default>
        <CardList />
      </template>
    </Suspense>
  </div>
</template>

<style scoped></style>
