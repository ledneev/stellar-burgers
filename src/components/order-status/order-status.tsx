import React, { FC } from 'react';
import { OrderStatusProps } from './type';
import { OrderStatusUI } from '@ui';

const statusText: { [key: string]: string } = {
  pending: 'Готовится',
  done: 'Выполнен',
  created: 'Создан'
};

const COLORS = {
  done: '#00CCCC',
  pending: '#E52B1A',
  created: '#F2F2F3'
};

export const OrderStatus: FC<OrderStatusProps> = ({ status }) => {
  if (!status) {
    console.warn('OrderStatus: status is', status);
    return null;
  }

  const text =
    (statusText as { [key: string]: string })[status] || 'Неизвестно';
  const color = (COLORS as { [key: string]: string })[status] || COLORS.created;

  console.log('🎨 OrderStatus: rendering', { status, text, color });

  return (
    <span
      className='text text_type_main-default pt-2'
      style={{ color }}
      data-status-debug='true'
    >
      {text}
    </span>
  );
};
