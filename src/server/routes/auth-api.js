const express = require('express');
const passport = require('passport');

const Users = require('../db/users');

const router = express.Router();

router.post('/login', passport.authenticate('local'), (req, res) => {

    res.status(204).send();
});

router.post('/signup', function (req, res) {

    const created = Users.createUser(req.body.userId, req.body.password, req.body.myOwnPokemons);

    if (!created) {
        res.status(400).send();
        return;
    }

    passport.authenticate('local')(req, res, () => {
        req.session.save((err) => {
            if (err) {
                //shouldn't really happen
                res.status(500).send();
            } else {
                res.status(201).send();
            }
        });
    });
});

router.post('/logout', function (req, res) {

    req.logout();
    res.status(204).send();
});


/*
    Just return the id of the user, if the request is
    authenticated with a valid session cookie
 */
router.get('/user', function (req, res) {

    if (!req.user) {
        res.status(401).send();
        return;

    }

    res.status(200).json({

            id: req.user.id,
            balance: req.user.balance,
            myOwnPokemons: req.user.myOwnPokemons,
        }

    );
    console.log("auth-api.js, get/user ..." + req.user.id + " balance: " + req.user.balance, "pokèmon's : " + req.user.myOwnPokemons)
});


router.post("/api/transfers", (req, res) => {

    if(! req.user){
        res.status(401).send();
        return;
    }

    const dto = req.body;

    const from = req.user.id;
    const to = dto.to;
    const amount = dto.amount;

    /*
        The user is authenticated... but is s/he "authorized" to make such transfer?
        For example, it would be easy to steal money by specifying the "from" field being
        someone else different from "user".
        If a user is not authorized to do an action, then we should return a 403.
        However, here the "from" is not part of the body payload of the request, but
        rather derived on the server based on the sent cookie.
        And, as such, in "theory" it should always be correct...
     */

    const transferred = Repository.transferMoney(from, to, amount);

    /*
        In general, we would not need to support
        both Form and JSON in the same App: just JSON.
        Form-submissions are mainly used in server-side
        rendering apps with no/limited JS.
        However, here we support both just for didactic reasons.

        As in the GUI we have possibility to submit an actual HTML form (without AJAX),
        we need to tell the browser what to do after the POST is sent.
        In this case, we do a 302 redirect toward the homepage (which will do a GET).
        Note: this is not needed when using AJAX, as we do not reload a whole HTML page.
     */

    const form = req.is("application/x-www-form-urlencoded");

    if(form){
        res.status(302);
        if(transferred) {
            //back to home page
            res.location("/");
        } else {
            /*
                Note: we do not support it in the GUI,
                but the use of query params is what
                usually employed when displaying errors
                coming from a Form request.
             */
            res.location("/?error=true");
        }
        res.send();
    } else {
        //JSON
        if (transferred) {
            res.status(204);
        } else {
            res.status(400);
        }

        res.send();
    }
});



module.exports = router;
