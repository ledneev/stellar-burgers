import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { fetchUserOrders } from '../../slices/profileOrdersSlice';
import { Outlet } from 'react-router-dom';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();
  const { orders } = useSelector((state) => state.profileOrders.orders);
  const { loading, loaded } = useSelector((state) => state.profileOrders);

  useEffect(() => {
    if (!loaded && !loading) {
      dispatch(fetchUserOrders());
    }
  }, [dispatch, loaded, loading]);

  if (loading && !orders.length) {
    return <p>Загрузка заказов...</p>;
  }
  return (
    <>
      <ProfileOrdersUI orders={orders} />
      <Outlet />
    </>
  );
};

export default ProfileOrders;
