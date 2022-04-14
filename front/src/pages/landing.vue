<template>
        <div class="w-full">
            <Navbar/>
            <Banner/>
            <div class="px-8 md:px-16">
                <div class="flex flex-row mt-10 justify-between">
                    <h4 class="font-bold text-2xl">Explore recipes</h4>
                    <router-link to="/recipes/all" class="rounded-full px-6 py-1 text-white bg-red-600">View all</router-link>
                </div>
                <div v-if="isLoading" class="flex justify-center">
                    <h4>Loading your recipes...</h4>
                </div>
                <div v-if="!isLoading">
                    <ListRecipes :recipes="recipes"/>
                </div>
                <Footer/>
            </div>
        </div>
</template>
<script>
import Navbar from '../components/navbar.vue'
import Banner from '../components/banner.vue'
import ListRecipes from '../components/recipes/list.vue'
import Footer from '../components/footer.vue'
import {popularRecipes} from '../constants/recipe'
export default {
    name:'landing',
    components:{
        Navbar,
        Banner,
        ListRecipes,
        Footer
    },
    methods: {
        async getPopularRecipes() {
            const res = await popularRecipes()
            this.recipes = res
            this.isLoading = false
        }
    },
    created() {
        this.getPopularRecipes()
    },
    data() {
        return {
            recipes : [],
            isLoading : true
        }
    },
}
</script>