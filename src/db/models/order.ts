import { InferSchemaType, model, Schema, models } from 'mongoose';

export const orderSchema = new Schema(
  {
    orderDate: Date,
    firstName: String,
    lastName: String,
    phone: String,
    email: String,
    comment: String,
    deliveryType: String,
    location: String,
    deliveryLocation: String,
    division: String,
    items: [
      {
        productId: Number,
        main_image: String,
        name: String,
        quantity: Number,
        price: Number,
      },
    ],
    totalAmount: Number,
    status: {
      type: String,
      enum: ['new', 'accepted ', 'completed', 'canceled'],
      default: 'new',
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export type OrderType = InferSchemaType<typeof orderSchema>;
export const OrdersCollection = models.orders || model('orders', orderSchema);
