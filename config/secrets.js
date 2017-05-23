/** Important **/
/** You should not be committing this file to GitHub **/
/** Repeat: DO! NOT! COMMIT! THIS! FILE! TO! YOUR! REPO! **/
export const sessionSecret = process.env.SESSION_SECRET || 'Your Session Secret goes here';
export const google = {
  clientID: process.env.GOOGLE_CLIENTID || '539302695295-ecuo2d0qjdksa1o1iis8ig3130cqrbsa.apps.googleusercontent.com',
  clientSecret: process.env.GOOGLE_SECRET || '2velk2DAwJAJE5qoXYFlfzWX',
  callbackURL: process.env.GOOGLE_CALLBACK || '/auth/google/callback'
};

