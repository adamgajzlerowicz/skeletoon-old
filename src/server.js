// @flow

import express from 'express';
import bodyParser from 'body-parser';

import { login, register } from './auth/user';
import { validateEmail, isStrongPassword } from './helpers';

import type { $Request, $Response } from 'express';

const port = process.env.PORT || 8080;
const path = require('path');

require('dotenv').config({ path: '.env.server.local' });

const app = express();

app.use(bodyParser.urlencoded({
    extended: true,
}));

app.use(bodyParser.json());


app.post('/rest/auth/login', async (req: $Request, res: $Response): $Response => {
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

    try {
        const user = await login(username, password);
        return res.status(200)
            .json(user);
    } catch (e) {
        const stringed = e.toString();
        return res.status(stringed === 'Server error' ? 404 : 403).json({
            error: stringed,
        });
    }
});


app.post('/rest/auth/register', async (req: $Request, res: $Response): $Response => {
    const { body: { username, password, email } } = req;

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

    if (!email || !validateEmail(email)) {
        return res.status(403).json({
            error: 'Email format is incorrect',
        });
    }

    if (!isStrongPassword(password)) {
        return res.status(403).json({
            error: 'Password is not complex enough',
        });
    }
    try {
        const user = await register(username, password, email);
        return res.status(200)
            .json(user);
    } catch (e) {
        return res.status(403).json({
            error: e.toString(),
        });
    }
});

app.use('/static', express.static(path.join(__dirname, '../build/static')));

app.all('*', (req: $Request, res: $Response) => {
    res.sendFile(path.join(`${__dirname}/../build/index.html`));
});


app.listen(port);
// eslint-disable-next-line
console.log(`http://localhost:${port}`);
