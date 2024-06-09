<script setup>
import Header from './components/AppHeader.vue'
import Footer from './components/AppFooter.vue'
import {useStore} from "vuex";
import {computed, onMounted, ref} from "vue";

const store = useStore()
const cfg = computed(() => store.getters.config)
const token = computed(() => store.getters.userToken)

onMounted(async () => {
  store.dispatch('fetchTours')
  store.dispatch('getUserToken')

  if (token.value !== null && token.value !== undefined) {
    store.dispatch('fetchUser', cfg.value)
  }
})
</script>

<template>
  <Header></Header>
  <RouterView></RouterView>
  <Footer></Footer>
</template>

<style scoped>

</style>
