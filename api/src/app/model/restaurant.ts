import { model, Schema, InferSchemaType } from 'mongoose';

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

export type Restaurant = InferSchemaType<typeof restaurantSchema>;

export default model('restaurants', restaurantSchema);