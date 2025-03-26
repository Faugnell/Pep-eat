require('dotenv').config({path:'./secret/.env'})

// const mongoose = require('mongoose');
// const Commande = mongoose.model('Commande', new mongoose.Schema({
//     user_id: String,
//     restaurant_id: String,
//     plat_ids: [String],
//     date: Date,
//     status: String
// }));

// try {
//     await mongoose.connect(process.env.MONGO_CONNECTION_STRING);
// } catch (error) {
//     console.error('Erreur lors de la connexion à la base de données');
//     console.error(error);
//     process.exit(1);
// }

// async (req, res) => {
//     try {
//         const result = await Commande.find({});

//         res.send({
//             code: 200,
//             ok: true,
//             message: 'Liste des commandes',
//             data: result
//         });
//     } catch (error) {
//         console.error(error);
//     }
// }

function findAll() {
    
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
