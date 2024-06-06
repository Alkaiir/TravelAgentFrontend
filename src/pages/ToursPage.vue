<script setup>
import { useStore } from 'vuex'
import {computed} from "vue";

const store = useStore()
const tours = computed(() => store.getters.allTours)

</script>

<template>
  <div>
    <div v-for="tour in tours" :key="tour.id">
      <p>{{ tour.name }}</p>
      <p>{{ tour.country }}</p>
    </div>
  </div>
</template>

<style scoped>

</style>