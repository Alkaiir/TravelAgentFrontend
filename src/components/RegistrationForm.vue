<script setup>
import { useStore } from 'vuex'
import {computed, ref} from 'vue'
import { useForm } from 'vee-validate'
import * as yup from 'yup'

const cfg = computed(()=> store.getters.config)

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
    date_of_birth: yup.date().required(),
    country: yup.string().required(),
    email: yup.string().email().required(),
    phone: yup.string().required().min(11).max(11).test('Численный номер', (value) => +value > 0),
    passport_series: yup.string().required().min(4).max(4),
    passport_number: yup.string().required().min(6).max(6),
    password: yup.string().required().min(6),
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

const [passport_series, passport_seriesAttrs] = defineField('passport_series', {
  validateOnModelUpdate: false,
});

const [passport_number, passport_numberAttrs] = defineField('passport_number', {
  validateOnModelUpdate: false,
});

const [password, passwordAttrs] = defineField('password', {
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
  telephone_number: phone,
  passport_series: passport_series,
  passport_number: passport_number,
  password: password,
})

const reqData = ref({userData: userData, cfg: cfg})
</script>

<template>
  <form class="registration-form-content" onsubmit="return false">
    <h2 class="registration-form-title">Регистрация</h2>
    <input type="text" class="registration-form-input" v-model="name" v-bind="nameAttrs" placeholder="Имя">
    <p v-if="errors.name">{{ errors.name }}</p>
    <input type="text" class="registration-form-input" v-model="surname" v-bind="surnameAttrs" placeholder="Фамилия">
    <p v-if="errors.surname">{{ errors.surname }}</p>
    <input type="text" class="registration-form-input" v-model="patronymic" v-bind="patronymicAttrs" placeholder="Отчество">
    <p v-if="errors.patronymic">{{ errors.patronymic }}</p>
    <input type="date" class="registration-form-input" v-model="date_of_birth" v-bind="date_of_birthAttrs">
    <p v-if="errors.date_of_birth">{{ errors.date_of_birth }}</p>
    <input type="text" class="registration-form-input" v-model="country" v-bind="countryAttrs" placeholder="Страна">
    <p v-if="errors.country">{{ errors.country }}</p>
    <input type="email" class="registration-form-input" v-model="email" v-bind="emailAttrs" placeholder="Эл. адрес">
    <p v-if="errors.email">{{ errors.email }}</p>
    <input type="tel" class="registration-form-input" v-model="phone" v-bind="phoneAttrs" placeholder="Номер телефона">
    <p v-if="errors.phone">{{ errors.phone }}</p>
    <p class="passport-input"><input type="tel" class="registration-form-input passport-series" v-model="passport_series" v-bind="passport_seriesAttrs" placeholder="Серия">
      <input type="tel" class="registration-form-input passport-number" v-model="passport_number" v-bind="passport_numberAttrs" placeholder="Номер"></p>
    <p v-if="errors.passport_series">{{ errors.passport_series }}</p>
    <p v-if="errors.passport_number">{{ errors.passport_number }}</p>
    <input type="password" class="registration-form-input" v-model="password" v-bind="passwordAttrs" placeholder="Пароль">
    <p v-if="errors.password">{{ errors.password }}</p>
    <button class="registration-form-button" @click="store.dispatch('registration', reqData)" :disabled="!(Object.keys(errors).length === 0) || (Object.keys(userData).length < 9)">Зарегистрироваться</button>
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

.registration-form-button:disabled {
  background: grey;
  color: #131313;
}

.registration-form-button:hover:disabled {
  background: grey;
  color: black;
  border: 1px solid white;
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
