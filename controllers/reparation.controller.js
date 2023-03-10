const ReparationService = require("../services/reparation.service");
const {normalizeApiResponse} = require("../utils/apiResponse.util");
const {redux} = require("../utils/function.util");
const Constant = require("../utils/constant.util");
const ReparationController = {
    findAllReparation
}

async function findAllReparation(req, res) {
    try {
        let reparation = await ReparationService.findAllReparation();
        res.json(normalizeApiResponse({data: {reparations: reparation}})).status(Constant.HTTP_SUCCESS);
    } catch (e) {
        res.json(normalizeApiResponse({errors: e.message,status: Constant.HTTP_BAD_REQUEST})).status(Constant.HTTP_SUCCESS);
    }
}

module.exports = ReparationController;