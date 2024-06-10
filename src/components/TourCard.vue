<script setup>
import { useStore } from 'vuex'
import router from "../router/router.js";
import {computed, ref} from "vue";
import {useForm} from "vee-validate";
import * as yup from "yup";
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
    <input type="text" v-model="name" v-bind="nameAttrs" class="editing-menu-input">
    <p v-if="errors.name">{{ errors.name }}</p>
    <p class="editing-menu-desc">Страна</p>
    <input type="text" v-model="country" v-bind="countryAttrs" class="editing-menu-input">
    <p v-if="errors.country">{{ errors.country }}</p>
    <p class="editing-menu-desc">Описание</p>
    <input type="text" v-model="description" v-bind="descriptionAttrs" class="editing-menu-input">
    <p v-if="errors.description">{{ errors.description }}</p>
    <p class="editing-menu-desc">Дата отправления</p>
    <input type="date" v-model="starting_date" v-bind="descriptionAttrs" class="editing-menu-input">
    <p v-if="errors.starting_date">{{ errors.starting_date }}</p>
    <p class="editing-menu-desc">Количество дней</p>
    <input type="number" v-model="days_count" v-bind="descriptionAttrs" class="editing-menu-input">
    <p v-if="errors.days_count">{{ errors.days_count }}</p>
    <p class="editing-menu-desc">Количество человек</p>
    <input type="number" v-model="peoples_count" v-bind="descriptionAttrs" class="editing-menu-input">
    <p v-if="errors.peoples_count">{{ errors.peoples_count }}</p>
    <p class="editing-menu-desc">Цена</p>
    <input type="number" v-model="price" v-bind="priceAttrs" class="editing-menu-input">
    <p v-if="errors.price">{{ errors.price }}</p>
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