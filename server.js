const express = require('express');
//const routes = require('./routes');
const path = require('path');
const exphbs = require('express-handlebars');
const session = require('express-session');
const sequelize = require('./config/connection');
const SessionStore = require('connect-session-sequelize')(session.Store);

const routes = require('./controllers');
//const helpers = require('./helpers');

const app = express();
const PORT = process.env.PORT || 3001;

const hbs = exphbs.create({  });
const sess = {
   
  secret: 'Super secret secret',
  cookie: {
    maxAge: 300000,
    httpOnly: true,
    secure: false,
    sameSite: 'strict',

  },
  resave: false,
  saveUninitialized: true,
  store: new SessionStore({
    db: sequelize,
  })
};
// set up session to be used in application
app.use(session(sess));
// enable handlebars usage in app, enable the enbgine
app.engine('handlebars', hbs.engine);
// define that handlebars is the view engine
app.set('view engine', 'handlebars');

  // Enable json parsing through express
app.use(express.json());

// enable urlencoded parsing through express
app.use(express.urlencoded({ extended: true }));

// setup static folder public root path
app.use(express.static(path.join(__dirname, 'public')));

// serve routes
app.use(routes);


// sync sequelize models to the database, then turn on the server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening to http://localhost:' + PORT));
});

// 1. data 
// 1.1 config/connection.js
// 1.2 models
// 1.3 seeds
// 1.4 schema.sql
// 2. views