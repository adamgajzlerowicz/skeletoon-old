import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import bodyParser from 'body-parser';

import { hash } from '../.env.json';


const port = process.env.PORT || 8080;
const path = require('path');

const app = express();
app.use(bodyParser.urlencoded({
    extended: true,
}));
app.use(bodyParser.json());

// console.log(bcrypt.hashSync('dupa', 10));

const user = {
    name: 'dupa',
    email: 'dupa@poo.com',
};

const DBpassword = '$2a$10$kNm1ChJZ8.4WJTopz8BJQO1pTyEqgTwcPWTquEUjqQTe4Ff//Iktq';

/**
 *          Router
 */
app.post('/auth/login', (req, res) => {
    const { body: { username, password } } = req;

    if (!username) {
        return res.status(403).json({
            error: 'Username is missing',
        });
    }

    if (!password) {
        return res.status(403).json({
            error: 'Password is missing',
        });
    }

    if (username !== user.name) {
        return res.status(403).json({
            error: 'Wrong credentials',
        });
    }

    bcrypt.compare(password, DBpassword).then((valid) => {
        if (!valid) {
            return res.status(403).json({
                error: 'Wrong credentials',
            });
        }

        const token = jwt.sign(user, hash, {
            expiresIn: 60 * 60 * 24, // expires in 24 hours
        });

        return res.json({ user, token });
    });
    return true;
});

app.use('/static', express.static(path.join(__dirname, '../build/static')));

app.all('*', (req, res) => {
    res.sendFile(path.join(`${__dirname}/../build/index.html`));
});


app.listen(port);
// eslint-disable-next-line
console.log(`http://localhost:${port}`);
