// src/pages/Home.jsx
import React, { useState, useEffect, useContext } from 'react';
import { Carousel, Button, Spin, Card, notification } from 'antd';
import { ThemeContext } from '../context/ThemeContext';
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';
import { FavoritesContext } from '../context/FavoritesContext';
import { Link, useNavigate } from 'react-router-dom';
import { 
  HeartOutlined, 
  HeartTwoTone, 
  ShoppingCartOutlined, 
  SearchOutlined 
} from '@ant-design/icons';

const Home = () => {
  const { darkMode } = useContext(ThemeContext);
  const { user } = useContext(AuthContext);
  const { addToCart } = useContext(CartContext);
  const { toggleFavorite, isFavorite } = useContext(FavoritesContext);
  const navigate = useNavigate();

  const handleProfileClick = () => {
    navigate('/profile');
  };

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Dummy products – agar API ishlatilsa, axios orqali so'rovni o'zgartiring
  const fetchProducts = async () => {
    try {
      const dummyProducts = [
        { id: 1, name: "Product A", price: 100, image: "https://avatars.mds.yandex.net/i?id=2ebed25d49a2ec71e61d58974848f66a_l-5390742-images-thumbs&n=13" },
        { id: 2, name: "Product B", price: 150, image: "https://avatars.mds.yandex.net/i?id=2ebed25d49a2ec71e61d58974848f66a_l-5390742-images-thumbs&n=13" },
        { id: 3, name: "Product C", price: 250, image: "https://avatars.mds.yandex.net/i?id=2ebed25d49a2ec71e61d58974848f66a_l-5390742-images-thumbs&n=13" },
        { id: 4, name: "Product D", price: 350, image: "https://avatars.mds.yandex.net/i?id=2ebed25d49a2ec71e61d58974848f66a_l-5390742-images-thumbs&n=13" },
        { id: 5, name: "Product E", price: 200, image: "https://avatars.mds.yandex.net/i?id=2ebed25d49a2ec71e61d58974848f66a_l-5390742-images-thumbs&n=13" },
        { id: 6, name: "Product F", price: 175, image: "https://avatars.mds.yandex.net/i?id=2ebed25d49a2ec71e61d58974848f66a_l-5390742-images-thumbs&n=13" },
        { id: 7, name: "Product G", price: 225, image: "https://avatars.mds.yandex.net/i?id=2ebed25d49a2ec71e61d58974848f66a_l-5390742-images-thumbs&n=13" },
        { id: 8, name: "Product H", price: 300, image: "https://avatars.mds.yandex.net/i?id=2ebed25d49a2ec71e61d58974848f66a_l-5390742-images-thumbs&n=13" },
      ];
      setProducts(dummyProducts);
    } catch (error) {
      console.error("Error fetching products:", error);
      notification.error({
        message: "Error loading products",
        description: error.response?.data?.message || "Server error occurred.",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className={`${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'} overflow-hidden`}>
      {/* Hero / Banner Qismi: 100vh */}
      <div className="h-screen relative">
        <img
          src="./images/hero-banner.jpg"
          alt="Hero Banner"
          className="w-full h-full object-cover"
        />
        {/* Gradient overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80"></div>
        <div className="absolute inset-0 flex flex-col items-center justify-center px-4">
          <h1 className="text-5xl md:text-7xl font-extrabold drop-shadow-2xl text-center text-white">
            Welcome to Ashyo-Store
          </h1>
          <p className="mt-4 text-xl md:text-2xl text-gray-200 text-center">
            Experience a modern shopping revolution
          </p>
          <Link to="/products" className="mt-8">
            <Button type="primary" size="large" icon={<SearchOutlined />}>
              Explore Products
            </Button>
          </Link>
          {user ? (
            <Button onClick={handleProfileClick} type="link" className="mt-4">
              Go to Profile
            </Button>
          ) : (
            <Link to="/login" className="mt-4">
              <Button type="link">Login</Button>
            </Link>
          )}
        </div>
      </div>

      {/* Mahsulotlar Slider Qismi: 100vh */}
      <div className="h-screen flex flex-col justify-center px-10 bg-gray-100 dark:bg-gray-800 transition-colors">
        <h2 className="text-3xl font-bold text-center mb-8">Featured Products</h2>
        {loading ? (
          <div className="flex justify-center items-center h-full">
            <Spin size="large" />
          </div>
        ) : (
          <Carousel autoplay dots className="h-full">
            {products.map((product) => (
              <div key={product.id} className="flex justify-center items-center h-full">
                <div className="p-11">
                  <Card
                    hoverable
                    className="w-{100%} m-auto rounded-lg shadow-xl overflow-hidden transform transition duration-500 hover:scale-105"
                    style={{ width: 900 }}
                    cover={
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-56 object-cover transition duration-300 hover:opacity-90"
                      />
                    }
                  >
                    <Card.Meta
                      title={product.name}
                      description={<span className="font-semibold">Price: ${product.price}</span>}
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
                </div>
              </div>
            ))}
          </Carousel>
        )}
      </div>
    </div>
  );
};

export default Home;
