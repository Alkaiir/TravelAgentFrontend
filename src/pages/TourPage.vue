<script setup>
import { useStore } from 'vuex'
import {computed, ref} from "vue";

const props = defineProps({
  id: String
})

const store = useStore()

const token = computed(() => store.getters.userToken)
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
        <button v-if="token !== null && token !== undefined" class="booking-button" @click="store.dispatch('createBooking', reqData)">Забронировать</button>
      </div>
    </div>
    <p class="tour-page-tour-desc">{{ tourInfo.description }}</p>
  </div>

  <div class="populars">
    <h2 class="popular-title">Популярные направления</h2>
    <div class="popular-items">

      <div class="popular-item">
        <img src="/src/assets/Tourkish.jpg" alt="" class="popular-item-image">
        <h3 class="popular-item-title">Турция</h3>
        <p class="popular-item-desk">от 24000 ₽</p>
      </div>

      <div class="popular-item">
        <img src="/src/assets/Egipet.jpg" alt="" class="popular-item-image">
        <h3 class="popular-item-title">Египет</h3>
        <p class="popular-item-desk">от 35000 ₽</p>
      </div>

      <div class="popular-item">
        <img src="/src/assets/Dubai.jpg" alt="" class="popular-item-image">
        <h3 class="popular-item-title">Дубаи</h3>
        <p class="popular-item-desk">от 39000 ₽</p>
      </div>

      <div class="popular-item">
        <img src="/src/assets/Kipr.jpg" alt="" class="popular-item-image">
        <h3 class="popular-item-title">Кипр</h3>
        <p class="popular-item-desk">от 43000 ₽</p>
      </div>

      <div class="popular-item">
        <img src="/src/assets/Kuba.jpg" alt="" class="popular-item-image">
        <h3 class="popular-item-title">Куба</h3>
        <p class="popular-item-desk">от 55000 ₽</p>
      </div>
      <div class="popular-item">
        <img src="/src/assets/Taildand.jpg" alt="" class="popular-item-image">
        <h3 class="popular-item-title">Таиланд</h3>
        <p class="popular-item-desk">от 29000 ₽</p>
      </div>

      <div class="popular-item">
        <img src="/src/assets/Grece.jpg" alt="" class="popular-item-image">
        <h3 class="popular-item-title">Греция</h3>
        <p class="popular-item-desk">от 34000 ₽</p>
      </div>

      <div class="popular-item">
        <img src="/src/assets/Filliphines.jpeg" alt="" class="popular-item-image">
        <h3 class="popular-item-title">Филиппины</h3>
        <p class="popular-item-desk">от 51000 ₽</p>
      </div>

    </div>
  </div>

</div>
</template>

<style scoped>

.populars {
  padding: 120px 125px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 45px;
}

.popular-items {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 150px;
}

.popular-title {
  font-size: 32px;
  font-weight: normal;
}

.popular-item-image {
  width: 300px;
  height: 300px;
  border-radius: 30px;
  margin-bottom: 20px;
}

.popular-item-title {
  font-size: 32px;
  margin-bottom: 5px;
}

.popular-item-desk {
  font-size: 24px;
}

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