// src/components/ScrollProducts.jsx
import React, { useState, useEffect, useContext } from 'react';
import { Card, Row, Col, Spin, notification, Button } from 'antd';
import { CartContext } from '../context/CartContext';
import useOnScreen from '../hooks/useOnScreen';

const ScrollProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useContext(CartContext);

  // Mahsulotlarni olish funksiyasi:
  const fetchProducts = async () => {
    try {
      // API qo'llanilishi mumkin. Quyidagi dummy data misoli:
      const dummyProducts = [
        { id: 1, name: "Mahsulot 1", price: 100, image: "https://via.placeholder.com/200" },
        { id: 2, name: "Mahsulot 2", price: 150, image: "https://via.placeholder.com/200" },
        { id: 3, name: "Mahsulot 3", price: 250, image: "https://via.placeholder.com/200" },
        { id: 4, name: "Mahsulot 4", price: 300, image: "https://via.placeholder.com/200" },
      ];
      setProducts(dummyProducts);
    } catch (error) {
      notification.error({
        message: 'Mahsulotlarni yuklashda xatolik',
        description: error.response?.data?.message || 'Serverda xatolik yuz berdi.',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-gray-100 mb-8">
        Featured Products
      </h2>
      <Row gutter={[16, 16]}>
        {products.map((product, index) => (
          <ProductCard key={product.id} product={product} index={index} addToCart={addToCart} />
        ))}
      </Row>
    </div>
  );
};

const ProductCard = ({ product, index, addToCart }) => {
  // Har bir karta uchun useOnScreen hook dan foydalanamiz
  const [ref, isVisible] = useOnScreen({ threshold: 0.3 });

  return (
    <Col xs={24} sm={12} md={8} lg={6} ref={ref}>
      <div
        // Agar isVisible true bo'lsa, opacity 100 va translate-y 0; aks holda, opacity 0 va pastga siljish.
        className={`transition-all duration-700 transform ${
          isVisible
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-10'
        }`}
        // Qo'shimcha delay qo'shish uchun inline style: index * 0.2s
        style={{ transitionDelay: `${index * 0.2}s` }}
      >
        <Card
          hoverable
          className="rounded-lg shadow-lg bg-white dark:bg-gray-800"
          cover={
            <img
              alt={product.name}
              src={product.image || 'https://via.placeholder.com/200'}
              className="object-cover h-48 w-full transition duration-300 hover:opacity-90"
            />
          }
        >
          <Card.Meta
            title={product.name}
            description={<span className="font-semibold">Narxi: ${product.price}</span>}
          />
          <div className="mt-2">
            <Button type="primary" block onClick={() => addToCart(product)}>
              Savatchaga qo'shish
            </Button>
          </div>
        </Card>
      </div>
    </Col>
  );
};

export default ScrollProducts;
