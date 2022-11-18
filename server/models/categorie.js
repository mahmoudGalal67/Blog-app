import mongoose from "mongoose"

const  categorieSchema = new mongoose.Schema({
 name:{
  type: String,
  required:[true , "required name"]
 },
 image:{
  type:String,
  requred:[true,"image required"]
 }
},{timestamps:true})



export const Categorie = new mongoose.model("categorie" , categorieSchema)


