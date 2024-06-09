import {createStore, mapActions, mapGetters, useStore} from 'vuex'
import axios from "axios";
import router from "../router/router.js";


export default createStore({
    state: {
        user_token: null,
        url: 'http://kursach.test/api/',
        tours: [],
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
        }
    },
    mutations: {
        updateTours (state, tours) {
            state.tours = tours
        },

        sortTours (state, sort_cfg = {}) {
            if (Object.keys(sort_cfg).length === 0) {
                state.sorted_tours = state.tours
            }

            // sortirovka
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
                        alert('Вы успешно зарегистрировались')
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
                        alert('Вы успешно авторизировались')
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
                        alert('Вы успешно вышли')
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


            const data = await axios.delete(state.url + 'tours/' + reqData.id, reqData.cfg)
                .then(function (response) {
                    router.push('/tours')
                })
                .catch(error => {
                    console.log(error)
                })
            this.dispatch('fetchTours')
        }

    }
})