import { ProfileUI } from '@ui-pages';
import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { selectUser } from '../../slices/authSlice';
import { updateUser } from '../../slices/authSlice';
import { TRegisterData } from '@utils-types';

export const Profile: FC = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  const [formValue, setFormValue] = useState<{
    name: string;
    email: string;
    password: string;
  }>({
    name: '',
    email: '',
    password: ''
  });

  useEffect(() => {
    if (user) {
      setFormValue({
        name: user.name,
        email: user.email,
        password: ''
      });
    }
  }, [user]);

  const isFormChanged =
    !!user &&
    (formValue.name !== user.name ||
      formValue.email !== user.email ||
      formValue.password !== '');

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    const updatedData: Partial<TRegisterData> = {};

    if (formValue.name !== user?.name) {
      updatedData.name = formValue.name;
    }
    if (formValue.email !== user?.email) {
      updatedData.email = formValue.email;
    }
    if (formValue.password) {
      updatedData.password = formValue.password;
    }

    dispatch(updateUser(updatedData));
    setFormValue((prev) => ({ ...prev, password: '' }));
  };

  const handleCancel = (e: SyntheticEvent) => {
    e.preventDefault();
    if (user) {
      setFormValue({
        name: user.name,
        email: user.email,
        password: ''
      });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValue((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <ProfileUI
      formValue={formValue}
      isFormChanged={isFormChanged}
      handleSubmit={handleSubmit}
      handleCancel={handleCancel}
      handleInputChange={handleInputChange}
    />
  );
};
