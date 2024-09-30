import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Upload, Avatar, message } from 'antd';
import { UserOutlined, UploadOutlined, DeleteOutlined } from '@ant-design/icons';
import style from  './style.module.scss';
import axiosInstance from '../../api/axiosInstace';

const Profile = () => {
  const [form] = Form.useForm();
  const [avatar, setAvatar] = useState(null);

  const getProfile = async() => {
    const response = await axiosInstance.get('/api/profile')
    console.log('response', response);
  }

  const handleAvatarChange = info => {
    if (info.file.status === 'done') {
      const fileUrl = URL.createObjectURL(info.file.originFileObj);
      setAvatar(fileUrl);
      message.success('Avatar yüklendi!');
    }
  };

  const handleAvatarRemove = () => {
    setAvatar(null);
    message.info('Avatar silindi.');
  };

  const onFinish = values => {
    console.log('Profil Bilgileri:', values);
    message.success('Profil bilgileri başarıyla güncellendi!');
  };


  useEffect(() => {
    getProfile()
  }, [])

  return (
    <div className={style.profile_container}>
      <h2>Profil Tənzimləmələri</h2>
      <div className={style.avatar_section}>
        {/* <Avatar size={100} icon={<UserOutlined />} src={avatar} /> */}
        <Upload onChange={handleAvatarChange} showUploadList={false}>
          <Button icon={<UploadOutlined />}></Button>
        </Upload>
        {avatar && (
          <Button onClick={handleAvatarRemove} icon={<DeleteOutlined />} danger>
            Avatarı Sil
          </Button>
        )}
      </div>
      <Form form={form} layout="vertical" onFinish={onFinish} className={style.profile_form }>
        <Form.Item
          label="Ad"
          name="firstName"
          rules={[{ required: true, message: 'Buranı doldurun!' }]}
        >
          <Input placeholder="Adınızı girin" />
        </Form.Item>

        <Form.Item
          label="Soyad"
          name="lastName"
          rules={[{ required: true, message: 'Buranı doldurun!' }]}
        >
          <Input placeholder="Soyadınızı girin" />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: 'Buranı doldurun!' },
            { type: 'email', message: 'Uyğun email formatı deyil!' },
          ]}
        >
          <Input placeholder="Email adresinizi girin" />
        </Form.Item>

        <Form.Item
          label="Şifrə"
          name="password"
          rules={[{ required: true, message: 'Buranı doldurun!' }]}
        >
          <Input.Password placeholder="Şifrenizi girin" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" className={style.saveBtn} htmlType="submit">
            Yadda saxla
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Profile;
