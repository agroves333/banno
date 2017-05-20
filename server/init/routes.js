/**
 * Routes for express app
 */
import passport from 'passport';
import request from "request";

import unsupportedMessage from '../db/unsupportedMessage';
import { controllers, passport as passportConfig } from '../db';

const usersController = controllers && controllers.users;
const favoritesController = controllers && controllers.favorites;

export default (app) => {
  // user routes
  if (usersController) {
    app.post('/login', usersController.login);
    app.post('/signup', usersController.signUp);
    app.post('/logout', usersController.logout);
  } else {
    console.warn(unsupportedMessage('users routes'));
  }

  if (passportConfig && passportConfig.google) {
    // google auth
    // Redirect the user to Google for authentication. When complete, Google
    // will redirect the user back to the application at
    // /auth/google/return
    // Authentication with google requires an additional scope param, for more info go
    // here https://developers.google.com/identity/protocols/OpenIDConnect#scope-param
    app.get('/auth/google', passport.authenticate('google', {
      scope: [
        'https://www.googleapis.com/auth/userinfo.profile',
        'https://www.googleapis.com/auth/userinfo.email'
      ]
    }));

    // Google will redirect the user to this URL after authentication. Finish the
    // process by verifying the assertion. If valid, the user will be logged in.
    // Otherwise, the authentication has failed.
    app.get('/auth/google/callback',
      passport.authenticate('google', {
        successRedirect: '/',
        failureRedirect: '/login'
      })
    );
  }

  app.get('/api/suggest', (req, res) => {
    request.get('http://suggestqueries.google.com/complete/search', {
      qs: {
        output: 'toolbar',
        hl: 'en',
        q: req.query.query,
        client: 'firefox'
      }
    }).pipe(res);
  });

  // favorites routes
  if (favoritesController) {
    app.get('/favorite', favoritesController.all);
    app.post('/favorite/:id', favoritesController.add);
    app.put('/favorite/:id', favoritesController.update);
    app.delete('/favorite/:id', favoritesController.remove);
  } else {
    console.warn(unsupportedMessage('favorite routes'));
  }
};
