<template>
    <div class="w-full">
        <div class="flex flex-col md:px-32 px-6 pt-12">
            <div class="mb-5">
                <router-link to='/' class="rounded bg-gray-200 py-1 px-4">Back</router-link>
            </div>
            <div class="font-bold text-3xl">
                All Recipes
            </div>
            <div v-if="isLoading" class="flex justify-center">
                <h4>Loading recipes...</h4>
            </div>
            <div v-if="!isLoading">
                <ListRecipes :recipes="recipes"/>
            </div>
            
        </div>
    </div>
</template>
<script>
import { allRecipes } from '../../constants/recipe'
import ListRecipes from '../../components/recipes/list.vue'
export default {
    name : 'recipes-all',
    components:{
        ListRecipes
    },
    methods: {
        async getPopularRecipes() {
            const res = await allRecipes()
            this.recipes = res
            this.isLoading = false
        },
        navigateToViewRecipe(data){
            var item = {
                'id' : data._id,
                'title' : data.title,
                'description' : data.description,
                'ingredients' : data.ingredients,
                'steps' : data.steps
            }
            this.$router.push({
                name: 'recipe-view',
                params: {
                    name: data.title,
                    recipe: JSON.stringify(item)
                }
            })
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