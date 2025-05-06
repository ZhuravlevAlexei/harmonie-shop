import { InferSchemaType, model, models, Schema } from 'mongoose';

const counterSchema = new Schema({
  _id: { type: String, required: true }, // например: 'order'
  seq: { type: Number, default: 0 },
});

export type Counter = InferSchemaType<typeof counterSchema>;

export const Counter = models.Counter || model('Counter', counterSchema);
