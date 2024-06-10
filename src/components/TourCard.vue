<script setup>
import { useStore } from 'vuex'
import router from "../router/router.js";
import {computed, ref} from "vue";
const store = useStore()

const token = computed(() => store.getters.userToken)
const props = defineProps(['tour'])
const cfg = computed(()=> store.getters.config)
const userRole = computed(() => store.getters.userRole)

let tour = props.tour
const reqData = ref({ cfg: cfg, tour: tour})


let editingMode = ref(false)

function switchEditingMode () {
  if (this.editingMode === false) {
    this.editingMode = true
  } else {
    this.editingMode = false
  }
}

</script>

<template>
<div class="tour-card-content">
  <div class="tour-card-info">
      <p class="tour-card-info-desc-county">{{ props.tour.country }}</p>
      <div class="tour-card-info-desc-icons">
      <div class="tour-card-info-desc-icons-item">
        <img src="/src/assets/Nights.png" alt="" class="icons-item-icon">
        <p class="icons-item-desc">{{ tour.days_count }}</p>
      </div>
      <div class="tour-card-info-desc-icons-item">
        <img src="/src/assets/Peoples.png" alt="" class="icons-item-icon">
        <p class="icons-item-desc">{{ tour.peoples_count }}</p>
      </div>
      </div>
      <p class="tour-card-info-desc-county price">{{ tour.price }} ₽</p>
  </div>

  <p class="tour-card-tour-desc">
    {{ tour.name }}
  </p>

  <div class="tour-card-links">
    <p class="tour-card-date">{{ tour.starting_date }}</p>
    <div class="tour-card-links-content">
      <button class="tour-card-admin-button" v-if="(token !== null ||  token !== undefined) && (userRole === `admin`) && (userRole !== null) " @click="store.dispatch('deleteTour', reqData)"><img src="/src/assets/Delete.png" alt="Delete Icon"></button>
      <button class="tour-card-admin-button" v-if="(token !== null ||  token !== undefined) && (userRole === `admin`) && (userRole !== null) " @click="switchEditingMode()" ><img src="/src/assets/Edit.png" alt=""></button>
      <button class="tour-card-route-link" @click="router.push(`tour/${tour.id}`);">Подробнее</button>
    </div>
  </div>
</div>
  <div class="editing-menu" v-if="editingMode">
    <p class="editing-menu-desc">Название</p>
    <input type="text" v-model="tour.name" class="editing-menu-input">
    <p class="editing-menu-desc">Страна</p>
    <input type="text" v-model="tour.country" class="editing-menu-input">
    <p class="editing-menu-desc">Описание</p>
    <input type="text" v-model="tour.description" class="editing-menu-input">
    <p class="editing-menu-desc">Дата отправления</p>
    <input type="date" v-model="tour.starting_date" class="editing-menu-input">
    <p class="editing-menu-desc">Количество дней</p>
    <input type="number" v-model="tour.days_count" class="editing-menu-input">
    <p class="editing-menu-desc">Количество человек</p>
    <input type="number" v-model="tour.peoples_count" class="editing-menu-input">
    <p class="editing-menu-desc">Цена</p>
    <input type="number" v-model="tour.price" class="editing-menu-input">
    <button class="tour-card-route-link" @click="store.dispatch('updateTour', reqData); switchEditingMode()">Сохранить</button>
  </div>
</template>

<style scoped>

.tour-card-tour-desc {
  font-size: 24px;
}

.editing-menu {
  border: 1px solid black;
  padding: 25px 40px;
  border-radius: 25px;
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.editing-menu-input {
  padding: 8px 70px;
  border-radius: 15px;
  font-size: 24px;
  width: 100%;
  text-align: left;
}

.editing-menu-desc {
  font-size: 24px;
}

.tour-card-content {
  border: 1px solid black;
  border-radius: 25px;
  padding: 25px 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 1200px;
}

.tour-card-info {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.tour-card-info-desc-icons {
  display: flex;
  gap: 20px;
}

.tour-card-info-desc-icons-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
}

.icons-item-desc {
  font-size: 24px;
}

.tour-card-info-desc-county {
  font-size: 32px;
}

.tour-card-links {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
}

.tour-card-date {
  font-size: 24px;
  padding-left: 150px;
}

.tour-card-links-content {
  display: flex;
  justify-content: space-between;
  gap: 25px;
}

.tour-card-route-link {
  font-size: 32px;
  background: #131313;
  border-radius: 25px;
  border: 1px solid white;
  color: white;
  padding: 13px 45px;
}

.tour-card-route-link:hover {
  cursor: pointer;
  border-color: #131313;
  background: white;
  color: #131313;
  transition: .4s all;
}

.price {
  font-size: 40px;
}

.tour-card-admin-button {
  width: 61px;
  height: 61px;
  border-radius: 25px;
  border: 1px solid white;
  background: #131313;
  display: flex;
  align-items: center;
  justify-content: center;
}

.tour-card-admin-button:hover {
  cursor: pointer;
  background: white;
  border-color: #131313;
  transition: .4s all;
}

.tour-card-admin-button:hover > img {
  filter: invert(100);
}
</style>