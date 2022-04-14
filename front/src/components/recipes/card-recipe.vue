<template>
    <div class="flex flex-col">
        <img class="w-full rounded h-24 object-cover" src="../../../public/food_card.jpeg" alt="">
        <div class="flex flex-col mt-5">
            <div v-if="isInLanding || isInAll">
                <a @click="navigateToViewRecipe(recipe)" class="cursor-pointer">{{recipe.title}}</a>
            </div>

            <div v-if="this.$route.name == 'profile'">{{recipe.title}}</div>
            <!-- <div>Dificultad</div> -->
            <div class="flex flex-row justify-between">
                <!-- <div>Rate</div> -->
                <div class="font-normal">By {{recipe.user.firstName}} {{recipe.user.lastName}}</div>
            </div>
            <div class="font-thin">{{recipe.ingredients.length}} ingredients</div>
            <div class="font-thin">{{recipe.steps.length}} steps</div>
            <div v-if="isInProfile" class="flex flex-row mt-2">
                <button @click="navigateToEditRecipe(recipe)">Edit</button>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props:{
        recipe:{}
    },
    data() {
        return {
            isInProfile : this.$route.name == 'profile' ? true : false,
            isInLanding : this.$route.name == 'landing' ? true : false,
            isInAll : this.$route.name == 'recipes-all' ? true : false
        }
    },
    created() {
        console.log(this.$route.name)
    },
    methods: {
        navigateToEditRecipe(data){
            var item = {
                'id' : data._id,
                'title' : data.title,
                'description' : data.description,
                'ingredients' : data.ingredients,
                'steps' : data.steps
            }
            this.$router.push({
                
                name: 'recipes-edit',
                params: {
                    name: data.title,
                    recipe: JSON.stringify(item)
                }
            })
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
}
</script>