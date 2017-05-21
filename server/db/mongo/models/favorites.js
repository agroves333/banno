/**
 * Schema Definitions
 *
 */
import mongoose from 'mongoose';

const FavoriteSchema = new mongoose.Schema({
  id: String,
  videoId: String,
  title: String,
  publishedAt: Date,
  description: String,
  thumbnailUrl: String,
  date: { type: Date, default: Date.now }
});


FavoriteSchema.index({videoId: 1}, {unique: true});

// Compiles the schema into a model, opening (or creating, if
// nonexistent) the 'Favorite' collection in the MongoDB database
export default mongoose.model('Favorite', FavoriteSchema);

