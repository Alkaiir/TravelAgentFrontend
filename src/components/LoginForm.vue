<script setup>
import { useStore } from 'vuex'
import {computed, ref} from 'vue'
import * as yup from 'yup'
import { useForm } from 'vee-validate'

const store = useStore()
const cfg = computed(()=> store.getters.config)


const { values, errors, defineField } = useForm({
  validationSchema: yup.object({
    email: yup.string().email().required(),
    password: yup.string().required(),
  }),
});

const [email, emailAttrs] = defineField('email', {
  validateOnModelUpdate: false,
});

const [password, passwordAttrs] = defineField('password', {
  validateOnModelUpdate: false,
});

const userData = ref({email: email, password: password})
const reqData = ref({userData: userData, cfg: cfg})
</script>

<template>
  <form class="login-form-content" onsubmit="return false">
    <h2 class="login-form-title">Авторизация</h2>
    <input type="text" class="login-form-input" v-model="email" v-bind="emailAttrs" placeholder="Эл. адрес">
    <p v-if="errors.email">{{ errors.email }}</p>
    <input type="password" class="login-form-input" v-model="password" v-bind="passwordAttrs" placeholder="Пароль">
    <p v-if="errors.password">{{ errors.password }}</p>
    <button class="login-form-button" @click="store.dispatch('login', reqData);">Войти</button>
  </form>
</template>

<style scoped>
.login-form-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 25px;
  min-width: 475px;
}

.login-form-title {
  font-size: 32px;
}

.login-form-input {
  width: 100%;
  min-width: 250px;
  border-radius: 25px;
  border: 1px solid black;
  padding: 17px 20px;
  font-size: 24px;
}

.login-form-button {
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

.login-form-button:hover {
  background: white;
  color: #131313;
  border: 1px solid #131313;
  transition: .5s all;
}
</style>