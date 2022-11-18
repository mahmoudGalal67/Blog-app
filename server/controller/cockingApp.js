import { Categorie } from "../models/categorie.js";
import {Recipe} from "../models/recipes.js"
import path from "path"

export const getCategories = async(req,res)=>{
 try{
   const Categories= await Categorie.find({}).limit(5)
   const latestRecipes = await Recipe.find({}).sort({_id:-1}).limit(5)
   const thai = await Recipe.find({ 'category': 'Thai' }).limit(5);
  const american = await Recipe.find({ 'category': 'American' }).limit(5);
  const chinese = await Recipe.find({ 'category': 'Chinese' }).limit(5);

   const food = {latestRecipes , american ,chinese ,thai}

  res.status(200).render("index" , {title:"CockieApp-home" , Categories , food})
}
catch(err){
 console.log("err" + err)
}
}

export const getAllCategories = async(req,res)=>{
 try{
   const Categories= await Categorie.find({})
  res.status(200).render("categorie" , {title:"CockieApp-categorie" , Categories})
}
catch(err){
 console.log("err" + err)
}
}


export const  getRecipeDetails = async (req,res)=>{
  try{
      const recipeDetails = await Recipe.findById(req.params.id)
      res.render("recipe" , {title : "recipe-details" , recipeDetails})
   }
  catch(err){
    console.error(err + "error")
  }
}


export const getCategoryId = async(req,res)=>{
  try{
    const recipies= await Recipe.find({"category" : req.params.id})
   res.status(200).render("categoryId" , {title:"category Recipe" , recipies})
 }
 catch(err){
  console.log("err" + err)
 }
 }

 export const searchRecipe = async(req, res) => {
  try {
    let searchTerm = req.body.searchTerm;
    let recipe = await Recipe.find( { $text: { $search: searchTerm, $diacriticSensitive: true } });
    res.render('search', { title: 'Cooking Blog - Search', recipe , searchTerm} );
  } catch (error) {
    res.satus(500).send({message: error.message || "Error Occured" });
  }
  
}

export const latestRecipe = async(req,res)=>{
  try{
    const latestRecipe= await Recipe.find({}).sort({id:-1}).limit(30)
   res.status(200).render("explore-latest" , {title:"Cocking-app latest Recipe" , latestRecipe})
 }
 catch(err){
  console.log("err" + err)
 }
 }


 export const rondomRecipe = async(req, res) => {
  try {
    let count = await Recipe.find().countDocuments();
    let random = Math.floor(Math.random() * count);
    let recipe = await Recipe.findOne().skip(random).exec();
    res.render('rondom-recipe', { title: 'Cooking Blog - Explore Latest', recipe } );
  } catch (error) {
    res.satus(500).send({message: error.message || "Error Occured" });
  }
} 


export const submitRecipe = async(req, res) => {
  const infoErrorsObj = req.flash('infoErrors');
  const infoSubmitObj = req.flash('infoSubmit');
  res.render('submit-recipe', { title: 'Cooking Blog - Submit Recipe', infoErrorsObj, infoSubmitObj  } );
}

/**
 * POST /submit-recipe
 * Submit Recipe
*/
export const submitRecipeOnPost = async(req, res) => {
  try {

    let imageUploadFile;
    let uploadPath;
    let newImageName;

    if(!req.files || Object.keys(req.files).length === 0){
      console.log('No Files where uploaded.');
    } else {

      imageUploadFile = req.files.image;
      newImageName = Date.now() + imageUploadFile.name;

      uploadPath = path.resolve('./') + '/public/uploads/' + newImageName;

      imageUploadFile.mv(uploadPath, function(err){
        if(err) return res.satus(500).send(err);
      })

    }

    const newRecipe = new Recipe({
      name: req.body.name,
      description: req.body.description,
      email: req.body.email,
      ingredients: req.body.ingredients,
      category: req.body.category,
      image: newImageName
    });
    
    await newRecipe.save();

    req.flash('infoSubmit', 'Recipe has been added.')
    res.redirect('/submit-recipe');
  } catch (error) {
    // res.json(error);
    req.flash('infoErrors', error);
    res.redirect('/submit-recipe');
    console.log(error)
  }
}