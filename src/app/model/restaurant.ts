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
  city: {
    type: String,
    required: true,
  },
  state_ab: {
    type: String,
    required: true,
  },
}, {
  versionKey: false,
});

export default model('restaurants', restaurantSchema);