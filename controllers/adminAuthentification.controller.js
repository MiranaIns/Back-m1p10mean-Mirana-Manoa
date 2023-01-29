const httpStatus = require('http-status');
const {normalizeApiResponse} = require('../utils/apiResponse.util');
const ApiError = require('../errors/api.error');
const AdminAuthentificationService = require("../services/adminAuthentification.service");

const AdminAuthentificationController = {
    login,
    register
}

async function login(req,res){
    try{
        let {mail, mdp, utilisateurType} = req.body;
        let authToken = await AdminAuthentificationService.login(mail,mdp, utilisateurType);
        res.json(normalizeApiResponse({status: httpStatus.OK, data: [authToken]})).status(httpStatus.OK);
    }
    catch(e){
        res.json(normalizeApiResponse({errors: e.message,status: httpStatus.UNAUTHORIZED})).status(httpStatus.OK);
    }
}

async function register(req,res){
    try{
        await AdminAuthentificationService.register(req.body);
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

module.exports = AdminAuthentificationController;