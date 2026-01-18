import { FC, useCallback, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import { useNavigate } from 'react-router-dom';
import {
  resetConstructor,
  setOrderModalData,
  setOrderRequest
} from '../../slices/burgerConstructorSlice';
import { orderBurgerApi } from '@api';
import { getCookie } from '../../utils/cookie';

export const BurgerConstructor: FC = () => {
  const constructorItems = useSelector(
    (state) => state.burgerConstructor.constructorItems
  );
  const orderRequest = useSelector(
    (state) => state.burgerConstructor.orderRequest
  );
  const orderModalData = useSelector(
    (state) => state.burgerConstructor.orderModalData
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (sum: number, ingredient: TConstructorIngredient) =>
          sum + ingredient.price,
        0
      ),
    [constructorItems]
  );

  const onOrderClick = useCallback(() => {
    if (!constructorItems.bun) {
      return;
    }

    const accessToken = getCookie('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');

    if (!accessToken && !refreshToken) {
      navigate('/login');
      return;
    }

    if (orderRequest) return;

    dispatch(setOrderRequest(true));

    const ingredientIds = [
      constructorItems.bun._id,
      ...constructorItems.ingredients.map((ing) => ing._id),
      constructorItems.bun._id
    ];

    orderBurgerApi(ingredientIds)
      .then((data) => {
        dispatch(setOrderModalData(data.order));
        dispatch(resetConstructor());
      })
      .catch((err) => {
        console.error('Ошибка при оформлении заказа:', err);
      })
      .finally(() => {
        dispatch(setOrderRequest(false));
      });
  }, [constructorItems, orderRequest, dispatch, navigate]);

  const closeOrderModal = useCallback(() => {
    dispatch(setOrderModalData(null));
    navigate('/');
  }, [dispatch, navigate]);

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
