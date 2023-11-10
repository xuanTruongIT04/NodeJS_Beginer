const path = require('path');
const express = require('express');
const morgan = require('morgan');
const hbs = require('express-handlebars');
const app = express();
const port = 3000;
const methodOverride = require('method-override');

const sortMiddlewate = require('./app/middlewares/SortMiddleware');

const route = require('./routes/index.router');
//CONNECT DB
const db = require('./config/db');
db.connect();

//SET DEFAULT PATH
app.use(express.static(path.join(__dirname, 'public/')));

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Custom middleware
app.use(sortMiddlewate);

// Overried method form
app.use(methodOverride('_method'));

// HTTP logger
app.use(morgan('combined'));

// Template engine
app.engine(
    'hbs',
    hbs.engine({
        extname: '.hbs',
        helpers: require('./helpers/handlebars'),
    }),
);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));

//Route init
route(app);

app.listen(port, () =>
    console.log(`App listening at http://localhost:${port}`),
);
