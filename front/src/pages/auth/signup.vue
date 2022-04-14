<template>
    <div class="w-screen flex md:justify-center">
        <form class="bg-white w-full mt-20 md:w-1/3 shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div class="flex justify-center">
                <img height="180" width="180" src="InterRecipesCropped.png" alt="" srcset="">
            </div>
            <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
                    Name 
                </label>
                <input v-model="name" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Name...">
            </div>
            <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
                    Last Name
                </label>
                <input v-model="lastname" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Last name...">
            </div>
            <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
                    Username
                </label>
                <input v-model="username" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Username">
            </div>
            <div class="mb-6">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
                    Password
                </label>
                <input v-model="password" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="******************">
            </div>
            <div class="flex items-center justify-between">
                <button @click="signIn" class="bg-red-600 rounded-full w-full  text-white font-bold py-2 px-4 focus:outline-none focus:shadow-outline" type="button">
                    Sign Up
                </button>
            </div>
        </form>
    </div>
</template>
<script>
import {signup} from '../../constants/api'
export default {
    data() {
        return {
            name:null,
            lastname:null,
            username:null,
            password:null
        }
    },
    methods: {
        async signIn(){
            const form = {
                "firstName":this.name,
                "lastName":this.lastname,
                "username":this.username,
                "password":this.password
            }

            const data = await signup(form)

            if(data.status){
                localStorage.setItem('user', JSON.stringify(data.user))
                localStorage.setItem('token', data.token)
                this.$router.push('/')
            }else{
                console.log('Something is wrong')
            }
        }
    },
}
</script>