const bcrypt = require('bcrypt');
const UtilisateurConnexionService = require("./utilisateurConnexion.service")
const TokenService = require('./token.service');

const AuthentificationService = {
    login : login
};

async function login(mail, motDePasse){
    try{
        let utilisateurConnexion = await UtilisateurConnexionService.findUtilisateurConnexionByEmail(mail.toLowerCase());
        let motDePasseHash = bcrypt.hashSync(motDePasse,utilisateurConnexion.utilisateur_connexion_mdp_hash);
        if(utilisateurConnexion.utilisateur_connexion_mdp_hash === motDePasseHash){
            let utilisateur = await UtilisateurConnexionService.findUtilisateurByUtilisateurConnexionId(utilisateurConnexion._id);
            return TokenService.generateAuthTokens(utilisateur);
        }
        else throw new Error("Invalid email or password");
    }
    catch(err){
        throw err;
    }
}

module.exports = AuthentificationService;