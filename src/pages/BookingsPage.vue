<script setup>
import BookingCard from "../components/BookingCard.vue";

import {useStore} from "vuex";
import {computed, onMounted} from "vue";

const store = useStore()

const cfg = computed(() => store.getters.config)

onMounted(async () => {
  store.dispatch('fetchBookings', cfg.value)
})



const bookings = computed(() => store.getters.allBookings)

</script>

<template>
  <div class="bookings-page-content">
    <BookingCard v-for="booking in bookings" :key="booking.id" :booking="booking"></BookingCard>
  </div>
</template>

<style scoped>
.bookings-page-content {
  display: flex;
  flex-direction: column;
  gap: 50px;
  padding: 120px 125px;
}
</style>