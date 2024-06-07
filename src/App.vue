<script setup>
import Header from './components/AppHeader.vue'
import Footer from './components/AppFooter.vue'
import {useStore} from "vuex";
import {computed, onMounted, ref} from "vue";

const store = useStore()
const cfg = computed(() => store.getters.config)
const url = computed(() => store.getters.url)
const token = computed(() => store.getters.userToken)

const reqData = ref({url: url, cfg: cfg})

onMounted(async () => {
  store.dispatch('fetchTours', reqData)
  store.dispatch('getUserToken')
})
</script>

<template>
  <Header></Header>
  <RouterView></RouterView>
  <Footer></Footer>
</template>

<style scoped>

</style>
