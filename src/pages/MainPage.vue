<script setup>
import {computed, onBeforeUpdate, onMounted, ref} from "vue";
import { useStore } from 'vuex'

const store = useStore()
const cfg = computed(() => store.getters.config)
const url = computed(() => store.getters.url)
const token = computed(() => store.getters.userToken)

const reqData = ref({url: url, cfg: cfg})

onMounted(async () => {
  store.dispatch('fetchTours', reqData) // перенести в app.vue
  store.dispatch('getUserToken') // перенести в app.vue
  store.dispatch('fetchUser', reqData)
})
</script>

<template>
<div>
123
</div>
</template>

<style scoped>

</style>