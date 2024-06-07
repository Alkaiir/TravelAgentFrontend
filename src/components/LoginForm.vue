<script setup>
import { useStore } from 'vuex'
import {computed, ref} from 'vue'

const store = useStore()
const userData = ref({email: null, password: null})
const url = computed(() => store.getters.url)
const cfg = computed(()=> store.getters.config)

const reqData = ref({userData: userData, url: url, cfg: cfg})

</script>

<template>
  <form class="login-form-content" onsubmit="return false">
    <h2 class="login-form-title">Авторизация</h2>
    <input type="text" class="login-form-input" v-model="userData.email" placeholder="Эл. адрес">
    <input type="password" class="login-form-input" v-model="userData.password" placeholder="Пароль">
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