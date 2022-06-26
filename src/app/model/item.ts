import { model, Schema, Types } from 'mongoose';
const { ObjectId } = Types;

const itemSchema = new Schema({
  name: {
    type: String,
    required:  true,
  },
  description: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  restaurantId: {
    type: ObjectId,
    required: true,
  },
}, {
  versionKey: false,
});

export default model('items', itemSchema);