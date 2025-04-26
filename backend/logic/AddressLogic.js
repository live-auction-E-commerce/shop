import mongoose from 'mongoose';
import Address from '..\models\Address.js';
import User from '..\models\User.js';

export const createAddress = async (data) =>
{
  if (!mongoose.Types.ObjectId.isValid(data.userId))
      throw new Error("Invalid userId: must be an objectId of mongoDB");
  const user = await User.findById(data.userId);
  if (!user){
   throw new Error ("User not found");
  }
   if (data.userId == null){
      throw new Error ("userId must not be null or underfined");
  }
}
