import * as VueRouter from 'vue-router';

//import pages
import Landing from "../pages/landing.vue";
import SignUp from "../pages/auth/signup.vue";
import Login from "../pages/auth/login.vue";
import Profile from '../pages/profile.vue'
import RecipesCreate from '../pages/recipes/add.vue'
import RecipesEdit from '../pages/recipes/edit.vue'
import PageNotFound from '../pages/error/404.vue'
import AllRecipes from '../pages/recipes/all.vue'
import ViewRecipe from '../pages/recipes/view.vue'
//define routes
const routes = [
  {
    path: '/', name: 'landing', component: Landing
  },
  {
    path: '/signup', name: 'signup', component: SignUp
  },
  {
    path: '/login', name: 'login', component: Login
  },
  {
    path: '/profile', name: 'profile', component: Profile, 
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/recipes/add', name: 'recipes-add', component: RecipesCreate,
    meta: {
      requiresAuth: true,
   },
  },
  {
    path: '/recipes/:name/edit', name: 'recipes-edit', component: RecipesEdit,
    meta: {
      requiresAuth: true,
    },
    props: {
        header: true,
        content: true
    },
  },
  {
    path: '/recipes/all', name: 'recipes-all', component: AllRecipes
  },
  {
    path: '/recipes/:name', name: 'recipe-view', component: ViewRecipe
  },
  { path: "/:pathMatch(.*)*", name:'notFound' ,component: PageNotFound }
  
];

//create router instance
const router = VueRouter.createRouter({
  history: VueRouter.createWebHistory(),
  routes,
});
router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (localStorage.getItem("user") == null) {
      next({
        path: "/login",
        params: { nextUrl: to.fullPath },
      });
    } else {
       next();
    }
  } else {
    next();
  }
});


export default router;