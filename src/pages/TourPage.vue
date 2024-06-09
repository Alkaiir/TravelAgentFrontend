<script setup>
import { useStore } from 'vuex'
import {computed} from "vue";

const props = defineProps({
  id: String
})

const store = useStore()

const tours = computed(()=> store.getters.allTours)
let tourInfo = {}


tours.value.forEach((tour)=> {
  if (tour.id === props.id) {
    tourInfo = tour
  }
})


</script>

<template>
{{ tourInfo }}
</template>

<style scoped>

</style>