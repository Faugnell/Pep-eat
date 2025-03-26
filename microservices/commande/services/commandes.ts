import mongoose, { model, mongo, Schema } from "mongoose";

require('dotenv').config({path:'./secret/.env'})

interface ICommand {
  user_id: String,
  restaurant_id: String,
  plat_ids: [String],
  date: Date,
  status: String
}
const commandeSchema = new Schema<ICommand>({
  user_id: String,
  restaurant_id: String,
  plat_ids: [String],
  date: Date,
  status: String
})


async function findAll() {
  try{
    await mongoose.connect(process.env.MONGO_CONNECTION_STRING as string)
    const Commande = model<ICommand>("Command", commandeSchema)
    return await Commande.find()
  } catch(err){
    console.log(err)
  }
  return 
}

function find(id:number) {
    
}

function create(newCommand:any) {

}

function update(id:number, updatedCommand:any) {

}

function remove(id:any) {

}

module.exports = {
  findAll,
  find,
  create,
  update,
  remove,
};
