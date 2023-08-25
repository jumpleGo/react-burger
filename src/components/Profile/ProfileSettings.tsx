import React, { useState, ChangeEvent } from "react";
import { Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { useAuth } from "../../hooks/useAuth";
import ProfileSettingsStyle from "../../styles/pages/ProfileSettings.module.css";

interface FormData {
  email: string;
  password: string;
  name: string;
}

const ProfileSettings: React.FC = () => {
  const { user, ...auth } = useAuth();
  const [formData, setFormData] = useState<FormData>({
    email: user.email,
    password: "",
    name: user.name,
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <main>
      <div className={ProfileSettingsStyle.inputs}>
        <Input
          name="name"
          placeholder="Имя"
          value={formData.name}
          onChange={handleInputChange}
          icon="EditIcon"
        />
        <Input
          name="email"
          placeholder="Логин"
          value={formData.email}
          onChange={handleInputChange}
          icon="EditIcon"
        />
        <Input
          name="password"
          placeholder="Пароль"
          value={formData.password}
          onChange={handleInputChange}
          icon="EditIcon"
          type={"password"}
        />
      </div>
    </main>
  );
};

export default ProfileSettings;
