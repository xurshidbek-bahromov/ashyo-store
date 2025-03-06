import React, { useEffect, useState, useContext } from 'react';
import { Card, Row, Col, Spin, notification, Button } from 'antd';
import { CartContext } from '../context/CartContext';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useContext(CartContext);

  const fetchProducts = async () => {
    try {
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

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spin size="large" />
      </div>
    );

  return (
    <div className="container mx-auto p-4">
      <Row gutter={[16, 16]}>
        {products.map((product) => (
          <Col xs={24} sm={12} md={8} lg={6} key={product.id}>
            <Card
              hoverable
              className="rounded-lg shadow-lg transition transform hover:scale-105 bg-white dark:bg-gray-800"
              cover={
                <img
                  alt={product.name}
                  src={product.image || 'https://via.placeholder.com/200'}
                  className="object-cover h-48 w-full"
                />
              }
            >
              <Card.Meta
                title={product.name}
                description={<span className="font-semibold">Narxi: ${product.price}</span>}
              />
              <div className="mt-2">
                <Button
                  type="primary"
                  block
                  onClick={() => addToCart(product)}
                >
                  Savatchaga qo'shish
                </Button>
              </div>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Products;
