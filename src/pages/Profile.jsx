import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Card, Avatar, Row, Col, Typography, Button } from 'antd';
import { UserOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

const Profile = () => {
  const { user } = useContext(AuthContext);
  if (!user) return null;

  return (
    <div className="max-w-4xl mx-auto mt-10 p-4">
      <Card bordered={false} className="rounded-lg shadow-lg bg-white dark:bg-gray-800">
        <Row gutter={[16, 16]} align="middle">
          <Col xs={24} sm={8} className="flex justify-center">
            <Avatar 
              size={120} 
              icon={<UserOutlined />} 
              src={user.avatar || 'https://via.placeholder.com/150'} 
            />
          </Col>
          <Col xs={24} sm={16}>
            <Title level={2} className="text-gray-800 dark:text-gray-100">{user.name}</Title>
            <Text strong className="text-gray-700 dark:text-gray-300">Email: </Text>
            <Text className="text-gray-700 dark:text-gray-300">{user.email}</Text>
            <div className="mt-4">
              <Button type="primary">
                Profilni tahrirlash
              </Button>
            </div>
          </Col>
        </Row>
        <Row className="mt-6">
          <Col span={24}>
            <Title level={4} className="text-gray-800 dark:text-gray-100">Qo'shimcha Ma'lumotlar</Title>
            <p className="text-gray-600 dark:text-gray-400">
              Bu yerga foydalanuvchi haqida qo'shimcha statistikalar yoki boshqa ma'lumotlar kiritilishi mumkin.
            </p>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default Profile;
