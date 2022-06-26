import { model, Schema, Types } from 'mongoose';
const { ObjectId } = Types;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  restaurantId: {
    type: ObjectId,
    required: false,
  },
  lat: {
    type: Number,
    required: false,
  },
  lng: {
    type: Number,
    required: false,
  },
}, {
  versionKey: false,
});

export default model('users', userSchema);