import Favorite from '../models/favorites';
import User from '../models/user';

/**
 * List favorites
 */
export function all(req, res) {
  if (req.user) {
    User.findById(req.user.id, (err, user) => {
      if (err) {
        console.log('Error getting user by id');
        return res.status(500).send('Something went wrong getting the user');
      }

      Favorite.find({'_id': {$in: user.favorites}}, (err, favorites) => {
        if (err) {
          console.log('Error getting favorites');
          return res.status(400).send('Something went wrong getting favorites');
        }
        return res.json(favorites);
      });
    });
  } else {
    console.log('Not logged in');
    return res.status(400).send('Not logged in');
  }
}

/**
 * Add a favorite
 */
export function add(req, res) {
  if (req.user) {
    Favorite.create(req.body, (err, favorite) => {
      if (err) {
        console.log(err);
        return res.status(400).send(err);
      }

      const data = {$push: {favorites:favorite}};
      User.findByIdAndUpdate(req.user.id, data, (err) => {
        if (err) {
          console.log('Error on save!');
          return res.status(500).send('We failed to save for some reason');
        }
      });
      return res.status(200).send('OK');
    });
  } else {
    console.log('Not logged in');
    return res.status(400).send('Not logged in');
  }
}

/**
 * Remove a favorite
 */
export function remove(req, res) {
  if (req.user) {

    // Remove favorite
    Favorite.findOneAndRemove({videoId: req.params.id}, (err, favorite) => {
      if (err) {
        console.log('Error on delete');
        return res.status(500).send('We failed to delete for some reason');
      }

      console.log(favorite._id);
      // Remove favorite reference from user
      User.findByIdAndUpdate(req.user.id, {$pull: {favorites: favorite._id}}, function(err){
        if (err) {
          console.log(err, 'Error on unsave!');
          return res.status(500).send('We failed to unsave for some reason');
        }
      });

      return res.status(200).send('Removed Successfully');
    });

  } else {
    console.log('Not logged in');
    return res.status(400).send('Not logged in');
  }
}

export default {
  all,
  add,
  remove
};
