import React, { useEffect, useState } from "react";
import {
  Form,
  Input,
  Button,
  Upload,
  Avatar,
  message,
  Image,
  Row,
  Popconfirm,
} from "antd";
import {
  UserOutlined,
  UploadOutlined,
  DeleteOutlined,
  MailOutlined,
} from "@ant-design/icons";
import ImgCrop from "antd-img-crop";
import style from "./style.module.scss";
import axiosInstance from "../../api/axiosInstace";

const Profile = () => {
  const [profileForm] = Form.useForm();
  const [passwordForm] = Form.useForm();
  const [avatar, setAvatar] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const getProfile = async () => {
    try {
      const response = await axiosInstance.get("/api/profile");
      const profileData = response.data;

      console.log("profiledtata", profileData);

      profileForm.setFieldsValue({
        firstName: profileData.name,
        email: profileData.email,
        password: "",
      });

      if (profileData.avatarURL) {
        setAvatar(profileData.avatarURL);
      }
    } catch (error) {
      message.error("Xəta.");
    }
  };

  const patchAvatar = async () => {
    if (!selectedFile) {
      message.warning("Bir avatar seçin!");
      return;
    }

    const formData = new FormData();
    formData.append("avatar", selectedFile);

    try {
      const response = await axiosInstance.patch(
        "/api/profile/upload/avatar",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      message.success("Avatar başarıyla güncellendi!");
    } catch (error) {
      message.error("Avatar yüklenirken bir hata oluştu.");
    }
  };

  const handleAvatarChange = async (info) => {
    console.log('info',info);
    if (info.file.status !== "uploading") {
      const formData = new FormData();
      formData.append("avatar", info.file.originFileObj);

      try {
        const response = await axiosInstance.patch(
          "/api/profile/upload/avatar",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        const fileUrl = URL.createObjectURL(info.file.originFileObj);
        setAvatar(fileUrl);
        console.log("fileUrl,", fileUrl);
        message.success("Profil şəkili Yükləndi");
      } catch (error) {
        message.error("Profil şəkili yüklənərkən xəta baş verdi");
      }
    }
  };

  const handleAvatarRemove = () => {
    setAvatar(null);
    setSelectedFile(null);
    message.info("Profil şəkili silindi");
  };

  const deleteAccount = async () => {
    try {
      const response = await axiosInstance.delete("/api/profile");
      return response;
    } catch (error) {}
  };

  const updateProfile = (values) => {
    console.log("Profil Bilgileri:", values);
    patchAvatar();
    message.success("Profil Məlumatları uğurla yeniləndi");
  };

  const updatePassword = async (values) => {
    console.log("password datas", values);

    try {
      await axiosInstance.patch("/api/profile/change-password", {
        oldPassword: values.oldPassword,
        newPassword: values.newPassword,
      });

      message.success("Şifrə uğurla yeniləndi");
    } catch (error) {}
  };

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <div className={style.profile_container}>
      <h2 className="text-center font-bold text-lg">Hesab Tənzimləmələri</h2>
      <div className={style.avatar_section}>
        {avatar ? (
          <Image
            style={{ borderRadius: "7px", objectFit: "cover" }}
            width={100}
            height={100}
            preview={true}
            src={avatar}
          />
        ) : (
          <Avatar size={50} icon={<UserOutlined />} />
        )}
        <div className={style.img_upload}>
          <ImgCrop rotationSlider className="w-full">
            <Upload onChange={handleAvatarChange} className={style.upload} showUploadList={false}>
              <Button
                icon={<UploadOutlined />}
                className={style.img_upload_btn}
              >
                Yenilə
              </Button>
            </Upload>
          </ImgCrop>
        </div>
        {avatar && (
          <Button
            onClick={handleAvatarRemove}
            icon={<DeleteOutlined />}
            className={style.profil_img_delete_btn}
            danger
          ></Button>
        )}
      </div>
      <Form
        form={profileForm}
        layout="vertical"
        onFinish={updateProfile}
        className={style.profile_form}
      >
        <Form.Item name="firstName">
          <Input
            size="large"
            placeholder="Adınızı girin"
            prefix={<UserOutlined />}
          />
        </Form.Item>

        <Form.Item name="email">
          <Input
            size="large"
            placeholder="Email adresinizi girin"
            prefix={<MailOutlined />}
          />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            color="default"
            variant="solid"
            className={style.saveBtn}
            htmlType="submit"
          >
            MƏLUMATLARI YENİLƏ
          </Button>
        </Form.Item>
      </Form>

      <div className={style.form_title}>
        <span></span>
        <p>Şifrəni Yenilə</p>
        <span></span>
      </div>

      <Form
        form={passwordForm}
        layout="vertical"
        onFinish={updatePassword}
        className={style.profile_form_password}
      >
        <Form.Item name="oldPassword">
          <Input.Password size="large" placeholder="Şifrə" />
        </Form.Item>
        <Form.Item name="newPassword">
          <Input.Password size="large" placeholder="Yeni Şifrə" />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            color="default"
            variant="solid"
            className={style.saveBtn}
            htmlType="submit"
          >
            Şifrəni Yenilə
          </Button>
        </Form.Item>
      </Form>

      <div className={style.form_title}>
        <span></span>
        <p>Hesabın Silinməsi</p>
        <span></span>
      </div>

      <Row>
        <Popconfirm
          title="Hesabı Sil"
          description="Diqqət! Bu əməliyyat hesabınızı siləcək. 
Silmək istədiyinizdən əmin olun!"
          onConfirm={deleteAccount}
            okButtonProps={{type: 'primary', color: 'default', variant: 'solid'}}
            cancelButtonProps={{ color: 'default', variant: 'text'}}
          okText="Bəli"
          cancelText="Xeyir"
        >
          <Button danger className="w-full" icon={<DeleteOutlined />}>
            Hesabımı Sil
          </Button>
        </Popconfirm>
      </Row>
    </div>
  );
};

export default Profile;
