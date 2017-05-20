/**
 * Schema Definitions
 *
 */
import mongoose from 'mongoose';

const FavoriteSchema = new mongoose.Schema({
  id: String,
  title: String,
  publishedAt: Date,
  description: String,
  thumbnailUrl: String,
  date: { type: Date, default: Date.now }
});

// Compiles the schema into a model, opening (or creating, if
// nonexistent) the 'Favorite' collection in the MongoDB database
export default mongoose.model('Favorite', FavoriteSchema);

