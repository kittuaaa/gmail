const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const app = express();

app.set('port', (3000));

app.use(express.json());
app.use(express.urlencoded({extended: false}));

// enable cors
app.use(cors());
app.options('*', cors());
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    next();
});

// logger layer
app.use(morgan('dev'));

// load controller
require('./controller/gmail-controller')(app);
require('./controller/users-controller')(app);

// load route
require('./routes/gmail-routes')(app);
require('./routes/users-routes')(app);

app.listen(app.get('port'), () => console.log(`Stack listening on port ${app.get('port')}`));
