// src/pages/Register.jsx
import React, { useState, useContext, useEffect } from 'react';
import { Form, Input, Button, Alert } from 'antd';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [form] = Form.useForm();
  const { user, register } = useContext(AuthContext);
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');

  // Agar foydalanuvchi allaqachon tizimga kirgan bo'lsa, avtomatik profile o'ting
  useEffect(() => {
    if (user) {
      navigate('/profile');
    }
  }, [user, navigate]);

  const onFinish = async (values) => {
    try {
      setErrorMessage(''); // Xatolik xabarini tozalash
      await register(values.name, values.email, values.password);
      navigate('/profile');
    } catch (error) {
      // Agar backend 404 yoki boshqa xato javobini qaytarsa, u yerda xatolik xabarini ko'rsatamiz
      const message =
        error.response?.data?.message ||
        'Ro\'yxatdan o\'tishda xatolik yuz berdi. Iltimos, ma\'lumotlarni tekshiring yoki keyinroq urinib ko\'ring.';
      setErrorMessage(message);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow bg-white">
      <h2 className="text-2xl font-semibold mb-6">Register</h2>
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item
          label="Ism"
          name="name"
          rules={[{ required: true, message: 'Iltimos, ismingizni kiriting!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: 'Iltimos, email kiriting!' }]}
        >
          <Input type="email" />
        </Form.Item>
        <Form.Item
          label="Parol"
          name="password"
          rules={[{ required: true, message: 'Iltimos, parol kiriting!' }]}
        >
          <Input.Password />
        </Form.Item>
        {/* Agar errorMessage ni set qilsak, u yerda Alert komponenti orqali xabar ko'rsatiladi */}
        {errorMessage && (
          <Form.Item>
            <Alert message={errorMessage} type="error" showIcon />
          </Form.Item>
        )}
        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Ro'yxatdan o'tish
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Register;
