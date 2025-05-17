import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProductDetails from '@/components/ui/ProductDetails';
import { fetchAPI } from '@/lib/fetchAPI';

const ProductPage = () => {
  const { id } = useParams();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchListing() {
      setLoading(true);
      try {
        const data = await fetchAPI(`/listings/${id}`);
        setListing(data);
      } catch (err) {
        setError('Failed to load product.');
      } finally {
        setLoading(false);
      }
    }

    if (id) fetchListing();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!listing) return <p>Product not found</p>;

  return <ProductDetails listing={listing} />;
};

export default ProductPage;
