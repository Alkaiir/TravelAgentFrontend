<script setup>
import { useStore } from 'vuex'
import {computed, ref} from "vue";
import TourCard from "../components/TourCard.vue";
import {useForm} from "vee-validate";
import * as yup from "yup";

const token = computed(() => store.getters.userToken)
const userRole = computed(() => store.getters.userRole)
const store = useStore()
const tours = computed(() => store.getters.allTours)

let creatingMode = ref(false)

function switchCreatingMode () {
  if (this.creatingMode === false) {
    this.creatingMode = true
    let button = document.querySelector('.side-bar-button')
    button.innerHTML = 'X'
  } else {
    this.creatingMode = false
    let button = document.querySelector('.side-bar-button')
    button.innerHTML = 'Создать'
  }
}

const { values, errors, defineField } = useForm({
  validationSchema: yup.object({
    name: yup.string().required(),
    country: yup.string().required(),
    description: yup.string().required(),
    starting_date: yup.string().required(),
    days_count: yup.number().required().min(1),
    peoples_count: yup.number().required().min(1),
    price: yup.number().required().min(1),
  }),
});

const [name, nameAttrs] = defineField('name', {
  validateOnModelUpdate: false,
});

const [country, countryAttrs] = defineField('country', {
  validateOnModelUpdate: false,
});

const [description, descriptionAttrs] = defineField('description', {
  validateOnModelUpdate: false,
});

const [starting_date, starting_dateAttrs] = defineField('starting_date', {
  validateOnModelUpdate: false,
});

const [days_count, days_countAttrs] = defineField('days_count', {
  validateOnModelUpdate: false,
});

const [peoples_count, peoples_countAttrs] = defineField('peoples_count', {
  validateOnModelUpdate: false,
});

const [price, priceAttrs] = defineField('price', {
  validateOnModelUpdate: false,
});

let tour = ref ({
  name: name,
  country: country,
  description: description,
  starting_date: starting_date,
  days_count: days_count,
  peoples_count: peoples_count,
  price: price,
})

const cfg = computed(()=> store.getters.config)

const reqData = ref({ cfg: cfg, tour: tour})

let sortConfig = ref({
  country: null,
  starting_date: null,
  days_count: null,
  peoples_count: null,
  sortPattern: null,
})
</script>

<template>
  <div class="tours-page-content">
    <h1 class="tours-page-title">Полный список туров</h1>
    <div class="tours-page-content-first-section">
      <div class="sort-bar">
        <div class="inputs-bar">
          <input class="inputs-bar-input" type="text" placeholder="Откуда" value="Россия">
          <input class="inputs-bar-input" type="text" placeholder="Куда" v-model="sortConfig.country">
          <input class="inputs-bar-input" type="date" v-model="sortConfig.starting_date">
          <select class="inputs-bar-input" name="nights" id="nights" v-model="sortConfig.days_count">
            <option value="2">2 ночи</option>
            <option value="3">3 ночи</option>
            <option value="4">4 ночи</option>
            <option value="5">5 ночей</option>
            <option value="6">6 ночей</option>
            <option value="7">7 ночей</option>
            <option value="14">14 ночей</option>
          </select>
          <select class="inputs-bar-input" name="peoples" id="peoples" v-model="sortConfig.peoples_count">
            <option value="2">2 человека</option>
            <option value="1">1 человек</option>
            <option value="3">3 человека</option>
            <option value="4">4 человека</option>
            <option value="5">5 человек</option>
          </select>
        </div>
        <button @click="store.commit('sortTours', sortConfig); sortConfig = {country: null, starting_date: null, days_count: null, peoples_count: null, sortPattern: null,}" class="inputs-bar-button">Найти тур</button>
      </div>
    </div>
    <div class="creating-menu" v-if="creatingMode === true">
      <p class="editing-menu-desc">Название</p>
      <input type="text" v-model="name" v-bind="nameAttrs" class="editing-menu-input">
      <p v-if="errors.name">{{ errors.name }}</p>
      <p class="editing-menu-desc">Страна</p>
      <input type="text" v-model="country" v-bind="countryAttrs" class="editing-menu-input">
      <p v-if="errors.country">{{ errors.country }}</p>
      <p class="editing-menu-desc">Описание</p>
      <input type="text" v-model="description" v-bind="descriptionAttrs" class="editing-menu-input">
      <p v-if="errors.description">{{ errors.description }}</p>
      <p class="editing-menu-desc">Дата отправления</p>
      <input type="date" v-model="starting_date" v-bind="starting_dateAttrs" class="editing-menu-input">
      <p v-if="errors.starting_date">{{ errors.starting_date }}</p>
      <p class="editing-menu-desc">Количество дней</p>
      <input type="number" v-model="days_count" v-bind="days_countAttrs" class="editing-menu-input">
      <p v-if="errors.days_count">{{ errors.days_count }}</p>
      <p class="editing-menu-desc">Количество человек</p>
      <input type="number" v-model="peoples_count" v-bind="peoples_countAttrs" class="editing-menu-input">
      <p v-if="errors.peoples_count">{{ errors.peoples_count }}</p>
      <p class="editing-menu-desc">Цена</p>
      <input type="number" v-model="price" v-bind="priceAttrs" class="editing-menu-input">
      <p v-if="errors.price">{{ errors.price }}</p>
      <button class="tour-card-route-link" @click="store.dispatch('createTour', reqData)">Создать</button>
    </div>

    <div class="tours-page-content-second-section">
      <div class="tours-page-tour-list">
        <TourCard v-for="tour in tours" :key="tour.id" :tour="tour"></TourCard>
      </div>
      <div class="tours-page-side-bar">
        <div class="side-bar-item">
          <p class="side-bar-desc">Сортиовать</p>
          <select class='side-bar-select' name="sort" id="sort" v-model="sortConfig.sortPattern" @change="store.commit('sortTours', sortConfig)">
            <option value="null">все</option>
            <option value="low">дешевле</option>
            <option value="hight">дороже</option>
          </select>
        </div>
        <div class="side-bar-item" v-if="(token !== null ||  token !== undefined) && (userRole === `admin`) && (userRole !== null) ">
          <p class="side-bar-desc">Новый тур</p>
          <button class="side-bar-button" @click="switchCreatingMode()">Создать</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

.inputs-bar-button {
  padding: 12px 42px;
  background: #131313;
  color: white;
  font-size: 32px;
  border-radius: 25px;
  border: 1px solid white;
}

.inputs-bar-button:hover {
  border: 1px solid black;
  background: white;
  color: #131313;
  transition: .3s all;
}

.editing-menu-desc {
  font-size: 24px;
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

.editing-menu-input {
  padding: 8px 70px;
  border-radius: 15px;
  font-size: 24px;
  width: 100%;
  text-align: left;
}

.creating-menu {
  border: 1px solid black;
  padding: 25px 40px;
  border-radius: 25px;
  display: flex;
  flex-direction: column;
  gap: 5px;
}

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
  display: flex;
  gap: 5px;
}

.inputs-bar-input:first-child {
  border-bottom-left-radius: 15px;
  border-top-left-radius: 15px;
}

.inputs-bar-input:last-child {
  border-bottom-right-radius: 15px;
  border-top-right-radius: 15px;
}

.inputs-bar > input {
  font-size: 24px;
  border: none;
  padding: 8px 20px;
  height: 43px;
}

.inputs-bar > select {
  font-size: 24px;
  border: none;
  padding: 8px 20px;
  height: 43px;
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