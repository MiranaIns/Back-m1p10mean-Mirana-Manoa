const {normalizeApiResponse} = require("../utils/apiResponse.util");
const httpStatus = require("http-status");
const VoitureService = require("../services/voiture.service");
const Constant = require("../utils/constant.util");
const {redux} = require('../utils/function.util')
const AuthentificationService = require("../services/authentification.service");
const ApiError = require("../errors/api.error");
const VoitureGarageService = require("../services/voitureGarage.service");

const VoitureController = {
    findAllVoiture,
    ajoutVoitureClient,
    depotVoitureGarage
}

async function findAllVoiture(req, res) {
    try {
        const voitureKeys = [ 'fk_utilisateur_id', 'voiture_uuid','voiture_marque', 'voiture_modele', 'voiture_immatriculation', 'voiture_couleur', 'voiture_etat_garage'];
        let voitures = await VoitureService.findAllVoiture(req.utilisateur, req.query.etat);
        res.json(normalizeApiResponse({data: {voitures: redux(voitures,voitureKeys)}})).status(Constant.HTTP_SUCCESS);
    } catch (e) {
        res.json(normalizeApiResponse({errors: e.message,status: Constant.HTTP_BAD_REQUEST})).status(Constant.HTTP_SUCCESS);
    }
}

async function ajoutVoitureClient(req,res){
    try{
        const voiture = {
            marque: req.body?.voiture_marque,
            modele: req.body?.voiture_modele,
            immatriculation: req.body?.voiture_immatriculation,
            couleur: req.body?.voiture_couleur
        }
        await VoitureService.ajoutVoitureClient(req.utilisateur, voiture);
        res.json(normalizeApiResponse({status: httpStatus.CREATED, data:[]})).status(httpStatus.OK);
    }
    catch(err){
        if(err instanceof ApiError){
            res.json(normalizeApiResponse({errors: err.message,status: err.statusCode})).status(httpStatus.OK);
        }
        else{
            res.json(normalizeApiResponse({errors: err.message,status: httpStatus.UNAUTHORIZED})).status(httpStatus.OK);
        }
    }
}

async function depotVoitureGarage(req,res){
    try{
        await VoitureGarageService.depotVoitureGarage(req.body?.voiture_uuid);
        res.json(normalizeApiResponse({status: httpStatus.CREATED, data:[]})).status(httpStatus.OK);
    }
    catch(err){
        if(err instanceof ApiError){
            res.json(normalizeApiResponse({errors: err.message,status: err.statusCode})).status(httpStatus.OK);
        }
        else{
            res.json(normalizeApiResponse({errors: err.message,status: httpStatus.UNAUTHORIZED})).status(httpStatus.OK);
        }
    }
}

module.exports = VoitureController;