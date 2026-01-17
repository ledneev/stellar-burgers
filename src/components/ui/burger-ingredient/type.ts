import { Location } from 'react-router-dom';
import { TIngredient } from '@utils-types';

export type TBurgerIngredientUIProps = {
  ingredient: TIngredient;
  count: number;
  locationState: { background: string };
  handleAdd: () => void;
  dragRef?: (node: HTMLElement | null) => void;
};
