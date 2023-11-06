const path = require('path');
const express = require('express');
const morgan = require('morgan');
const hbs = require('express-handlebars');
const app = express();
const port = 3000;

const route = require('./routes/index.router');

//SET DEFAULT PATH
app.use(express.static(path.join(__dirname, 'public/')));

// Middleware
app.use(
    express.urlencoded({
        extened: true,
    }),
);
app.use(express.json());

// HTTP logger
app.use(morgan('combined'));

// Template engine
app.engine(
    'hbs',
    hbs.engine({
        extname: '.hbs',
    }),
);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources/views'));

//Route init
route(app);

app.listen(port, () =>
    console.log(`Example app listening at http://localhost:${port}`),
);
