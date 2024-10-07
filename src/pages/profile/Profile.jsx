import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Upload, Avatar, message } from 'antd';
import { UserOutlined, UploadOutlined, DeleteOutlined } from '@ant-design/icons';
import style from './style.module.scss';
import axiosInstance from '../../api/axiosInstace';

const Profile = () => {
  const [form] = Form.useForm();
  const [avatar, setAvatar] = useState(null); 
  const [selectedFile, setSelectedFile] = useState(null); 

  console.log('avatar', avatar);

  // API'den profil bilgilerini al
  const getProfile = async () => {
    try {
      const response = await axiosInstance.get('/api/profile');
      const profileData = response.data;

      console.log('profiledtata', profileData);

      form.setFieldsValue({
        firstName: profileData.name,
        email: profileData.email,
        password: '', 
      });

      if (profileData.avatarURL) {
        setAvatar(profileData.avatarURL); 
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
          'Content-Type': 'multipart/form-data', 
        },
      });
      message.success('Avatar başarıyla güncellendi!');
    } catch (error) {
      message.error('Avatar yüklenirken bir hata oluştu.');
    }
  };

  const handleAvatarChange = async (info) => {
    if (info.file.status !== 'uploading') {
     
  
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
        message.success('Profil şəkili Yükləndi');
      } catch (error) {
        message.error('Profil şəkili yüklənərkən xəta baş verdi');
      }
    }
  };
  
  const handleAvatarRemove = () => {
    setAvatar(null);
    setSelectedFile(null);
    message.info('Profil şəkili silindi.');
  };

  const onFinish = values => {
    console.log('Profil Bilgileri:', values);
    patchAvatar(); 
    message.success('Profil Məlumatları uöurla yeniləndi');
  };

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <div className={style.profile_container}>
      <h2>Hesab Məlumatları</h2>
      <div className={style.avatar_section}>
        <Avatar size={100} icon={<UserOutlined />} src={avatar} style={{borderRadius: '10px'}}/>
        
        <Upload onChange={handleAvatarChange} showUploadList={false}>
          <Button icon={<UploadOutlined />}></Button>
        </Upload>
        {avatar && (
          <Button onClick={handleAvatarRemove} icon={<DeleteOutlined />} danger>
          </Button>
        )}
      </div>
      <Form form={form} layout="vertical" onFinish={onFinish} className={style.profile_form}>
        <Form.Item
          label="Ad"
          name="firstName"
        >
          <Input placeholder="Adınızı girin" />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
        >
          <Input placeholder="Email adresinizi girin" />
        </Form.Item>

        <Form.Item
          label="Şifrə"
          name="password"
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
