// src/pages/Products.jsx
import React, { useEffect, useState, useContext } from 'react';
import { Card, Button, Spin, notification } from 'antd';
import { ThemeContext } from '../context/ThemeContext';
import { FavoritesContext } from '../context/FavoritesContext';
import { CartContext } from '../context/CartContext';
import {
  HeartOutlined,
  HeartTwoTone,
  ShoppingCartOutlined,
} from '@ant-design/icons';

const Products = () => {
  const { darkMode } = useContext(ThemeContext);
  const { toggleFavorite, isFavorite } = useContext(FavoritesContext);
  const { addToCart } = useContext(CartContext);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Dummy mahsulotlar – haqiqiy API bo'lsa, axios so'rovini qo'llang
  const fetchProducts = async () => {
    try {
      const dummyProducts = [
        { id: 1, name: "Product A", price: 100, image: "https://via.placeholder.com/400x300?text=Product+A" },
        { id: 2, name: "Product B", price: 150, image: "https://via.placeholder.com/400x300?text=Product+B" },
        { id: 3, name: "Product C", price: 250, image: "https://via.placeholder.com/400x300?text=Product+C" },
        { id: 4, name: "Product D", price: 350, image: "https://via.placeholder.com/400x300?text=Product+D" },
        { id: 5, name: "Product E", price: 200, image: "https://via.placeholder.com/400x300?text=Product+E" },
        { id: 6, name: "Product F", price: 175, image: "https://via.placeholder.com/400x300?text=Product+F" },
        { id: 7, name: "Product G", price: 225, image: "https://via.placeholder.com/400x300?text=Product+G" },
        { id: 8, name: "Product H", price: 300, image: "https://via.placeholder.com/400x300?text=Product+H" },
      ];
      setProducts(dummyProducts);
    } catch (error) {
      notification.error({
        message: 'Error loading products',
        description: error.response?.data?.message || 'Server error occurred.',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spin size="large" />
      </div>
    );

  return (
    <div
      className={`container mx-auto p-6 ${
        darkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'
      }`}
    >
      <h2 className="text-3xl font-bold text-center mb-6">Featured Products</h2>
      {/* Responsive grid layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <Card
            key={product.id}
            hoverable
            className="rounded-lg shadow-lg transition transform hover:scale-105"
            cover={
              <img
                alt={product.name}
                src={product.image}
                className="object-cover h-48 w-full transition duration-300 hover:opacity-90"
              />
            }
          >
            <Card.Meta
              title={product.name}
              description={
                <span className="font-semibold">Price: ${product.price}</span>
              }
            />
            <div className="mt-4 flex flex-col gap-2">
              <Button
                onClick={() => addToCart(product)}
                type="primary"
                icon={<ShoppingCartOutlined />}
                className="w-full"
              >
                Add to Cart
              </Button>
              <Button
                onClick={() => toggleFavorite(product)}
                type="default"
                className="w-full flex items-center justify-center"
              >
                {isFavorite(product) ? (
                  <>
                    <HeartTwoTone twoToneColor="#eb2f96" className="mr-1" /> Liked
                  </>
                ) : (
                  <>
                    <HeartOutlined className="mr-1" style={{ color: darkMode ? '#fff' : '#000' }} /> Like
                  </>
                )}
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Products;
