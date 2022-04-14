<template>
    <div class="w-full">
        <div class="w-full flex md:px-16 px-10 pt-5 pb-5 md:pb-0 flex-col md:flex-row md:justify-between md:items-center">
            <div class="flex flex-row items-center">
                <img height="120" width="120" src="InterRecipesCropped.png" alt="" srcset="">
                <div class="pl-10" v-if="logged">
                    <router-link to="/profile" class="font-semibold text-red-600">My recipes</router-link>
                </div>
            </div>
            <div class="flex flex-col md:flex-row">
                <div v-show="!logged">
                    <router-link class="py-1 text-white px-6 bg-red-600 rounded-full " to="/signup">Sign up</router-link>
                    <router-link class="py-1 text-white px-6 ml-4 bg-red-600 rounded-full " to="/login">Log in</router-link>
                </div>
                <div class="flex flex-row" v-if="logged">
                    
                    <div class="flex flex-col">
                        <div>
                            {{user.username}}
                        </div>
                        <div>
                            {{user.firstName}}
                            {{user.lastName}}
                        </div>    
                    </div>
                    <div class="flex items-center px-5">
                        <button @click="closeSession" class="bg-red-600 py-1 px-4 rounded text-white">Log out</button>
                    </div>
                </div>
            </div> 
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                logged: localStorage.getItem('user') == null ? false : true,
                user : {} 
            }
        },
        methods: {
            closeSession(){
                localStorage.removeItem('user')
                localStorage.removeItem('token')
                this.logged = false
                this.user = {}
            }
        },
        mounted() {
            var user = JSON.parse(localStorage.getItem('user'))
            this.user = user
        },
    }
</script>