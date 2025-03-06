import React, { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { notification, Form, Input, Button } from 'antd';

const Login = () => {
  const [form] = Form.useForm();
  const { user, login } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/profile');
    }
  }, [user, navigate]);

  const onFinish = async (values) => {
    try {
      await login(values.email, values.password);
      notification.success({
        message: 'Kirish muvaffaqiyatli!',
        description: 'Siz tizimga kirdingiz.'
      });
      navigate('/profile');
    } catch (error) {
      notification.error({
        message: 'Xatolik!',
        description: error.response?.data?.message || 'Kirishda xatolik yuz berdi.'
      });
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow bg-white">
      <h2 className="text-2xl font-semibold mb-6">Login</h2>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: 'Iltimos, Email kiriting!' }]}
        >
          <Input type="email" />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Iltimos, Parol kiriting!' }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Kirish
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
