<script setup>
import router from "../router/router.js";
import { useStore } from 'vuex'
import {computed} from "vue";

const store = useStore()
const token = computed(() => store.getters.userToken)
const cfg = computed(() => store.getters.config)
const userRole = computed(() => store.getters.userRole)

</script>

<template>
<div class="header-content">
  <img @click="router.push('/')" src="/src/assets/Logo.png" alt="Logo">
  <nav class="nav-links">
    <router-link v-if="(token !== null ||  token !== undefined) && (userRole === `admin`) && (userRole !== null) " class="nav-link" to="/tours">Брони</router-link>
    <router-link class="nav-link" to="/tours" >Все туры</router-link>
    <router-link v-if="token === null ||  token === undefined" class="nav-link" to="/registration" >Регистрация</router-link>
    <router-link v-if="token === null ||  token === undefined" class="nav-link" to="/login">Войти</router-link>
    <router-link class="nav-link nav-link-image"
       v-if="token !== null && token !== undefined" to="/profile"><img src="../assets/Profile.png" alt="Logout Button"></router-link>
    <a class="nav-link nav-link-image"
       v-if="token !== null && token !== undefined"
       @click="store.dispatch('logout', cfg)"><img src="../assets/Logout.png" alt="Logout Button"></a>
  </nav>
</div>
</template>

<style scoped>
.header-content {
  background: #131313;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 32px 125px 24px 125px;
}

.nav-links {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
}

.nav-link {
  padding: 12px 42px;
  border: 1px solid rgba(255,255,255, 0.5);
  border-radius: 40px;
  color: white;
  text-decoration: none;
  font-size: 32px;
}

.nav-link:hover {
  color: #131313;
  cursor: pointer;
  background: white;
  transition: .4s all;
}

.nav-link-image {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 12px;
  border-radius: 40px;
  width: 60px;
  height: 60px;
}

.nav-link-image:hover img {
  filter: invert(100);
}
</style>