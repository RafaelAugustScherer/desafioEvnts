import { model, Schema } from 'mongoose';

const restaurantSchema = new Schema({
  name: {
    type: String,
    required:  true,
  },
  type: {
    type: String,
    required: true,
  },
}, {
  versionKey: false,
});

export default model('restaurants', restaurantSchema);