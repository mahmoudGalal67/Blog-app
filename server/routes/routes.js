import express from "express"
import { getCategories } from "../controller/cockingApp.js"
import {getAllCategories} from "../controller/cockingApp.js"
import {getRecipeDetails} from "../controller/cockingApp.js"
import {getCategoryId} from "../controller/cockingApp.js"
import {searchRecipe} from "../controller/cockingApp.js"
import {latestRecipe} from "../controller/cockingApp.js"
import {rondomRecipe} from "../controller/cockingApp.js"
import {submitRecipe} from "../controller/cockingApp.js"
import {submitRecipeOnPost} from "../controller/cockingApp.js"


const router = express.Router()

router.get("/" ,getCategories)
router.get("/categories" , getAllCategories)
router.get("/recipe/:id" , getRecipeDetails)
router.get("/category/:id" , getCategoryId)
router.post("/search" , searchRecipe)
router.get("/explore-latest" , latestRecipe)
router.get("/random-recipe" , rondomRecipe)
router.get("/submit-recipe" , submitRecipe)
router.post("/submit-recipe" , submitRecipeOnPost)




export default router