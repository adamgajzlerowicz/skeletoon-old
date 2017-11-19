// @flow

import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import bodyParser from 'body-parser';

import type { $Request, $Response } from 'express';

// $FlowFixMe
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

const DBpassword: string = '$2a$10$kNm1ChJZ8.4WJTopz8BJQO1pTyEqgTwcPWTquEUjqQTe4Ff//Iktq';

app.post('/auth/login', (req: $Request, res: $Response): $Response => {
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

    bcrypt.compare(password, DBpassword).then((valid: boolean): $Response => {
        if (!valid) {
            return res.status(403).json({
                error: 'Wrong credentials',
            });
        }

        const token = jwt.sign(user, hash, {
            expiresIn: 60 * 60 * 24, // expires in 24 hours
        });
        return res.status(200).json({ user, token });
    });

    return res.status(404);
});

app.use('/static', express.static(path.join(__dirname, '../build/static')));

app.all('*', (req: $Request, res: $Response) => {
    res.sendFile(path.join(`${__dirname}/../build/index.html`));
});


app.listen(port);
// eslint-disable-next-line
console.log(`http://localhost:${port}`);
