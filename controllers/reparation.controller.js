const ReparationService = require("../services/reparation.service");
const {normalizeApiResponse} = require("../utils/apiResponse.util");
const {redux} = require("../utils/function.util");
const Constant = require("../utils/constant.util");
const VoitureReparationService = require("../services/voitureReparation.service")
const ReparationController = {
    findAllReparation,
    findReparationAFaire,
    commencerReparationVoiture,
    findReparationEnCours,
    terminerReparationVoiture
}

async function findAllReparation(req, res) {
    try {
        let reparation = await ReparationService.findAllReparation();
        res.json(normalizeApiResponse({data: {reparations: reparation}})).status(Constant.HTTP_SUCCESS);
    } catch (e) {
        res.json(normalizeApiResponse({errors: e.message,status: Constant.HTTP_BAD_REQUEST})).status(Constant.HTTP_SUCCESS);
    }
}

async function findReparationAFaire(req, res) {
    try {
        let reparation = await VoitureReparationService.findReparationAFaire();
        res.json(normalizeApiResponse({data: {reparations: reparation}})).status(Constant.HTTP_SUCCESS);
    } catch (e) {
        res.json(normalizeApiResponse({errors: e.message,status: Constant.HTTP_BAD_REQUEST})).status(Constant.HTTP_SUCCESS);
    }
}

async function commencerReparationVoiture(req, res) {
    try {
        await VoitureReparationService.commencerReparationVoiture(req.responsableAtelier, req.body?.voiture_reparation_uuid);
        res.json(normalizeApiResponse({data: {}})).status(Constant.HTTP_SUCCESS);
    } catch (e) {
        res.json(normalizeApiResponse({errors: e.message,status: Constant.HTTP_BAD_REQUEST})).status(Constant.HTTP_SUCCESS);
    }
}

async function findReparationEnCours(req, res) {
    try {
        let reparation = await VoitureReparationService.findReparationEnCours(req.responsableAtelier);
        res.json(normalizeApiResponse({data: {reparations: reparation}})).status(Constant.HTTP_SUCCESS);
    } catch (e) {
        res.json(normalizeApiResponse({errors: e.message,status: Constant.HTTP_BAD_REQUEST})).status(Constant.HTTP_SUCCESS);
    }
}

async function terminerReparationVoiture(req, res) {
    try {
        await VoitureReparationService.terminerReparationVoiture(req.responsableAtelier, req.body?.voiture_reparation_uuid);
        res.json(normalizeApiResponse({data: {}})).status(Constant.HTTP_SUCCESS);
    } catch (e) {
        res.json(normalizeApiResponse({errors: e.message,status: Constant.HTTP_BAD_REQUEST})).status(Constant.HTTP_SUCCESS);
    }
}

module.exports = ReparationController;