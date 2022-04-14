<template>
    <div class="w-full">
        <div class="mt-10 w-full flex flex-wrap">
            <div v-for="recipe in list" :key="recipe" class="w-full md:w-1/4 p-5">
                <foodcard :recipe="recipe"/>
                <button v-if="isInProfile" @click="deleteItem(recipe)" class="mt-2 text-red-500">Delete</button>
            </div>
        </div>
    </div>
</template>
<script>
import foodcard from './card-recipe.vue'
import {deleteRecipe } from '../../constants/recipe'
export default {
    props:{
        recipes:{
            type:Array
        }
    },
    components:{
        foodcard
    },
    
    methods: {
        async deleteItem(item) {
            const backUpRecepies = this.list
            const index = backUpRecepies.indexOf(item);
            if (index > -1) {
                backUpRecepies.splice(index, 1);
                const res = await deleteRecipe(item._id)
                console.log(res)
            }
            this.list = backUpRecepies
        },
    },
    data() {
        return {
            list : [],
            isInProfile : this.$route.name == 'profile' ? true : false
        }
    },
    created() {
        const list = JSON.parse(JSON.stringify(this.recipes));
        this.list = list
    },

}
</script>