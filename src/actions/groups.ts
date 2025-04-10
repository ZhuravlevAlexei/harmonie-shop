import connectDB from '../db/connectDB';
import { GroupsCollection, GroupType } from '../db/models/group';
import { HiddenGroups } from '@/shared/constants/hidden';

export async function getGroups(): Promise<GroupType[]> {
  try {
    await connectDB();
    const groups = await GroupsCollection.find({
      id: { $nin: HiddenGroups },
    });

    return groups;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
