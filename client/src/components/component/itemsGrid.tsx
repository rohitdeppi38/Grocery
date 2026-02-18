import React, { Children, ReactNode } from 'react';
import { List } from '../../types/itemList';

interface ItemsGridProps {
  children: ReactNode;
  className:string;
}

const ItemsGrid: React.FC<ItemsGridProps> = ({children,className ='' }) => {
  return (
    <section className={`grid auto-rows-auto gap-4 py-2 ${className}`}>
        {children}
    </section>
  )
}

export default ItemsGrid