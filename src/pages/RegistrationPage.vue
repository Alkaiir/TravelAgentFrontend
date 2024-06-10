<script setup>
import ContentBanner from "../components/ContentBanner.vue";
import RegistrationForm from "../components/RegistrationForm.vue";
</script>

<template>
<div class="registration-page-content">
  <ContentBanner></ContentBanner>
  <RegistrationForm></RegistrationForm>
</div>
</template>

<style scoped>
.registration-page-content {
  padding: 120px 125px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 30px;
}
</style>