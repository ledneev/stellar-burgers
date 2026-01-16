import { FC, useEffect } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useSelector } from '../../services/store';
import { selectIngredients } from '../../slices/ingredientsSlice';
import { useLocation, useParams } from 'react-router-dom';
import { TIngredient } from '@utils-types';

export const IngredientDetails: FC = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const ingredients = useSelector(selectIngredients);

  const backgroundLocation = location.state?.background?.location;
  const ingredientData: TIngredient | undefined = ingredients.find(
    (item) => item._id === id
  );

  if (!ingredients.length || !ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
