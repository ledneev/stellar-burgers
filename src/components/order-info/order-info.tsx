import { FC, useMemo } from 'react';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient } from '@utils-types';
import { useSelector } from '../../services/store';
import { useParams } from 'react-router-dom';

export const OrderInfo: FC = () => {
  const { number } = useParams<{ number: string }>();
  const parsedNumber = number ? parseInt(number, 10) : null;

  const orders = useSelector((state) => state.feed.orders);
  const ingredients = useSelector((state) => state.ingredients.ingredients);

  const orderData = parsedNumber
    ? orders.find((item) => item.number === parsedNumber)
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

  return <OrderInfoUI orderInfo={orderInfo} />;
};
