import React, { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { notification, Form, Input, Button } from 'antd';

const Register = () => {
  const [form] = Form.useForm();
  const { user, register } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/profile');
    }
  }, [user, navigate]);

  const onFinish = async (values) => {
    try {
      await register(values.name, values.email, values.password);
      notification.success({
        message: 'Ro\'yxatdan o\'tish muvaffaqiyatli!',
        description: 'Siz tizimga kirdingiz.'
      });
      navigate('/profile');
    } catch (error) {
      notification.error({
        message: 'Xatolik!',
        description: error.response?.data?.message || 'Ro\'yxatdan o\'tishda xatolik yuz berdi.'
      });
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow bg-white">
      <h2 className="text-2xl font-semibold mb-6">Register</h2>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
      >
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
