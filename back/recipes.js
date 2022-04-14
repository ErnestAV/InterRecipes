const mongoose = require('mongoose');
const express = require("express");
const router = express.Router();
const validateTokenMiddleware = require('./middlewares/auth-token')
const utilJWT = require('./utils/jwt')

const users = require("./users.js");
const User = users.model;
const validUser = users.valid;

const recipeSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  },
  //path: String,
  title: String,
  description: String,
  ingredients:[],
  steps:[],
  created: {
    type: Date,
    default: Date.now
  },
});

const Recipe = mongoose.model('Recipe', recipeSchema);

//upload.single('recipe')
router.post("/", validateTokenMiddleware, async (req, res) => {
    const recipe = new Recipe ({
      user: req.body.user,
      title: req.body.title,
      description: req.body.description,
      ingredients: req.body.ingredients,
      steps: req.body.steps
    });
    try {
      await recipe.save();
      return res.status(200).send({
        status:true,
        message: "Recipe created!",
        recipe:recipe
      });
    } catch (error) {
      console.log(error);
      return res.sendStatus(500);
    }
});

router.put('/:id/edit', async (req, res) => {
  try {
    const findRecipe = await Recipe.findById({_id: req.params.id})
    if(findRecipe){
      const edit = await Recipe.findByIdAndUpdate(req.params.id, {
        $set:{
          user: req.body.user,
          title: req.body.title,
          description: req.body.description,
          ingredients: req.body.ingredients,
          steps: req.body.steps
        }
      })
      if(edit){
        res.send({
          status:true,
          message: 'Recipe edited succesfully'
        })
      }else{
        res.send({
          status:true,
          message: 'We couldnt edit the recipe'
        })
      }
    }else{
      res.send({
        status:true,
        message: 'We didnt find the recipe'
      })
    }
  } catch (error) {
    console.log(error)
    res.send({
      status:false,
      message: 'Something was wrong to edit recipe'
    })
  }
})

// agarrar las recetas de un usuario
router.get("/me", validateTokenMiddleware, async (req, res) => {
    // retornar las recetas
    try {
      const {decodedToken} = utilJWT(req.headers['access-token'])
      let recipes = await Recipe.find({
        user: decodedToken.user._id
      }).sort({
        created: -1
      }).populate('user');
      return res.send({
        status : true,
        recipes : recipes
      });
    } catch (error) {
      console.log(error);
      return res.sendStatus(500);
    }
});

// agarrar TODAS las recetas
router.get("/all", async (req, res) => {
  try {
    let recipes = await Recipe.find().sort({
      created: -1
    }).populate('user');
    return res.send(recipes);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

// agarrar solo 10 recetas
router.get("/popular", async (req, res) => {
  try {
    let recipes = await Recipe.find().sort({
      created: -1 
    }).populate('user');
    return res.send(recipes.slice(0, 10));
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

// agarrar una receta solamente
router.get("/:id", async (req, res) => {
  try {
    let recipe = await Recipe.findOne({_id:req.params.id}).populate('user');
    return res.send(recipe);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});
router.delete("/:id", validateTokenMiddleware ,async (req, res) => {
  try {
    await Recipe.deleteOne({_id:req.params.id})
    return res.send({
      status :true,
      message:'Recipe deleted succesfully'
    });
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

module.exports = {
    model: Recipe,
    routes: router,
}