<script setup>
import { useStore } from 'vuex'
import {computed, ref} from 'vue'
import { useForm } from 'vee-validate'
import * as yup from 'yup'

const age = computed(() => {
  const date = new Date()
  const year = date.getFullYear() - 18
  let month = date.getMonth() + 1
  let day = date.getDate()

  if (month < 10) {
    month =  '0' + month
  }

  if (day < 10) {
    day =  '0' + day
  }

  return year + '-' + month + '-' + day
});

const { values, errors, defineField } = useForm({
  validationSchema: yup.object({
    name: yup.string().required(),
    surname: yup.string().required(),
    patronymic: yup.string().required(),
    date_of_birth: yup.date().required().test('Больше 18 лет', (value) => value <= age), //fix
    country: yup.string().required(),
    email: yup.string().email().required(),
    phone: yup.string().required().min(11).max(11),

  }),
});

const [name, nameAttrs] = defineField('name', {
  validateOnModelUpdate: false,
});

const [surname, surnameAttrs] = defineField('surname', {
  validateOnModelUpdate: false,
});

const [patronymic, patronymicAttrs] = defineField('patronymic', {
  validateOnModelUpdate: false,
});

const [date_of_birth, date_of_birthAttrs] = defineField('date_of_birth', {
  validateOnModelUpdate: false,
});

const [country, countryAttrs] = defineField('country', {
  validateOnModelUpdate: false,
});

const [email, emailAttrs] = defineField('email', {
  validateOnModelUpdate: false,
});

const [phone, phoneAttrs] = defineField('phone', {
  validateOnModelUpdate: false,
});


const store = useStore()
const userData = ref({
  name: name,
  surname: surname,
  patronymic: patronymic,
  date_of_birth: date_of_birth,
  country: country,
  email: email,
  phone: phone,
  passport_series: null,
  passport_number: null,
  password: null,
  repeat_password: null,
})
const url = computed(() => store.getters.url)

const reqData = ref({userData: userData, url: url})

</script>

<template>
  <form class="registration-form-content" onsubmit="return false">
    <h2 class="registration-form-title">Регистрация</h2>
    <h2 class="registration-form-title">{{ age }}</h2>
    <input type="text" class="registration-form-input" v-model="name" v-bind="nameAttrs" placeholder="Имя">
    <p v-if="errors.name">{{ errors.name }}</p>
    <input type="text" class="registration-form-input" v-model="surname" v-bind="surnameAttrs" placeholder="Фамилия">
    <p v-if="errors.surname">{{ errors.surname }}</p>
    <input type="text" class="registration-form-input" v-model="patronymic" v-bind="patronymicAttrs" placeholder="Отчество">
    <p v-if="errors.patronymic">{{ errors.patronymic }}</p>
    <input type="date" class="registration-form-input" v-model="date_of_birth" v-bind="date_of_birthAttrs">
    <p v-if="errors.date_of_birth">{{ errors.date_of_birth }}</p>
    <p>{{ date_of_birth }}</p>
    <input type="text" class="registration-form-input" v-model="country" v-bind="countryAttrs" placeholder="Страна">
    <p v-if="errors.country">{{ errors.country }}</p>
    <input type="email" class="registration-form-input" v-model="email" v-bind="emailAttrs" placeholder="Эл. адрес">
    <p v-if="errors.email">{{ errors.email }}</p>
    <input type="tel" class="registration-form-input" v-model="phone" v-bind="phoneAttrs" placeholder="Номер телефона">
    <p v-if="errors.phone">{{ errors.phone }}</p>
    <p class="passport-input"><input type="tel" class="registration-form-input passport-series" v-model="userData.passport_series" v-bind="countryAttrs" placeholder="Серия">
      <input type="tel" class="registration-form-input passport-number" v-model="userData.passport_number" v-bind="countryAttrs" placeholder="Номер"></p>
    <p v-if="errors.country">{{ errors.country }}</p>
    <p v-if="errors.country">{{ errors.country }}</p>
    <input type="password" class="registration-form-input" v-model="userData.password" v-bind="countryAttrs" placeholder="Пароль">
    <input type="password" class="registration-form-input" v-model="userData.repeat_password" v-bind="countryAttrs" placeholder="Повторите пароль">
    <button class="registration-form-button" @click="store.dispatch('registration', reqData)">Зарегистрироваться</button>
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

.passport-input {
  display: flex;
  justify-content: space-between;
  gap: 10px;
}

.passport-series {
  min-width: 200px;
  width: 100%;
  border-radius: 25px;
  border: 1px solid black;
  padding: 17px 20px;
  font-size: 24px;
}

.passport-number {
  min-width: 260px;
  width: 100%;
  border-radius: 25px;
  border: 1px solid black;
  padding: 17px 20px;
  font-size: 24px;
}
</style>
