<script setup>
import { useStore } from 'vuex'
import {computed} from 'vue'

const store = useStore()
const userData = computed(() => store.getters.userData)
</script>

<template>

</template>

<style scoped>

</style>