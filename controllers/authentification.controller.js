const httpStatus = require('http-status');
const {normalizeApiResponse} = require('../utils/apiResponse.util');
const AuthentificationService = require('../services/authentification.service')

const AuthentificationController = {
    login: login
}

async function login(req,res){
    try{
        const db = req.app.get('db');
        let {mail, mdp} = req.body;
        let authToken = await AuthentificationService.login(db, mail,mdp);
        res.json(normalizeApiResponse({status: httpStatus.OK, data: [authToken]})).status(httpStatus.OK);
    }
    catch(e){
        res.json(normalizeApiResponse({errors: e.message,status: httpStatus.UNAUTHORIZED})).status(httpStatus.OK);
    }
}

module.exports = AuthentificationController;