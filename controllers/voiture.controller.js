const {normalizeApiResponse} = require("../utils/apiResponse.util");
const httpStatus = require("http-status");
const VoitureService = require("../services/voiture.service");
const Constant = require("../utils/constant.util");
const {redux} = require('../utils/function.util')

const VoitureController = {
    findAllVoiture
}

async function findAllVoiture(req, res) {
    try {
        const voitureKeys = [ 'fk_utilisateur_id', 'voiture_uuid','voiture_marque', 'voiture_modele', 'voiture_immatriculation', 'voiture_couleur', 'voiture_etat_garage'];
        let voitures = await VoitureService.findAllVoiture(req.utilisateur);
        res.json(normalizeApiResponse({data: {voitures: redux(voitures,voitureKeys)}})).status(Constant.HTTP_SUCCESS);
    } catch (e) {
        res.json(normalizeApiResponse({errors: e.message,status: Constant.HTTP_BAD_REQUEST})).status(Constant.HTTP_SUCCESS);
    }
}


module.exports = VoitureController;