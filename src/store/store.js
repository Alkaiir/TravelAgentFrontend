import {createStore, mapActions, mapGetters, useStore} from 'vuex'
import axios from "axios";
import router from "../router/router.js";


export default createStore({
    state: {
        user_token: null,
        url: 'http://kursach.test/api/',
        tours: [],
        all_bookings: [],
        sorted_tours: [],
        user_data: null,
    },
    getters: {
        config (state) {
            return {headers: {"Authorization": 'Bearer '  + state.user_token}}
        },

        url (state) {
            return state.url
        },

        allTours (state) {
            return state.sorted_tours
        },

        userToken (state) {
            return state.user_token
        },

        userRole (state) {
            try {
                if (state.user_data.role !== null) {
                    return state.user_data.role
                } else {
                    return null
                }
            } catch (err) {
                return null
            }
        },

        userData (state) {
            return state.user_data
        },

        allBookings (state) {
            return state.all_bookings
        }
    },
    mutations: {
        updateTours (state, tours) {
            state.tours = tours
        },

        updateAllBookings (state, all_bookings) {
            state.all_bookings = all_bookings
        },

        sortTours (state, sort_cfg = {}) {
            if (Object.keys(sort_cfg).length === 0) {
                state.sorted_tours = state.tours
            } else {
                state.sorted_tours = state.tours
                if (sort_cfg.hasOwnProperty('country') && sort_cfg.country !== null){
                    let temp_tours = []
                    state.sorted_tours.forEach((tour) => {
                        if(tour.country === sort_cfg.country) {
                            temp_tours.push(tour)
                        }
                    })
                    state.sorted_tours = temp_tours
                }
                if (sort_cfg.hasOwnProperty('starting_date') && sort_cfg.starting_date !== null && sort_cfg.starting_date !== ''){
                    let temp_tours = []
                    state.sorted_tours.forEach((tour) => {
                        if(tour.starting_date === sort_cfg.starting_date) {
                            temp_tours.push(tour)
                        }
                    })
                    state.sorted_tours = temp_tours
                }
                if (sort_cfg.hasOwnProperty('days_count') && sort_cfg.days_count !== null && sort_cfg.days_count !== ''){
                    let temp_tours = []
                    state.sorted_tours.forEach((tour) => {
                        console.log(tour.days_count)
                        if(tour.days_count === +sort_cfg.days_count) {
                            temp_tours.push(tour)
                        }
                    })
                    state.sorted_tours = temp_tours
                }
                if (sort_cfg.hasOwnProperty('peoples_count') && sort_cfg.peoples_count !== null && sort_cfg.peoples_count !== ''){
                    let temp_tours = []
                    state.sorted_tours.forEach((tour) => {
                        console.log(tour.peoples_count)
                        if(tour.peoples_count === +sort_cfg.peoples_count) {
                            temp_tours.push(tour)
                        }
                    })
                    state.sorted_tours = temp_tours
                }
                if (sort_cfg.hasOwnProperty('sortPattern') && sort_cfg.sortPattern !== null && sort_cfg.sortPattern !== ''){
                    if (sort_cfg.sortPattern === 'low') {
                        state.sorted_tours = state.sorted_tours.sort((a, b) => parseFloat(a.price) - parseFloat(b.price))
                    } else if (sort_cfg.sortPattern === 'hight') {
                        state.sorted_tours = state.sorted_tours.sort((a, b) => parseFloat(b.price) - parseFloat(a.price))
                    }

                }
            }


        },

        getUserToken (state) {

            function getCookieValue(name)
            {
                const regex = new RegExp(`(^| )${name}=([^;]+)`)
                const match = document.cookie.match(regex)
                if (match) {
                    return match[2]
                }
            }

            state.user_token = getCookieValue('travel_user_token')
        },

        updateUserData (state, userData) {
            state.user_data = userData
        },

        updateUserToken (state, user_token) {
            state.user_token = user_token
        },

    },
    actions: {

        getUserToken ({commit, state}) {
            commit('getUserToken')
        },

        async fetchTours ({commit, state}){
            const data = await axios.get(state.url + 'tours')
                .then(function (response) {
                    const tours = response.data.data
                    commit('updateTours', tours)
                    commit('sortTours')
                })
                .catch(error => {
                    console.log(error)
                })
        },

        async fetchUser ({commit, state}, cfg) {

            const data = await axios.get(state.url + 'user', cfg)
                .then(function (response) {
                    if (response.status === 200) {
                        commit('updateUserData', response.data)
                    }
                })
                .catch(error => {
                    console.log(error)
                })

        },


       async registration ({commit, state}, reqData){

            const data = await axios.post(state.url + 'register', reqData.userData)
                .then(function (response) {
                    if (response.data.message === 'User has been registered'){
                        commit('updateUserToken', response.data.token.split('|')[1])
                        document.cookie = encodeURIComponent('travel_user_token') + '=' + encodeURIComponent(response.data.token.split('|')[1])
                        router.push('/')
                    }
                })
                .catch(error =>{
                    console.log(error)
                })
           this.dispatch('fetchUser', reqData.cfg)
        },

        async login ({commit, state}, reqData) {

            const data = await axios.post(state.url + 'login', reqData.userData)
                .then(function (response) {
                    if (response.data.message === 'Login Successful') {
                        commit('updateUserToken', response.data.token.split('|')[1])
                        document.cookie = encodeURIComponent('travel_user_token') + '=' + encodeURIComponent(response.data.token.split('|')[1])
                        router.push('/')
                    }
                })
                .catch(error => {
                    console.log(error)
                })
            this.dispatch('fetchUser', reqData)
        },

        async logout ({commit, state}, cfg) {

            const data = await axios.post(state.url + 'logout', null, cfg)
                .then(function (response) {
                    if (response.data.message === 'Logout Successful') {
                        commit('updateUserToken', null)
                        commit('updateUserData', null)
                        document.cookie = 'travel_user_token' + '=; Max-Age=-99999999;';
                        router.push('/login')
                    }
                })
                .catch(error => {
                    console.log(error)
                })
        },

        async deleteTour ({commit, state}, reqData) {

            const data = await axios.delete(state.url + 'tours/' + reqData.tour.id, reqData.cfg)
                .then(function (response) {
                    router.push('/tours')
                })
                .catch(error => {
                    console.log(error)
                })
            this.dispatch('fetchTours')
        },

        async updateTour ({commit, state}, reqData) {

            const data = await axios.put(state.url + 'tours/' + reqData.tour.id, reqData.tour ,reqData.cfg)
                .then(function (response) {
                    router.push('/tours')
                })
                .catch(error => {
                    console.log(error)
                })
            this.dispatch('fetchTours')
        },

        async createTour ({commit, state}, reqData) {

            const data = await axios.post(state.url + 'tour_create', reqData.tour ,reqData.cfg)
                .then(function (response) {
                    if (response.message === 'Tour was successfully created') {
                        router.push('/tours')
                    }
                })
                .catch(error => {
                    console.log(error)
                })
            this.dispatch('fetchTours')
        },

        async fetchBookings ({commit, state}, cfg) {
            const data = await axios.get(state.url + 'all_bookings', cfg)
                .then(function (response) {
                    const all_bookings = response.data.data
                    commit('updateAllBookings', all_bookings)
                })
                .catch(error => {
                    console.log(error)
                })
        },

        async createBooking ({commit, state}, reqData) {
            const data = await axios.post(state.url + 'booking_create', reqData.data, reqData.cfg)
                .then(function (response) {
                })
                .catch(error => {
                    console.log(error)
                })
        },

        async deleteBooking ({commit, state}, reqData) {
            const data = await axios.delete(state.url + 'bookings/' + reqData.id,  reqData.cfg)
                .then(function (response) {
                    router.push('/bookings')
                })
                .catch(error => {
                    console.log(error)
                })
            this.dispatch('fetchBookings', reqData.cfg)
        },

        async updateBookingStatus ({commit, state}, reqData) {
            const data = await axios.put(state.url + 'bookings/' + reqData.id + '/status', reqData.data, reqData.cfg)
                .then(function (response) {
                    router.push('/bookings')

                })
                .catch(error => {
                    console.log(error)
                })
            this.dispatch('fetchBookings', reqData.cfg)
        },

    }
})