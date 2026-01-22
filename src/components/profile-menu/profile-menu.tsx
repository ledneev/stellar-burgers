import { FC } from 'react';
import { useLocation } from 'react-router-dom';
import { ProfileMenuUI } from '../ui/profile-menu/profile-menu';
import { useDispatch } from '../../services/store';
import { logout } from '../../slices/authSlice';
import { useNavigate } from 'react-router-dom';

export const ProfileMenu: FC = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await dispatch(logout());
    navigate('/login');
  };

  return (
    <ProfileMenuUI pathname={location.pathname} handleLogout={handleLogout} />
  );
};
