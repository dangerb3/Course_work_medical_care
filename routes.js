var util = require('util');
var express = require('express');
var app = express();
var passport = require("passport");

var fs = require('fs');
var request = require('request');
const {Pool, Client} = require('pg')
const bcrypt = require('bcrypt')
const uuidv4 = require('uuid/v4');
const {forwardAuthenticated, ensureAuthenticated}=require('./config/auth')


app.use(express.static('public'));

const LocalStrategy = require('passport-local').Strategy;

var currentAccountsData = [];

const pool = new Pool({
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    password: process.env.PGPASSWORD,
    port: process.env.PGPORT,
    ssl: true
});

module.exports = function (app) {

    app.get('/', function (req, res, next) {
        res.render('login', {
            title: "Log in",
            userData: req.user,
            messages: {danger: req.flash('danger'), warning: req.flash('warning'), success: req.flash('success')}
        });
        console.log(req.user);
    });
    //app.get('/', function (req, res, next) {
    //    res.render('index', {title: "Home", userData: req.user, messages: {danger: req.flash('danger'), warning: req.flash('warning'), success: req.flash('success')}});
    //    
    //    console.log(req.user);
    //    });

    app.get('/join', forwardAuthenticated, function (req, res) {
        res.render('join', {
            title: "Join",
            userData: req.user,
            messages: {danger: req.flash('danger'), warning: req.flash('warning'), success: req.flash('success')}
        });
    });
    //console.log (uuidv4());

    app.post('/join', async function (req, res) {

        try {
            const client = await pool.connect()
            await client.query('BEGIN')
            var pwd = await bcrypt.hash(req.body.password, 5);
            await JSON.stringify(client.query('SELECT id FROM "Workers" WHERE "Login"=$1', [req.body.username], function (err, result) {
                if (result.rows[0]) {
                    req.flash('warning', 'This email address is already registered.');
                    res.redirect('/join');
                } else {
                    client.query('INSERT INTO "Workers" ("WorkerSurname", "WorkerName","WorkerMiddleName", "WorkerType", "Brigade_fk", "Login", "Password") ' +
                        'VALUES ($1, $2, $3, $4, $5, $6, $7)',
                        [req.body.lastName, req.body.firstName, req.body.middleName, req.body.typeWorker, req.body.brigadenum, req.body.username, pwd], function (err, result) {
                            if (err) {
                                req.flash('danger', 'Такой бригады не существует или произошла ошибка с регистрацией.')
                                res.redirect('/join');
                            } else {

                                client.query('COMMIT')
                                console.log(result)
                                req.flash('success', 'User created.')
                                res.redirect('/login');
                                return;
                            }
                        });
                }

            }));
            client.release();
        } catch (e) {
            throw(e)
        }
    });

    const jsonParser = express.json();
    app.post('/search_patient', jsonParser, async function (req, res) {

        try {
            console.log(req.body);
            const client = await pool.connect()
            await client.query('BEGIN')
            await JSON.stringify(client.query('select "PatientAddress","InBlackList", "InsuranceName", "InsurancePayType" from "Patients" ' +
                'left join "Insurance" I on "Patients"."InsuranceId_fk" = I.id where "PatientName"=$1 and "PatientSurname"=$2 and "PatientMiddleName"=$3', [req.body.userName, req.body.userSurname, req.body.userMiddlename], function (err, result) {
                console.log(result.rows[0]);
                // console.log(req.body.userName);
                // console.log(req.body.userSurname);
                // console.log(req.body.userMiddlename);
                res.send(result.rows[0]);

            }));
        } catch (e) {
            throw(e)
        }
    });

    app.get('/account', ensureAuthenticated, function (req, res) {
        //if (req.isAuthenticated()) {
        console.log("typeWorker:", req.user[0].typeWorker);
        //в зависимости от этого рендер страниц
        res.render('account', {
            title: "Работник",
            userData: req.user,
            messages: {danger: req.flash('danger'), warning: req.flash('warning'), success: req.flash('success')}
        });
        //} else {
        //    res.redirect('/login');
        //}
    });

    app.post('/account', async function (req, res) {

        try {
            console.log(req.body);
            const client = await pool.connect()
            await client.query('BEGIN')
            await JSON.stringify(client.query('select "PatientAddress","InBlackList", "InsuranceName", "InsurancePayType" from "Patients" ' +
                'left join "Insurance" I on "Patients"."InsuranceId_fk" = I.id where "PatientName"=$1 and "PatientSurname"=$2 and "PatientMiddleName"=$3', [req.body.userName, req.body.userSurname, req.body.userMiddlename], function (err, result) {
                console.log(result.rows[0]);
                // console.log(req.body.userName);
                // console.log(req.body.userSurname);
                // console.log(req.body.userMiddlename);
                res.send(result.rows[0]);

            }));
        } catch (e) {
            throw(e)
        }
    });

    app.get('/login', forwardAuthenticated,function (req, res) {
        console.log('3fsf')
        
            res.render('login', {
                title: "Log in",
                userData: req.user,
                messages: {danger: req.flash('danger'), warning: req.flash('warning'), success: req.flash('success')}
            });
        

    });

    app.get('/logout', function (req, res) {
        console.log(req.isAuthenticated());
        req.logout();
        console.log(req.isAuthenticated());
        req.flash('success', "Logged out. See you soon!");
        res.redirect('/');
    });

        app.post('/login', passport.authenticate('local', {
            successRedirect: '/account',
            failureRedirect: '/login',
            failureFlash: true
            }), function(req, res) {
            if (req.body.remember) {
            req.session.cookie.maxAge = 30 * 24 * 60 * 60 * 1000; // Cookie expires after 30 days
            } else {
            req.session.cookie.expires = false; // Cookie expires at end of session
            }
            res.redirect('/');
            });

}

passport.use('local', new LocalStrategy({passReqToCallback: true}, (req, username, password, done) => {

        loginAttempt();

        async function loginAttempt() {
            const client = await pool.connect()
            try {
                await client.query('BEGIN')
                var currentAccountsData = await JSON.stringify(client.query('select "WorkerSurname", "WorkerName", "WorkerMiddleName", "WorkerType", "Brigade_fk", "Login", "Password" from "Workers" where "Login"=$1'
                    , [username], function (err, result) {
                        if (err) {
                            return done(err)
                        }
                        if (result.rows[0] == null) {
                            console.log("HELLO");

                            req.flash('danger', "Oops. Incorrect login details.");
                            return done(null, false);
                        } else {
                            bcrypt.compare(password, result.rows[0].Password, function (err, check) {
                                if (err) {
                                    console.log(password, result.rows[0].Password);
                                    console.log('Error while checking password');
                                    return done();
                                } else if (check) {
                                    console.log('Удачно')
                                    return done(null, [{
                                        email: result.rows[0].Login,
                                        firstName: result.rows[0].WorkerSurname,
                                        name: result.rows[0].WorkerName,
                                        MiddleName: result.rows[0].WorkerMiddleName,
                                        typeWorker: result.rows[0].WorkerType,
                                        NumBr: result.rows[0].Brigade_fk
                                    }]);
                                } else {
                                    req.flash('danger', "Oops. Incorrect login details.");
                                    return done(null, false);
                                }
                            });
                        }
                    }))
            } catch (e) {
                throw (e);
            }
        };

    }
))


passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    done(null, user);
});