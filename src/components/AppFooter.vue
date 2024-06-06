<script setup>

import router from "../router/router.js";
</script>

<template>
<div class="footer-content">
  <div class="footer-contacts">
    <img src="/src/assets/Logo.png" alt="Footer Logo">
    <div class="footer-contacts-items">
      <p class="footer-contacts-item">+79528888945</p>
      <p class="footer-contacts-item">tuda.obratno@tur.ru</p>
      <p class="footer-contacts-item">г.Москва, ул. Пушкина 24</p>
    </div>
    <p class="footer-contacts-copy">© 2012–2024 OOO «ТудаОбратно»</p>
  </div>
  <div class="footer-links">
    <p class="footer-links-title">Популярные направления</p>
    <div class="footer-links-columns">
      <div class="footer-links-items">
        <div class="footer-links-item">Турция</div>
        <div class="footer-links-item">Египет</div>
        <div class="footer-links-item">Дубаи</div>
        <div class="footer-links-item">Кипр</div>
      </div>
      <div class="footer-links-items">
        <div class="footer-links-item">Филиппины</div>
        <div class="footer-links-item">Куба</div>
        <div class="footer-links-item">Таиланд</div>
        <div class="footer-links-item">Греция</div>
      </div>
    </div>
  </div>
  <div class="footer-media">
    <img src="../assets/Vkontakte.png" alt="Vkontakte Link" class="footer-media-link">
    <img src="../assets/Telegram.png" alt="Telegram Link" class="footer-media-link">
    <img src="../assets/Whatsapp.png" alt="Whatsapp Link" class="footer-media-link">
  </div>
</div>
</template>

<style scoped>
.footer-content {
  padding: 95px 125px;
  background: #131313;
  display: flex;
  justify-content: space-between;
}

.footer-contacts {
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  gap: 32px;
}

.footer-contacts-items{
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
}

.footer-contacts-item{
  font-size: 24px;
}

.footer-contacts-copy {
  font-size: 24px;
}

.footer-links {
  display: flex;
  flex-direction: column;
  gap: 17px;
  align-items: flex-start;
  color: white;
}

.footer-links-title {
  font-size: 32px;
}

.footer-links-columns {
  display: flex;
  gap: 60px;
}

.footer-links-items {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.footer-links-item {
  font-size: 24px;
}

.footer-media {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 50px;
}

.footer-media-link{
  cursor: pointer;
}
</style>