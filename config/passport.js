const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Your User model
const passport = require('passport')

// JWT Strategy Options
const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET // Store this in an .env file
};

// JWT Strategy: Used to protect routes and verify token
passport.use(new JwtStrategy(opts, async (jwt_payload, done) => {
    // console.log("JWT Payload r:", jwt_payload); // Add this line

    try {
        // console.log("JWT Payload:", jwt_payload); // Add this line

        const user = await User.findById(jwt_payload.id);
        if (user) {
            return done(null, user);
        }
        return done(null, false);
    } catch (error) {
        return done(error, false);
    }
}));

// Local Strategy: Used for login (email, password)
passport.use(new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return done(null, false, { message: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return done(null, false, { message: 'Invalid credentials' });
        }

        return done(null, user);
    } catch (error) {
        return done(error, false);
    }
}));
