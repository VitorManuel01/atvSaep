const express = require('express')
const { engine } = require('express-handlebars')
const bp = require('body-parser')
const session = require('express-session');
const passport = require('./config/passportConfig')

const app = express()

app.engine('handlebars', engine({
    defaultLayout: 'main', // Especifique o layout padrão se necessário
    extname: '.handlebars', // Especifique a extensão dos arquivos de template
    runtimeOptions: {
        allowProtoMethodsByDefault: true,
        allowProtoPropertiesByDefault: true,
    }
}));

app.set('view engine', 'handlebars')
app.set('views', './views')
app.use(bp.urlencoded({ extended: true }))
app.use(bp.json())
app.use(express.static('public'));

app.use(session({
    secret: 'chaveSuseg',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 600000 }
}));

app.use(passport.session());
app.use(passport.initialize());



const Professor = require('./models/professor');

app.post('/login', passport.authenticate('local', {
    successRedirect: "/",
    failureRedirect: "/login"
}));

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } else {
        res.redirect('/login');
    }

}


app.get('/login', (req, res) => {

    res.render('login');
});

app.get('/logout', (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        res.redirect('/login');
    });
});



let turmas = [];
const Turma = require('./models/turma');

app.get('/', isLoggedIn, async (req, res) => {
    try {
        let turma = await Turma.findAll();

        res.render('home', { turma, professor: req.user });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro ao buscar turmas.' });
    }
});

app.get('/turmas', isLoggedIn, async (req, res) => {
    try {
        let turma = await Turma.findAll();

        res.render('turmas', { turma });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro ao buscar turmas.' });
    }
});

app.post('/turma', isLoggedIn, async (req, res) => {
    try {
        const nome = req.body.name;

        const turma = {
            nome: nome,
        };
        console.log(turma);
        const novaTurma = await Turma.create(turma);

        turmas.push(novaTurma);

        console.log(turmas);

        res.redirect('/');
    } catch (error) {
        console.error('Erro ao salvar a turma:', error);
        res.status(500).send('Erro ao salvar a turma.');
    }
});

app.post('/deleteTurma/:id', isLoggedIn, async (req, res) => {
    try {
        const { id } = req.params;
        const turma = await Turma.findByPk(id);

        if (!turma) {
            return res.status(404).json({ error: 'Usuário não encontrado.' });
        }

        await turma.destroy();

        res.redirect('/'); 
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro ao deletar usuário.' });
    }
});
app.get('/cadastrarTurma', (req, res) => {
    res.render('cadastrarTurma')
})

app.get('/register', (req, res) => {
    res.render('register');
});

app.post('/register', async (req, res) => {
    try {
        const { nome, email, senha } = req.body;

        await Professor.create({
            nome,
            email,
            senha 
        }).then();
        res.redirect('/login');
    } catch (err) {
        console.error('Error:', err);
        res.redirect('/register');
    }
});

app.listen(5500, () => {
    console.log("Sistema rodando na porta http://localhost:5500")
})