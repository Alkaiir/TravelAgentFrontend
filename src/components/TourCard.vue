<script setup>
import { useStore } from 'vuex'
import router from "../router/router.js";
import {computed, ref} from "vue";
const store = useStore()

const token = computed(() => store.getters.userToken)
const props = defineProps(['tour'])
const url = computed(() => store.getters.url)
const cfg = computed(()=> store.getters.config)
const userRole = computed(() => store.getters.userRole)
const reqData = ref({ cfg: cfg, id: props.tour.id})

</script>

<template>
<div class="tour-card-content">
  <div class="tour-card-info">
      <p class="tour-card-info-desc-county">{{ props.tour.country }}</p>
      <div class="tour-card-info-desc-icons">
      <div class="tour-card-info-desc-icons-item">
        <img src="/src/assets/Nights.png" alt="" class="icons-item-icon">
        <p class="icons-item-desc">{{ props.tour.days_count }}</p>
      </div>
      <div class="tour-card-info-desc-icons-item">
        <img src="/src/assets/Peoples.png" alt="" class="icons-item-icon">
        <p class="icons-item-desc">{{ props.tour.peoples_count }}</p>
      </div>
      </div>
      <p class="tour-card-info-desc-county price">{{ props.tour.price }} ₽</p>
  </div>
  <div class="tour-card-links">
    <p class="tour-card-date">{{ props.tour.starting_date }}</p>
    <div class="tour-card-links-content">
      <button class="tour-card-admin-button" v-if="(token !== null ||  token !== undefined) && (userRole === `admin`) && (userRole !== null) " @click="store.dispatch('deleteTour', reqData)"><img src="/src/assets/Delete.png" alt="Delete Icon"></button>
      <button class="tour-card-admin-button" v-if="(token !== null ||  token !== undefined) && (userRole === `admin`) && (userRole !== null) "><img src="/src/assets/Edit.png" alt=""></button>
      <button class="tour-card-route-link" @click="router.push(`tour/${props.tour.id}`);">Подробнее</button>
    </div>
  </div>
</div>
</template>

<style scoped>
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