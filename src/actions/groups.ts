import { GroupsCollection, GroupType } from '../db/models/group';
import connectDB from '../db/connectDB';

export async function getGroups(): Promise<GroupType[]> {
  try {
    await connectDB();
    const groups = await GroupsCollection.find();

    return groups;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
