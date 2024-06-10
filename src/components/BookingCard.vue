<script setup>
import { useStore } from 'vuex'
import {computed, ref} from "vue";
import router from "../router/router.js";
const store = useStore()

const cfg = computed(()=> store.getters.config)

const props = defineProps(['booking'])

let booking = props.booking

let editingMode = ref(false)

const status = computed(() => {
  if (booking.status === "Waiting.") {
    return 'В ожидании'
  } else if (booking.status === "Your application has been rejected.") {
    return 'Отклонена'
  } else if (booking.status === "Your application has been approved.") {
    return 'Одобрена'
  }
})

function switchEditingMode () {
  if (this.editingMode === false) {
    this.editingMode = true
  } else {
    this.editingMode = false
  }
}
let updatedStatus = ref(null)
let reqData = ref({cfg: cfg, id: booking.id, data: {status: updatedStatus}})
</script>

<template>
<div class="booking-card-content">
  <p class="booking-desc">{{ booking.tour }}</p>
  <p class="booking-desc">{{ booking.user }}</p>
  <div class="booking-buttons">
    <button class="booking-card-admin-button" @click="store.dispatch('deleteBooking', reqData)"><img src="/src/assets/Delete.png" alt="Delete Icon"></button>
    <button class="booking-card-admin-button" @click="switchEditingMode()" ><img src="/src/assets/Edit.png" alt="Edit Icon"></button>
    <button class="booking-card-status" >{{ status }}</button>
  </div>
</div>
  <div class="booking-card-content" v-if="editingMode">
      <p class="editing-label">Статус</p>
      <div class="editing-buttons">
        <button class="booking-save-button" @click="store.dispatch('updateBookingStatus', reqData)">Сохранить</button>
        <select class="editing-select" name="status" id="status" v-model="updatedStatus">
          <option value="ожидание">Ожидание</option>
          <option value="одобрена">Одобрена</option>
          <option value="отклонена">Отклонена</option>
        </select>
      </div>
  </div>

</template>

<style scoped>

.editing-buttons {
  display: flex;
  align-items: center;
}

.booking-save-button {
  border-radius: 25px;
  background: #131313;
  color: white;
  font-size: 32px;
  padding: 15px 70px;
  border: 1px solid white;
}

.booking-save-button:hover {
  background: white;
  color: #131313;
  border: 1px solid black;
  transition: .4s all;
}

.editing-label {
  font-size: 36px;
}

.editing-select {
  border-radius: 25px;
  background: #131313;
  color: white;
  font-size: 32px;
  padding: 15px 70px;
}

.booking-card-content {
  padding: 95px 40px;
  border-radius: 25px;
  border: 1px solid black;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.booking-card-admin-button {
  width: 61px;
  height: 61px;
  border-radius: 25px;
  border: 1px solid white;
  background: #131313;
  display: flex;
  align-items: center;
  justify-content: center;
}

.booking-card-admin-button:hover {
  cursor: pointer;
  background: white;
  border-color: #131313;
  transition: .4s all;
}

.booking-card-status {
  padding: 15px 70px;
  border-radius: 25px;
  border: 1px solid white;
  background: #131313;
  color: white;
  text-align: center;
  font-size: 32px;
}

.booking-desc {
  font-size: 36px;
}

.booking-buttons {
  display: flex;
  gap: 25px;
  align-items: center;
  justify-content: center;
}

.booking-card-admin-button:hover > img {
  filter: invert(100);
}

</style>