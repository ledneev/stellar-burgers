import { FC, useMemo, useEffect } from 'react';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient } from '@utils-types';
import { useSelector, useDispatch } from '../../services/store';
import { useParams, useLocation } from 'react-router-dom';
import { fetchUserOrders } from '../../slices/profileOrdersSlice';
import { Modal } from '@components';

export const OrderInfo: FC = () => {
  const { number } = useParams<{ number: string }>();
  const parsedNumber = number ? parseInt(number, 10) : null;
  const location = useLocation();
  const background = location.state?.background;

  const isProfilePage = location.pathname.startsWith('/profile/orders');
  const isFeedPage = location.pathname.startsWith('/feed');

  const dispatch = useDispatch();

  const feedOrders = useSelector((state) => state.feed.orders);
  const profileOrdersData = useSelector((state) => state.profileOrders.orders);
  const profileOrdersList = profileOrdersData.orders;
  const profileOrdersLoading = useSelector(
    (state) => state.profileOrders.loading
  );

  const ingredients = useSelector((state) => state.ingredients.ingredients);

  useEffect(() => {
    if (isProfilePage && !profileOrdersList.length && !profileOrdersLoading) {
      dispatch(fetchUserOrders());
    }
  }, [isProfilePage, profileOrdersList.length, profileOrdersLoading, dispatch]);

  const orders = isProfilePage
    ? profileOrdersList
    : isFeedPage
      ? feedOrders
      : [];

  const orderData = parsedNumber
    ? orders.find((order) => order.number === parsedNumber)
    : null;

  const orderInfo = useMemo(() => {
    if (!orderData || !ingredients.length) return null;

    const date = new Date(orderData.createdAt);

    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsInfo = orderData.ingredients.reduce(
      (acc: TIngredientsWithCount, item) => {
        const ingredient = ingredients.find((ing) => ing._id === item);
        if (!ingredient) return acc;
        if (!acc[item]) {
          acc[item] = { ...ingredient, count: 1 };
        } else {
          acc[item].count++;
        }
        return acc;
      },
      {} as TIngredientsWithCount
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    return {
      ...orderData,
      ingredientsInfo,
      date,
      total
    };
  }, [orderData, ingredients]);

  if (!orderInfo) {
    return <Preloader />;
  }

  if (background) {
    return (
      <Modal title='Детали заказа' onClose={() => window.history.back()}>
        <OrderInfoUI orderInfo={orderInfo} />
      </Modal>
    );
  }

  return <OrderInfoUI orderInfo={orderInfo} />;
};
