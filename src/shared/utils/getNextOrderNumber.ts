import { Counter } from '@/db/models/counters';

export async function getNextOrderNumber() {
  const result = await Counter.findByIdAndUpdate(
    { _id: 'order' },
    { $inc: { seq: 1 } },
    { upsert: true, new: true }
  );

  const number = result.seq.toString().padStart(4, '0'); // '0001', '0002'
  return `ORDER-${number}`;
}
