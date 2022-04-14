<template>
    <div class="w-full">
        <div class="flex flex-col md:px-32 px-6 pt-12">
            <div class="mb-5">
                <router-link to='/' class="rounded bg-gray-200 py-1 px-4">Back</router-link>
            </div>
            <div class="font-bold text-3xl">
                {{user.firstName}}'s recipes
            </div>
            <div class="inline py-8">
                <router-link class="px-4 bg-red-300 font-bold text-red-900 py-1 rounded" to="/recipes/add">New recipe</router-link>
            </div>
            <div v-if="isLoading" class="flex justify-center">
                <h4>Loading your recipes...</h4>
            </div>
            <div v-if="!isLoading">
                <listrecipes :recipes="recipes"/>
            </div>
        </div>
    </div>
</template>
<script>
import listrecipes from '../components/recipes/list.vue'
import { getMyRecipes } from '../constants/recipe'
export default {
    name:'profile',
    components:{
        listrecipes
    },
    data() {
        return {
            logged: localStorage.getItem('user') == null ? false : true,
            user : {},
            recipes: [],
            isLoading:true
        }
    },
    methods: {
        async getRecipes() {
            const res = await getMyRecipes()
            if(res.status){
                this.recipes = res.recipes
                this.isLoading = false
            }else{
                this.$router.push('/login')
            }
        },
        
        
    },
    created() {
        this.getRecipes()
    },
    async mounted() {
        var user = JSON.parse(localStorage.getItem('user'))
        this.user = user
    },
}
</script>