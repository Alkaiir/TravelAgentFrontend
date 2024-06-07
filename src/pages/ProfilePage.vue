<script setup>
import { useStore } from 'vuex'
import {computed} from 'vue'

const store = useStore()
const userData = computed(() => store.getters.userData)
</script>

<template>
<div class="profile-page-content">
  <h2 class="profile-page-title">Личный кабинет</h2>
  <div class="profile-page-user">
    <div class="profile-page-user-info">
      <p class="profile-page-user-info-item" v-if="userData !== null">{{ userData.name + ' ' +  userData.surname + ' ' + userData.patronymic }}</p>
      <p class="profile-page-user-info-item" v-if="userData !== null">{{ userData.email }}</p>
      <p class="profile-page-user-info-item" v-if="userData !== null">{{ userData.date_of_birth }}</p>
      <p class="profile-page-user-info-item" v-if="userData !== null">{{ userData.country }}</p>
      <p class="profile-page-user-info-item" v-if="userData !== null">{{ userData.telephone_number }}</p>
      <p class="profile-page-user-info-item" v-if="userData !== null">Пасспортные данные:</p>
      <p class="profile-page-user-info-item" v-if="userData !== null">{{ userData.passport_series + ' ' + userData.passport_number }}</p>
    </div>
    <img src="/src/assets/UserPhoto.png" alt="User Photo" class="profile-page-user-info-image">
  </div>
</div>
</template>

<style scoped>
.profile-page-content {
  padding: 120px 125px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 60px;
}

.profile-page-title {
  font-size: 64px;
}

.profile-page-user {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.profile-page-user-info {
  display: flex;
  flex-direction: column;
  gap: 25px;
  align-items: flex-start;
}

.profile-page-user-info-item {
  font-size: 48px;
}

.profile-page-user-info-image {
  max-width: 600px;
}
</style>