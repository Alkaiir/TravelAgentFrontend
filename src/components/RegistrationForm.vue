<script setup>
import { useStore } from 'vuex'
import {computed, ref} from 'vue'

const store = useStore()
const userData = ref({
  name: null,
  surname: null,
  patronymic: null,
  date_of_birth: null,
  country: null,
  email: null,
  phone: null,
})
const url = computed(() => store.getters.url)

const reqData = ref({userData: userData, url: url})

</script>

<template>
  <form class="registration-form-content" onsubmit="return false">
    <h2 class="registration-form-title">Регистрация</h2>
    <input type="text" class="registration-form-input" v-model="userData.name" placeholder="Имя">
    <input type="text" class="registration-form-input" v-model="userData.surname" placeholder="Фамилия">
    <input type="text" class="registration-form-input" v-model="userData.patronymic" placeholder="Отчество">
    <input type="date" class="registration-form-input" v-model="userData.date_of_birth">
    <input type="text" class="registration-form-input" v-model="userData.country" placeholder="Страна">
    <input type="email" class="registration-form-input" v-model="userData.email" placeholder="Эл. адрес">
    <input type="tel" class="registration-form-input" v-model="userData.phone" placeholder="Номер телефона">
    <input type="password" class="registration-form-input" v-model="userData.password" placeholder="Пароль">
    <button class="registration-form-button" @click="store.dispatch('registration', reqData)">Войти</button>
  </form>
</template>

<style scoped>
.registration-form-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 25px;
  max-width: 475px;
}

.registration-form-title {
  font-size: 32px;
}

.registration-form-input {
  width: 100%;
  min-width: 250px;
  border-radius: 25px;
  border: 1px solid black;
  padding: 17px 20px;
  font-size: 24px;
}

.registration-form-button {
  width: 100%;
  min-width: 250px;
  font-size: 32px;
  color: white;
  background: #131313;
  border-radius: 25px;
  padding: 12px 0;
  cursor: pointer;
  border: 1px solid white;
}

.registration-form-button:hover {
  background: white;
  color: #131313;
  border: 1px solid #131313;
  transition: .5s all;
}
</style>