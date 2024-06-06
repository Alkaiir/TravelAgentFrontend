<script setup>
import LoginForm from "../components/LoginForm.vue";
import ContentBanner from "../components/ContentBanner.vue";
</script>

<template>
<div class="login-page-content">
  <ContentBanner></ContentBanner>
  <LoginForm></LoginForm>
</div>
</template>

<style scoped>
.login-page-content {
  padding: 120px 125px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 30px;
}
</style>