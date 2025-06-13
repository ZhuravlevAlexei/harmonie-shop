import { InferSchemaType, model, Schema, models, Types } from 'mongoose';

export const orderSchema = new Schema(
  {
    orderDate: Date,
    orderNumber: String,
    firstName: String,
    lastName: String,
    phone: String,
    email: String,
    comment: String,
    deliveryType: String,
    location: String,
    deliveryLocation: String,
    division: String,
    TTN: String,
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
      enum: ['new', 'accepted', 'completed', 'canceled'],
      default: 'new',
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export type OrderType = InferSchemaType<typeof orderSchema>;
export type OrderDocumentType = OrderType & { _id: Types.ObjectId };
export const OrdersCollection = models.orders || model('orders', orderSchema);
