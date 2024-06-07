import {createStore, mapActions, mapGetters, useStore} from 'vuex'
import axios from "axios";
import router from "../router/router.js";


export default createStore({
    state: {
        user_token: null,
        url: 'http://kursach.test/api/',
        tours: [],
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
            return state.tours
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
        }
    },
    actions: {
        async fetchTours (ctx, reqData){
            const data = await axios.get(reqData.value.url + 'tours')
                .then(function (response) {
                    const tours = response.data.data
                    ctx.commit('updateTours', tours)
                })
                .catch(error => {
                    console.log(error)
                })


        },

        async fetchUser (ctx, reqData) {

            const data = await axios.get(reqData.url + 'user', reqData.cfg)
                .then(function (response) {
                    if (response.status === 200) {
                        ctx.commit('updateUserData', response.data)
                    }
                })
                .catch(error => {
                    console.log(error)
                })

        },

        getUserToken (ctx) {
            ctx.commit('getUserToken')
        },


       async registration (ctx, reqData){

            const data = await axios.post(reqData.url + 'register', reqData.userData)
                .then(function (response) {
                    alert('Вы успешно зарегистрировались')
                    ctx.commit('updateUserToken', response.data.token.split('|')[1])
                    document.cookie = encodeURIComponent('travel_user_token') + '=' + encodeURIComponent(response.data.token.split('|')[1])
                    router.push('/')
                })
                .catch(error =>{
                    console.log(error)
                })

        },

        async login (ctx, reqData) {

            const data = await axios.post(reqData.url + 'login', reqData.userData)
                .then(function (response) {
                    if (response.data.message === 'Login Successful') {
                        alert('Вы успешно авторизировались')
                        ctx.commit('updateUserToken', response.data.token.split('|')[1])
                        document.cookie = encodeURIComponent('travel_user_token') + '=' + encodeURIComponent(response.data.token.split('|')[1])
                        router.push('/')
                    }
                })
                .catch(error => {
                    console.log(error)
                })
            this.dispatch('fetchUser', reqData)
        },

        async logout (ctx, cfg) {

            const data = await axios.post('http://kursach.test/api/' + 'logout', null, cfg)
                .then(function (response) {
                    if (response.data.message === 'Logout Successful') {
                        alert('Вы успешно вышли')
                        ctx.commit('updateUserToken', null)
                        ctx.commit('updateUserData', null)
                        document.cookie = 'travel_user_token' + '=; Max-Age=-99999999;';
                        router.push('/login')
                    }
                })
                .catch(error => {
                    console.log(error)
                })
        },

    }
})