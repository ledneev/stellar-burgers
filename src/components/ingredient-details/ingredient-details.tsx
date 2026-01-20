import { FC, useEffect } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useSelector, useDispatch } from '../../services/store';
import {
  selectIngredients,
  selectLoading as selectIngredientsLoading
} from '../../slices/ingredientsSlice';
import { useLocation, useParams } from 'react-router-dom';
import { fetchIngredients } from '../../slices/ingredientsSlice';

import { TIngredient } from '@utils-types';
import styles from './ingredient-details.module.css';

export const IngredientDetails: FC = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const dispatch = useDispatch();

  const ingredients = useSelector(selectIngredients);
  const isLoading = useSelector(selectIngredientsLoading);

  const ingredientData = ingredients.find((item) => item._id === id);

  const backgroundLocation = location.state?.background;

  useEffect(() => {
    if (!ingredients.length && !isLoading) {
      dispatch(fetchIngredients());
    }
  }, [dispatch, ingredients.length, isLoading]);

  if (isLoading || (!ingredientData && ingredients.length > 0)) {
    return <Preloader />;
  }

  if (!ingredientData) {
    return (
      <div className='text text_type_main-large p-4'>Ингредиент не найден</div>
    );
  }
  if (backgroundLocation) {
    return <IngredientDetailsUI ingredientData={ingredientData} />;
  }

  return (
    <div className={styles.pageContainer}>
      <h2 className='text text_type_main-large mb-6'>Детали ингредиента</h2>
      <IngredientDetailsUI ingredientData={ingredientData} />
    </div>
  );
};
