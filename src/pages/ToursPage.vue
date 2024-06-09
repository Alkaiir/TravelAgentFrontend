<script setup>
import { useStore } from 'vuex'
import {computed} from "vue";
import TourCard from "../components/TourCard.vue";

const token = computed(() => store.getters.userToken)
const userRole = computed(() => store.getters.userRole)
const store = useStore()
const tours = computed(() => store.getters.allTours)

</script>

<template>
  <div class="tours-page-content">
    <h1 class="tours-page-title">Полный список туров</h1>
    <div class="tours-page-content-first-section">
      <div class="sort-bar">
        <div class="inputs-bar">
          <input type="text" placeholder="Откуда" value="Россия">
          <input type="text" placeholder="Куда">
          <input type="date">
          <select name="" id="">
            <option value="2">2 ночи</option>
          </select>
          <select name="" id="">
            <option value="2">2 человека</option>
          </select>
        </div>
        <button>Найти тур</button>
      </div>
    </div>
    <div class="tours-page-content-second-section">
      <div class="tours-page-tour-list">
        <TourCard v-for="tour in tours" :key="tour.id" :tour="tour"></TourCard>
      </div>
      <div class="tours-page-side-bar">
        <div class="side-bar-item">
          <p class="side-bar-desc">Сортиовать</p>
          <select class='side-bar-select' name="sort" id="sort">
            <option value="none">все</option>
            <option value="low">дешевле</option>
            <option value="hight">дороже</option>
          </select>
        </div>
        <div class="side-bar-item" v-if="(token !== null ||  token !== undefined) && (userRole === `admin`) && (userRole !== null) ">
          <p class="side-bar-desc">Новый тур</p>
          <button class="side-bar-button">Создать</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

.tours-page-content {
  padding: 80px 125px 120px 125px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 50px;
}

.inputs-bar {
  padding: 9px;
  background: #131313;
  border-radius: 25px;
}

.inputs-bar > input {
  padding: 8px 20px;
}

.inputs-bar > select {
  padding: 8px 20px;
}

.side-bar-button {

}

.sort-bar {
  display: flex;
  flex-direction: column;
  gap: 32px;
  align-items: center;
}

.tours-page-tour-list {
  display: flex;
  flex-direction: column;
  gap: 50px;
}

.tours-page-title {
  font-size: 64px;
}

.tours-page-content-second-section {
  display: flex;
  width: 100%;
  justify-content: space-between;
}

.tours-page-side-bar {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.side-bar-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #131313;
  padding: 22px 24px;
  border-radius: 30px;
  gap: 10px;
}

.side-bar-desc {
  font-size: 24px;
  color: white;
}

.side-bar-select {
  padding: 8px 70px;
  border-radius: 15px;
  text-align: center;
  font-size: 24px;
}

.side-bar-button {
  border: 1px solid #131313;
  cursor: pointer;
  padding: 8px 70px;
  border-radius: 15px;
  text-align: center;
  font-size: 24px;
}

.side-bar-button:hover {
  color: white;
  border: 1px solid white;
  background: #131313;
}
</style>