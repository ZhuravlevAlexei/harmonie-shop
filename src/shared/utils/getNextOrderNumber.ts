import { Counter } from '@/db/models/counters';

export async function getNextOrderNumber() {
  const result = await Counter.findByIdAndUpdate(
    { _id: 'order' },
    { $inc: { seq: 1 } },
    { upsert: true, new: true }
  );

  const number = result.seq.toString().padStart(5, '0'); // '00001', '00002'
  return `H-${number}`;
}
