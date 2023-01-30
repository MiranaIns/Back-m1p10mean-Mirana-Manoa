const Database = require('../database');
const Constant = require("../utils/constant.util");
const {ObjectId} = require("mongodb");

const ReparationService = {
    findAllReparation
};

const db = Database.getInstance();

const collectionName = 'reparation';

async function findAllReparation(){
    try {
        return db.then((db) => {
            const collection = db.collection(collectionName);
            return collection.find().toArray().then(results => {
                let promises = results.map(async (result) => {
                    delete result._id;
                    let reparation_piece = result.reparation_piece;
                    const pieceCollection = db.collection("piece");
                    let piecePromises = reparation_piece.map(async (piece) => {
                        return pieceCollection.findOne({"_id": ObjectId(piece.fk_piece_id)}).then(details => {
                            let pieceData = {};
                            pieceData.quantité = piece.quantité;
                            pieceData.prix_unitaire = piece.prix_unitaire;
                            pieceData.details = details;
                            return pieceData;
                        });
                    });
                    return Promise.all(piecePromises).then(pieceData => {
                        result.reparation_piece = pieceData;
                        return result;
                    });
                });
                return Promise.all(promises).then(results => {
                    return results;
                });
            });
        });
    }
    catch (e){
        throw {status: Constant.HTTP_INTERNAL_SERVER_ERROR, message: e.message};
    }
}


module.exports = ReparationService;