const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const Professor = require('../models/professor'); // Adjust path as needed

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'senha'
}, async (email, senha, done) => {
    try {
        const professor = await Professor.findOne({ where: { email } });

        if (!professor) {
            console.log("Email não encontrado:", email);
            return done(null, false, { message: 'Email não encontrado.' });
        }
        const isMatch = await bcrypt.compare(senha, professor.senha);

        if (isMatch) {
            return done(null, professor);
        } else {
            console.log("Senha incorreta para o usuário:", professor.email);
            return done(null, false, { message: 'Senha incorreta.' });
        }
    } catch (error) {
        console.error('Erro ao autenticar usuário:', error);
        return done(error);
    }
}));



passport.serializeUser((professor, done) => {
    done(null, professor.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const professor = await Professor.findByPk(id);
        done(null, professor);
    } catch (error) {
        done(error);
    }
});

module.exports = passport;
