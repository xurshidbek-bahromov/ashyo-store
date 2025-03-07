import React, { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext'; // Import ThemeContext
import { CartContext } from '../context/CartContext';
import { List, Button, InputNumber, Typography, Divider } from 'antd';

const { Title, Text } = Typography;

const Cart = () => {
  const { darkMode } = useContext(ThemeContext); // Use darkMode from ThemeContext

  const {
    cart,
    removeFromCart,
    updateCartItemQuantity,
    getTotalPrice,
    clearCart,
  } = useContext(CartContext);

  if (cart.length === 0) {
    return (
      <div className="p-4 text-center">
        <Title level={2}>Savatchangiz bo'sh</Title>
      </div>
    );
  }

  return (
    <div className={`container mx-auto p-4 ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}>
      <Title level={2}>Savatcha</Title>
      <List
        itemLayout="horizontal"
        dataSource={cart}
        renderItem={(item) => (
          <List.Item
            className="rounded-md p-8 transition transform cursor-pointer hover:shadow-lg"
            actions={[
              <InputNumber
                min={1}
                value={item.quantity}
                onChange={(value) =>
                  updateCartItemQuantity(item.id, value)
                }
              />,
              <Button
                type="link"
                danger
                onClick={() => removeFromCart(item.id)}
              >
                O'chirish
              </Button>,
            ]}
          >
            <List.Item.Meta
              avatar={
                <img
                  src={item.image || 'https://via.placeholder.com/80'}
                  alt={item.name}
                  width={80}
                  className="rounded"
                />
              }
              title={item.name}
              description={<Text strong>Narxi: ${item.price}</Text>}
            />
            <div>
              <Text>
                Jami: ${item.price * item.quantity}
              </Text>
            </div>
          </List.Item>
        )}
      />
      <Divider />
      <div className="flex justify-between items-center">
        <Title level={4}>Umumiy summa: ${getTotalPrice()}</Title>
        <Button type="primary">Buyurtma berish</Button>
      </div>
      <Button type="link" onClick={clearCart}>
        Savatchani tozalash
      </Button>
    </div>
  );
};

export default Cart;
