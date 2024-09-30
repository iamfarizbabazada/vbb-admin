import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Upload, Avatar, message } from 'antd';
import { UserOutlined, UploadOutlined, DeleteOutlined } from '@ant-design/icons';
import style from './style.module.scss';
import axiosInstance from '../../api/axiosInstace';

const Profile = () => {
  const [form] = Form.useForm();
  const [avatar, setAvatar] = useState(null); // Avatar URL'sini saklar
  const [selectedFile, setSelectedFile] = useState(null); // Seçilen dosya

  console.log('avatar', avatar);

  // API'den profil bilgilerini al
  const getProfile = async () => {
    try {
      const response = await axiosInstance.get('/api/profile');
      const profileData = response.data;

      form.setFieldsValue({
        firstName: profileData.name,
        email: profileData.email,
        password: '', 
      });

      if (profileData.avatarURL) {
        setAvatar(profileData.avatarURL); // Avatar URL'sini kaydet
      }

    } catch (error) {
      message.error("Profil bilgileri alınırken hata oluştu.");
    }
  };

  // Avatar'ı sunucuya gönder
  const patchAvatar = async () => {
    if (!selectedFile) {
      message.warning("Lütfen bir avatar seçin!");
      return;
    }

    const formData = new FormData();
    formData.append('avatar', selectedFile);

    try {
      const response = await axiosInstance.patch('/api/profile/upload/avatar', formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // FormData kullanıldığı için bu header gerekli
        },
      });
      message.success('Avatar başarıyla güncellendi!');
    } catch (error) {
      message.error('Avatar yüklenirken bir hata oluştu.');
    }
  };

  const handleAvatarChange = async (info) => {
    if (info.file.status !== 'uploading') {
      // Dosyanın seçildiğini kontrol ederiz
     
  
      // Seçilen dosyayı API'ye gönder
      const formData = new FormData();
      formData.append('avatar', info.file.originFileObj);
  
      try {
        const response = await axiosInstance.patch('/api/profile/upload/avatar', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        const fileUrl = URL.createObjectURL(info.file.originFileObj);
        setAvatar(fileUrl);
        console.log('fileUrl,', fileUrl);
        message.success('Avatar başarıyla yüklendi!');
      } catch (error) {
        message.error('Avatar yüklenirken bir hata oluştu.');
      }
    }
  };
  
  const handleAvatarRemove = () => {
    setAvatar(null);
    setSelectedFile(null);
    message.info('Avatar silindi.');
  };

  const onFinish = values => {
    console.log('Profil Bilgileri:', values);
    patchAvatar(); // Avatar'ı kaydet
    message.success('Profil bilgileri başarıyla güncellendi!');
  };

  useEffect(() => {
    getProfile();
  }, []);

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
      <Form form={form} layout="vertical" onFinish={onFinish} className={style.profile_form}>
        <Form.Item
          label="Ad"
          name="firstName"
          rules={[{ required: true, message: 'Buranı doldurun!' }]}
        >
          <Input placeholder="Adınızı girin" />
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
