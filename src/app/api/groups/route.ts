import { NextResponse } from 'next/server';

import connectDB from '@/db/connectDB';
import { HiddenGroups } from '@/shared/constants/hidden';
import { GroupsCollection } from '@/db/models/group';

export async function GET() {
  try {
    await connectDB();

    const groups = await GroupsCollection.find({
      id: { $nin: HiddenGroups },
    });
    return NextResponse.json({ groups });
  } catch (e) {
    console.log('Server error /groups', e);
  }
}
