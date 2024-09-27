import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://blogweb-9heo.onrender.com/products'); // Replace with your API endpoint
        setProducts(response.data);
      } catch (err) {
        setError('Failed to fetch products');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="container mx-auto my-10 p-4">
      <h1 className="text-2xl font-bold mb-4">Products</h1>
      <ul>
        {products.map((product) => (
          <li key={product._id} className="mb-4 border p-4 rounded">
            <h2 className="text-xl font-semibold">{product.name}</h2>
            <p>{product.description}</p>
            <p className="font-bold">${product.price.toFixed(2)}</p> {/* Assuming price is a number */}
            {product.image && (
              <img src={product.image} alt={product.name} className="mt-2 w-32 h-32 object-cover" /> // Assuming there's an image URL
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Products;

