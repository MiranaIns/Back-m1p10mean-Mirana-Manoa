const {normalizeApiResponse} = require("../utils/apiResponse.util");
const httpStatus = require("http-status");
const VoitureService = require("../services/voiture.service");
const Constant = require("../utils/constant.util");

const VoitureController = {
    findAllVoiture
}

async function findAllVoiture(req, res) {
    try {
        let voitures = await VoitureService.findAllVoiture();
        res.json(normalizeApiResponse({data: {voitures: voitures}})).status(Constant.HTTP_SUCCESS);
    } catch (e) {
        res.json(normalizeApiResponse({errors: e.message,status: Constant.HTTP_BAD_REQUEST})).status(Constant.HTTP_SUCCESS);
    }
}


module.exports = VoitureController;