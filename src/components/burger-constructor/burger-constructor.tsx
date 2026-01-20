import { FC, useCallback, useMemo, useEffect } from 'react';
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
    if (!constructorItems.bun) return;

    const accessToken = getCookie('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');

    if (!accessToken && !refreshToken) {
      navigate('/login');
      return;
    }

    if (orderRequest || orderModalData) return;

    dispatch(setOrderRequest(true));

    const ingredientIds = [
      constructorItems.bun._id,
      ...constructorItems.ingredients.map((ing) => ing._id),
      constructorItems.bun._id
    ];

    const timeoutId = setTimeout(() => {
      dispatch(setOrderRequest(false));
    }, 15000);

    orderBurgerApi(ingredientIds)
      .then((response) => {
        clearTimeout(timeoutId);
        dispatch(setOrderModalData(response.order));
        dispatch(resetConstructor());
      })
      .catch((err) => {
        clearTimeout(timeoutId);
        dispatch(setOrderRequest(false));

        if (err.status === 401) {
          navigate('/login');
        }
      });
  }, [constructorItems, orderRequest, orderModalData, dispatch, navigate]);

  const closeOrderModal = useCallback(() => {
    dispatch(setOrderModalData(null));
  }, [dispatch]);

  useEffect(
    () => () => {
      if (orderRequest) {
        dispatch(setOrderRequest(false));
      }
      if (orderModalData) {
        dispatch(setOrderModalData(null));
      }
    },
    [dispatch, orderRequest, orderModalData]
  );

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
