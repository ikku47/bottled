let JWTStrategy = require("passport-jwt").Strategy;
let ExtractJwt = require("passport-jwt").ExtractJwt;
let opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = "secret";
module.exports = (passport) => {
  passport.use(
    new JWTStrategy(opts, (jwtPayload, done) => {
      console.log(jwtPayload);
      return done(null, jwtPayload);
    })
  );
};
