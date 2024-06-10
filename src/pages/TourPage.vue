<script setup>
import { useStore } from 'vuex'
import {computed, ref} from "vue";

const props = defineProps({
  id: String
})

const store = useStore()

const tours = computed(()=> store.getters.allTours)
const cfg = computed(()=> store.getters.config)
let tourInfo = {}

tours.value.forEach((tour)=> {
  if (tour.id === props.id) {
    tourInfo = tour
  }
})

let reqData = ref({cfg: cfg, data: {tour_name: tourInfo.name}})


</script>

<template>
<div class="tour-page-content">
  <h1 class="tour-page-title">{{ tourInfo.name }}</h1>
  <div class="tour-page-info">
    <div class="tour-page-desc">
      <p class="tour-county">{{ tourInfo.country }}</p>
      <p class="tour-desc">{{ tourInfo.starting_date }}</p>
      <p class="tour-desc">{{ tourInfo.days_count }} ночей</p>
      <p class="tour-desc">{{ tourInfo.peoples_count }} человека</p>
      <p class="tour-desc">{{ tourInfo.starting_date }}</p>
      <div class="tour-desc-panel">
        <p class="tour-price">{{ tourInfo.price }} ₽</p>
        <button class="booking-button" @click="store.dispatch('createBooking', reqData)">Забронировать</button>
      </div>
    </div>
    <p class="tour-page-tour-desc">{{ tourInfo.description }}</p>
  </div>

</div>
</template>

<style scoped>

.tour-page-content {
  padding: 60px 125px 120px 125px;
  display: flex;
  flex-direction: column;
  gap: 60px;

}

.booking-button {
  font-size: 32px;
  background: #131313;
  border-radius: 25px;
  border: 1px solid white;
  color: white;
  padding: 13px 45px;
}

.booking-button:hover {
  cursor: pointer;
  border-color: #131313;
  background: white;
  color: #131313;
  transition: .4s all;
}


.tour-desc-panel {
  display: flex;
  gap: 36px;
  align-items: center;
}

.tour-price {
  font-size: 40px;
  font-weight: bold;
}

.tour-page-title {
  text-align: center;
  font-size: 64px;
}

.tour-page-tour-desc {
  max-width: 800px;
  font-size: 36px;
}

.tour-page-desc {
  display: flex;
  gap: 20px;
  flex-direction: column;
  align-items: flex-start;
}

.tour-county {
  font-size: 64px;
}

.tour-desc {
  font-size: 36px;
}

.tour-page-info {
  display: flex;
  justify-content: space-between;
}
</style>