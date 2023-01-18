const UtilisateurConnexionService = {
    findUtilisateurConnexionByEmail:findUtilisateurConnexionByEmail
};

const collectionName = 'utilisateur_connexion';

async function findUtilisateurConnexionByEmail(db, mail){
    const collection = db.collection(collectionName);
    return new Promise((resolve, reject) => {
        collection.findOne({utilisateur_connexion_mail : mail }, (err, utilisateurConnexion) => {
            if(err) {
                reject(err);
            }
            if(!utilisateurConnexion) {
                reject(new Error("User not found"));
            }
            resolve(utilisateurConnexion);
        });
    });
}

module.exports = UtilisateurConnexionService;