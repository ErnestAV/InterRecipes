<template>
    <div class="flex flex-col md:px-32 px-12 pt-12">
        <div class="flex flex-row items-center">
            <a @click="this.$router.go(-1)" class="rounded bg-gray-200 py-1 px-4">Back</a>
            <div  class="font-bold  text-3xl ml-5">
                {{recipe.title}}
            </div>
        </div>
        <div class="bg-white w-full mt-10 md:w-full shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div class="mb-4">
                <div class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                    {{recipe.description}}
                </div>
            </div>
           
            <div class="my-8">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
                    Ingredients
                </label>
                <div v-for="ingredient in ingredients" :key="ingredient">
                    <div class="flex flex-row my-6 justify-between">
                        <div class="font-semibold">
                            - {{ingredient}}
                        </div>
                    </div>
                </div>
            </div>
            <div class="my-8">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
                    Steps
                </label>
                <div v-for="step in steps" :key="step">
                    <div class="flex flex-row my-6 justify-between">
                        <div class="font-semibold">
                            - {{step}}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name:'recipe-view',
    data() {
        return {
            recipe:{},
            ingredients:[],
            steps:[],
            item: null,
            error: {
                active : false,
                message :''
            }
        }
    },
    methods: {
        
        
    },
    created() {
        try {
            this.recipe = JSON.parse(this.$route.params.recipe)
            this.ingredients = this.recipe.ingredients,
            this.steps = this.recipe.steps
        } catch (error) {
              this.$router.push('/') 
        }
        
    },
}
</script>