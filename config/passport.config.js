const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const { tokenTypes } = require('../utils/tokens.util');
const UtilisateurService = require('../services/utilisateur.service');
const jwtConfig =require('./jwt.config');
const jwtOptions = {
  secretOrKey: jwtConfig.secret,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

const jwtVerify = async (payload, done) => {
  try {
    if (payload.type !== tokenTypes.ACCESS) {
      throw new Error('Invalid token type');
    }
    const utilisateur = await UtilisateurService.findById(payload.sub);
    if (!utilisateur) {
      return done(null, false);
    }
    done(null, utilisateur);
  } catch (error) {
    done(error, false);
  }
};

const jwtStrategy = new JwtStrategy(jwtOptions, jwtVerify);

const passportConfig = {
    jwtStrategy
};
module.exports = passportConfig;