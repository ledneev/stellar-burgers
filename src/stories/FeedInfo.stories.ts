import { FeedInfoUI } from '@ui';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Example/FeedInfo',
  component: FeedInfoUI,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen'
  }
} satisfies Meta<typeof FeedInfoUI>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DefaultFeedInfo: Story = {
  args: {
    feed: {
      orders: [
        {
          _id: '11111',
          status: 'done',
          name: 'Краторная булка N-200i',
          createdAt: '2023-08-01T12:00:00Z',
          updatedAt: '2023-08-01T12:10:00Z',
          number: 123,
          ingredients: ['1', '2', '3']
        }
      ],
      total: 12,
      totalToday: 2
    },
    readyOrders: [123, 124, 125],
    pendingOrders: [126, 127]
  }
};
