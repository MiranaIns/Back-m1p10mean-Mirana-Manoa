const bcrypt = require('bcrypt');
const TokenService = require('./token.service');
const Database = require("../database");
const RatConnexionService = require("./ratConnexion.service");
const RatService = require("./rat.service");
const RfiConnexionService = require("./rfiConnexion.service");
const RfiService = require("./rfi.service");

const db = Database.getInstance();
const client = Database.getMongoClient();

const AdminAuthentificationService = {
    login,
    register
};

async function login(mail, motDePasse, utilisateurType){
    try{
        if(utilisateurType === 'RAT') {
            let utilisateurConnexion = await RatConnexionService.findUtilisateurConnexionByEmail(mail.toLowerCase());
            if (!utilisateurConnexion) {
                throw new Error("Invalid email or password")
            }
            let motDePasseHash = bcrypt.hashSync(motDePasse, utilisateurConnexion.utilisateur_connexion_mdp_hash);
            if (utilisateurConnexion.utilisateur_connexion_mdp_hash === motDePasseHash) {
                let utilisateur = await RatConnexionService.findUtilisateurByUtilisateurConnexionId(utilisateurConnexion._id);
                return TokenService.generateAuthTokens(utilisateur);
            } else throw new Error("Invalid email or password");
        }
        else if(utilisateurType === 'RFI') {
            let utilisateurConnexion = await RfiConnexionService.findUtilisateurConnexionByEmail(mail.toLowerCase());
            if (!utilisateurConnexion) {
                throw new Error("Invalid email or password")
            }
            let motDePasseHash = bcrypt.hashSync(motDePasse, utilisateurConnexion.utilisateur_connexion_mdp_hash);
            if (utilisateurConnexion.utilisateur_connexion_mdp_hash === motDePasseHash) {
                let utilisateur = await RfiConnexionService.findUtilisateurByUtilisateurConnexionId(utilisateurConnexion._id);
                return TokenService.generateAuthTokens(utilisateur);
            } else throw new Error("Invalid email or password");
        }
        else {
            throw new Error(" The user type doesn't exist");
        }
    }
    catch(err){
        throw err;
    }
}

async function register(utilisateur){
    try{
        let {mail, mdp, nom, prenom, utilisateurType} = utilisateur;
        if(utilisateurType === 'RAT') {
            let utilisateurConnexion = await RatConnexionService.findUtilisateurConnexionByEmail(mail.toLowerCase());
            if(utilisateurConnexion) {
                throw new Error("Account already exists");
            }

            client.then(async client => {
                const session = await client.startSession();
                session.startTransaction();
                try {
                    const salt = bcrypt.genSaltSync();
                    const hash = bcrypt.hashSync(mdp,salt);
                    const utilisateurConnexionId = await RatConnexionService.create(mail.toLowerCase(),salt,hash, session);
                    const utilisateurId = await RatService.create(nom, prenom, mail.toLowerCase(),utilisateurConnexionId,session);
                    await session.commitTransaction();
                } catch (e) {
                    await session.abortTransaction();
                    throw e;
                } finally {
                    await session.endSession();
                }
            });
        }
        else if(utilisateurType === 'RFI') {
            let utilisateurConnexion = await RfiConnexionService.findUtilisateurConnexionByEmail(mail.toLowerCase());
            if(utilisateurConnexion) {
                throw new Error("Account already exists");
            }

            client.then(async client => {
                const session = await client.startSession();
                session.startTransaction();
                try {
                    const salt = bcrypt.genSaltSync();
                    const hash = bcrypt.hashSync(mdp,salt);
                    const utilisateurConnexionId = await RfiConnexionService.create(mail.toLowerCase(),salt,hash, session);
                    const utilisateurId = await RfiService.create(nom, prenom, mail.toLowerCase(),utilisateurConnexionId,session);
                    await session.commitTransaction();
                } catch (e) {
                    await session.abortTransaction();
                    throw e;
                } finally {
                    await session.endSession();
                }
            });
        }
        else {
            throw new Error(" The user type doesn't exist");
        }
    }
    catch(err){
        throw err;
    }
}

module.exports = AdminAuthentificationService;