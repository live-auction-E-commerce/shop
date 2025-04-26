
import Address from '../models/Address.js';
import { validateObjectId } from '../lib/utils.js';

export const createAddress = async (data) => {
  if(!data.userId){
    throw new Error("userId is required");
  }
  validateObjectId(data.userId);

  if (data.isDefault) {    
    await Address.updateMany(
      { userId: data.userId }, 
      { $set: { isDefault: false } }
    );
  }

  const address = new Address({
    userId: data.userId,        
    description: data.description,
    street: data.street,
    number: data.number,
    city: data.city,
    country: data.country,
    isDefault: data.isDefault || false,
  });
  
  await address.save();
  
  return address;
};


export const getAllAddressByUser = async (userId) => {
 validateObjectId(userId);

  const addresses = await Address.find({userId}).sort({isDefault: -1, createdAt: -1});
  
  return addresses;
}



export const updateAddress = async (addressId, data) => {
  validateObjectId(addressId);

  const { isDefault } = data;

  if (isDefault) {
    const address = await Address.findById(addressId);
    if (!address) {
      throw new Error('Address not found');
    }
    
    await Address.updateMany(
      { userId: address.userId },
      { $set: { isDefault: false } }
    );
  }

  const updatedAddress = await Address.findByIdAndUpdate(
    addressId,
    { $set: data },
    { new: true, runValidators: true }
  );

  if (!updatedAddress) {
    throw new Error('Address not found');
  }

  return updatedAddress;
};

