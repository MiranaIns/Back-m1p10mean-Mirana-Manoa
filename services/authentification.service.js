const bcrypt = require('bcrypt');
const UtilisateurConnexionService = require("./utilisateurConnexion.service")
const TokenService = require('./token.service');

const AuthentificationService = {
    login : login
};

async function login(db, mail, motDePasse){
    try{
        let utilisateurConnexion = await UtilisateurConnexionService.findUtilisateurConnexionByEmail(db, mail.toLowerCase());
        let motDePasseHash = bcrypt.hashSync(motDePasse,utilisateurConnexion.utilisateur_connexion_mdp_hash);
        if(utilisateurConnexion.utilisateur_connexion_mdp_hash === motDePasseHash){
            return TokenService.generateAuthTokens(utilisateurConnexion);
        }
        else throw new Error("Invalid email or password");
    }
    catch(err){
        throw err;
    }
}

module.exports = AuthentificationService;