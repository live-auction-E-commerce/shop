import Product from '../models/Product';

export const createProduct = async (data) => {
  if (
    !data.ownerId ||
    !data.name ||
    !data.category ||
    !data.brand ||
    !data.condition ||
    !data.size
  ) {
    throw new Error(
      'Missing required fields, required fields are ownerId, name, category, brand, condition and size.'
    );
  }
};
