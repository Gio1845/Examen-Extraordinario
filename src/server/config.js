const path = require('path');
const exphbs = require('express-handlebars');

const morgan = require('morgan');
const multer = require('multer');
const express = require('express');
const errorHandler = require('errorhandler');

const routes = require('../routes/index'); 


const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access');  
const handlebars = require('handlebars');
module.exports = app => {

    app.set('port', process.env.PORT || 3000);
    app.set('views', path.join(__dirname, '../views'));
    app.engine('.hbs', exphbs({
        defaultLayout: 'main',
        partialsDir: path.join(app.get('views'), 'partials'),
        layoutsDir: path.join(app.get('views'), 'layouts'),
        extname: '.hbs',
        helpers: require('./helpers'),
        handlebars: allowInsecurePrototypeAccess(handlebars)
    }));
    app.set('view engine', '.hbs');

    app.use(morgan('dev'));
    app.use(multer({dest: path.join(__dirname, '../public/upload/temp')}).single('image'));
    app.use(express.urlencoded({extended:false}));
    app.use(express.json());

    routes(app);

    app.use('/public',express.static(path.join(__dirname, '../public')));

    if('development' === app.get('env')) {
        app.use(errorHandler);
    }
    

    return app;
}