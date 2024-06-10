<script setup>
import {ref} from "vue";
import { useStore } from 'vuex'

const store = useStore()

let sortConfig = ref({
  country: null,
  starting_date: null,
  days_count: null,
  peoples_count: null,
  sortPattern: null,
})
</script>

<template>
<div class="banner">

  <div class="banner-menu">
    <h1 class="main-page-title">Бронируйте тур, собирайте вещи и наслаждайтесь</h1>
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

</div>

  <div class="feautures">
      <h2 class="feautures-title">Тысячи довольных клиентов, каждый месяц</h2>
    <div class="feautures-items">
      <div class="feauture-item">
        <img src="/src/assets/Map.png" alt="" class="feauture-item-image">
        <h3 class="feauture-item-title">Богатый выбор туров</h3>
        <p class="feauture-item-desc">Мы предлагаем широкий спектр туров, от классических до необычных и эксклюзивных, которые помогут вам открыть для себя новые горизонты.</p>
      </div>
      <div class="feauture-item">
        <img src="/src/assets/Support.png" alt="" class="feauture-item-image">
        <h3 class="feauture-item-title">Поддержка клиентов</h3>
        <p class="feauture-item-desc">Наш профессиональный и доброжелательный персонал всегда готов помочь вам в решении любых вопросов или проблем, которые могут возникнуть в процессе бронирования или во время путешествия.</p>
      </div>
      <div class="feauture-item">
        <img src="/src/assets/Place.png" alt="" class="feauture-item-image">
        <h3 class="feauture-item-title">Лучшие цены</h3>
        <p class="feauture-item-desc">Мы сотрудничаем с лучшими туроператорами и партнерами, чтобы предложить вам самые выгодные цены на туры, не жертвуя качеством обслуживания.</p>
      </div>
    </div>
  </div>

  <div class="populars">
    <h2 class="popular-title">Популярные направления</h2>
    <div class="popular-items">

      <div class="popular-item">
        <img src="/src/assets/Tourkish.jpg" alt="" class="popular-item-image">
        <h3 class="popular-item-title">Турция</h3>
        <p class="popular-item-desk">от 24000 ₽</p>
      </div>

      <div class="popular-item">
        <img src="/src/assets/Egipet.jpg" alt="" class="popular-item-image">
        <h3 class="popular-item-title">Египет</h3>
        <p class="popular-item-desk">от 35000 ₽</p>
      </div>

      <div class="popular-item">
        <img src="/src/assets/Dubai.jpg" alt="" class="popular-item-image">
        <h3 class="popular-item-title">Дубаи</h3>
        <p class="popular-item-desk">от 39000 ₽</p>
      </div>

      <div class="popular-item">
        <img src="/src/assets/Kipr.jpg" alt="" class="popular-item-image">
        <h3 class="popular-item-title">Кипр</h3>
        <p class="popular-item-desk">от 43000 ₽</p>
      </div>

      <div class="popular-item">
        <img src="/src/assets/Kuba.jpg" alt="" class="popular-item-image">
        <h3 class="popular-item-title">Куба</h3>
        <p class="popular-item-desk">от 55000 ₽</p>
      </div>
      <div class="popular-item">
        <img src="/src/assets/Taildand.jpg" alt="" class="popular-item-image">
        <h3 class="popular-item-title">Таиланд</h3>
        <p class="popular-item-desk">от 29000 ₽</p>
      </div>

      <div class="popular-item">
        <img src="/src/assets/Grece.jpg" alt="" class="popular-item-image">
        <h3 class="popular-item-title">Греция</h3>
        <p class="popular-item-desk">от 34000 ₽</p>
      </div>

      <div class="popular-item">
        <img src="/src/assets/Filliphines.jpeg" alt="" class="popular-item-image">
        <h3 class="popular-item-title">Филиппины</h3>
        <p class="popular-item-desk">от 51000 ₽</p>
      </div>

    </div>
  </div>
</template>

<style scoped>

.popular-items {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 150px;
}

.popular-item-image {
  width: 300px;
  height: 300px;
  border-radius: 30px;
  margin-bottom: 20px;
}

.popular-item-title {
  font-size: 32px;
  margin-bottom: 5px;
}

.popular-item-desk {
  font-size: 24px;
}

.feautures, .populars {
  padding: 120px 125px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 45px;
}

.feauture-item-image {
  max-height: 125px;
}

.feautures-title {
  font-size: 32px;
  font-weight: normal;
}

.popular-title {
  font-size: 32px;
  font-weight: normal;
}

.feautures-items {
  display: flex;
  justify-content: space-between;
  gap: 220px;
}

.feauture-item {
  gap: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.feauture-item-title {
  font-size: 32px;
}

.feauture-item-desc {
  font-size: 24px;
}

.banner {
  padding: 170px 125px;
  background: url("/src/assets/ContentBanner.jpg");
}

.banner-menu {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 50px;
  border-radius: 35px;
  padding: 35px 260px;
  background: rgba(0,0,0, 80%);
}

.main-page-title {
  color: white;
  font-size: 32px;
  font-weight: normal;
}

.sort-bar {
  display: flex;
  flex-direction: column;
  gap: 32px;
  align-items: center;
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

.inputs-bar-button {
  padding: 12px 42px;
  background: #131313;
  color: white;
  font-size: 32px;
  border-radius: 25px;
  border: 1px solid rgba(255,255,255, 0.5);

}

.inputs-bar-button:hover {
  border: 1px solid black;
  background: white;
  color: #131313;
  transition: .3s all;
}
</style>