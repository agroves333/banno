import _ from 'lodash';
import Favorite from '../models/favorites';

/**
 * List favorites
 */
export function all(req, res) {
  Favorite.find({}).exec((err, favorites) => {
    if (err) {
      console.log('Error in first query');
      return res.status(500).send('Something went wrong getting the data');
    }

    return res.json(favorites);
  });
}

/**
 * Add a favorite
 */
export function add(req, res) {
  Favorite.create(req.body, (err) => {
    if (err) {
      console.log(err);
      return res.status(400).send(err);
    }

    return res.status(200).send('OK');
  });
}

/**
 * Update a favorite
 */
export function update(req, res) {
  const query = { id: req.params.id };
  const omitKeys = ['id', '_id', '_v'];
  const data = _.omit(req.body, omitKeys);

  Favorite.findOneAndUpdate(query, data, (err) => {
    if (err) {
      console.log('Error on save!');
      return res.status(500).send('We failed to save for some reason');
    }

    return res.status(200).send('Updated successfully');
  });
}

/**
 * Remove a favorite
 */
export function remove(req, res) {
  const query = { videoId: req.params.id };
  Favorite.findOneAndRemove(query, (err) => {
    if (err) {
      console.log('Error on delete');
      return res.status(500).send('We failed to delete for some reason');
    }

    return res.status(200).send('Removed Successfully');
  });
}

export default {
  all,
  add,
  update,
  remove
};
