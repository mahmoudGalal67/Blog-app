import mongoose from "mongoose"

const  recipeSchema = new mongoose.Schema({
 name:{
  type: String,
  required:true 
 },
 image:{
  type:String,
  requred:true
 },
 description:{
  type:String,
  required:true,
 },
 email:{
  type:String,
  require:true,
 },
 category:{
  type:String,
  required:true,
  enum: ['Thai', 'American', 'Chinese', 'Mexican', 'Indian']
 },
 ingredients:{
  type:Array,
  required:true,
 }
},{timestamps:true})

recipeSchema.index({ name: 'text', description: 'text' });
// WildCard Indexing
//recipeSchema.index({ "$**" : 'text' });


export const Recipe = new mongoose.model("recipe" , recipeSchema)